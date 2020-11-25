/*This is an Example to make a View Like Android Fragment in React Native*/
import React, {Component} from 'react';
import { Text, View, StyleSheet, FlatList, Alert, ScrollView, Image, TouchableOpacity} from 'react-native'
import Cabecalho from '../components/Cabecalho'
import axios from 'axios'
import {connect} from 'react-redux'
import {logout} from '../store/actions/user'
import {add, produtoDetalhe} from '../store/actions/produto'
import {server, showError} from '../common'

import RenderLoading from '../components/RenderLoading'
import ItemMenu from '../components/ItemMenu'

import imagem from '../images/logosaojosenew.png'
import contas_aberto from '../images/contas_aberto.jpg'
import compras_realizadas from '../images/compras_realizadas.png'

import {PRODUTOS, PROMOCOES, DEPARTAMENTOS, NOME_EMPRESA} from '../../config'
import commonStyles from '../commomStyles'
import moment from 'moment'
import Util from '../classes/Util'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

import OneSignal from 'react-native-onesignal'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableHighlight } from 'react-native-gesture-handler';

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

const estadoInicial = {
    val: 1, 
    estaPesquisando: false, 
    qtdProdutos: 1,
    produto: [],
    familia: [],
    pesquisa: '',
    empresa: [],
    cliente: null,
    numeroColunas: 2,
    total: 0,
    loading: true
}

class Home extends Component {
  constructor(props) {
    super(props);
    //state to manage the screen visible at a time
    this.state = { 
      val: props.val, 
      estaPesquisando: false, 
      qtdProdutos: 0,
      produtos: [],
      familia: [],
      pesquisa: '',
      empresa: 1,
      numeroColunas: 2,
      porPagina:  6,
      pagina: 0,
      loading: true,
      fimAtingido: false,
      total: 0,
      itensMenu: [
        {
          chave: 1,
          logo: contas_aberto,
          titulo: 'Parcelas em aberto',
          url: 'ParcelasAberto'
        },
        {
          chave: 2,
          logo: compras_realizadas,
          titulo: 'Compras Realizadas',
          url: 'ComprasRealizadas'
        },
        {
          chave: 3,
          logo: imagem,
          titulo: 'Programa de Pontos',
          url: 'ProgramaPontos'
        },
        {
          chave: 4,
          logo: imagem,
          titulo: 'Promoções',
          url: 'Promocoes'
        },
      ]
    };
  }
    
  state = { 
      ...estadoInicial
  }

  componentDidMount(){
    /*
    OneSignal.init('')
    OneSignal.addEventListener('received', this.receivedPush)
    OneSignal.addEventListener('opened', this.openedPush)
    OneSignal.addEventListener('ids', this.idsPush)
    */
    //this.loadProdutos()
    this.setState({ loading: false })
  }

  receivedPush(push){
    Alert.alert(`Received Push: ${push}`)
  }

  openedPush(push){
    Alert.alert(`Opened Push: ${push}`)
  }

  idsPush(push){
    Alert.alert(`IDs Push: ${push}`)
  }

  loadProdutos = async () => {
      //await this.setState({empresa: this.props.empresa.Chave})
      const { pagina } = this.state
      const {porPagina} = this.state
      if(this.state.pesquisa != ''){
          //Alert.alert("Aqui", `${server}/produtos/${this.props.empresa.Chave}/${this.state.pesquisa}/${porPagina}/${pagina}`)
          if(this.state.loading && this.state.fimAtingido === false) return 
          try{
              const res = await axios.get(`${server}/produtos/${this.props.empresa.Chave}/${this.state.pesquisa}/${porPagina}/${pagina}`)
              this.setState({produtos: [...this.state.produtos, ...res.data],
                              pagina: pagina + 1, 
                              loading: false
                  })
              if(res.data.length < porPagina){
                  this.setState({fimAtingido: true})
              }
          }catch(e){
              showError(e)
          }

      }else{
          if(this.props.Chave === undefined){
             // if (this.state.loading) return 
                  
              try{
                  const res = await axios.get(`${server}/produtos/${this.props.empresa.Chave}/${porPagina}/${pagina}`) 
                  this.setState({produtos: [...this.state.produtos, ...res.data],
                              pagina: pagina + 1, 
                              loading: false
                              })
                  //Alert.alert("Quantidade de produtos: ", `${res.data.length}`)
              }catch(e){
                  showError(e)
              }       
          }else{
              if(this.state.loading) return 
              try{
                  const res = await axios.get(`${server}/produtos/${this.props.empresa.Chave}/${this.props.Chave}/${porPagina}/${pagina}`)    
                  this.setState({produtos: [...this.state.produtos, ...res.data],
                                  pagina: pagina + 1, 
                                  loading: false
                      }) 
              }catch(e){
                  showError(e)
              }
          }
      }
  }

