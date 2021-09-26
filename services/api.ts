import { API } from './client'
import { axiosResult, axiosResultDefault } from '../typings/request'
import { CosplayProps } from '../typings/api.d'

/**
 * 发送邮箱验证码
 * @param data
 * @returns
 */

export const cosplay = (): Promise<axiosResultDefault & CosplayProps> =>
API.get('', { params: { 'return': 'jsonpro' } })

