import React, { useState } from 'react';
import { Send, Bot, User, Clock, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatLegal: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '¡Hola! Soy tu asistente legal de UMBRA. Estoy disponible 24/7 para ayudarte con consultas legales, análisis de contratos, interpretación de leyes y mucho más. ¿En qué puedo asistirte hoy?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('contrato') || input.includes('contractual')) {
      return 'Entiendo que necesitas ayuda con temas contractuales. Puedo asistirte con:\n\n• Análisis de cláusulas contractuales\n• Identificación de riesgos legales\n• Sugerencias de mejoras\n• Interpretación de términos legales\n\n¿Podrías compartir más detalles sobre el tipo de contrato o la cláusula específica que te preocupa?';
    }
    
    if (input.includes('laboral') || input.includes('trabajo') || input.includes('empleado')) {
      return 'Te puedo ayudar con derecho laboral. Mis especialidades incluyen:\n\n• Contratos de trabajo\n• Despidos y terminaciones\n• Derechos del trabajador\n• Políticas de empresa\n• Acoso laboral\n\n¿Qué situación laboral específica necesitas que analice?';
    }
    
    if (input.includes('penal') || input.includes('delito') || input.includes('criminal')) {
      return 'En materia penal puedo orientarte sobre:\n\n• Tipos de delitos y sus consecuencias\n• Procedimientos penales\n• Derechos del imputado\n• Medidas cautelares\n• Recursos legales disponibles\n\n¿Qué aspecto del derecho penal te interesa conocer?';
    }
    
    if (input.includes('civil') || input.includes('daños') || input.includes('responsabilidad')) {
      return 'En derecho civil puedo asistirte con:\n\n• Responsabilidad civil\n• Contratos civiles\n• Daños y perjuicios\n• Obligaciones y derechos\n• Prescripción de acciones\n\n¿Qué situación civil específica necesitas que revise?';
    }
    
    return 'Gracias por tu consulta. Como asistente legal especializado, puedo ayudarte con una amplia gama de temas legales incluyendo:\n\n• Derecho contractual\n• Derecho laboral\n• Derecho penal\n• Derecho civil\n• Derecho comercial\n• Compliance y regulaciones\n\n¿Podrías ser más específico sobre el tema legal que te interesa? Esto me permitirá brindarte una respuesta más precisa y útil.';
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <MessageSquare className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Chat Legal 24/7</h2>
            <p className="text-blue-200">Asistente legal inteligente siempre disponible</p>
          </div>
          <div className="ml-auto flex items-center space-x-2 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">En línea</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex space-x-3 max-w-3xl ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' ? 'bg-blue-600' : 'bg-purple-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div className={`rounded-lg p-4 ${
                message.sender === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white/20 text-white border border-white/20'
              }`}>
                <p className="whitespace-pre-line">{message.content}</p>
                <div className="flex items-center space-x-1 mt-2 opacity-70">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{formatTime(message.timestamp)}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex space-x-3 max-w-3xl">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white/20 text-white border border-white/20 rounded-lg p-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/20">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu consulta legal aquí..."
            className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <Send className="h-4 w-4" />
            <span>Enviar</span>
          </button>
        </div>
        <p className="text-xs text-blue-200 mt-2">
          💡 Tip: Sé específico en tu consulta para obtener respuestas más precisas
        </p>
      </div>
    </div>
  );
};

export default ChatLegal;