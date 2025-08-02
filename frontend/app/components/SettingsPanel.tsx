interface SettingsPanelProps {
  apiKey: string
  setApiKey: (key: string) => void
  developerMessage: string
  setDeveloperMessage: (message: string) => void
  model: string
  setModel: (model: string) => void
  onClose: () => void
}

export default function SettingsPanel({
  apiKey,
  setApiKey,
  developerMessage,
  setDeveloperMessage,
  model,
  setModel,
  onClose
}: SettingsPanelProps) {
  const models = [
    { value: 'gpt-4.1-mini', label: 'GPT-4.1 Mini' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  ]

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* API Key */}
        <div className="space-y-2">
          <label htmlFor="apiKey" className="block text-sm font-semibold text-gray-900">
            Set OpenAI API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
          />
          <p className="text-xs text-gray-500">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        {/* Model Selection */}
        <div className="space-y-2">
          <label htmlFor="model" className="block text-sm font-semibold text-gray-900">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm bg-white"
          >
            {models.map((modelOption) => (
              <option key={modelOption.value} value={modelOption.value}>
                {modelOption.label}
              </option>
            ))}
          </select>
        </div>



        {/* Developer Message */}
        <div className="space-y-2">
          <label htmlFor="developerMessage" className="block text-sm font-semibold text-gray-900">
            Provide System Message
          </label>
          <textarea
            id="developerMessage"
            value={developerMessage}
            onChange={(e) => setDeveloperMessage(e.target.value)}
            placeholder="Enter the system message that defines the AI's behavior..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm resize-none"
          />
          <p className="text-xs text-gray-500">
            This message defines how the AI assistant should behave and respond.
          </p>
        </div>
        
        </div>
      </div>
    </div>
  )
} 