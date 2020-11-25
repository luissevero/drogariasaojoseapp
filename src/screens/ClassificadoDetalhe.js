import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert, SafeAreaView} from 'react-native'

import Icone from 'react-native-vector-icons/MaterialIcons'
import Util from '../classes/Util'
import commomStyles from '../commomStyles'
import {CAMINHO_CLASSIFICADOS} from '../../config'
import { classificado } from '../store/actions/classificado'
import CabecalhoHome from '../components/CabecalhoHome'
import { connect } from 'react-redux'
import {server, showError} from '../common'
import axios from 'axios'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

if(Platform.OS === 'android') { // only android needs polyfill
    require('intl') // import intl object
    require('intl/locale-data/jsonp/pt-BR') // load the required locale details
}

const estadoInicial = {
    quantidade: 1,
    produto: [],
    total: 0,
    carrinho: [],
    totalAntigo: 0,
    tamanhoIcone: 24
}

/***** Classes Bootstrap *****/
const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888'

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

class ClassificadoDetalhe extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount = async () => {
        await this.carregaClassificado()
    }
    carregaClassificado = async () => {
        try{
            const res = await axios.get(`${server}/classificados/1/${this.props.class}`)
            this.setState({produto: res.data})
            //Alert.alert("Teste", `${this.props.class}`)
        }catch(e){
            showError(e)
        }
    }
    return = () => {
        this.props.navigation.navigate('Classificados')
    }

    abrirMenu = () => {
        
    }

    render(){
        return(
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={styles.icone}>
                    <Icone name='reply' size={estadoInicial.tamanhoIcone} color={commomStyles.colors.eaCinza} onPress={() => this.return()}/>
                </TouchableOpacity>
                <CabecalhoHome onClick={() => this.props.navigation.navigate('Selecao')} abreMenu={() => this.abrirMenu()} />
                <Text style={styles.tituloCabecalho}>Detalhes</Text>
                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>{this.state.produto.titulo}</Text>
                    <View style={styles.containerBanner}> 
                        <Image source={{
                            uri: `${CAMINHO_CLASSIFICADOS}${this.state.produto.url}.png`,
                        }} style={styles.imgBanner} />
                    </View>
                    <Text style={styles.descricao}>{this.state.produto.descricao}</Text>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        backgroundColor: commomStyles.colors.eaCinzaEscuro,
        height: '100%'
    },
    icone: {
        fontSize: 24
    },
    cabecalho: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    tituloCabecalho: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: commomStyles.colors.eaBranco,
        fontFamily: commomStyles.fontFamily,
        borderBottomWidth: 2,
        marginBottom: 8
    },
    containerBanner: {
        backgroundColor: '#ddd',
        width: '100%',
        alignItems: 'center',
        padding: 5
    },
    galeria: {
        backgroundColor: '#fff',
        width: 260,
        height: 220,
        borderWidth: 1,
        borderColor: commomStyles.colors.primary,
        borderRadius: 8
    },
    titulo: {
        fontSize: 24,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: commomStyles.teste.fontFamily,
        color: commomStyles.colors.eaBranco
    },
    descricao: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        textAlign: 'justify',
        marginVertical: 8,
        marginHorizontal: 20,
        fontSize: 18,
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.eaBranco
    },
    corpo: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 250,
        height: 250,
        borderColor: '#b00',
        borderWidth: 1,
        marginBottom: 5
    },
    propriedades: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    preco: {
        fontFamily: commomStyles.teste.fontFamily,
        fontSize: 18
    },
    botaoAdd: {
        marginHorizontal: 12,
        borderRadius: 8
    },
    imgBanner: {
        width: 300,
        height: 200
    }
})

const mapStateToProps = ({classificado}) => {
    return {
        class: classificado.class
    }
}
export default connect(mapStateToProps, null)(ClassificadoDetalhe)
     