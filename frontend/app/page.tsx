'use client'

import { useState, useRef, useEffect } from 'react'
import ChatInterface from './components/ChatInterface'
import SettingsPanel from './components/SettingsPanel'

export default function Home() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [apiKey, setApiKey] = useState('')
  const [developerMessage, setDeveloperMessage] = useState('You are a helpful AI assistant.')
  const [model, setModel] = useState('gpt-4.1-mini')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                AI Engineer Challenge
              </h1>
            </div>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="btn-secondary"
            >
              Settings
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Panel */}
          {isSettingsOpen && (
            <div className="lg:col-span-1">
              <SettingsPanel
                apiKey={apiKey}
                setApiKey={setApiKey}
                developerMessage={developerMessage}
                setDeveloperMessage={setDeveloperMessage}
                model={model}
                setModel={setModel}
                onClose={() => setIsSettingsOpen(false)}
              />
            </div>
          )}

          {/* Chat Interface */}
          <div className={`${isSettingsOpen ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            <ChatInterface
              apiKey={apiKey}
              developerMessage={developerMessage}
              model={model}
            />
          </div>
        </div>
      </main>
    </div>
  )
} 