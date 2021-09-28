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