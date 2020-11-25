import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator, Image} from 'react-native'
import axios from 'axios'
import Icone from 'react-native-vector-icons/MaterialIcons'
import {classificado} from '../store/actions/classificado'
import {connect} from 'react-redux'
import {Header, Icon, Item, Input} from 'native-base'
import CabecalhoHome from '../components/CabecalhoHome'

import {CLASSIFICADOS, CAMINHO_CLASSIFICADOS} from '../../config'
import {server, showError} from '../common'
import commomStyles from '../commomStyles'
import 'react-native-gesture-handler'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

const estadoInicial = {
    clasificados: [],
    grupoClassificado: '',
    tamanhoIcone: 26,
    grupo: 1,
    numeroDeClassificados: null,
    classificado: 0,
    loading: true
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

class Classificados extends Component {

      state = { 
        ...estadoInicial
    }

    //chamar a função para mostrar as tarefas concluidas quando o componente for montado
    componentDidMount = async () => {
        await this.loadClassificados()
        await this.loadGrupoClassificados()
        //Alert.alert("Caminho classificados", `${CAMINHO_CLASSIFICADOS}`) 
    }

    loadGrupoClassificados = async () => {
        try{
            const res = await axios.get(`${server}/tiposClassificados/${this.props.grupo}`)
            this.setState({grupoClassificado: res.data.descricao })
            await this.setState({loading: false})
            //Alert.alert("Teste", `${res.data.descricao}`)
        }catch(e){
            showError(e)
        }
    }
    

    loadClassificados = async () => {
        try{
            const res = await axios.get(`${server}/classificados/${this.props.grupo}`)
            this.setState({classificados: res.data })
            this.setState({numeroDeClassificados: res.data.length})
        }catch(e){
            showError(e)
        }
    }

    loadEmpresa = async () => {
        try{
            await this.setState({empresa: this.props.empresa.chave })
        }catch(e){
            showError(e)
        }
    }

    return = () => {
        this.props.navigation.navigate('ClassificadosHome')
    }

    detalheClassificado = async (item) => {
        await this.setState({classificado: item})
        //Alert.alert("Classificado: ", `${this.state.classificado}/${item}`)
        await this.props.onClassificado({...this.state})
        this.props.navigation.navigate('ClassificadosDetalhes')
    }

    renderLoading = () => {
        if (!this.state.loading) return null
        return (
          <View style={styles.loading}>
            <ActivityIndicator size='large' color={commomStyles.colors.eaBranco}/>
          </View>
        )
    }

    incrementCount(preco){
        this.setState((state) => {
            return {total: preco}
        })
    }

    atualizaPesquisa = (pesquisa) => {
        this.setState({ pesquisa })
    }

    pesquisar = async () => {
        await this.setState({pesquisa: this.state.pesquisaTemp, fimAtingido: false})
    }

    renderCabecalho = () => {
        if(!this.state.loading){
            return (
                <View style={styles.cabecalho}>
                    <Text style={styles.titulo}>{CLASSIFICADOS} - {this.state.grupoClassificado}</Text>
                </View>
            )
        }else{
            return (
                <View>{this.renderLoading()}</View>
            )
        }
    }

    renderCorpo = () => {
        if(!this.state.loading && this.state.numeroDeClassificados > 0){
            return (
                <FlatList 
                    data={this.state.classificados} 
                    keyExtractor={item => `${item.chave}`}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) =>
                        <View style={styles.classificadosContainer}>
                            <TouchableOpacity onPress={() => this.detalheClassificado(item.chave)}>
                                <Image source={{
                                    uri: `${CAMINHO_CLASSIFICADOS}${item.url}.png`,
                                }}
                                style={styles.background} />
                            </TouchableOpacity>
                            <Text style={styles.semAnuncio}>{item.titulo}</Text>
                        </View>
                    }
                />
            )
        }else{
            return (
                <View>{this.renderLoading()}</View>
            )
        }
    }

    abrirMenu = () => {
        
    }

    render(){
            return(
            <SafeAreaView style={[s.body], styles.container}>
                <TouchableOpacity style={styles.icone} onPress={() => this.return()}>
                    <Icone name='reply' size={estadoInicial.tamanhoIcone} color={commomStyles.colors.eaCinza}/>
                </TouchableOpacity>
                <CabecalhoHome onClick={() => this.props.navigation.navigate('Selecao')} abreMenu={() => this.abrirMenu()} />
                {this.renderCabecalho()}
                {this.renderCorpo()}
                {this.state.numeroDeClassificados == 0 &&
                        <View>
                            <Text style={styles.semAnuncio}>Sem anúncios</Text>
                        </View>
                }
                
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 5,
        height: '100%',
        backgroundColor: commomStyles.colors.eaCinzaEscuro
    },
    classificadosContainer: { 
        width:'100%', 
        height: 250,
        borderWidth: 1,
        backgroundColor: '#eee',
        fontFamily: commomStyles.fontFamily,
        marginVertical: 10,
        paddingHorizontal: 5
    },
    cabecalho: {
        flexDirection: 'row'
    },
    inputContainerPesquisa: {
        backgroundColor: '#fff',
        borderWidth: 1,
        maxHeight: 30,
        padding: 10,
        margin: 1,
        fontFamily: commomStyles.fontFamily
    },
    usuarios: {
        marginTop: '5%',
        width: 420,
        alignItems: 'center',
        justifyContent: 'center'
    },
    usuario: {
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icone: {
        fontSize: 24,
        marginRight: '90%'
    },
    nome: {
        color: '#111',
        fontSize: 20
    },
    logoutIcon: {
        marginTop: 50
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontFamily: commomStyles.fontFamily,
        borderBottomWidth: 2,
        marginBottom: 5
    },
    semAnuncio: {
        fontSize: 24,
        fontFamily: commomStyles.teste.fontFamily,
        justifyContent: 'center',
        textAlign: 'center'
    },
    background: {
        width: 300,
        height: 200
    }
})

const mapStateToProps = ({ classificado }) => {
    return {
        grupo: classificado.classificado
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClassificado: (classif) => dispatch(classificado(classif))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Classificados)