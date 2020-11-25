import {ADD_PROD, LIST_PROD, REMOVE_PROD, ALTERAR_PROD, LIMPAR_CARRINHO, SELECIONA_FRETE, REMOVE_FRETE, PRODUTO_DETALHE} from './actionTypes'

export const add = produto => {
    return {
        type: ADD_PROD,
        payload: produto
    }
}

export const produtoDetalhe = produto => {
    return {
        type: PRODUTO_DETALHE,
        payload: produto
    }
}

export const remove = produto => {
    return{
        type: REMOVE_PROD,
        payload: produto
    }
}

export const list = () => {
    return{
        type: LIST_PROD,
        payload: produto
    }
}

export const alterar = produto => {
    return{
        type: ALTERAR_PROD,
        payload: produto
    }
}

export const limpar = () => {
    return{
        type: LIMPAR_CARRINHO
    }
}

export const selecionaFrete = produto => {
    return{
        type: SELECIONA_FRETE,
        payload: produto
    }
}

export const removeFrete = () => {
    return{
        type: REMOVE_FRETE
    }
}