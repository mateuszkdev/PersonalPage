const info =    (text: string): void => console.log(`[Router INFO] ${text}`)
const success = (text: string): void => console.log(`[Router SUCCESS] ${text}`)
const error =   (text: string): void => console.log(`[Router ERROR] ${text}`)
const br =      ():             void => console.log('[=================]')

export default { info, success, error, br }