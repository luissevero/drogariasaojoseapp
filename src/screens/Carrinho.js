import React, {Component} from 'react'
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, AsyncStorage, ScrollView} from 'react-native'
import { Item, Picker, Button } from 'native-base'
import {connect} from 'react-redux'
import axios from 'axios'
import moment from 'moment'
import {limpar, remove, selecionaFrete, removeFrete} from '../store/actions/produto'
import {server, showError, showSuccess} from '../common'
import ProdutoCarrinho from '../components/ProdutoCarrinho'
import Cabecalho from '../components/Cabecalho'
import commonStyles from '../commomStyles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBan, faShoppingBag, faArrowDown} from '@fortawesome/free-solid-svg-icons'

if(Platform.OS === 'android') { // only android needs polyfill
    require('intl') // import intl object
    require('intl/locale-data/jsonp/pt-BR') // load the required locale details
}

const estadoInicial = {
    produtos: [],
    totalProdutos: 0,
    usuario: '',
    chave: null,
    chavemov: null,
    posicao: 0,
    totalProduto: 0,
    condicoes: [],
    condicao: null,
    tiposEntrega: [],
    tipoEntrega: null,
    grupoIcms: [],
    tiposFrete: [],
    frete: 0
}



class Carrinho extends Component {
    
    state = {
        ...estadoInicial
    }

    //chamar a função para mostrar as tarefas concluidas quando o componente for montado
    componentDidMount = async () => {
        await this.loadProdutos()
        await this.loadUsuario()
        await this.loadCondicoes()
        await this.loadTiposEntrega()
    }

    abrirMenu = () => {
        this.props.navigation.openDrawer()
    }

    //função chamada sempre que for alterada a condição de pagamento
    async onValueChange2(value) {
        await this.setState({
          condicao: value
        })
    }
    
    // Lista de condições de pagamento
    listaCondicoes = () => {
        return( this.state.condicoes.map( (x,i) => { 
              return( <Picker.Item label={x.descricao} key={i} value={x.chave}  />)} ))
    }

    async onValueChange(value) {
        await this.setState({
            tipoEntrega: value
        })
        if(value == 2){
            await this.loadFretes()
        }else{
            await this.setState({tiposFrete: [], frete: 0})
            await this.props.onRemoveFrete()
        }
    }

    async onFreteChange(value) {
        await this.setState({
            frete: value
        })
        await this.props.onFrete({...this.state})
    }
        
    // Lista de tipos de entrega
    listaTiposEntrega = () => {
        return( this.state.tiposEntrega.map( (x,i) => { 
            return( <Picker.Item label={x.descricao} key={i} value={x.chave}  />)} ))
    }

    loadProdutos =  async () => {
        try{
            await this.setState({produtos: this.props.carrinho })
            await this.setState({totalProdutos: this.props.totalProdutos })
        }catch(e){
            showError(e)
        }
    }

    listaFretes = () => {
        return( this.state.tiposFrete.map( (x,i) => { 
            return( <Picker.Item label={x.descricao+' - '+x.valor_frete.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} key={i} value={x.valor_frete}  />)} ))
    }

    loadUsuario = async () => {
        try{
            await this.setState({usuario: this.props.nome, chave: this.props.chave})
        }catch(e){
            showError(e)
        }
    }

    loadCondicoes = async () => {
        try{
            const res = await axios.get(`${server}/condicoes`)
            this.setState({condicoes: res.data})
        }catch(e){
            showError(e)
        }       
    }

    loadTiposEntrega = async () => {
        try{
            const res = await axios.get(`${server}/tiposentrega`)
            this.setState({tiposEntrega: res.data})
        }catch(e){
            showError(e)
        }
    }

    loadFretes = async () => {
        try{
            const res = await axios.get(`${server}/rotas`)
            this.setState({tiposFrete: res.data})
        }catch(e){
            showError(e)
        }       
    }

    limparCarrinho = async () => {
        try{
            await this.setState({produtos: []})
            await this.setState({totalProdutos: 0})
            this.props.onLimpar({...this.state})
            Alert.alert('Removido', 'Carrinho limpo')
        }catch(e){
            Alert.alert("Erro", "Erro ao limpar o carrinho")
        }
    }

    alterarQuantidade = () => {
        Alert.alert("Quantidade alterada", "Quantidade alterada")
    }

    return = () => {
        this.props.navigation.navigate('Carrinho')
    }

