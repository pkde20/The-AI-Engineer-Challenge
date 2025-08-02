interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface MessageBubbleProps {
  message: Message
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  
  return (
    <div className={`message-bubble ${isUser ? 'user-message' : 'assistant-message'}`}>
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          isUser 
            ? 'bg-primary-600 text-white' 
            : 'bg-gray-600 text-white'
        }`}>
          {isUser ? 'U' : 'AI'}
        </div>
        
        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-700">
              {isUser ? 'You' : 'AI Assistant'}
            </span>
            <span className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString()}
            </span>
          </div>
          
          <div className="text-gray-900 whitespace-pre-wrap break-words">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  )
} 