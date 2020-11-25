import React, {Component} from 'react'
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity} from 'react-native'
import axios from 'axios'
//import Icon from 'react-native-vector-icons/FontAwesome'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

import {server, showError} from '../common'
import backgroundImage from '../assets/imgs/login.jpg'

const estadoInicial = {
    usuariosVisiveis: [],
    usuarios: []
}

export default class User extends Component {
    
    state = {
        ...estadoInicial
    }

    //chamar a função para mostrar as tarefas concluidas quando o componente for montado
    componentDidMount = async () => {
        this.loadUsers()
    }

    loadUsers = async () => {
        try{
            const res = await axios.get(`${server}/users`)
            this.setState({usuarios: res.data})
        }catch(e){
            showError(e)
        }       
    }

    return = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <ImageBackground style={styles.background} source={backgroundImage} >
                <TouchableOpacity onPress={this.return}>                    
                    <View style={styles.logoutIcon}>
                        <FontAwesomeIcon icon={faHome} size={40} color='#22c' />
                    </View>
                </TouchableOpacity>
                <View style={styles.usuarios}>
                    <FlatList 
                        data={this.state.usuarios} 
                        keyExtractor={item => `${item.id}`}
                        renderItem={({item}) => <View style={styles.usuario}><Text style={styles.id}>Email: {item.email}</Text><Text style={styles.id}>Nome: {item.nome}</Text></View>}
                    />
                </View>
            </ImageBackground>            
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    usuarios: {
        marginTop: '20%'
    },
    usuario: {
        marginBottom: 50
    },
    id: {
        color: '#ccc',
        fontSize: 16
    },
    nome: {
        color: '#eee',
        fontSize: 20
    },
    logoutIcon: {
        marginTop: 50
    }
})
