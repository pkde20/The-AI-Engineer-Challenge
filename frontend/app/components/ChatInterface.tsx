'use client'

import { useState, useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatInterfaceProps {
  apiKey: string
  developerMessage: string
  model: string
}

export default function ChatInterface({ apiKey, developerMessage, model }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get the backend URL from environment variable or fallback to localhost
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Check backend status on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch(`${backendUrl}/health`, { 
          method: 'GET',
          signal: AbortSignal.timeout(3000) // 3 second timeout
        })
        if (response.ok) {
          setBackendStatus('online')
        } else {
          setBackendStatus('offline')
        }
      } catch (err) {
        setBackendStatus('offline')
      }
    }
    
    checkBackendStatus()
  }, [backendUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputMessage.trim() || !apiKey.trim()) {
      if (!apiKey.trim()) {
        setError('Please enter your OpenAI API key in the settings.')
      }
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: developerMessage,
          user_message: inputMessage,
          model: model,
          api_key: apiKey
        }),
      })

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Backend server error. Please make sure the FastAPI backend is running.')
        } else if (response.status === 404) {
          throw new Error('API endpoint not found. Please check if the backend is running correctly.')
        } else {
          throw new Error(`Server error (${response.status}). Please try again or check if the backend is running.`)
        }
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: '',
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

      const decoder = new TextDecoder()
      let accumulatedContent = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        const chunk = decoder.decode(value)
        accumulatedContent += chunk

        setMessages(prev => 
          prev.map(msg => 
            msg.id === assistantMessage.id 
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        )
      }

    } catch (err) {
      console.error('Error:', err)
      if (err instanceof Error) {
        if (err.message.includes('ECONNREFUSED') || err.message.includes('Failed to fetch')) {
          setError('Cannot connect to backend server. Please make sure the FastAPI backend is running on port 8000.')
        } else {
          setError(err.message)
        }
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
  }

  return (
    <div className="card h-[calc(100vh-12rem)] flex flex-col">
      {/* Chat Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h2 className="text-lg font-semibold text-gray-900">Chat with AI</h2>
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${
              backendStatus === 'online' ? 'bg-green-500' : 
              backendStatus === 'offline' ? 'bg-red-500' : 'bg-yellow-500'
            }`}></div>
            <span className={`text-xs ${
              backendStatus === 'online' ? 'text-green-600' : 
              backendStatus === 'offline' ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {backendStatus === 'online' ? 'Backend Online' : 
               backendStatus === 'offline' ? 'Backend Offline' : 'Checking...'}
            </span>
          </div>
        </div>
        <button
          onClick={clearChat}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Clear Chat
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Start a conversation with the AI assistant!</p>
            <p className="text-sm mt-2">Make sure to set your API key in the settings.</p>
            <p className="text-sm mt-1">💡 <strong>Tip:</strong> The backend needs to be running for chat to work. Start it with: <code className="bg-gray-100 px-1 rounded">cd ../api && python app.py</code></p>
          </div>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))
        )}
        
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={backendStatus === 'offline' ? 'Backend offline - cannot send messages' : 'Type your message...'}
            className="input-field flex-1"
            disabled={isLoading || !apiKey.trim() || backendStatus === 'offline'}
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim() || !apiKey.trim() || backendStatus === 'offline'}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Sending...' : backendStatus === 'offline' ? 'Backend Offline' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
} 