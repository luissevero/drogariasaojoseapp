export default class Util {
    
    static completarZerosEsquerda(str, length){
            const resto = length - String(str).length
            return '0'.repeat(resto > 0 ? resto : '0') + str
    }

    static urlExists(chave){
        return 'http://187.86.144.70:8081/siacweb/arquivos/fotos/PD' + this.completarZerosEsquerda(chave, 6) + '.jpg'
    }

    static async base64(texto){
        const encoder = new TextEncoder();
        const data = encoder.encode(texto)
        const hash = await crypto.subtle.digest('SHA-256', data)
        return hash
    }
}