# AI Engineer Challenge Frontend

A modern, responsive chat interface built with Next.js and Tailwind CSS that integrates with the FastAPI backend for AI-powered conversations.

## Features

- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 💬 **Real-time Chat**: Streaming responses from OpenAI models
- ⚙️ **Configurable Settings**: API key, model selection, and system messages
- 🔒 **Secure**: Password-style input for API keys
- 📱 **Responsive**: Works on desktop and mobile devices
- 🚀 **Vercel Ready**: Optimized for deployment on Vercel

## Prerequisites

- Node.js 18+ and npm
- OpenAI API key
- FastAPI backend running (see `/api` directory)

## Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Configure Settings:**
   - Click the "Settings" button in the top-right corner
   - Enter your OpenAI API key (get one from [OpenAI Platform](https://platform.openai.com/api-keys))
   - Select your preferred model (GPT-4.1 Mini, GPT-4o Mini, or GPT-3.5 Turbo)
   - Customize the system message to define AI behavior

2. **Start Chatting:**
   - Type your message in the input field
   - Press Enter or click "Send"
   - Watch the AI response stream in real-time

3. **Clear Chat:**
   - Click "Clear Chat" to start a new conversation

## Development

- **Build for production:**
  ```bash
  npm run build
  ```

- **Start production server:**
  ```bash
  npm start
  ```

- **Lint code:**
  ```bash
  npm run lint
  ```

## Backend Integration

This frontend connects to the FastAPI backend running on `http://localhost:8000`. Make sure to:

1. Start the backend server (see `/api/README.md`)
2. The frontend will automatically proxy API requests to the backend

## Deployment

### Local Testing
1. Start the backend: `cd api && python app.py`
2. Start the frontend: `cd frontend && npm run dev`
3. Open http://localhost:3000

### Vercel Deployment
1. Install Vercel CLI: `npm install -g vercel`
2. Deploy: `vercel`
3. Follow the prompts to connect your repository

## Project Structure

```
frontend/
├── app/
│   ├── components/
│   │   ├── ChatInterface.tsx    # Main chat component
│   │   ├── MessageBubble.tsx    # Individual message display
│   │   ├── SettingsPanel.tsx    # Configuration panel
│   │   └── TypingIndicator.tsx  # Loading animation
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Main page
├── package.json                 # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── tsconfig.json               # TypeScript configuration
```

## Troubleshooting

- **API Key Issues**: Make sure your OpenAI API key is valid and has sufficient credits
- **Backend Connection**: Ensure the FastAPI server is running on port 8000
- **CORS Errors**: The backend is configured to allow all origins for development
- **Build Errors**: Check that all dependencies are installed with `npm install`

## Contributing

1. Follow the existing code style
2. Add proper TypeScript types
3. Test your changes locally
4. Update documentation as needed