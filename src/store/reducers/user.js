import { USER_LOGGED_IN, USER_LOGGED_OUT} from '../actions/actionTypes'

const initialState = {
    name: null,
    email: null,
    chave: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return{
                ...state,
                name: action.payload.Nome,
                email: action.payload.login,
                chave: action.payload.chave
            } 
        case USER_LOGGED_OUT:
            return{
                ...state,
                name: null,
                email: null,
                chave: null
            }
        default:
            return state
    }
}

export default reducer