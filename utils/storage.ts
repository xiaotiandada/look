import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * store set
 * @param key
 * @param value
 */
export const storeSet = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    // saving error
    console.log('e', e)
  }
}


/**
 * store get
 * @param key
 * @returns
 */
export const storeGet = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if(value !== null) {
      // value previously stored
      return value
    }
    return
  } catch(e) {
    // error reading value
    console.log('e', e)
    return
  }
}

/**
 * store Remove
 * @param key
 */
export const storeRemove = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
    console.log('e', e)
  }

  console.log('Done.')
}