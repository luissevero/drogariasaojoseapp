import { EMPRESA_LOGGED_IN, EMPRESA_LOGGED_OUT} from '../actions/actionTypes'

const initialState = {
    empresa: 1
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case EMPRESA_LOGGED_IN:
            return{
                ...state,
                empresa: action.payload.empresa
            } 
        case EMPRESA_LOGGED_OUT:
            return{
                ...state,
                empresa: null
            }
        default:
            return state
    }
}

export default reducer