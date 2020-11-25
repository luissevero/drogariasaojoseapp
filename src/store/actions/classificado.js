import {SELECIONA_GRUPO_CLASSIFICADO, SELECIONA_CLASSIFICADO} from './actionTypes'

export const grupoClassificado = classificado => {
    return {
        type: SELECIONA_GRUPO_CLASSIFICADO,
        payload: classificado
    }
}

export const classificado = classificado => {
    return {
        type: SELECIONA_CLASSIFICADO,
        payload: classificado
    }
}