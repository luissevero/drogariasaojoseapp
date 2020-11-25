import React, {Component} from 'react'
import {View, Text} from 'react-native'
import Cabecalho from '../components/Cabecalho'

class MinhaConta extends Component {
    render(){
        return (
            <View>
                <Cabecalho abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')} abrirlogin={() => this.props.navigation.navigate('Login')} />
                <Text>Minhas Informações</Text>
            </View>
        )
    }
}

export default MinhaConta