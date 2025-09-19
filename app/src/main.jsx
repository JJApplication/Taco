// 使用 Tailwind 进行页面整体样式，保留入口逻辑
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// 公开函数：应用入口
// 用途：挂载根组件到 DOM
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
