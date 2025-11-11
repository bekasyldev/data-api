import { GitBranch } from 'lucide-react'
import CodeBlock from '../components/CodeBlock'

export default function Versioning() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <GitBranch className="inline-block mr-3 text-blue-600" size={36} />
          Версионирование API
        </h1>
        <p className="text-xl text-gray-600">
          DataAPI поддерживает версионирование для обеспечения обратной совместимости
        </p>
      </div>

      <div className="alert alert-info">
        Текущая версия API: <strong>v2</strong>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Доступные версии</h2>
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">Version 2 (v2)</h3>
              <span className="badge badge-post">Текущая</span>
            </div>
            <p className="text-gray-600 mb-3">Стабильная версия с улучшенной производительностью</p>
            <code className="text-sm">https://api.dataapi.com/v2</code>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">Version 1 (v1)</h3>
              <span className="badge badge-delete">Устарела</span>
            </div>
            <p className="text-gray-600 mb-3">Поддерживается до 31 декабря 2025</p>
            <code className="text-sm">https://api.dataapi.com/v1</code>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Использование версий</h2>
        <p className="text-gray-600 mb-4">
          Версия указывается в URL запроса:
        </p>

        <CodeBlock 
          code={`# Version 2
curl https://api.dataapi.com/v2/users

# Version 1 (устаревшая)
curl https://api.dataapi.com/v1/users`}
          language="bash"
        />
      </div>
    </div>
  )
}
