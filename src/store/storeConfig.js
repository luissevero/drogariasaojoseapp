import {createStore, combineReducers} from 'redux'
import userReducer from './reducers/user'
import produtosReducer from './reducers/produto'
import empresaReducer from './reducers/empresa'
import pesquisaReducer from './reducers/pesquisa'
import classificadoReducer from './reducers/classificado'

const reducers = combineReducers({
    user: userReducer,
    produtos: produtosReducer,
    empresa: empresaReducer,
    pesquisa: pesquisaReducer,
    classificado: classificadoReducer
})

const storeConfig = () => {
    return createStore(reducers)
}

export default storeConfig