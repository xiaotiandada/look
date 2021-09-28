/**
 * sleep
 * @param time number
 * @returns
 */
export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))