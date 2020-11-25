import React, {Component} from 'react'
import {SafeAreaView, 
        View, 
        Text, 
        StyleSheet, 
        FlatList, 
        TouchableOpacity, 
        Alert, 
        ScrollView,
        Platform,
        RefreshControl
    } from 'react-native'
import axios from 'axios'
import {server, serverLocal, showError} from '../common'
import {CAMINHO_SERVIDOR, CAMINHO_CLASSIFICADOS, MOSTRAR_CLASSIFICADOS, CLASSIFICADOS} from '../../config'
import {connect} from 'react-redux'
import {login} from '../store/actions/empresa'
import commomStyles from '../commomStyles'

import Cabecalho from '../components/Cabecalho'
import RenderLoading from '../components/RenderLoading'

import BootstrapStyleSheet from 'react-native-bootstrap-styles'
import { Container, Header, Content, Accordion, Card, CardItem, Body, Footer } from "native-base"

const estadoInicial = {
    refrescar: false,
    empresas: [],
    produtos: [],
    comprasRealizadas: [],
    itensCompra: [],
    itens: 0,
    empresa: [],
    classificados: [],
    tiposClassificados: [],
    galleryIndex: null,
    grupo: 0,
    parametros: [],
    loading: true,
    loadingEmpresas: true 
}

/***** bootstrap *****/
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


class ComprasRealizadas extends Component {

    state = {
        ...estadoInicial
    }


    //chamar a função para mostrar as famílias quando o componente for montado
    componentDidMount = async () => {
        await this.loadComprasRealizadas()
        await this.loadItensCompra()
        await this.setState({loading: false})
    }
    /*
    componentDidUpdate = async () => {
        await this.setState({comprasRealizadas: [], itensCompra: []})
        await this.loadComprasRealizadas()
        await this.loadItensCompra()
        
    }
    */
    loadComprasRealizadas = async () => {
        try{
            const res = await axios.get(`${server}/comprasrealizadas/${this.props.pessoa}`)
            await this.setState({comprasRealizadas: res.data})
        }catch(e){
            try{
                const resLocal = await axios.get(`${serverLocal}/comprasrealizadas`)
                this.setState({empresas: resLocal.data})    
            }catch(err){    
                showError(err)
            }
        }       
    }

    loadItensCompra = async () => {
        try{
            const res = await axios.get(`${server}/comprasrealizadaspessoa`)
            await this.setState({itensCompra: res.data})
        }catch(e){
            Alert.alert(e)
        }
    }

    imprimirItens = async () => {
        try{
            this.state.itensCompra.map(async item => {
                await Alert.alert(item.Descricao)
            })
        }catch(e){
            Alert.alert(e)
        }
    }

    onRefrescar = async () => {
        await this.setState({refrescar: true})
        await this.forceUpdate()
        await this.setState({refrescar: false})
        /*
        this.wait(1000).then(async () => {
            this.forceUpdate()
            await this.setState({refrescar: false})
            //Alert.alert("Página refrescada")    
        })     
        */   
    }

    wait = (timeout) => {
        return new Promise(resolve => {
          setTimeout(resolve, timeout)
        })
      }

      abrirMenu = () => {
          this.props.navigation.openDrawer()
      } 


    render(){
        return(
                <ScrollView 
                    refreshControl={<RefreshControl refreshing={this.state.refrescar} onRefresh={() => this.onRefrescar()} />}
                    style={[s.body], {backgroundColor: commomStyles.colors.primary}}
                > 
                    {this.state.loading &&
                        <RenderLoading />
                    }
                    <Cabecalho abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')}/>
                    <Header style={styles.titulo}>
                        <Text>Compras Realizadas</Text>
                    </Header>
                    
                    
                    <FlatList
                      ListEmptyComponent={<View><Text style={{textAlign: 'center'}}>Sem produtos</Text></View>}
                      ItemSeparatorComponent={
                        Platform.OS !== 'android' &&
                        (({ highlighted }) => (
                        <View
                            style={[
                            style.separator,
                            highlighted && { marginLeft: 0 }
                            ]}
                        />
                        ))
                       }
                        data={this.state.comprasRealizadas}
                        keyExtractor={item => `${item.Chave}`}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                    
                            <Container style={styles.containerCompra}>
                            <Header style={styles.compraCabecalho}>
                                <Text>Nº {item.Nota_Fiscal} </Text>
                                <Text> Chave: {item.Chave}</Text>
                            </Header>
                            <Content>
                                <Card>
                                <CardItem style={styles.compraCorpo}>
                                    <Body>
                                        <CardItem header>
                                            <Text> ChaveMov </Text>
                                            <Text> Chave </Text>
                                            <Text> Quantidade </Text>
                                            <Text> Valor Unitário </Text>
                                            <Text> Valor Total </Text>
                                        </CardItem>
                                        {this.state.itensCompra.map(itemcompra => (

                                        <View key={itemcompra.Chave} style={styles.compraItem}>                                                   
                                            {item.Chave.toString() == itemcompra.ChaveMov.toString() &&
                                                <Text>{itemcompra.Chave} </Text>
                                            }
                                            {item.Chave.toString() == itemcompra.ChaveMov.toString() &&
                                                <Text> {itemcompra.ChaveMov}</Text>
                                            }
                                            {item.Chave.toString() == itemcompra.ChaveMov.toString() &&
                                                <Text> {itemcompra.Quantidade} </Text>
                                            }
                                            {item.Chave.toString() == itemcompra.ChaveMov.toString() &&
                                                <Text> {itemcompra.Valor_Unitario.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} </Text>
                                            }
                                            {item.Chave.toString() == itemcompra.ChaveMov.toString() &&
                                                <Text> {itemcompra.Valor_Total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} </Text>        
                                            }
                                            </View>
                                            
                                        ))}
                                    
                                    </Body>
                                </CardItem>
                            </Card>
                            </Content>
                            <Footer style={styles.compraRodape}>
                                <Text> Total: {item.Total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} </Text>
                            </Footer>
                            </Container>
                    
                        
                        }
                    />
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commomStyles.colors.eaCinzaEscuro,
        //flex: 1,
        height: '100%'
    },
    titulo: {
        textAlign: 'center',
        height: c.DIMENSIONS_HEIGHT / 10,
        marginBottom: 10,
        backgroundColor: commomStyles.colors.primary
    },
    containerCompra: {
        height: c.DIMENSIONS_HEIGHT / 3,
        marginBottom: c.DIMENSIONS_HEIGHT / 20
    },
    compraCabecalho: {
        backgroundColor: commomStyles.colors.saojose,
        height: c.DIMENSIONS_HEIGHT / 13
    },
    compraCorpo: {
        //height: c.DIMENSIONS_HEIGHT / 30
    },
    compraItem: {
        flexDirection: 'row'
    },
    compraRodape: {
        backgroundColor: commomStyles.colors.secondary,
        height: c.DIMENSIONS_HEIGHT / 13
    },
    parcela: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10
    }, 
})

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (empresa) => dispatch(login(empresa))
    }
}

const mapStateToProps = ({ user, produtos, empresa }) => {
    return {
        carrinho: produtos.produtos,
        pessoa: user.chave,
        empresa: empresa.empresa
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(ComprasRealizadas)
/*
<Card
                                    title={null}
                                    imageStyle={styles.bannerImagem}
                                    image={{uri: `${CAMINHO_CLASSIFICADOS}/${item.url}`}}
                                    containerStyle={{padding: 0, width: 210, backgroundColor: commomStyles.colors.eaCinza }}
                                    >
                                        <Text style={styles.tituloClassificado}>{item.descricao}</Text>
                                    </Card>
*/