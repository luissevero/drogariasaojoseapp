import React, {Component} from 'react'
import {View, StyleSheet, FlatList, Text, Alert, TouchableOpacity, RefreshControl, ScrollView} from 'react-native'
import axios from 'axios'
import {server, showError} from '../common'
import RenderLoading from '../components/RenderLoading'

import moment from 'moment'
import 'moment/locale/pt-br'
import commomStyles from '../commomStyles'
import Cabecalho from '../components/Cabecalho'


const estadoInicial = {
    contasAberto: [],
    contador: 0,
    refrescar: false,
    loading: true
}

class ParcelasAberto extends Component {
    
    state = {
        ...estadoInicial
    }

    componentDidMount(){
        this.loadParcelasAberto()
        this.setState({loading: false})
    }

    loadParcelasAberto = async () => {
        try{
            const res = await axios.get(`${server}/contasemaberto/1571`)
            await this.setState({contasAberto: res.data })
            await this.setState({contador: res.data.length})
            //Alert.alert(this.state.contador)
        }catch(e){
            showError(e)
        }
    }

    detalheParcela = (chave) => {
        Alert.alert()
    }

    onRefrescar = async () => {
        await this.setState({refrescar: true})
        this.wait(1000).then(async () => await this.setState({refrescar: false}))        
    }

    wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout)
        });
      }
    abrirMenu = () => {
        this.props.navigation.openDrawer()
    }
    render() {
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={this.state.refrescar} onRefresh={() => this.onRefrescar()} /> } >
                {this.state.loading &&
                    <RenderLoading />
                }
                <Cabecalho abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')} abrirlogin={() => this.props.navigation.navigate('Login')} />
                <Text style={styles.titulo}>Parcelas Em Aberto</Text>
                <FlatList
                    data={this.state.contasAberto}
                    keyExtractor={item => `${item.Chave}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) =>
                        <View>
                            <TouchableOpacity onPress={() => this.detalheParcela(item.Chave)}>
                                <View style={styles.parcela}>
                                    <Text>{item.Docto} </Text>
                                    <Text>{moment(item.Vencimento).format('Y-M-D')} </Text>
                                    <Text>{item.Valor.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: '#fff'
    },
    header: {
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.today,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    titulo: {
        textAlign: 'center',
        marginBottom: 20
    },
    parcela: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20

    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    botao: {
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.today
    },
    input: {
        fontFamily: commomStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 16,
        paddingHorizontal: 6,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    date: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 20,
        marginLeft: 16
    }
})

export default ParcelasAberto