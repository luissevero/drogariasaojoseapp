import React, {Component, useReducer, ReactDOM } from 'react'
import {View, StyleSheet, Text, Platform, Image, TouchableOpacity, Alert, TextInput, ImageBackground} from 'react-native'
import {connect} from 'react-redux'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faCoffee, faBars} from '@fortawesome/free-solid-svg-icons'

import BootstrapStyleSheet from 'react-native-bootstrap-styles'

import {CAMINHO_SERVIDOR} from '../../config'
import {server, showError} from '../common'

import commonStyles from '../commomStyles'
import { TouchableHighlight } from 'react-native-gesture-handler'

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
const constants = {
  BODY_COLOR, TEXT_MUTED,
}

// custom classes
const classes = {
  title: {
    color: 'red',
  }
}

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes)
const {styles: s, constants: c} = bootstrapStyleSheet

const estadoInicial = {
    qtdProdutos: 0,
    tamanhoIcone: 32,
    estaPesquisando: false,
    valorPesquisado: '71',
    empresa: []
}

class Cabecalho extends Component {
    
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

    render(){
        return (
            <View style={styles.container}>
                
                <View style={{height: '20%', width: c.DIMENSIONS_WIDTH}}>
                    <TouchableOpacity onPress={() => this.props.abrirmenu()}>
                        <FontAwesomeIcon icon={faBars} color={commonStyles.colors.saojose} size={20} />
                    </TouchableOpacity>
                </View>
                
                <View style={styles.rowContainer}>
                    <TouchableOpacity onPress={() => this.props.abrirMinhaConta() }>
                        <Text style={styles.itensAcesso}>Sua Conta </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => this.props.abrirlogin()}>
                        <Text style={styles.itensAcesso}>Login</Text>
                    </TouchableOpacity>
                </View>

            </View>           
            
        )
    }
}

const styles = StyleSheet.create({
    
    //Shelter: require('../../assets/fonts/shelter.otf'),

    container: {
        padding: 0,
        paddingTop: 10,
        width: c.DIMENSIONS_WIDTH,
        height: c.DIMENSIONS_HEIGHT / 5,
        backgroundColor: commonStyles.colors.cabecalho
    },
    carrinho: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyles.colors.saojose,
        width: c.DIMENSIONS_WIDTH / 3,
        padding: 15,
        marginLeft: c.DIMENSIONS_WIDTH / 3,
        flexDirection: 'row'
    },
    numeroItens: {
        fontSize: 12,
        color: '#fff'
    },
    bannerInicial: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: 80,
        backgroundColor: '#eee',
        borderBottomWidth: 2, 
        borderBottomColor: '#f00'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '40%',
        width: c.DIMENSIONS_WIDTH - 10
    },
    itensAcesso: {
        fontSize: 13,
        color: commonStyles.colors.saojose,
        fontWeight: 'bold'
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
        alignItems: 'flex-end',
        justifyContent: 'center',
        width: 160,
        maxHeight: 60,
        marginLeft: 10
    },
    textoBanner: {
        color: '#000',
        fontFamily: commonStyles.teste.fontFamily,
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
        color: commonStyles.colors.eaCinza,
        fontFamily: commonStyles.fontFamily,
        marginLeft: '84%'
    },
    pesquisa: {
        borderWidth: 1,
        borderColor: '#fff',
        flex: 4,
        borderRadius: 10,
        padding: 5,
        color: '#fff'
    }
})

const mapStateToProps = ({ produtos, empresa }) => {
    return {
        total: produtos.totalProdutos,
        empresa: empresa.empresa
    }
}

export default connect(mapStateToProps, null)(Cabecalho)

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

                    <View style={{height: '40%', width: c.DIMENSIONS_WIDTH}}>
                    <TouchableOpacity style={styles.carrinho} onPress={() => this.props.onClick()}>
                        <FontAwesomeIcon icon={faShoppingCart} color="#fff" size={20} />
                        <Text style={styles.numeroItens}>{this.props.total == 0 ? ' (Vazio)' : this.props.total}</Text>
                    </TouchableOpacity>
                </View>

                    */