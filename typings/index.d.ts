export interface ImageDataState {
  url: string
}

export type TypeListStateKey = '3650000.xyz' | 'gudumibug.top' | 'dmoe.cc' | 'imgapi.cn'

export interface TypeListState {
  title: string
  url: string
  key: TypeListStateKey
  item: {
    name: string
    mode?: number
    url?: string
    color: string[]
  }[]
}

export interface DetailProps {
  key: string
  mode?: number
  url?: string
}


export interface BookmarkState {
  url: string,
  lastTime: number
}