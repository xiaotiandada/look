import { cosplay } from '../services/api'

/**
 * fetch cosplay api
 * @returns
 */
export const fetchCosplayAPI = async () => {
  try {
    const res = await cosplay()
    return res.imgurls || []
  } catch (e) {
    console.log(e)
    return
  }
}