  loadCarrinho = async () => {
    try{
        await this.setState({carrinho: this.props.carrinho })
    }catch(e){
        showError(e)
    }
  }

  abrirProduto = async (item) => {
    //await Alert.alert("Produto", `${item.Descricao}`)
    //Alert.alert(JSON.stringify(item.Descricao))
    await this.setState({produto: []})
    await this.setState({produto: item})
    //Alert.alert(JSON.stringify(this.state.produto))
    this.props.onProdutoDetalhe({...this.state})
    this.props.navigation.navigate('ProdutoDetalhe')
  }

  addProduto = async (chave, descricao, preco, quantidade, gIcms, un) => {
    let pos = await this.props.carrinho.map(function(e) { return e[0].chave }).indexOf(chave)    
    if(pos == -1){
            var totalProduto = preco * 1
            //Alert.alert(totalProduto)
            await this.incrementCount(totalProduto)
            await this.adicionaCarrinho(chave, descricao, preco, 1, gIcms, un)
            this.props.onProduto({...this.state})
            Alert.alert("Adicionado", "Produto adicionado ao carrinho!")
            await this.setState({carrinho: []})
            await this.loadCarrinho()
        }else{
            Alert.alert("Falha ao adicionar", `${ADICIONADO_ANTERIORMENTE}`)
        }
    }

  adicionaCarrinho = async (chave, descricao, preco, quantidade, gIcms, un) => {
    var qtd = quantidade
    var valorUnitario = preco
    var jeiso = {
                 chave: chave, 
                 descricao: descricao,
                 valorUnitario: valorUnitario,
                 quantidade: qtd,
                 valorTotal: qtd * valorUnitario,
                 gIcms: gIcms,
                 un: un
                }
    await this.setState((state) => {
        return { produto: [jeiso] }
    })
}

incrementCount(preco){
  this.setState((state) => {
      return {total: preco}
  })
}

abrirMenu = async () => {
  //Alert.alert("MENU")
  this.props.navigation.openDrawer()
}

abrirItemMenu = async (url) => {
  await this.props.navigation.navigate(`${url}`)
}

render(){
    return (
      <ScrollView style={styles.container}>
        {this.state.loading &&
          <RenderLoading />
        }
          <Cabecalho abrirMinhaConta={() => this.props.navigation.navigate("MinhaConta")} abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')} abrirlogin={() => this.props.navigation.navigate('Login')}/>
            <FlatList
              ListEmptyComponent={<View><Text>Sem Itens</Text></View>}
              numColumns={2}
              data={this.state.itensMenu}
              keyExtractor={item => `${item.chave}`}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => <ItemMenu logo={item.logo} titulo={item.titulo} clicado={() => this.abrirItemMenu(item.url)}/>}
            />                 
      </ScrollView>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ececec',
    marginBottom: 1,
  },
  cabecalho: {
    flex: 3
  },
  botoes: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 1
  },
  corpo: {
    flex: 17
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: commonStyles.colors.eaCinzaEscuro,
    padding: 7
  },
  botao: {
    fontFamily: commonStyles.fontFamily,
    textAlign: 'center'
  }    
})

const mapDispatchToProps = dispatch => {
  return{
      onProduto: produto => dispatch(add(produto)),
      onProdutoDetalhe: produto => dispatch(produtoDetalhe(produto)),
      onLogout: () => dispatch(logout())
  }
}

const mapStateToProps = ({ user, produtos, empresa }) => {
  return {
      carrinho: produtos.produtos,
      usuario: user.chave,
      empresa: empresa.empresa
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
