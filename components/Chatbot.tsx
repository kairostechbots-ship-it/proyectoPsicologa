'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: '¡Hola! Soy el asistente virtual de la Dra. Jazmin. ¿En qué te puedo ayudar hoy? (Horarios, información, agendar cita...)' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages([...newMessages, { role: 'model', content: data.text }]);
        
        if (data.action === 'book_appointment') {
          try {
            const savedApts = JSON.parse(localStorage.getItem('chatbot_appointments') || '[]');
            savedApts.push(data.appointmentDetails);
            localStorage.setItem('chatbot_appointments', JSON.stringify(savedApts));
            
            // Dispatch a custom event so the panel can update
            window.dispatchEvent(new Event('appointments_updated'));
          } catch (e) {
            console.error('Error saving appointment:', e);
          }
        }
      } else {
        setMessages([...newMessages, { role: 'model', content: data.error || 'Lo siento, hubo un error de conexión.' }]);
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'model', content: 'Lo siento, hubo un error al conectar con el servidor.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[350px] bg-white rounded-2xl shadow-2xl border border-[#7D9D85]/20 overflow-hidden flex flex-col"
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-[#7D9D85] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6" />
                <h3 className="font-bold">Asistente Virtual</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px] min-h-[300px] bg-[#F9FBFA]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-[#E8F0EA] flex items-center justify-center text-[#4A5D4E] flex-shrink-0">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#7D9D85] text-white rounded-tr-none' 
                      : 'bg-white border border-[#E0E0E0] text-[#2D3436] rounded-tl-none shadow-sm'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-[#E8F0EA] flex items-center justify-center text-[#4A5D4E] flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-[#E0E0E0] text-[#2D3436] rounded-tl-none shadow-sm flex items-center">
                    <Loader2 className="w-4 h-4 animate-spin text-[#7D9D85]" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#E0E0E0] bg-white">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 p-2 border border-[#E0E0E0] rounded-xl focus:outline-none focus:border-[#7D9D85] focus:ring-1 focus:ring-[#7D9D85] text-sm"
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-[#7D9D85] text-white rounded-xl hover:bg-[#6A8971] transition-colors disabled:opacity-50 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-white text-[#7D9D85] p-4 rounded-full shadow-2xl hover:scale-110 border border-[#7D9D85]/20 hover:shadow-lg transition-all flex items-center justify-center group"
        aria-label="Abrir Asistente"
      >
        <MessageSquare className="w-8 h-8" />
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-medium py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Asistente Virtual
        </span>
      </motion.button>
    </>
  );
}
