import { TypeListState } from "../typings"

/**
 * 喜欢 store key
 */
export const KEY_LOCK_BOOKMARKS = 'LOCK_BOOKMARKS'

/**
 * fail image url
 */
export const FailImageUrl = "http://whhlyt.hunan.gov.cn/whhlyt/xhtml/img/pc-icon_none.png"

/**
 * type list
 * 因为第一个接口使用 mode区分
 */
export const TypeList: TypeListState[] = [
  {
    title: '3650000随机 API',
    url: 'https://3650000.xyz',
    key: '3650000.xyz',
    item: [
      {
        name: '微博',
        mode: 1,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'Instagram',
        mode: 2,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'COS',
        mode: 3,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'Mtcos',
        mode: 5,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: '美腿',
        mode: 7,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'Coser',
        mode: 8,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: '兔玩映画',
        mode: 9,
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: '随机',
        mode: 66,
        color: ['#3cd8cc', '#46dfbc']
      }
    ]
  },
  {
    title: 'IMG API',
    url: 'https://imgapi.cn/wiki.html',
    key: 'imgapi.cn',
    item: [
      {
        name: 'm 妹子',
        url: 'api.php?zd=mobile&fl=meizi&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'm 动漫',
        url: 'api.php?zd=mobile&fl=dongman&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'm 风景',
        url: 'api.php?zd=mobile&fl=fengjing&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'm 随机',
        url: 'api.php?zd=mobile&fl=suiji&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'p 妹子',
        url: 'api.php?zd=pc&fl=meizi&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'p 动漫',
        url: 'api.php?zd=pc&fl=dongman&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'p 风景',
        url: 'api.php?zd=pc&fl=fengjing&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'p 随机',
        url: 'api.php?zd=pc&fl=suiji&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'z 妹子',
        url: 'api.php?zd=zsy&fl=meizi&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'z 动漫',
        url: 'api.php?zd=zsy&fl=dongman&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'z 风景',
        url: 'api.php?zd=zsy&fl=fengjing&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'z 随机',
        url: 'api.php?zd=zsy&fl=suiji&gs=json',
        color: ['#3cd8cc', '#46dfbc']
      },
      {
        name: 'COS',
        url: 'cos.php?return=jsonpro',
        color: ['#3cd8cc', '#46dfbc']
      },
    ]
  },
    {
    title: '随机 COSPLAY API',
    url: 'https://api.gudumibug.top',
    key: 'gudumibug.top',
    item: [
      {
        name: 'acgurl',
        url: 'acgurl.php',
        color: ['#3cd8cc', '#46dfbc']
      }
    ]
  },
  {
    title: '樱花 API',
    url: 'https://www.dmoe.cc',
    key: 'dmoe.cc',
    item: [
      {
        name: 'random',
        url: 'random.php',
        color: ['#3cd8cc', '#46dfbc']
      }
    ]
  }
]