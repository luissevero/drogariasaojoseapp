import { SELECIONA_GRUPO_CLASSIFICADO, SELECIONA_CLASSIFICADO } from '../actions/actionTypes'

const initialState = {
    classificado: null,
    class: 0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SELECIONA_GRUPO_CLASSIFICADO:
            return{
                ...state,
                classificado: action.payload.grupo
            } 
        case SELECIONA_CLASSIFICADO:
            return{
                ...state,
                class: action.payload.classificado
            }
            default:
            return state
    }
}

export default reducer