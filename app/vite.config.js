// vite 配置文件，集成 React 插件与 Tailwind CSS v4 的 Vite 插件
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// 导出 Vite 配置
// 说明：启用 React 热更新与 Tailwind v4 处理能力
export default defineConfig({
  plugins: [
    // 启用 React 插件
    react(),
    // 启用 Tailwind CSS v4 的 Vite 插件（官方推荐方式）
    tailwindcss(),
  ],
})
