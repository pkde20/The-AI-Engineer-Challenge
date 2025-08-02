export default function TypingIndicator() {
  return (
    <div className="message-bubble assistant-message">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-medium">
          AI
        </div>
        
        {/* Typing Indicator */}
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-sm font-medium text-gray-700">AI Assistant</span>
            <span className="text-xs text-gray-500">typing...</span>
          </div>
          
          <div className="typing-indicator">
            <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
            <div className="typing-dot" style={{ animationDelay: '150ms' }}></div>
            <div className="typing-dot" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
} 