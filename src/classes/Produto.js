export default class Produto{
    
    
    constructor(chave, descricao, quantidade, valorUnitario){
        this.setChave(chave)
        this.setDescricao(descricao)
        this.setQuantidade(quantidade)
        this.setValorUnitario(valorUnitario)
    }
    /*
   constructor(){
        this._chave = 0
        this._descricao = ''
        this._valorUnitario = 0
        this._quantidade = 0
        this._valorTotal = 0
   }
*/
    getChave(){
        return this._chave
    }

    getDescricao(){
        return this._descricao
    }

    getValorUnitario(){
        return this._valorUnitario
    }

    getQuantidade(){
        return this._quantidade
    }

    getValorTotal(){
        return this._valorTotal
    }
    
    setChave(chave){
        this._chave = chave
    }

    setDescricao(descricao){
        this._descricao = descricao
    }

    setValorUnitario(valorUnitario){
        this._valorUnitario = valorUnitario
    }

    setQuantidade(quantidade){
        this._quantidade = quantidade
    }

    setValorTotal(valorUnitario, quantidade){
        this._valorTotal = valorUnitario * quantidade
    }
}