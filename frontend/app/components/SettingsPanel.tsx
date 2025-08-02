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
    <div className="card h-full flex flex-col">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {/* API Key */}
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
            OpenAI API Key
          </label>
          <input
            id="apiKey"
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-..."
            className="input-field text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        {/* Model Selection */}
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-2">
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="input-field text-sm"
          >
            {models.map((modelOption) => (
              <option key={modelOption.value} value={modelOption.value}>
                {modelOption.label}
              </option>
            ))}
          </select>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Getting Started</h4>
          <ul className="text-xs text-blue-800 space-y-1">
            <li>• Enter OpenAI API key</li>
            <li>• Customize the system message to define AI behavior</li>
            <li>• Start chatting!</li>
          </ul>
        </div>

        {/* Developer Message */}
        <div>
          <label htmlFor="developerMessage" className="block text-sm font-medium text-gray-700 mb-2">
            System Message
          </label>
          <textarea
            id="developerMessage"
            value={developerMessage}
            onChange={(e) => setDeveloperMessage(e.target.value)}
            placeholder="Enter the system message that defines the AI's behavior..."
            rows={2}
            className="input-field resize-none text-sm"
          />
          <p className="mt-1 text-xs text-gray-500">
            This message defines how the AI assistant should behave and respond.
          </p>
        </div>
        
        {/* Bottom spacing */}
        <div className="h-4"></div>
      </div>
    </div>
  )
} 