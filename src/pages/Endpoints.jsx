import { Zap } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

const endpoints = [
  {
    method: 'GET',
    path: '/v2/users',
    description: 'Получить список всех пользователей',
    params: [
      { name: 'page', type: 'integer', description: 'Номер страницы (по умолчанию: 1)' },
      { name: 'per_page', type: 'integer', description: 'Количество элементов на странице (по умолчанию: 10)' },
      { name: 'sort', type: 'string', description: 'Поле для сортировки (created_at, name, email)' },
      { name: 'order', type: 'string', description: 'Порядок сортировки (asc, desc)' },
    ],
    response: `{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2025-01-15T10:30:00Z",
        "updated_at": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "per_page": 10,
      "total_pages": 10
    }
  }
}`
  },
  {
    method: 'GET',
    path: '/v2/users/{id}',
    description: 'Получить пользователя по ID',
    params: [
      { name: 'id', type: 'integer', description: 'ID пользователя', required: true },
    ],
    response: `{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-01-15T10:30:00Z",
    "updated_at": "2025-01-15T10:30:00Z"
  }
}`
  },
  {
    method: 'POST',
    path: '/v2/users',
    description: 'Создать нового пользователя',
    body: `{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "secure_password"
}`,
    response: `{
  "status": "success",
  "data": {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane@example.com",
    "created_at": "2025-11-11T12:00:00Z",
    "updated_at": "2025-11-11T12:00:00Z"
  }
}`
  },
  {
    method: 'PUT',
    path: '/v2/users/{id}',
    description: 'Обновить пользователя (полное обновление)',
    params: [
      { name: 'id', type: 'integer', description: 'ID пользователя', required: true },
    ],
    body: `{
  "name": "John Updated",
  "email": "john.updated@example.com"
}`,
    response: `{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "updated_at": "2025-11-11T12:30:00Z"
  }
}`
  },
  {
    method: 'PATCH',
    path: '/v2/users/{id}',
    description: 'Частично обновить пользователя',
    params: [
      { name: 'id', type: 'integer', description: 'ID пользователя', required: true },
    ],
    body: `{
  "name": "John Patched"
}`,
    response: `{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Patched",
    "email": "john@example.com",
    "updated_at": "2025-11-11T12:45:00Z"
  }
}`
  },
  {
    method: 'DELETE',
    path: '/v2/users/{id}',
    description: 'Удалить пользователя',
    params: [
      { name: 'id', type: 'integer', description: 'ID пользователя', required: true },
    ],
    response: `{
  "status": "success",
  "message": "User deleted successfully"
}`
  },
]

const dataEndpoints = [
  {
    method: 'GET',
    path: '/v2/data',
    description: 'Получить все записи данных',
  },
  {
    method: 'GET',
    path: '/v2/data/{id}',
    description: 'Получить запись данных по ID',
  },
  {
    method: 'POST',
    path: '/v2/data',
    description: 'Создать новую запись данных',
  },
  {
    method: 'PUT',
    path: '/v2/data/{id}',
    description: 'Обновить запись данных',
  },
  {
    method: 'DELETE',
    path: '/v2/data/{id}',
    description: 'Удалить запись данных',
  },
]

function MethodBadge({ method }) {
  const colors = {
    GET: 'badge-get',
    POST: 'badge-post',
    PUT: 'badge-put',
    PATCH: 'badge-patch',
    DELETE: 'badge-delete',
  }
  
  return <span className={`badge ${colors[method]}`}>{method}</span>
}

export default function Endpoints() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Zap className="inline-block mr-3 text-blue-600" size={36} />
          API Endpoints
        </h1>
        <p className="text-xl text-gray-600">
          Полный список доступных API endpoints для работы с данными
        </p>
      </div>

      <div className="alert alert-info">
        <strong>Базовый URL:</strong> <code>https://api.dataapi.com/v2</code>
        <br />
        Все endpoints требуют аутентификации через JWT токен, если не указано иное.
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Users Endpoints</h2>
        <p className="text-gray-600 mb-6">
          Endpoints для управления пользователями системы
        </p>

        <div className="space-y-8">
          {endpoints.map((endpoint, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <MethodBadge method={endpoint.method} />
                <code className="text-lg font-mono">{endpoint.path}</code>
              </div>
              
              <p className="text-gray-700 mb-4">{endpoint.description}</p>

              {endpoint.params && endpoint.params.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Параметры:</h4>
                  <table className="text-sm">
                    <thead>
                      <tr>
                        <th>Параметр</th>
                        <th>Тип</th>
                        <th>Обязательный</th>
                        <th>Описание</th>
                      </tr>
                    </thead>
                    <tbody>
                      {endpoint.params.map((param, pidx) => (
                        <tr key={pidx}>
                          <td><code>{param.name}</code></td>
                          <td><code>{param.type}</code></td>
                          <td>{param.required ? '✓' : '—'}</td>
                          <td>{param.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {endpoint.body && (
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Тело запроса:</h4>
                  <CodeBlock code={endpoint.body} language="json" />
                </div>
              )}

              {endpoint.response && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Пример ответа:</h4>
                  <CodeBlock code={endpoint.response} language="json" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Endpoints</h2>
        <p className="text-gray-600 mb-6">
          Endpoints для управления основными данными
        </p>

        <div className="space-y-4">
          {dataEndpoints.map((endpoint, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <MethodBadge method={endpoint.method} />
                <code className="font-mono flex-1">{endpoint.path}</code>
                <span className="text-sm text-gray-600">{endpoint.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Общие коды ответов</h2>
        <table>
          <thead>
            <tr>
              <th>Код</th>
              <th>Статус</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>200</code></td>
              <td>OK</td>
              <td>Успешный запрос</td>
            </tr>
            <tr>
              <td><code>201</code></td>
              <td>Created</td>
              <td>Ресурс успешно создан</td>
            </tr>
            <tr>
              <td><code>204</code></td>
              <td>No Content</td>
              <td>Успешный запрос без содержимого</td>
            </tr>
            <tr>
              <td><code>400</code></td>
              <td>Bad Request</td>
              <td>Неверный запрос</td>
            </tr>
            <tr>
              <td><code>401</code></td>
              <td>Unauthorized</td>
              <td>Требуется аутентификация</td>
            </tr>
            <tr>
              <td><code>403</code></td>
              <td>Forbidden</td>
              <td>Доступ запрещен</td>
            </tr>
            <tr>
              <td><code>404</code></td>
              <td>Not Found</td>
              <td>Ресурс не найден</td>
            </tr>
            <tr>
              <td><code>422</code></td>
              <td>Unprocessable Entity</td>
              <td>Ошибка валидации</td>
            </tr>
            <tr>
              <td><code>429</code></td>
              <td>Too Many Requests</td>
              <td>Превышен лимит запросов</td>
            </tr>
            <tr>
              <td><code>500</code></td>
              <td>Internal Server Error</td>
              <td>Внутренняя ошибка сервера</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
