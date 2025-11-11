import { Hash, TrendingUp, Clock } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

export default function RateLimiting() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <Hash className="inline-block mr-3 text-blue-600" size={36} />
          Rate Limiting
        </h1>
        <p className="text-xl text-gray-600">
          Защита API от злоупотреблений и обеспечение стабильной работы для всех пользователей
        </p>
      </div>

      <div className="alert alert-info">
        DataAPI использует rate limiting для ограничения количества запросов, которые может сделать клиент за определенный период времени.
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Лимиты по тарифам</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Free</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">100</div>
            <p className="text-gray-600">запросов в час</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>• Базовые endpoints</li>
              <li>• Задержка 1 сек между запросами</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-500 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
            <div className="text-3xl font-bold text-blue-600 mb-2">1,000</div>
            <p className="text-gray-600">запросов в час</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Все endpoints</li>
              <li>• Burst до 50 запросов</li>
              <li>• Приоритетная поддержка</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-500 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <p className="text-gray-600">индивидуальные лимиты</p>
            <ul className="mt-4 space-y-2 text-sm text-gray-700">
              <li>• Настраиваемые лимиты</li>
              <li>• Dedicated infrastructure</li>
              <li>• SLA 99.9%</li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <TrendingUp className="inline-block mr-2" size={24} />
          Заголовки Rate Limit
        </h2>
        <p className="text-gray-600 mb-4">
          Каждый ответ API включает заголовки с информацией о текущем состоянии лимитов:
        </p>

        <table>
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Описание</th>
              <th>Пример</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>X-RateLimit-Limit</code></td>
              <td>Максимальное количество запросов в час</td>
              <td>1000</td>
            </tr>
            <tr>
              <td><code>X-RateLimit-Remaining</code></td>
              <td>Оставшееся количество запросов</td>
              <td>950</td>
            </tr>
            <tr>
              <td><code>X-RateLimit-Reset</code></td>
              <td>Время сброса лимита (Unix timestamp)</td>
              <td>1699876800</td>
            </tr>
            <tr>
              <td><code>X-RateLimit-Used</code></td>
              <td>Использовано запросов в текущем окне</td>
              <td>50</td>
            </tr>
          </tbody>
        </table>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Пример ответа с заголовками:</h3>
        <CodeBlock 
          code={`HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 950
X-RateLimit-Reset: 1699876800
X-RateLimit-Used: 50

{
  "status": "success",
  "data": { ... }
}`}
          language="http"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          <Clock className="inline-block mr-2" size={24} />
          Превышение лимита
        </h2>
        <p className="text-gray-600 mb-4">
          Когда вы превышаете лимит запросов, API возвращает статус <code>429 Too Many Requests</code>:
        </p>

        <CodeBlock 
          code={`HTTP/1.1 429 Too Many Requests
Content-Type: application/json
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1699876800
Retry-After: 3600

{
  "status": "error",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again later.",
    "retry_after": 3600
  }
}`}
          language="http"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Лучшие практики</h2>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <div>
                <strong>Кэшируйте ответы</strong> — сохраняйте полученные данные локально, чтобы уменьшить количество запросов
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <div>
                <strong>Проверяйте заголовки</strong> — отслеживайте X-RateLimit-Remaining для предотвращения превышения лимита
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <div>
                <strong>Используйте exponential backoff</strong> — при получении 429 ошибки увеличивайте время ожидания между повторными попытками
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <div>
                <strong>Batch запросы</strong> — группируйте несколько операций в один запрос, где это возможно
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 font-bold mr-3">✓</span>
              <div>
                <strong>Webhooks вместо polling</strong> — используйте webhooks для получения обновлений вместо частых опросов API
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Пример обработки rate limiting</h2>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3">JavaScript:</h3>
        <CodeBlock 
          code={`async function apiRequestWithRetry(url, options = {}, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After') || 60;
      console.log(\`Rate limited. Retrying after \${retryAfter} seconds...\`);
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
      continue;
    }
    
    return response;
  }
  
  throw new Error('Max retries exceeded');
}

// Использование
try {
  const response = await apiRequestWithRetry('https://api.dataapi.com/v2/users', {
    headers: {
      'Authorization': 'Bearer YOUR_TOKEN'
    }
  });
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Request failed:', error);
}`}
          language="javascript"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Python:</h3>
        <CodeBlock 
          code={`import requests
import time

def api_request_with_retry(url, headers=None, max_retries=3):
    for i in range(max_retries):
        response = requests.get(url, headers=headers)
        
        if response.status_code == 429:
            retry_after = int(response.headers.get('Retry-After', 60))
            print(f"Rate limited. Retrying after {retry_after} seconds...")
            time.sleep(retry_after)
            continue
        
        return response
    
    raise Exception('Max retries exceeded')

# Использование
headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = api_request_with_retry('https://api.dataapi.com/v2/users', headers=headers)
data = response.json()
print(data)`}
          language="python"
        />
      </div>
    </div>
  )
}