    removerItem = async (posicao, totalProduto) => {
        await this.setState({posicao, totalProduto})
        await this.props.onRemoverItem({...this.state})
        Alert.alert("Removido", "Item removido do carrinho")
    }

    finalizarCompra = async () => {
        try{
            if(this.props.chave){
                const resCod = await axios.get(`${server}/codigos`)
                let proximo = await resCod.data.proximo
                const resMov = await axios.get(`${server}/movimentacao`)
                let chaveMov = await resMov.data.chave
                chaveMov++
                const dataHora = moment().format('YYYY-MM-DD HH:mm:ss')
                const data = moment().format('YYYY-MM-DD')    
                await axios.post(`${server}/movimentacao`, {
                    tipo: 'P',
                    valorFrete: this.state.frete,
                    empresa: this.props.empresa.Chave,
                    notaFiscal: proximo,
                    dadosAdic: 'Pedido Feito Pelo Site',
                    subTotal: this.state.totalProdutos + this.state.frete,
                    valorProdutos: this.state.totalProdutos,
                    total: this.state.totalProdutos + this.state.frete,
                    nomePessoa: this.state.usuario,
                    pessoa: this.props.chave,
                    condicao: this.state.condicao,
                    emissao: moment().format(),
                    lancamento: moment().format(),
                    dataSaida: moment().format(),
                    tipoEntrega: this.state.tipoEntrega
                })
                    
                await this.state.produtos.forEach(adicionaItens)
                    
                proximo++
                await axios.put(`${server}/codigos`, {
                    proximo: proximo
                })
                    
                showSuccess('Compra efetuada com sucesso!')
                await this.setState({produtos: []})
                await this.setState({totalProdutos: 0})
                this.props.onLimpar({...this.state})
            }else{
                Alert.alert("Fazer Login", "Faça login para poder finalizar o seu pedido!")
            }               
            
        }catch(e){
            showError(e)
        }

        async function adicionaItens(element, index, array) {
            try{
                const resMov = await axios.get(`${server}/movimentacao`)
                let chaveMov = await resMov.data.chave
                const resGIcms = await axios.get(`${server}/grupoicms/${element[0].gIcms}`)
                let situacaoTributaria = resGIcms.data.Situacao_Tributaria
                console.log(situacaoTributaria)
                    
                await axios.post(`${server}/movitens`, {
                    chavemov: chaveMov,
                    descricao: `${element[0].descricao}`,
                    codigoProduto: element[0].chave,
                    quantidade: element[0].quantidade,
                    valorUnitario: element[0].valorUnitario,
                    valorTotal: element[0].valorTotal,
                    situacaoTributaria: situacaoTributaria,
                    un: `${element[0].un}`
                })
                    
            }catch(e){
                showError(e)
            }
        }
        
    }
    
