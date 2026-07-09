"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  Bot,
  User,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIChat() {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Preguntas sugeridas según idioma
  const suggestedQuestions =
    language === "es"
      ? [
          "¿Cuál es tu experiencia?",
          "¿Qué tecnologías dominas?",
          "Cuéntame sobre tus proyectos",
          "¿Estás disponible para trabajar?",
        ]
      : [
          "What's your experience?",
          "What technologies do you master?",
          "Tell me about your projects",
          "Are you available for work?",
        ];

  // Inicializar mensaje de bienvenida cuando cambia el idioma
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: t("chat.welcome"),
        timestamp: new Date(),
      },
    ]);
  }, [language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language: language,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          data.message || "Lo siento, hubo un error al procesar tu mensaje.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo más tarde.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{
          scale: 1.1,
          boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
        }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-white shadow-lg",
          "hover:bg-primary-dark transition-all duration-300 flex items-center justify-center",
          "shadow-primary/25 hover:shadow-primary/40",
          isOpen && "hidden",
        )}
        aria-label="Abrir chat con IA"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-primary"
        />
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 absolute animate-pulse" />
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 relative z-10" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="fixed bottom-2 right-2 sm:bottom-6 sm:right-6 z-50 
                       w-[calc(100vw-16px)] sm:w-[380px] max-w-[400px]
                       bg-background border border-border rounded-xl sm:rounded-2xl shadow-2xl 
                       flex flex-col overflow-hidden"
            style={{ height: "min(550px, calc(100vh - 80px))" }}
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 sm:p-4 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center"
                >
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm">
                    {t("chat.title")}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground flex items-center gap-1">
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"
                    />
                    {t("chat.online")}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </motion.div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 no-scrollbar">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05, type: "spring" }}
                  className={cn(
                    "flex gap-2 sm:gap-3",
                    message.role === "user" ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={cn(
                      "w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0",
                      message.role === "user"
                        ? "bg-primary text-white"
                        : "bg-muted",
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    )}
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={cn(
                      "max-w-[80%] px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm",
                      message.role === "user"
                        ? "bg-primary text-white rounded-br-md shadow-lg shadow-primary/20"
                        : "bg-muted rounded-bl-md",
                    )}
                  >
                    {message.content}
                  </motion.div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 sm:gap-3"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  </div>
                  <div className="bg-muted px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: 0,
                        }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50"
                      />
                      <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: 0.15,
                        }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50"
                      />
                      <motion.span
                        animate={{ y: [0, -6, 0] }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: 0.3,
                        }}
                        className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/50"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-3 sm:px-4 pb-2"
              >
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-1.5 sm:mb-2">
                  {t("chat.suggestions")}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <motion.button
                      key={question}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(99, 102, 241, 0.25)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(question)}
                      className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-full 
                                 hover:bg-primary/20 transition-all duration-200"
                    >
                      {question}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-3 sm:p-4 border-t border-border bg-muted/30"
            >
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t("chat.placeholder")}
                  disabled={isLoading}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-background border border-border rounded-lg sm:rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
                             text-xs sm:text-sm transition-all disabled:opacity-50 hover:border-primary/30"
                />
                <motion.button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 5px 20px rgba(99, 102, 241, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-primary text-white rounded-lg sm:rounded-xl flex items-center justify-center
                             hover:bg-primary-dark transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar mensaje"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
