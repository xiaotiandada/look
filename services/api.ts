import { API, RANDOM_API } from './client'
import { axiosResult, axiosResultDefault } from '../typings/request'
import { CosplayProps, RandomAPIState, RandomAPIProps } from '../typings/api.d'

/**
 * 发送邮箱验证码
 * @param data
 * @returns
 */

export const cosplay = (): Promise<axiosResultDefault & CosplayProps> =>
API.get('', { params: { 'return': 'jsonpro' } })

export const randomAPI = (params: RandomAPIState): Promise<axiosResultDefault & RandomAPIProps> =>
RANDOM_API.get('', { params })

