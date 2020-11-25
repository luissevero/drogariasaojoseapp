import React, {Component} from 'react'
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native'
import axios from 'axios'

export default class AuthOrApp extends Component{

    //verificar se o cliente já fez login, ou seja, seu token já irá estar gravado no app
    componentDidMount = async () => {
        const userDataJSON = await AsyncStorage.getItem('userData')
        let userData = null
        try{
            userData = JSON.parse(userDataJSON)
        }catch(e){
            //o userdata está inválido
        }
        
        if(userData && userData.token){
            axios.defaults.headers.common['Authorization'] = `bearer ${userData.token}`
            this.props.navigation.navigate('Carrinho', userData)
        }else{
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large'></ActivityIndicator>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    }
})