// 组件：展示请求统计的单页应用
// 说明：无路由，仅渲染一个仪表盘样式页面，黑色背景、绿色强调色，卡片毛玻璃效果与悬停光晕
import { useMemo } from 'react'
import './App.css'
import CountUp from './Count.jsx'
import { useEffect, useState } from 'react'

// 公开函数：App
// 用途：渲染请求统计页面（总数占据主要位置，其他统计在其后展示）
export default function App() {
  // 状态：统计数据（默认0）
  const [stats, setStats] = useState({
    // 总请求数
    total: 0,
    // 后端请求数
    backend: 0,
    // 前端请求数
    frontend: 0,
    // 错误请求数
    error: 0,
    // 今日请求数
    today: 0,
  })
  // 状态：加载态
  const [loading, setLoading] = useState(true)
  // 状态：错误信息
  const [err, setErr] = useState('')

  // 副作用：页面挂载后获取统计数据
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        const resp = await fetch('/api/stat', { method: 'GET' })
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
        const data = await resp.json()
        if (cancelled) return
        // 映射后端字段到前端字段
        setStats({
          total: data?.total ?? 0,
          backend: data?.api ?? 0,
          frontend: data?.static ?? 0,
          error: data?.fail ?? 0,
          today: data?.today ?? 0,
        })
        setErr('')
      } catch (e) {
        if (!cancelled) setErr('数据获取失败')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="relative min-h-screen w-full bg-black text-emerald-200">
      {/* 背景装饰：绿色光晕与渐变层，增强科技质感 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-neutral-950 to-black" />
      <div className="pointer-events-none absolute -top-20 -left-24 h-[440px] w-[440px] rounded-full bg-emerald-600/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-24 right-32 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

      {/* 左上角文字 LOGO */}
      <header className="fixed top-4 left-6 z-40">
        <div className="flex items-center gap-2 select-none">
          <span className="text-2xl font-extrabold tracking-wider text-emerald-400">JJAPP</span>
          <span className="text-2xl font-extrabold text-emerald-200/90">Stat</span>
        </div>
      </header>

      {/* 主体内容 */}
      <main className="flex flex-col items-center justify-center px-6 pt-24 pb-24">
        {/* 总请求：主显示卡片 */}
        <section className="w-full max-w-6xl mb-8">
          <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-14 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/8 hover:shadow-[0_0_80px_-20px_rgba(16,185,129,0.35)]">
            {/* 悬停背景光晕 */}
            <div className="pointer-events-none absolute -inset-24 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-300 group-hover:bg-emerald-500/10" />
            <h1 className="text-2xl md:text-3xl font-semibold tracking-wide mb-4 flex items-center justify-between">请求总数
              <span className="text-xs font-normal text-emerald-300/70">{loading ? '加载中…' : (err ? '获取失败' : '')}</span>
            </h1>
            <p className="text-5xl md:text-7xl font-extrabold tabular-nums drop-shadow-sm">
              <CountUp to={stats.total} separator="," />
            </p>
          </div>
        </section>

        {/* 其他统计卡片：后端、前端、错误、今日 */}
        <section className="w-full max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 后端请求数 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/8 hover:shadow-[0_0_50px_-20px_rgba(16,185,129,0.35)]">
              <div className="pointer-events-none absolute -inset-20 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-300 group-hover:bg-emerald-500/10" />
              <div className="text-sm uppercase tracking-wider text-emerald-300/80 relative">后端请求数</div>
              <div className="relative mt-2 text-3xl font-semibold tabular-nums">
                <CountUp to={stats.backend} separator="," />
              </div>
            </div>
            {/* 前端请求数 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/8 hover:shadow-[0_0_50px_-20px_rgba(16,185,129,0.35)]">
              <div className="pointer-events-none absolute -inset-20 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-300 group-hover:bg-emerald-500/10" />
              <div className="text-sm uppercase tracking-wider text-emerald-300/80 relative">前端请求数</div>
              <div className="relative mt-2 text-3xl font-semibold tabular-nums">
                <CountUp to={stats.frontend} separator="," />
              </div>
            </div>
            {/* 错误请求数 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/8 hover:shadow-[0_0_50px_-20px_rgba(16,185,129,0.35)]">
              <div className="pointer-events-none absolute -inset-20 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-300 group-hover:bg-emerald-500/10" />
              <div className="text-sm uppercase tracking-wider text-emerald-300/80 relative">错误请求数</div>
              <div className="relative mt-2 text-3xl font-semibold tabular-nums">
                <CountUp to={stats.error} separator="," />
              </div>
            </div>
            {/* 今日请求数 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/8 hover:shadow-[0_0_50px_-20px_rgba(16,185,129,0.35)]">
              <div className="pointer-events-none absolute -inset-20 rounded-full bg-emerald-500/0 blur-3xl transition-colors duration-300 group-hover:bg-emerald-500/10" />
              <div className="text-sm uppercase tracking-wider text-emerald-300/80 relative">今日请求数</div>
              <div className="relative mt-2 text-3xl font-semibold tabular-nums">
                <CountUp to={stats.today} separator="," />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 固定底部版权信息 */}
      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/60 backdrop-blur-sm py-2 text-center text-sm text-emerald-200/80">
        Copyright <a className="" href="https://renj.io" target="_blank" rel="noopener noreferrer">renj.io</a>
      </footer>
    </div>
  )
}
