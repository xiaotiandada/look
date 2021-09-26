import factoryClient from './factoryClient'

/**
 * COSPLAY调用 API
 */
export const API = factoryClient({
  baseURL: 'https://imgapi.cn/cos.php'
})
