import React, {Component, useReducer, ReactDOM } from 'react'
import {View, StyleSheet, Text, Platform, Image, TouchableOpacity, Alert, TextInput, ImageBackground} from 'react-native'
//import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'
import axios from 'axios'

import commonStyle from '../commomStyles'
import {CAMINHO_SERVIDOR} from '../../config'
import {server, showError} from '../common'
import AsyncStorage from '@react-native-community/async-storage'
import Util from '../classes/Util'
import commomStyles from '../commomStyles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

const
  BODY_COLOR = '#000022'

// custom constants
const constants = {
  BODY_COLOR
}

// custom classes
const classes = {
  title: {
    color: 'red',
  }
}

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes)
const {styles: s, constants: c} = bootstrapStyleSheet

function pesq(valor){
    Alert.alert("Valor digitado", `${valor}`)
}

const estadoInicial = {
    qtdProdutos: 0,
    tamanhoIcone: 32,
    estaPesquisando: false,
    valorPesquisado: '71',
    empresa: []
}

class CabecalhoHome extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = () => {
        this.loadEmpresa()
    }
    
    loadEmpresa = async () => {
        try{
            const res = await axios.get(`${server}/empresas/${this.props.empresa.Chave}`)
            this.setState({empresa: res.data})
        }catch(e){
            showError(e)
        }       
    }

    carregarImagem = (imagem) => {

        const caminhoAbs = `${CAMINHO_SERVIDOR}/${imagem}_min.png`
        if(caminhoAbs){
            return caminhoAbs
        }else{
            return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
        }  
      }

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.icone} onPress={() => this.props.abreMenu()}>
                    <Icon name='menu' size={estadoInicial.tamanhoIcone} color={commomStyles.colors.eaCinza} style={styles.icone}/>
                </TouchableOpacity> 
            </View>           
        
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        padding: 0,
        flexDirection: 'row',
        backgroundColor: commomStyles.colors.eaPreto
    },
    logoEa: {
        width: c.DIMENSIONS_WIDTH - 30,
        height: 100
    },
    icone: {
        marginBottom: 40
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 5,
        maxHeight: 80
    },
    iconesEsquerda: {
        marginBottom: 25
    },
    iconesDireita: {
        marginBottom: 25
    },
    banner: {
        margin: 0,
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        maxHeight: 60,
        marginLeft: 10
    },
    textoBanner: {
        color: '#000',
        fontFamily: commonStyle.teste.fontFamily,
        fontSize: 16,
        padding: 1,
        marginLeft: 30
    },
    imagemBanner: {
        height: 126,
        width: '100%'
       // width: '70%',
    },
    icone: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    title: {
        color: '#000',
        fontFamily: 'serif',
        height: 30,
        fontSize: 28
    },
    qtdProdutos: {
        color: commonStyle.colors.primary,
        fontFamily: commonStyle.fontFamily,
        marginLeft: '84%'
    },
    pesquisa: {
        borderWidth: 1,
        borderColor: '#fff',
        flex: 4,
        borderRadius: 10,
        padding: 5,
        color: '#fff'
    },
    carrinho: {
       marginBottom: 20 
    }

})

const mapStateToProps = ({ produtos, empresa }) => {
    return {
        total: produtos.totalProdutos,
        empresa: empresa.empresa
    }
}

export default connect(mapStateToProps, null)(CabecalhoHome)

/*

                    <TouchableOpacity style={styles.icone} onPress={() => this.props.navigation.openDrawer()}>
                        <Icon name='menu' size={this.state.tamanhoIcone} color='#fff'/>
                    </TouchableOpacity>

                                            <TouchableOpacity style={styles.icone} onPress={() => this.props.empresa()}>
                            <Icon name='search' size={estadoInicial.tamanhoIcone} color='#fff'/>
                        </TouchableOpacity>
                        <Image source={this.getImagem()} style={styles.image} />

                                            <Image 
                        source={{uri: `${this.carregarImagem(this.state.empresa.imagem_app)}`,}}
                        resizeMode='cover'
                        style={styles.imagemBanner}                                
                    />

                    */