import factoryClient from './factoryClient'

/**
 * COSPLAY调用 API
 * https://imgapi.cn/wiki.html
 */
export const IMG_API = factoryClient({
  baseURL: 'https://imgapi.cn'
})

/**
 * https://3650000.xyz/
 * 3650000随机API
 */
export const RANDOM_API = factoryClient({
  baseURL: 'https://3650000.xyz/api'
})

/**
 * https://api.gudumibug.top
 */
export const RANDOM_GUDUMIBUG_API = factoryClient({
  baseURL: 'https://api.gudumibug.top'
})

/**
 * https://www.dmoe.cc
 */
export const DMOE_API = factoryClient({
  baseURL: 'https://www.dmoe.cc'
})