    render() {

        return (
            <View style={styles.background}>
            
                <Cabecalho abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')} abrirlogin={() => this.props.navigation.navigate('Auth')}/>
                <ScrollView>
                    <Text style={styles.titulo}>Meu Carrinho</Text>
                    <View style={styles.cabecalhoCarrinho}>
                        <Text style={[styles.cabecalhoCarrinhoItem], {width: '42%', marginLeft: 8}}>Produto</Text>
                        <Text style={styles.cabecalhoCarrinhoItem}>Qtd</Text>
                        <Text style={styles.cabecalhoCarrinhoItem}>Unid.</Text>
                        <Text style={styles.cabecalhoCarrinhoItem}>V. Total</Text>
                    </View>

                    <View style={styles.flat}>
                        <FlatList 
                            data={this.props.carrinho} 
                            keyExtractor={item => `${item[0].chave}`}
                            renderItem={({item, index}) => <ProdutoCarrinho apagar={() => this.removerItem(index, item[0].valorTotal)} {...item[0]} /> }
                        />
                    </View>
                    <View style={styles.condicao}>
                    <Text>Tipo de Entrega</Text>
                        <Item picker>
                            <Picker
                                mode='dropdown'
                                iosIcon={<FontAwesomeIcon icon={faArrowDown} />}
                                style={{ width: 80, height: 25 }}
                                placeholder="Selecione a condição de pagamento"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.tipoEntrega}
                                onValueChange={this.onValueChange.bind(this)}
                            >
                                {this.listaTiposEntrega() }
                            </Picker> 
                        </Item>
                        <Text>Local</Text>
                        <Item picker>
                            <Picker
                                mode='dropdown'
                                iosIcon={<FontAwesomeIcon icon={faArrowDown} />}
                                style={{ width: 80, height: 25 }}
                                placeholder="Selecione o local"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.frete}
                                onValueChange={this.onFreteChange.bind(this)}
                            >
                                {this.listaFretes() }
                            </Picker> 
                        </Item>      
                        <Text>Condição de pagamento</Text>
                        <Item picker>
                            <Picker
                                mode='dropdown'
                                iosIcon={<FontAwesomeIcon icon={faArrowDown} />}
                                style={{ width: 80, height: 25 }}
                                placeholder="Selecione a condição de pagamento"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.condicao}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                {this.listaCondicoes() }
                            </Picker> 
                        </Item>
                    </View>       
                    <View style={styles.valoresTotais}>                       
                    <Text style={styles.texto}>V. Produtos: {this.props.total === 0 ? 'R$0,00' : `${this.props.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`}</Text>
                    <Text style={styles.texto}>    V. Frete: {this.state.frete === 0 ? 'R$0,00' : `R$${this.state.frete},00`}</Text>
                    <Text style={styles.texto}>    V. Total: {(this.props.total + this.props.frete) === 0 ? 'R$0,00' : `${(this.props.total + this.props.frete).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`}</Text>
                    </View>  
                    <View style={styles.rodape}>   
                        {this.state.totalProdutos > 0 &&
                            <Button danger style={styles.botaoFinalizar} onPress={() => this.limparCarrinho()}>
                                <FontAwesomeIcon icon={faBan} size={15} color='#000'/>
                                <Text style={styles.texto}>Limpar Carrinho</Text>        
                            </Button>
                        }  
                        {this.state.totalProdutos > 0 &&
                        <Button success style={styles.botaoFinalizar} onPress={this.finalizarCompra}>
                            <FontAwesomeIcon style={styles.icone} icon={faShoppingBag} size={15} color='#000'/>
                            <Text style={styles.texto}>Finalizar compra</Text>
                        </Button>
                        }
                    </View> 
                </ScrollView>
        </View>
                   
        )
    }
}

const styles = StyleSheet.create({
    background: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        borderBottomWidth: 2,
        marginBottom: 5
    },
    texto: {
        fontSize: 12,
        fontFamily: commonStyles.fontFamily
    },
    usuarios: {
        marginTop: '5%',
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    usuario: {
        marginBottom: 40,
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
    cabecalhoCarrinho: {
        flexDirection: 'row',
        marginBottom: 3,
        backgroundColor: '#eee',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cabecalhoCarrinhoItem: {
        marginHorizontal: 10
    },
    cabecalhoItens: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 6,
        alignItems: 'center',
        justifyContent: 'space-between'      
    },
    carrinhoItens: {
        marginLeft: 6,
        fontSize: 10,
        marginRight: 6,
        marginTop: 5,
        marginBottom: 5
    },
    botaoLimpar: {
        backgroundColor: '#f00',
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center',
        padding: 4,
        marginHorizontal: 6
    },
    botaoFinalizar: {
        padding: 5, 
        marginHorizontal: 3, 
        borderRadius: 6,
        flexDirection: 'row',
        borderRadius: 8,
        alignItems: 'center'
    },
    icone:{
        marginRight: 3
    },
    condicao: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        fontFamily: commonStyles.teste.fontFamily,
        marginLeft: 5,
        marginTop: 5
    },
    valoresTotais: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3
    },
    rodape: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 1
    },
    flat: {
        maxHeight: '42%'
    }
})

const mapDispatchToProps = dispatch => {
    return{
        onLimpar: () => dispatch(limpar()),
        onRemoverItem: (item) => dispatch(remove(item)),
        onFrete: (frete) => dispatch(selecionaFrete(frete)),
        onRemoveFrete: () => dispatch(removeFrete())
    }
}

const mapStateToProps = ({ produtos, user, empresa }) => {
    return {
        total: produtos.totalVenda, carrinho: produtos.produtos, frete: produtos.frete, totalProdutos: produtos.totalProdutos,
        nome: user.name, chave: user.chave,
        empresa: empresa.empresa
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carrinho)

/*
<Button danger style={styles.botaoFinalizar} onPress={() => this.limparCarrinho()}>
                            <Icon style={styles.icone} name='ban' size={15} color='#000'/>
                            <Text style={styles.texto}>Limpar Carrinho</Text>        
                        </Button>
*/