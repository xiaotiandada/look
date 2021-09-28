import { cosplay, randomAPI } from '../services/api'
import { RandomAPIState } from '../typings/api'

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