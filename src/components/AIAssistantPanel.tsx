import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ShieldAlert, Sparkles, AlertTriangle, ArrowRight } from 'lucide-react';

interface AIAssistantPanelProps {
  currentTheme: 'government' | 'intelligence';
  currentLanguage: string;
}

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  riskScore?: number;
  riskLevel?: string;
  threatCategory?: string;
}

export default function AIAssistantPanel({ currentTheme, currentLanguage }: AIAssistantPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'assistant', text: 'Namaste! I am your RakshakAI Safety Coordinator. Describe any potential cybercrime, suspected calls, fake SMS, or digital arrest situations, and I will evaluate risk indicators.' }
  ]);
  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setSending(true);

    try {
      const chatHistory = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: chatHistory,
          language: currentLanguage
        })
      });
      const data = await response.json();
      
      setMessages((prev) => [...prev, { 
        sender: 'assistant', 
        text: data.reply,
        riskScore: data.riskScore,
        riskLevel: data.riskLevel,
        threatCategory: data.threatCategory
      }]);
    } catch (err) {
      console.error("Chat request failed:", err);
      setMessages((prev) => [...prev, { sender: 'assistant', text: "Apologies, I encountered a communication error with our central intelligence gateway. Please ensure your internet connectivity is stable or try again shortly." }]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className={`p-4 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 active:scale-95 transition-all text-white ${
            currentTheme === 'government'
              ? 'bg-[#005CA9] hover:bg-[#003F7D]'
              : 'bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
          }`}
          id="ai-bot-launcher"
        >
          <MessageSquare size={22} className="animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wide hidden sm:inline">Ask RakshakAI</span>
        </button>
      )}

      {/* Floating Chat Window */}
      {isOpen && (
        <div className={`w-80 sm:w-96 h-[480px] rounded-2xl shadow-2xl border flex flex-col overflow-hidden transition-all duration-300 ${
          currentTheme === 'government'
            ? 'bg-white border-slate-300 text-slate-800'
            : 'bg-zinc-900 border-zinc-800 text-zinc-100 backdrop-blur-md'
        }`}>
          {/* Chat Header */}
          <div className={`p-4 flex justify-between items-center ${
            currentTheme === 'government' ? 'bg-[#005CA9] text-white' : 'bg-zinc-950 border-b border-zinc-850'
          }`}>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-cyan-400 animate-bounce" />
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wide leading-none">Safety Assistant</h4>
                <span className="text-[9px] text-cyan-300 font-mono font-bold uppercase mt-0.5 inline-block">Multilingual Core Active</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded transition-all text-slate-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Advisories alert banner */}
          <div className="bg-amber-500/10 border-b border-amber-500/20 p-2 text-[10px] text-amber-500 flex gap-1.5 items-center px-4 font-semibold">
            <AlertTriangle size={12} className="shrink-0" />
            <span>Real police will NEVER demand money over video call.</span>
          </div>

          {/* Messages Stage */}
          <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${
            currentTheme === 'government' ? 'bg-[#F8F9FA]' : 'bg-zinc-950'
          }`}>
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : currentTheme === 'government'
                    ? 'bg-white border border-slate-200 rounded-bl-none text-slate-800 shadow-sm'
                    : 'bg-zinc-900 border border-zinc-800 rounded-bl-none text-zinc-200 shadow-lg'
                }`}>
                  <div>{msg.text}</div>
                  {msg.riskLevel && msg.riskLevel !== 'None' && (
                    <div className="mt-2.5 p-2 rounded-lg border text-[10px] space-y-1 bg-black/5 dark:bg-black/30 border-black/10 dark:border-white/10 text-slate-900 dark:text-white">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-[8px]">Incident Threat Level:</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                          msg.riskLevel === 'Critical' ? 'bg-red-500 text-white animate-pulse' :
                          msg.riskLevel === 'High' ? 'bg-orange-500 text-white' :
                          msg.riskLevel === 'Medium' ? 'bg-amber-500 text-slate-950' :
                          'bg-emerald-500 text-white'
                        }`}>
                          {msg.riskLevel} ({msg.riskScore}%)
                        </span>
                      </div>
                      {msg.threatCategory && msg.threatCategory !== 'None' && (
                        <div className="text-slate-700 dark:text-zinc-200">
                          <span className="text-slate-500 dark:text-zinc-400 font-medium">Type:</span> {msg.threatCategory}
                        </div>
                      )}
                      <div className="w-full bg-slate-200 dark:bg-zinc-700/60 h-1 rounded-full overflow-hidden mt-1">
                        <div 
                          className={`h-full ${
                            msg.riskLevel === 'Critical' ? 'bg-red-500' :
                            msg.riskLevel === 'High' ? 'bg-orange-500' :
                            msg.riskLevel === 'Medium' ? 'bg-amber-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${msg.riskScore || 0}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {sending && (
              <div className="flex justify-start">
                <div className="bg-zinc-800/40 border border-zinc-800 text-zinc-400 p-3 rounded-2xl rounded-bl-none text-[11px] animate-pulse">
                  Querying safety model pathways...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form Footer */}
          <form onSubmit={sendMessage} className={`p-3 border-t flex gap-2 items-center ${
            currentTheme === 'government' ? 'bg-white border-slate-200' : 'bg-zinc-900 border-zinc-800'
          }`}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me: 'Is a Skype police call fake?'"
              className={`flex-1 p-2 text-xs rounded border outline-none ${
                currentTheme === 'government'
                  ? 'bg-slate-50 border-slate-300 focus:bg-white text-slate-900'
                  : 'bg-zinc-950 border-zinc-850 focus:border-cyan-500 text-zinc-100'
              }`}
            />
            <button
              type="submit"
              disabled={sending || !inputText.trim()}
              className="p-2 bg-[#005CA9] hover:bg-[#003F7D] text-white rounded-lg transition-all disabled:opacity-40"
            >
              <Send size={14} />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
