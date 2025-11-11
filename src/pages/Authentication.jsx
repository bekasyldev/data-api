import { Lock, ShieldCheck, AlertTriangle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

export default function Authentication() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Lock className="inline-block mr-3 text-blue-600" size={36} />
          Аутентификация
        </h1>
        <p className="text-xl text-gray-600">
          DataAPI использует JWT (JSON Web Tokens) для безопасной аутентификации пользователей
        </p>
      </div>

      <div className="alert alert-info">
        <div className="flex items-start">
          <ShieldCheck className="mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <strong>Безопасность:</strong> Все запросы к защищенным endpoints должны включать валидный JWT токен в заголовке Authorization.
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Получение токена</h2>
        <p className="text-gray-600 mb-4">
          Чтобы получить JWT токен, отправьте POST запрос на endpoint аутентификации с вашими учетными данными:
        </p>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Запрос:</h3>
        <CodeBlock 
          code={`POST /v2/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_secure_password"
}`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Ответ:</h3>
        <CodeBlock 
          code={`{
            "status": "success",
            "data": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "expires_in": 3600,
                "token_type": "Bearer",
                "user": {
                "id": 123,
                "email": "user@example.com",
                "name": "John Doe"
                }
            }
            }`}
                    language="json"
                    />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Использование токена</h2>
        <p className="text-gray-600 mb-4">
          Включите полученный токен в заголовок Authorization каждого защищенного запроса:
        </p>
        
        <CodeBlock 
          code={`GET /v2/users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Пример с cURL:</h3>
        <CodeBlock 
          code={`curl -X GET "https://api.dataapi.com/v2/users" \\
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \\
  -H "Content-Type: application/json"`}
          language="bash"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Пример с JavaScript:</h3>
        <CodeBlock 
          code={`fetch('https://api.dataapi.com/v2/users', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Пример с Python:</h3>
        <CodeBlock 
          code={`import requests

headers = {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.dataapi.com/v2/users', headers=headers)
data = response.json()
print(data)`}
          language="python"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Обновление токена</h2>
        <p className="text-gray-600 mb-4">
          Токены имеют ограниченный срок действия (обычно 1 час). Используйте refresh token для получения нового токена:
        </p>
        
        <CodeBlock 
          code={`POST /v2/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Ответ:</h3>
        <CodeBlock 
          code={`{
  "status": "success",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_in": 3600
  }
}`}
          language="json"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Регистрация нового пользователя</h2>
        
        <CodeBlock 
          code={`POST /v2/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secure_password_123",
  "password_confirmation": "secure_password_123"
}`}
          language="http"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Выход из системы</h2>
        <p className="text-gray-600 mb-4">
          Для инвалидации токена используйте endpoint logout:
        </p>
        
        <CodeBlock 
          code={`POST /v2/auth/logout
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json`}
          language="http"
        />
      </div>

      <div className="alert alert-warning">
        <div className="flex items-start">
          <AlertTriangle className="mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            <strong>Важно:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Никогда не передавайте токены в URL параметрах</li>
              <li>Храните токены безопасно (например, в httpOnly cookies)</li>
              <li>Используйте HTTPS для всех запросов</li>
              <li>Регулярно обновляйте токены используя refresh token</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Коды ошибок аутентификации</h2>
        <table>
          <thead>
            <tr>
              <th>Код</th>
              <th>Описание</th>
              <th>Решение</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>401</code></td>
              <td>Unauthorized - Токен отсутствует или недействителен</td>
              <td>Проверьте токен или войдите заново</td>
            </tr>
            <tr>
              <td><code>403</code></td>
              <td>Forbidden - Недостаточно прав</td>
              <td>Проверьте права доступа пользователя</td>
            </tr>
            <tr>
              <td><code>422</code></td>
              <td>Validation Error - Неверные данные</td>
              <td>Проверьте формат отправляемых данных</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
