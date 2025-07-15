import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 设置浏览器端的mock worker
export const worker = setupWorker(...handlers)
