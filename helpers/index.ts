import { cosplay, randomAPI, randomGudumibugAPI, randomDmoeAPI, imgRandomAPI } from '../services/api'
import { RandomAPIState, FetchRandomGudumibugAPIState } from '../typings/api'

/**
 * fetch cosplay api
 * @returns
 */
export const fetchCosplayAPI = async (): Promise<string[] | undefined> => {
  try {
    const res = await cosplay()
    return res.imgurls || []
  } catch (e) {
    console.log(e)
    return
  }
}

/**
 * fetch random api
 * @returns
 */
export const fetchRandomAPI = async (data: RandomAPIState): Promise<string | undefined> => {
  // let size = 6
  // try {
  //   let list = []
  //   // Promise all 会返回相同内容
  //   // time 希望 url 不一样不使用缓存
  //   for (let i = 0; i < size; i++) {
  //     const res = await randomAPI({
  //       mode: data.mode,
  //       type: 'json',
  //       time: Date.now()
  //     })
  //     if (res.code === 200) {
  //       list.push(res.url)
  //     }
  //   }

  //   return list
  // } catch (e) {
  //   console.log(e)
  //   return
  // }
  try {
    const res = await randomAPI({
      mode: data.mode,
      type: 'json',
      time: Date.now()
    })
    if (res.code === 200) {
      return res.url
    }

    return
  } catch (e) {
    console.log(e)
    return
  }
}

/**
 * fetch random api
 * @param url 
 * @returns 
 */
export const fetchRandomGudumibugAPI = async ({ url }: FetchRandomGudumibugAPIState): Promise<string | undefined> => {
  try {
    const res = await randomGudumibugAPI(url, {
      return: 'json',
      time: Date.now()
    })
    console.log('res', res)
    return res.imgurl

    return
  } catch (e) {
    console.log(e)
    return
  }
}

/**
 * fetch random api
 * @param url 
 * @returns 
 */
export const fetchRandomDmoeAPI = async ({ url }: FetchRandomGudumibugAPIState): Promise<string | undefined> => {
  try {
    const res = await randomDmoeAPI(url, {
      return: 'json',
      time: Date.now()
    })
    console.log('res', res)
    return res.imgurl

    return
  } catch (e) {
    console.log(e)
    return
  }
}

/**
 * fetch random api
 * @param url 
 * @returns 
 */
export const fetchImgRandomAPIAPI = async ({ url }: FetchRandomGudumibugAPIState): Promise<string | undefined> => {
  try {
    const res = await imgRandomAPI(url, {
      time: Date.now()
    })
    console.log('res', res)
    return res.imgurl

    return
  } catch (e) {
    console.log(e)
    return
  }
}