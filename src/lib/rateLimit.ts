import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Usa Upstash Redis si está configurado (rate limit distribuido, sobrevive a
// cold starts en serverless). Si no, cae a un Map en memoria del proceso.
const hasUpstash = Boolean(
   process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = hasUpstash ? Redis.fromEnv() : null;

// Una instancia de Ratelimit por combinación límite/ventana (memoizada).
const limiters = new Map<string, Ratelimit>();

function getLimiter(limit: number, windowSec: number): Ratelimit {
   const key = `${limit}:${windowSec}`;
   let limiter = limiters.get(key);
   if (!limiter) {
      limiter = new Ratelimit({
         redis: redis!,
         limiter: Ratelimit.slidingWindow(limit, `${windowSec} s`),
         prefix: "portfolio-rl",
      });
      limiters.set(key, limiter);
   }
   return limiter;
}

// Fallback en memoria (ventana fija). Solo válido dentro de un proceso.
const memMap = new Map<string, { count: number; resetAt: number }>();

function memCheck(id: string, limit: number, windowMs: number): boolean {
   const now = Date.now();
   const entry = memMap.get(id) || { count: 0, resetAt: now + windowMs };
   if (now > entry.resetAt) {
      entry.count = 0;
      entry.resetAt = now + windowMs;
   }
   entry.count += 1;
   memMap.set(id, entry);
   return entry.count <= limit;
}

/**
 * Devuelve true si la petición está permitida, false si excede el límite.
 * @param id        Identificador único (ej. `contact:<ip>`), namespacéalo por ruta.
 * @param limit     Máximo de peticiones por ventana.
 * @param windowSec Tamaño de la ventana en segundos.
 */
export async function rateLimit(
   id: string,
   limit: number,
   windowSec: number,
): Promise<boolean> {
   if (redis) {
      const { success } = await getLimiter(limit, windowSec).limit(id);
      return success;
   }
   return memCheck(id, limit, windowSec * 1000);
}
