export interface CosplayProps {
  "API_name": "COS_API",
  "imgurls": string[]
}

export interface RandomAPIState {
  mode: number
  type?: string
  time?: number
}

export interface RandomAPIProps {
  code: number
  url: string
}

export interface RandomGudumibugAPIProps  {
  "API_name": string,
  "imgurl": string
  "width": string
  "height": string
}

export interface RandomGudumibugAPIState {
  return: 'json',
  time?: number
}

export interface FetchRandomGudumibugAPIState {
  url: string,
}

export interface RandomDmoeAPIProps  {
  "code": number,
  "imgurl": string
  "width": string
  "height": string
}

export interface ImgRandomState  {
  "zd": 'mobile' | 'pc' | 'zsy',
  "fl": 'meizi' | 'dongman' | 'fengjing' | 'suiji'
  "gs": 'json'
}

export interface ImgRandomParamsState {
  time?: number
}