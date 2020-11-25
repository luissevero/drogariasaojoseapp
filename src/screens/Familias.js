import React, {Component} from 'react'
import {SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator}  from 'react-native'
import Navigation from '../navigator'
import axios from 'axios'
import moment from 'moment'

import {connect} from 'react-redux'
import {DEPARTAMENTOS} from '../../config'
import {server, showError} from '../common'
import Familia from '../components/Familia'
import commomStyles from '../commomStyles'

const estadoInicial = {
    familias: [],
    empresa: null,
    loading: true  
}

class Familias extends Component {

    state = {
        ...estadoInicial
    }  

    mostraCategoria = (descricao) => {
        Alert.alert("Familia", `${descricao}`)
        
    }
    
    //chamar a função para mostrar as famílias quando o componente for montado
    componentDidMount = async () => {
        await this.setEmpresa(this.props.empresa.Chave)
        await this.loadFamilias()
        this.setState({loading: false})
    }

    setEmpresa = (empresa) => {
        this.setState({empresa})
    }

    loadFamilias = async () => {
        try{
            const res = await axios.get(`${server}/familias/${this.state.empresa}`)
            this.setState({familias: res.data})
        }catch(e){
            //showError(e)
        }       
    }

    abrirFamilia = async (item) => {
        //await Alert.alert("Produto", `${item.Descricao}`)
        this.props.familia(item)
    }

    renderLoading = () => {
        return (
            <ActivityIndicator size='large' color={commomStyles.colors.eaCinzaEscuro}/>
        )
    }

    render(){
        return(
                <SafeAreaView style={styles.container}>
                    <Text style={styles.titulo}>{DEPARTAMENTOS}</Text>
                    {this.state.loading && 
                        this.renderLoading()
                    }
                    <FlatList data={this.state.familias}
                        numColumns={2}
                        keyExtractor={item => `${item.Chave}`}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => <Familia {...item} familia={() => this.abrirFamilia({...item})} selecionaCategoria={() => this.mostraCategoria(item.Chave)}/>}
                    />
                </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#eee',
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
        margin: 12,
        padding: 12,
        flexBasis: 0,
        width: 100,
        height: 100,
        borderRadius: 80
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontFamily: commomStyles.fontFamily,
        borderBottomWidth: 2,
        marginBottom: 5
    }
})

const mapStateToProps = ({ empresa }) => {
    return {
        empresa: empresa.empresa
    }
}

export default connect(mapStateToProps, null)(Familias)

//<Familia {...item} selecionaCategoria={() => this.mostraCategoria(item.Chave)}/>}