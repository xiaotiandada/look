import { IMG_API, RANDOM_API, RANDOM_GUDUMIBUG_API, DMOE_API } from './client'
import { axiosResult, axiosResultDefault } from '../typings/request'
import {
  CosplayProps, RandomAPIState, RandomAPIProps,
  RandomGudumibugAPIProps, RandomGudumibugAPIState, RandomDmoeAPIProps,
  ImgRandomState, ImgRandomParamsState
} from '../typings/api.d'


/**
 * 随机 cosplay api
 * @returns
 */
export const cosplay = (): Promise<axiosResultDefault & CosplayProps> =>
  IMG_API.get('/cos.php', { params: { 'return': 'jsonpro' } })

/**
* 随机 api
* @returns
*/
export const imgRandomAPI = (url: string, params: ImgRandomParamsState): Promise<axiosResultDefault & RandomDmoeAPIProps> =>
  IMG_API.get(`/${url}`, { params })

/**
 * 随机 api
 * @param params
 * @returns
 */
export const randomAPI = (params: RandomAPIState): Promise<axiosResultDefault & RandomAPIProps> =>
  RANDOM_API.get('', { params })

/**
 * 随机 api
 * @param url
 * @returns
 */
export const randomGudumibugAPI = (url: string, params: RandomGudumibugAPIState): Promise<axiosResultDefault & RandomGudumibugAPIProps> =>
  RANDOM_GUDUMIBUG_API.get(`/${url}`, { params })



/**
 * 随机 api
 * @param url
 * @returns
 */
export const randomDmoeAPI = (url: string, params: RandomGudumibugAPIState): Promise<axiosResultDefault & RandomDmoeAPIProps> =>
  DMOE_API.get(`/${url}`, { params })

