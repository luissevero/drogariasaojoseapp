import { Alert, Platform } from "react-native"

//const server = Platform.OS == 'ios' ? 'http://187.86.144.70:5001' : 'http://187.86.144.70:5001'
//const serverLocal = 'http://189.114.99.18:3000'
const server = 'http://192.168.15.150:3006'

function showError(err) {
    if(err.response && err.response.data){
        Alert.alert('Ocorreu um problema', `Mensagem: ${err.response.data}`)
    }else{
        Alert.alert('Ocorreu um problema', `Mensagem: ${err}`)
    }
    
}

function showSuccess(msg){
    Alert.alert('Sucesso!', `${msg}`)
}

export {server, showError, showSuccess}
