import React, {Component} from 'react'
import {View, Text, Alert} from 'react-native'

import Cabecalho from '../components/Cabecalho'
import RenderLoading from '../components/RenderLoading'
import {connect} from 'react-redux'
import api from '../services/api'

class ProgramaPontos extends Component {
    
    state = {
        pessoa: [],
        loading: true,
        pontos: 0,
        pontosFinal: 50,
        tempo: 50
    }

    componentDidMount(){
        {this.props.uNome &&
            this.carregaCliente()
        }
        this.setState({loading: false})
        this.intervalId = setInterval(this.timer.bind(this), this.state.tempo)
    }

    timer = async () => {
        if(this.state.pontos < this.state.pontosFinal){
            await this.setState({pontos: this.state.pontos + 1})
        }
    }

    carregaCliente = async () => {
        {
        this.props.uChave &&
            await api.get(`pessoacadastro/${this.props.uChave}`
            ).then(
                async res => {await this.setState({pessoa: res.data})},
                async res => await Alert.alert(res.data) 
            )
        }
    }
    
    render(){
        return (
            <View>
                {this.state.loading &&
                <RenderLoading />
                }
                <Cabecalho abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')} abrirlogin={() => this.props.navigation.navigate('Login')} />
                <Text>Programa de Pontos</Text>
                {this.props.uNome &&
                    <View><Text>Você possui atualmente {this.state.pontos} pontos</Text></View>
                }
                
            </View>
        )
    }
}

const mapStateToProps = ({ user }) => {
    return {
        uNome: user.name,
        uLogin: user.email,
        uChave: user.chave       
    }
}

export default connect(mapStateToProps, null)(ProgramaPontos)