import { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, AlertCircle, Lightbulb } from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  text: string;
  timestamp: Date;
  suggestion?: string;
}

interface AgentChatbotProps {
  onClose: () => void;
  initialMessage?: string | null;
}

export default function AgentChatbot({ onClose, initialMessage }: AgentChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'agent',
      text: 'Welcome to Mad AI Agent Services. I am your dedicated virtual assistant for utility monitoring and analysis. I am authorized to investigate consumption anomalies, provide data-driven insights, and facilitate report submissions to your designated service providers. How may I assist you today?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const processedMessageRef = useRef<string | null>(null);

  const sendMessage = (messageText: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      let agentResponse = 'Processing your inquiry. Please standby while I retrieve the relevant data and analysis...';

      if (messageText.toLowerCase().includes('yes') || messageText.toLowerCase().includes('submit') || messageText.toLowerCase().includes('send it') || messageText.toLowerCase().includes('ok') || messageText.toLowerCase().includes('sure')) {
        agentResponse = 'Confirmed. The diagnostic report has been successfully submitted to your water utility provider. The report includes: flow rate measurements (2.8 L/min baseline vs 3.5 L/min current), time-series data from the last 48 hours, suspected location (Master bathroom), and estimated excess usage (850L over 2 days). You will receive a confirmation reference number via email within the next 24 hours.';
      } else if (messageText.toLowerCase().includes('water')) {
        agentResponse = 'Our monitoring system has identified a water consumption anomaly in your bathroom facility during the previous measurement interval. The recorded flow rate exceeded normal operational parameters by 25%. Would you authorize the submission of a comprehensive diagnostic report to your water utility provider for professional assessment?';
      } else if (messageText.toLowerCase().includes('electricity') || messageText.toLowerCase().includes('power')) {
        agentResponse = 'Your current electricity consumption levels are within expected operational parameters. Our analysis indicates that your air conditioning unit accounts for approximately 45% of total electrical usage. Would you be interested in receiving professional recommendations for optimizing your cooling system efficiency?';
      } else if (messageText.toLowerCase().includes('internet') || messageText.toLowerCase().includes('wifi')) {
        agentResponse = 'Your internet connectivity is performing at optimal levels, with an average throughput of 245 Mbps. Our system has detected 12 connected devices on your network. All performance metrics are within acceptable ranges.';
      } else if (messageText.toLowerCase().includes('report')) {
        agentResponse = 'Confirmed. The diagnostic report has been successfully submitted to your water utility provider. The report includes: flow rate measurements (2.8 L/min baseline vs 3.5 L/min current), time-series data from the last 48 hours, suspected location (Master bathroom), and estimated excess usage (850L over 2 days). You will receive a confirmation reference number via email within the next 24 hours.';
      } else if (messageText.toLowerCase().includes('prediction') || messageText.toLowerCase().includes('forecast')) {
        agentResponse = 'Based on historical usage analysis and current consumption trends, our predictive models estimate your next billing cycle at approximately $125, representing an 8% increase attributed to seasonal cooling requirements. Implementing optimized air conditioning scheduling protocols could potentially reduce costs by approximately $12 per month.';
      }

      const agentMessage: ChatMessage = {
        id: Date.now().toString(),
        type: 'agent',
        text: agentResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, agentMessage]);
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (initialMessage && processedMessageRef.current !== initialMessage) {
      processedMessageRef.current = initialMessage;
      sendMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage(input);
    setInput('');
  };

  const suggestions = [
    'Why is my water usage high?',
    'Submit anomaly report',
    'Optimize my electricity',
    'Internet speed test'
  ];

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-slate-900 rounded-xl shadow-2xl flex flex-col border border-white/10 z-50">
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-xl">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-white" />
          <h3 className="font-semibold text-white">AI Agent</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 p-1 rounded transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : 'bg-white/10 text-slate-200 rounded-bl-none border border-white/10 backdrop-blur-sm'
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-emerald-100' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/10 text-slate-200 px-4 py-2 rounded-lg rounded-bl-none border border-white/10 backdrop-blur-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {messages.length === 1 && (
        <div className="px-4 py-3 bg-white/10 border-t border-white/10 backdrop-blur-sm">
          <p className="text-xs text-slate-300 font-medium mb-2">Quick suggestions:</p>
          <div className="space-y-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setInput(suggestion)}
                className="w-full text-left text-xs px-2 py-1 bg-white/10 hover:bg-white/20 text-slate-300 rounded transition flex items-center gap-2 border border-white/10"
              >
                <Lightbulb className="w-3 h-3" />
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-white/10 rounded-b-xl backdrop-blur-sm">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 px-3 py-2 border border-white/20 bg-white/10 text-white placeholder-slate-400 rounded-lg text-sm focus:outline-none focus:border-emerald-500 backdrop-blur-sm"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
