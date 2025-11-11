import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Home, Key, Lock, Zap, Hash, GitBranch, FileJson, Code } from 'lucide-react'
import './App.css'

// Import pages
import Introduction from './pages/Introduction'
import Authentication from './pages/Authentication'
import Endpoints from './pages/Endpoints'
import RateLimiting from './pages/RateLimiting'
import ApiKeys from './pages/ApiKeys'
import Versioning from './pages/Versioning'
import ResponseFormats from './pages/ResponseFormats'
import ApiExplorer from './pages/ApiExplorer'

const navigation = [
  { name: 'Введение', path: '/', icon: Home },
  { name: 'Аутентификация', path: '/authentication', icon: Lock },
  { name: 'API Endpoints', path: '/endpoints', icon: Zap },
  { name: 'API Explorer', path: '/explorer', icon: Code },
  { name: 'API Keys', path: '/api-keys', icon: Key },
  { name: 'Rate Limiting', path: '/rate-limiting', icon: Hash },
  { name: 'Версионирование', path: '/versioning', icon: GitBranch },
  { name: 'Форматы ответов', path: '/response-formats', icon: FileJson },
]

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation()
  
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-900 text-white
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">DataAPI</h1>
              <button 
                onClick={() => setIsOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-2">REST API Documentation</p>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                        ${isActive 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                        }
                      `}
                    >
                      <Icon size={20} />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-800">
            <div className="text-xs text-gray-500">
              Version 2.0.0
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto">
          <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 z-30">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-600 hover:text-gray-900"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-lg font-semibold">DataAPI Docs</h2>
              <div className="w-6" />
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Introduction />} />
              <Route path="/authentication" element={<Authentication />} />
              <Route path="/endpoints" element={<Endpoints />} />
              <Route path="/explorer" element={<ApiExplorer />} />
              <Route path="/api-keys" element={<ApiKeys />} />
              <Route path="/rate-limiting" element={<RateLimiting />} />
              <Route path="/versioning" element={<Versioning />} />
              <Route path="/response-formats" element={<ResponseFormats />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
