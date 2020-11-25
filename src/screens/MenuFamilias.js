import React, {Component} from 'react'
import {SafeAreaView, Text, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native'
import axios from 'axios'

import commonstyles from '../commomStyles'
import {server, showError} from '../common'
import {connect} from 'react-redux'
import MenuFamilia from '../components/MenuFamilia'

const estadoInicial = {
    familias: [],
    familia: null  
}

class MenuFamilias extends Component {

    state = {
        ...estadoInicial
    }  

    //chamar a função para mostrar as famílias quando o componente for montado
    componentDidMount = async () => {
        await this.setState({familia: this.props.empresa.Chave})
        this.loadFamilias()
    }

    loadFamilias = async () => {
        try{
            const res = await axios.get(`${server}/familias/${this.state.familia}`)
            this.setState({familias: res.data})
        }catch(e){
            showError(e)
        }       
    }

    mostraCategoria = (descricao) => {
        Alert.alert("Familia", `${descricao}`)
    }

    teste(descricao) {
        Alert.alert("Familia", `${descricao}`)
    }


    render(){
        return(
                <SafeAreaView style={styles.container}>
                    <FlatList data={this.state.familias}
                        keyExtractor={item => `${item.Chave}`}
                        renderItem={({item}) => <MenuFamilia {...item} selecionaCategoria={() => this.mostraCategoria(item.Descricao)}/>}
                    />
                </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: 10,
        marginLeft: 15
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
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontFamily: commonstyles.teste.fontFamily,
        marginBottom: 8,
        marginTop: 10
    }
})

const mapStateToProps = ({ empresa }) => {
    return {
        empresa: empresa.empresa
    }
}

export default connect(mapStateToProps, null)(MenuFamilias)

