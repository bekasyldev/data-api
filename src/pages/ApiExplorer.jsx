import { useState } from 'react'
import { Send, Code, AlertCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'
import { usersAPI, authAPI, getToken } from '../api/api'

const endpoints = [
  { method: 'GET', path: '/v2/users', name: 'Get Users', needsAuth: true },
  { method: 'GET', path: '/v2/users/1', name: 'Get User by ID', needsAuth: true },
  { method: 'POST', path: '/v2/auth/login', name: 'Login', needsAuth: false },
  { method: 'POST', path: '/v2/auth/register', name: 'Register', needsAuth: false },
]

export default function ApiExplorer() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(endpoints[0])
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [requestBody, setRequestBody] = useState('')

  const getDefaultBody = (endpoint) => {
    if (endpoint.path === '/v2/auth/login') {
      return JSON.stringify({ email: 'user@example.com', password: 'user123' }, null, 2)
    }
    if (endpoint.path === '/v2/auth/register') {
      return JSON.stringify({
        name: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }, null, 2)
    }
    return ''
  }

  const handleEndpointChange = (endpoint) => {
    setSelectedEndpoint(endpoint)
    setRequestBody(getDefaultBody(endpoint))
    setResponse(null)
    setError(null)
  }

  const handleTry = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      let result;

      // Check if authentication is needed
      if (selectedEndpoint.needsAuth && !getToken()) {
        throw new Error('Please login first to access this endpoint')
      }

      switch (selectedEndpoint.path) {
        case '/v2/users':
          result = await usersAPI.getAll({ page: 1, per_page: 10 })
          break
        
        case '/v2/users/1':
          result = await usersAPI.getById(1)
          break
        
        case '/v2/auth/login': {
          const loginData = JSON.parse(requestBody)
          result = await authAPI.login(loginData.email, loginData.password)
          break
        }
        
        case '/v2/auth/register': {
          const registerData = JSON.parse(requestBody)
          result = await authAPI.register(
            registerData.name,
            registerData.email,
            registerData.password,
            registerData.password_confirmation
          )
          break
        }
        
        default:
          throw new Error('Endpoint not implemented')
      }

      setResponse(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
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

      {!getToken() && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-start">
            <AlertCircle className="text-yellow-500 mr-3 mt-0.5" size={20} />
            <div>
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> You need to login first to test authenticated endpoints. 
                Try the Login endpoint with: <code className="bg-yellow-100 px-1 rounded">user@example.com</code> / <code className="bg-yellow-100 px-1 rounded">user123</code>
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Выберите endpoint</h2>
          <div className="space-y-2">
            {endpoints.map((endpoint, idx) => (
              <button
                key={idx}
                onClick={() => handleEndpointChange(endpoint)}
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
                  {endpoint.needsAuth && (
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                      🔒 Auth
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mt-1">{endpoint.name}</div>
              </button>
            ))}
          </div>

          {requestBody && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Request Body:</h3>
              <textarea
                value={requestBody}
                onChange={(e) => setRequestBody(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg font-mono text-sm"
                rows={8}
              />
            </div>
          )}

          <button
            onClick={handleTry}
            disabled={loading}
            className="w-full mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
            {loading ? 'Loading...' : 'Try It Out'}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Response</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={20} />
                <div>
                  <p className="text-sm font-semibold text-red-800">Error</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          {response ? (
            <div>
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">Status:</span>
                <span className="badge badge-post">200 OK</span>
              </div>
              <CodeBlock code={JSON.stringify(response, null, 2)} language="json" />
            </div>
          ) : !error && (
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
