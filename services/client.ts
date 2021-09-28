import factoryClient from './factoryClient'

/**
 * COSPLAY调用 API
 */
export const API = factoryClient({
  baseURL: 'https://imgapi.cn/cos.php'
})

/**
 * https://3650000.xyz/
 * 3650000随机API
 */
export const RANDOM_API = factoryClient({
  baseURL: 'https://3650000.xyz/api'
})
