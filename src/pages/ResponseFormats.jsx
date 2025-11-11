import { FileJson } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

export default function ResponseFormats() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <FileJson className="inline-block mr-3 text-blue-600" size={36} />
          Форматы ответов
        </h1>
        <p className="text-xl text-gray-600">
          DataAPI поддерживает JSON и XML форматы для ответов
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON (по умолчанию)</h2>
        <p className="text-gray-600 mb-4">
          JSON является форматом по умолчанию. Укажите заголовок:
        </p>

        <CodeBlock 
          code={`GET /v2/users
Accept: application/json
Authorization: Bearer YOUR_TOKEN`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Пример ответа:</h3>
        <CodeBlock 
          code={`{
  "status": "success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}
          language="json"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">XML</h2>
        <p className="text-gray-600 mb-4">
          Для получения XML ответа укажите соответствующий заголовок:
        </p>

        <CodeBlock 
          code={`GET /v2/users
Accept: application/xml
Authorization: Bearer YOUR_TOKEN`}
          language="http"
        />

        <h3 className="text-lg font-semibold text-gray-900 mb-3 mt-6">Пример ответа:</h3>
        <CodeBlock 
          code={`<?xml version="1.0" encoding="UTF-8"?>
<response>
  <status>success</status>
  <data>
    <id>1</id>
    <name>John Doe</name>
    <email>john@example.com</email>
  </data>
</response>`}
          language="xml"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Структура ответа</h2>
        <p className="text-gray-600 mb-4">
          Все успешные ответы содержат поля:
        </p>

        <table>
          <thead>
            <tr>
              <th>Поле</th>
              <th>Тип</th>
              <th>Описание</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>status</code></td>
              <td>string</td>
              <td>success или error</td>
            </tr>
            <tr>
              <td><code>data</code></td>
              <td>object</td>
              <td>Данные ответа</td>
            </tr>
            <tr>
              <td><code>timestamp</code></td>
              <td>string</td>
              <td>Время ответа (ISO 8601)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
