import { Key, ShieldCheck, AlertCircle } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

export default function ApiKeys() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Key className="inline-block mr-3 text-blue-600" size={36} />
          API Keys
        </h1>
        <p className="text-xl text-gray-600">
          Управление ключами доступа для безопасной интеграции с DataAPI
        </p>
      </div>

      <div className="alert alert-info">
        <div className="flex items-start">
          <ShieldCheck className="mr-3 mt-1 flex-shrink-0" size={20} />
          <div>
            API Keys — это альтернативный способ аутентификации, идеально подходящий для server-to-server интеграций, где использование JWT токенов может быть неудобным.
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Что такое API Key?</h2>
        <p className="text-gray-600 mb-4">
          API Key — это уникальный идентификатор, который используется для аутентификации приложения или пользователя при обращении к API. В отличие от JWT токенов, API ключи не имеют срока действия и остаются валидными до тех пор, пока не будут отозваны.
        </p>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Преимущества API Keys:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Простая интеграция для server-side приложений</li>
            <li>✓ Не требуют обновления (в отличие от JWT)</li>
            <li>✓ Можно создавать несколько ключей для разных приложений</li>
            <li>✓ Легко отзывать и управлять доступом</li>
            <li>✓ Возможность ограничения прав доступа для каждого ключа</li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Создание API Key</h2>
        <p className="text-gray-600 mb-4">
          Создайте новый API ключ через endpoint:
        </p>

        <CodeBlock 
          code={`POST /v2/api-keys
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "My Production App",
  "description": "API key for production server",
  "permissions": ["users.read", "users.write", "data.read", "data.write"],
  "expires_at": null
}`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Ответ:</h3>
        <CodeBlock 
          code={`{
  "status": "success",
  "data": {
    "id": "key_abc123xyz789",
    "name": "My Production App",
    "api_key": "dataapi_live_1234567890abcdefghijklmnopqrstuv",
    "description": "API key for production server",
    "permissions": ["users.read", "users.write", "data.read", "data.write"],
    "created_at": "2025-11-11T12:00:00Z",
    "last_used_at": null,
    "expires_at": null
  }
}`}
          language="json"
        />

        <div className="alert alert-warning mt-4">
          <div className="flex items-start">
            <AlertCircle className="mr-3 mt-1 " size={20} />
            <div>
              <strong>Важно!</strong> API ключ показывается только один раз при создании. Сохраните его в безопасном месте. Если вы потеряете ключ, придется создать новый.
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Использование API Key</h2>
        <p className="text-gray-600 mb-4">
          Передавайте API ключ в заголовке <code>X-API-Key</code> каждого запроса:
        </p>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">cURL:</h3>
        <CodeBlock 
          code={`curl -X GET "https://api.dataapi.com/v2/users" \\
  -H "X-API-Key: dataapi_live_1234567890abcdefghijklmnopqrstuv" \\
  -H "Content-Type: application/json"`}
          language="bash"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">JavaScript:</h3>
        <CodeBlock 
          code={`fetch('https://api.dataapi.com/v2/users', {
  method: 'GET',
  headers: {
    'X-API-Key': 'dataapi_live_1234567890abcdefghijklmnopqrstuv',
    'Content-Type': 'application/json'
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`}
          language="javascript"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Python:</h3>
        <CodeBlock 
          code={`import requests

headers = {
    'X-API-Key': 'dataapi_live_1234567890abcdefghijklmnopqrstuv',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.dataapi.com/v2/users', headers=headers)
data = response.json()
print(data)`}
          language="python"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Node.js (Axios):</h3>
        <CodeBlock 
          code={`const axios = require('axios');

const config = {
  headers: {
    'X-API-Key': 'dataapi_live_1234567890abcdefghijklmnopqrstuv',
    'Content-Type': 'application/json'
  }
};

axios.get('https://api.dataapi.com/v2/users', config)
  .then(response => console.log(response.data))
  .catch(error => console.error('Error:', error));`}
          language="javascript"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Управление API Keys</h2>

        <h3 className="text-lg font-semibold text-gray-900 mb-3">Получить список всех ключей:</h3>
        <CodeBlock 
          code={`GET /v2/api-keys
Authorization: Bearer YOUR_JWT_TOKEN`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Удалить API ключ:</h3>
        <CodeBlock 
          code={`DELETE /v2/api-keys/{key_id}
Authorization: Bearer YOUR_JWT_TOKEN`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Обновить API ключ (изменить права):</h3>
        <CodeBlock 
          code={`PATCH /v2/api-keys/{key_id}
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "name": "Updated App Name",
  "permissions": ["users.read", "data.read"]
}`}
          language="http"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Типы ключей</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              <code>dataapi_test_*</code> — Test Keys
            </h3>
            <p className="text-sm text-blue-800">
              Используются для разработки и тестирования. Работают только с тестовым окружением API.
            </p>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-green-900 mb-2">
              <code>dataapi_live_*</code> — Live Keys
            </h3>
            <p className="text-sm text-green-800">
              Используются в production окружении. Работают с реальными данными и подлежат rate limiting.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Права доступа (Permissions)</h2>
        <p className="text-gray-600 mb-4">
          При создании API ключа можно указать конкретные разрешения:
        </p>

        <table>
          <thead>
            <tr>
              <th>Permission</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>users.read</code></td>
              <td>Чтение данных пользователей</td>
            </tr>
            <tr>
              <td><code>users.write</code></td>
              <td>Создание и изменение пользователей</td>
            </tr>
            <tr>
              <td><code>users.delete</code></td>
              <td>Удаление пользователей</td>
            </tr>
            <tr>
              <td><code>data.read</code></td>
              <td>Чтение данных</td>
            </tr>
            <tr>
              <td><code>data.write</code></td>
              <td>Создание и изменение данных</td>
            </tr>
            <tr>
              <td><code>data.delete</code></td>
              <td>Удаление данных</td>
            </tr>
            <tr>
              <td><code>admin.*</code></td>
              <td>Полный доступ ко всем ресурсам</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Лучшие практики безопасности</h2>
        <div className="space-y-4">
          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-green-900 mb-2">✓ Рекомендуется</h3>
            <ul className="space-y-1 text-sm text-green-800">
              <li>• Храните ключи в переменных окружения или секрет-менеджерах</li>
              <li>• Используйте разные ключи для разных приложений</li>
              <li>• Регулярно ротируйте ключи</li>
              <li>• Назначайте минимально необходимые права</li>
              <li>• Отзывайте неиспользуемые ключи</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <h3 className="font-semibold text-red-900 mb-2">✗ Не рекомендуется</h3>
            <ul className="space-y-1 text-sm text-red-800">
              <li>• Хранить ключи в коде или коммитить в Git</li>
              <li>• Использовать один ключ для всех приложений</li>
              <li>• Передавать ключи в URL параметрах</li>
              <li>• Использовать production ключи в разработке</li>
              <li>• Давать полные права всем ключам</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
