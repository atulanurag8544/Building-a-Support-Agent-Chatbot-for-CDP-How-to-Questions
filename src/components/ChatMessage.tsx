import React, { useEffect, useState } from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { Message } from '../types';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.type === 'bot';
  const [sanitizedContent, setSanitizedContent] = useState<string>('');

  useEffect(() => {
    const processContent = async () => {
      const content = await marked(message.content || '', { breaks: true });
      setSanitizedContent(DOMPurify.sanitize(content));
    };
    processContent();
  }, [message.content]);

  return (
    <div className={`flex gap-3 ${isBot ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
      }`}>
        {isBot ? <Bot size={20} /> : <MessageCircle size={20} />}
      </div>
      <div className="flex-1">
        <div className="font-medium mb-1">{isBot ? 'CDP Assistant' : 'You'}</div>
        <div 
          className="text-gray-700 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: sanitizedContent 
          }}
        />
      </div>
    </div>
  );
};
