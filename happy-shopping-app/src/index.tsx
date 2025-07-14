import 'normalize.css'
import './styles/base.css'
import './styles/border.css'
import './styles/common.scss'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// 在开发环境中启动mock服务
async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mock/browser')

  // 启动mock worker
  return worker.start({
    onUnhandledRequest: 'bypass' // 对于未处理的请求，直接通过
  })
}

document.documentElement.style.fontSize = (document.documentElement.clientWidth / 375) * 100 + 'px'

window.addEventListener('resize', () => {
  document.documentElement.style.fontSize = (document.documentElement.clientWidth / 375) * 100 + 'px'
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

enableMocking().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
})
