import { useState } from 'react'
import { Send, Code } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const endpoints = [
  { method: 'GET', path: '/v2/users', name: 'Get Users' },
  { method: 'GET', path: '/v2/users/1', name: 'Get User by ID' },
  { method: 'POST', path: '/v2/users', name: 'Create User' },
  { method: 'POST', path: '/v2/auth/login', name: 'Login' },
]

export default function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [response, setResponse] = useState(null)

  const exampleResponses = {
    'GET /v2/users': {
      status: 'success',
      data: {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        ],
        pagination: { total: 2, page: 1, per_page: 10 }
      }
    },
    'GET /v2/users/1': {
      status: 'success',
      data: { id: 1, name: 'John Doe', email: 'john@example.com' }
    },
    'POST /v2/users': {
      status: 'success',
      data: { id: 3, name: 'New User', email: 'new@example.com' }
    },
    'POST /v2/auth/login': {
      status: 'success',
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: { id: 1, email: 'user@example.com' }
      }
    }
  }

  const handleTry = () => {
    const key = `${selectedEndpoint.method} ${selectedEndpoint.path}`
    setResponse(exampleResponses[key])
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Code className="inline-block mr-3 text-blue-600" size={36} />
          API Explorer
        </h1>
        <p className="text-xl text-gray-600">
          Интерактивный инструмент для тестирования API endpoints
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Выберите endpoint</h2>
          <div className="space-y-2">
            {endpoints.map((endpoint, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedEndpoint(endpoint)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  selectedEndpoint === endpoint
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`badge badge-${endpoint.method.toLowerCase()}`}>
                    {endpoint.method}
                  </span>
                  <code className="text-sm">{endpoint.path}</code>
                </div>
                <div className="text-sm text-gray-600 mt-1">{endpoint.name}</div>
              </button>
            ))}
          </div>

          <button
            onClick={handleTry}
            className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Try It Out
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Response</h2>
          {response ? (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Status:</span>
                <span className="badge badge-post">200 OK</span>
              </div>
              <CodeBlock code={JSON.stringify(response, null, 2)} language="json" />
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-500">
                Нажмите "Try It Out" чтобы увидеть ответ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
