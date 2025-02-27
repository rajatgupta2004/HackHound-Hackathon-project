import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, AlertTriangle, Bot, User, Zap, Thermometer, HeartPulse, MapPin, Plus, PersonStanding } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import MarkdownRenderer from './MarkdownRenderer';

type ChatMessage = {
  role: string;
  content: string;
  timestamp: number;
};

export function SymptomChecker() {
  
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "👋 Hello! I'm Dr. Nova, your AI health companion. Let's explore what's going on!",
      timestamp: Date.now(),
    },
  ]);
  const [selectedArea, setSelectedArea] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Colorful theme configuration
  const theme = {
    primary: '#3B82F6',    // Blue
    secondary: '#10B981',  // Emerald
    accent: '#F59E0B',     // Amber
    background: '#F0F9FF', // Light blue
  };

  const bodyAreas = [
    { name: 'Head', color: '#FDE68A', icon: '👤', position: { top: '1%', left: '50%' } },
    { name: 'Chest', color: '#FECACA', position: { top: '20%', left: '50%' } },
    { name: 'Abdomen', color: '#BBF7D0', position: { top: '40%', left: '50%' } },
    { name: 'Arms', color: '#BFDBFE', position: { top: '35%', left: '37%' } },
    { name: 'Legs', color: '#DDD6FE', position: { top: '70%', left: '50%' } },
  ];

  const quickSymptoms = ['🤒 Fever', '🤕 Headache', '😵 Dizziness', '🤢 Nausea', '💤 Fatigue'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const genAI = new GoogleGenerativeAI("GEMINI_API");
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  useEffect(() => scrollToBottom(), [chatHistory]);

  const handleSubmit = async(e: React.FormEvent) => {

    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = { role: 'user', content: message, timestamp: Date.now() };
    setChatHistory([...chatHistory, newMessage]);
    setIsTyping(true);
    
    
    const prompt = `Patient Message: ${message}
    Advice: Provide a brief, relevant piece of advice based on the patient's message.
    Follow-up Questions: Ask 2 to 3 specific questions to gather more details about their symptoms.` ;
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    setMessage('');
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [...prev, {
        role: 'assistant',
        content: result.response.text(),
        timestamp: Date.now()
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chat Section */}
        <div className="bg-gray-200 rounded-3xl shadow-xl p-6 border border-black/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Bot className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Health Companion</h1>
          </div>

          <div className="h-[500px] overflow-y-auto mb-4 space-y-3 pr-2">
            <AnimatePresence>
              {chatHistory.map((msg) => (
                <motion.div
                  key={msg.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border-black/30 p-4 rounded-2xl ${
                    msg.role === 'assistant' 
                      ? 'bg-blue-50 border border-blue-100' 
                      : 'bg-purple-50 border border-purple-100'
                  }`}
                >
                  <MarkdownRenderer text ={msg.content}></MarkdownRenderer>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </motion.div>
              ))}
              
              <div ref={messagesEndRef} />
            </AnimatePresence>
            {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-3 bg-blue-50 rounded-2xl flex items-center gap-2"
                >
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-100" />
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce delay-200" />
                  </div>
                  <span className="text-sm text-blue-600">Analyzing symptoms...</span>
                </motion.div>
              )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="💬 Describe your symptoms..."
              className="flex-1 p-3 rounded-2xl border-2 border-blue-100 focus:border-blue-300 focus:ring-2 ring-blue-100 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-colors"
            >
              <Zap className="h-5 w-5" />
            </motion.button>
          </form>

          <div className="grid grid-cols-2 gap-2 mt-4">
            {quickSymptoms.map((symptom) => (
              <motion.button
                key={symptom}
                whileHover={{ y: -2 }}
                onClick={() => setMessage(symptom)}
                className="p-2 text-sm bg-white border border-blue-100 rounded-xl text-gray-700 hover:bg-blue-50 transition-colors"
              >
                {symptom}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Interactive Health Section */}
        <div className="bg-white rounded-3xl p-6 border border-black/20 relative overflow-hidden h-[850px]">
        <iframe className='w-full h-full' title="Muscle system in human body - Muscular system" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/7ea21567ff9942bf9511e2d99efe85d9/embed?autostart=1&transparent=1"> </iframe>
        
        {/* Enhanced coverage overlay */}
            <div className="absolute inset-0 pointer-events-none" style={{
      zIndex: 10,
      background: `
        linear-gradient(to bottom, white 50px, transparent 40px, transparent calc(100% - 40px), white calc(100% - 40px)),
        linear-gradient(to right, white 40px, transparent 40px, transparent calc(100% - 40px), white calc(100% - 40px))
      `,
      border: '40px solid white',
      boxShadow: 'inset 0 0 40px 40px white'
    }}>
      <h1 className='text-2xl font-bold text-gray-800'>Interactive Human body </h1>
    </div>
      </div>
      </div>
    </div>
  );
}