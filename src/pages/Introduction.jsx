import { ArrowRight, CheckCircle, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export default function Introduction() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Добро пожаловать в DataAPI
        </h1>
        <p className="text-xl text-gray-600">
          Мощный RESTful API для управления данными с полной документацией
        </p>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
        <div className="flex items-start">
          <Zap className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Быстрый старт
            </h3>
            <p className="text-blue-800">
              DataAPI предоставляет простой и безопасный способ работы с вашими данными через HTTP запросы.
              Все endpoints поддерживают JSON и XML форматы.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Основные возможности</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'JWT Аутентификация', desc: 'Безопасная аутентификация с помощью JSON Web Tokens' },
            { title: 'CRUD операции', desc: 'Полный набор операций для работы с данными' },
            { title: 'Rate Limiting', desc: 'Защита от злоупотреблений с гибкими лимитами' },
            { title: 'API Keys', desc: 'Простое управление ключами доступа' },
            { title: 'Версионирование', desc: 'Поддержка нескольких версий API' },
            { title: 'JSON/XML', desc: 'Гибкие форматы ответов' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Базовый URL</h2>
        <CodeBlock 
          code={API_BASE_URL}
          language="text"
        />
        <p className="text-gray-600 mt-2">
          Все API запросы должны быть направлены на этот базовый URL с добавлением нужного endpoint.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Пример запроса</h2>
        <CodeBlock 
          code={`curl -X GET "${API_BASE_URL}/v2/users" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`}
          language="bash"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Пример ответа</h2>
        <CodeBlock 
          code={`{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "per_page": 10
    }
  },
  "timestamp": "2025-11-11T12:00:00Z"
}`}
          language="json"
        />
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Следующие шаги</h3>
        <div className="space-y-3">
          <Link to="/authentication" className="flex items-center text-blue-600 hover:text-blue-800 group">
            <ArrowRight size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
            Начните с настройки аутентификации
          </Link>
          <Link to="/endpoints" className="flex items-center text-blue-600 hover:text-blue-800 group">
            <ArrowRight size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
            Изучите доступные API endpoints
          </Link>
          <Link to="/explorer" className="flex items-center text-blue-600 hover:text-blue-800 group">
            <ArrowRight size={20} className="mr-2 group-hover:translate-x-1 transition-transform" />
            Попробуйте API Explorer
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Нужна помощь?</h3>
        <p className="text-gray-600">
          Если у вас возникли вопросы, обратитесь к нашей документации или свяжитесь с поддержкой:
          <a href="mailto:support@dataapi.com" className="text-blue-600 hover:underline ml-1">
            support@dataapi.com
          </a>
        </p>
      </div>
    </div>
  )
}

