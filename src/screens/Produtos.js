import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, Alert, TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {connect} from 'react-redux'
import {Header, Icon, Item, Input} from 'native-base'

import {PRODUTOS, ADICIONADO_ANTERIORMENTE} from '../../config'
import {add} from '../store/actions/produto'
import {pesquisar} from '../store/actions/pesquisa'
import Produto from '../components/Produto'
import {server, showError} from '../common'
import commomStyles from '../commomStyles'
import 'react-native-gesture-handler'

import  {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'

const estadoInicial = {
    produto: [],
    produtos: [],
    mostrarPesquisa: false,
    total: 0,
    value: 1,
    qtdProdutos: 1,
    porPagina:  5,
    pagina: 0,
    fimAtingido: false,
    loading: false,
    pesquisa: '',
    pesquisaTemp: '',
    empresa: 2,
    carrinho: [],
    produtosPesquisa: []
}

class Produtos extends Component {

    state = {
        ...estadoInicial
    }

    //chamar a função para mostrar as tarefas concluidas quando o componente for montado
    componentDidMount = async () => {
        await this.loadProdutos()   
    }
    
    componentDidUpdate = async (prevProps, prevState) => {
        if(this.state.pesquisa !== prevState.pesquisa){
            await this.setState({pagina: 0, produtos: []})
            const { pagina } = this.state
            const {porPagina} = this.state
            this.setState({ loading: true })
            try{
                if(this.state.pesquisa != ''){
                const res = await axios.get(`${server}/produtos/${this.props.empresa.Chave}/${this.state.pesquisa}/${porPagina}/${pagina}`)
                this.setState({produtos: [...this.state.produtos, ...res.data],
                                pagina: pagina + 1, 
                                loading: false
                    })
                }else{
                    const res = await axios.get(`${server}/produtos/${this.props.empresa.Chave}/${porPagina}/${pagina}`)
                    this.setState({produtos: [...this.state.produtos, ...res.data],
                        pagina: pagina + 1, 
                        loading: false
                    })
                } 
            }catch(e){
                showError(e)
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

    loadEmpresa = async () => {
        try{
            await this.setState({empresa: this.props.empresa.chave })
        }catch(e){
            showError(e)
        }
    }

    loadProdutos = async () => {
        //await this.setState({empresa: this.props.empresa.Chave})
        const { pagina } = this.state
        const {porPagina} = this.state
        this.setState({ loading: true })
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
                if (this.state.loading) return
                    
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

    renderFooter = () => {
        if (!this.state.loading) return null
        return (
          <View style={styles.loading}>
            <ActivityIndicator size='large' color={commomStyles.colors.eaCinzaEscuro}/>
          </View>
        )
    }

    removerItem = async () => {

    }

   produtoDetalhe = (item) => {
       let desc = item.Grupo1
       Alert.alert("Produto", `${desc}`)
   }

   addProduto = async (chave, descricao, preco, quantidade, gIcms, un) => {
    let pos = await this.props.carrinho.map(function(e) { return e[0].chave }).indexOf(chave)    
    if(pos == -1){
            var totalProduto = preco
            Alert.alert(totalProduto)
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

    incrementCount(preco){
        this.setState((state) => {
            Alert.alert(preco)
            return {total: preco}
        })
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

    abrirProduto = async (item) => {
        //await Alert.alert("Produto", `${item.Descricao}`)
        this.props.produtoDetalhe(item)
    }

    atualizaPesquisa = (pesquisa) => {
        this.setState({ pesquisa })
    }

    pesquisar = async () => {
        await this.setState({pesquisa: this.state.pesquisaTemp, fimAtingido: false})
    }

    render(){
            const pesq = ''
            return(
            <SafeAreaView style={styles.container}>
                <Text style={styles.titulo}>{PRODUTOS}</Text>
                    <Item>
                        <FontAwesomeIcon Icon={faSearch} size={20} color={'#f00'} />
                        <Input 
                            placeholder="Pesquise aqui..." 
                            value={this.state.pesquisaTemp}
                            onChangeText={val => this.setState({pesquisaTemp: val})}
                            onBlur={() => this.pesquisar()}
                        />
                    </Item>
                <FlatList 
                    data={this.state.produtos} 
                    keyExtractor={item => `${item.chave}`}
                    onEndReached={this.loadProdutos}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={this.renderFooter}
                    renderItem={({item}) => <Produto {...item} produtoDetalhe={() => this.abrirProduto({...item})} clicar={() => this.addProduto(item.chave, item.Descricao, item.Preco_Venda, this.state.qtdProdutos, item.G_Icms, item.Unid_med)} /> }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        backgroundColor: '#eee'
    },
    containerPesquisa: { 
        width:'100%', 
        maxHeight: 50,
        backgroundColor: '#eee',
        fontFamily: commomStyles.fontFamily
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

const mapDispatchToProps = dispatch => {
    return{
        onProduto: produto => dispatch(add(produto)),
        onPesquisa: pesquisa => dispatch(pesquisar(pesquisa))
    }
}

const mapStateToProps = ({ empresa, produtos, pesquisa }) => {
    return {
        empresa: empresa.empresa,
        carrinho: produtos.produtos,
        pesquisa: pesquisa.pesquisa
    }
}
/*
const mapStateToProps = ({ empresa }) => {
    return {
        empresa: empresa.empresa
    }
}
*/
export default connect(mapStateToProps, mapDispatchToProps)(Produtos)
/*
<Pesquisar 
isVisible={this.state.mostrarPesquisa}
onCancel={() => this.setState({mostrarPesquisa: false})}
onSave={this.pesquisar}

<Icon name="ios-search" />

/>

                    <SearchBar
                        containerStyle={styles.containerPesquisa}
                        inputContainerStyle={styles.inputContainerPesquisa}
                        placeholder="Pesquise aqui..."
                        onChangeText={this.atualizaPesquisa}
                        onBlur={() => this.pesquisar(pesquisa)}
                        round={true}
                        value={pesquisa}
                    />
*/