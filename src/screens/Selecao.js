import React, {Component} from 'react'
import {SafeAreaView, 
        View, 
        Text, 
        StyleSheet, 
        Image, 
        FlatList, 
        TouchableOpacity, 
        Alert, 
        ImageBackground,
        ActivityIndicator,
        ScrollView
    } from 'react-native'
import axios from 'axios'
import DeCron from '../components/DeCron'
import {server, serverLocal, showError} from '../common'
import {CAMINHO_SERVIDOR, CAMINHO_CLASSIFICADOS, MOSTRAR_CLASSIFICADOS, CLASSIFICADOS} from '../../config'
import {connect} from 'react-redux'
import {login} from '../store/actions/empresa'
import {grupoClassificado} from '../store/actions/classificado'
import commomStyles from '../commomStyles'
import CabecalhoHome from '../components/CabecalhoHome'
import ImagemProduto from '../components/ImagemProduto'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

const estadoInicial = {
    empresas: [],
    produtos: [],
    itens: 0,
    classificados: [],
    tiposClassificados: [],
    galleryIndex: null,
    grupo: 0,
    parametros: [],
    loading: false,
    loadingEmpresas: false
}

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

// custom constants
const constants = {
  BODY_COLOR, TEXT_MUTED,
};

// custom classes
const classes = {
  title: {
    color: 'red',
  }
};

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes)
const {styles: s, constants: c} = bootstrapStyleSheet

class Selecao extends Component {

    state = {
        ...estadoInicial
    }   

    abrirMenu = async () => {

    }

    render(){
        return(
                <ScrollView style={[s.body], {backgroundColor: commomStyles.colors.eaPreto}}> 
                    <CabecalhoHome onClick={() => this.props.navigation.navigate('Selecao')} abreMenu={() => this.abrirMenu()}/>
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commomStyles.colors.eaPreto,
        flex: 1
    },
    cabecalho: {
        flex: 1
    },
    logoEa: {
        width: c.DIMENSIONS_WIDTH - 20,
        height: 100
    },
    botoesBanners: {
        alignItems: 'center',      
        padding: 2
    },
    imagensBanners: {
        width: (c.DIMENSIONS_WIDTH) - 12,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: 'white'
    },
    bannerClass: {
        flex: 2,
        borderWidth: 1,
        borderRadius: 8,
        padding: 1,
        margin: 4,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bannerClass2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    empresas: {
        flex: 3
    },
    background: {
        flex: 4
    },
    usuarios: {
        width: 420,
        alignItems: 'center',
        justifyContent: 'center'
    },
    usuario: {
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    id: {
        color: '#222',
        fontSize: 16
    },
    nome: {
        color: '#111',
        fontSize: 20
    },
    logoutIcon: {
        marginTop: 50
    },
    imagem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        margin: 16,
        padding: 16,
        flexBasis: 0,
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    logos: {
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 48,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: commomStyles.fontFamily
    },
    galeria: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: commomStyles.colors.eaPreto,
        borderRadius: 8
    },
    classificado: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: commomStyles.teste.fontFamily,
        fontSize: 24,
        marginTop: -10,
        marginBottom: 10
    },
    tiposClassificados: {
        marginTop: -20
    },
    containerClassificados: {
        marginTop: -15
    },
    tituloClassificado: {
        marginBottom: 10, 
        marginTop: -140,
        fontFamily: commomStyles.fontFamily,
        fontSize: 18,
        textAlign: 'right',
        //justifyContent: 'center',
        backgroundColor: '#ededed88',
        color: '#000'
    },
    bannerImagem: {
        borderWidth: 8,
        borderColor: '#ccc',
        borderRadius: 10,
        width: 215,
        height: 140,
        padding: 5
    }
})

/*
const mapDispatchToProps = dispatch => {
    return{
        onClassificado: (classificado) => dispatch(grupoClassificado(classificado))
    }
}
*/
export default Selecao
