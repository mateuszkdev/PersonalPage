const charset: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']

export default (length: number): string => {

    let str: string = ''
    for (let i = 0; i <= length; i++) str += charset[~~Math.random() * charset.length]
    
    return str

}