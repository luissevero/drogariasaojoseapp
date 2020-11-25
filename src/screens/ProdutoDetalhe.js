import React, {Component} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView} from 'react-native'
import {Button} from 'native-base'
//import NumericInput from 'react-native-numeric-input'

import {connect} from 'react-redux'
import Cabecalho from '../components/Cabecalho'
import GallerySwiper from 'react-native-gallery-swiper'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartPlus} from '@fortawesome/free-solid-svg-icons'

import {ADICIONADO_ANTERIORMENTE} from '../../config'
import {add} from '../store/actions/produto'
import Util from '../classes/Util'
import commomStyles from '../commomStyles'
import {CAMINHO_FOTOS} from '../../config'
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
    galleryIndex: null
}

const carregarImagens = (chave) => {
    //Alert.alert(`chave: ${parseInt(chave)}`)
    let chaveAlt = Util.completarZerosEsquerda(chave, 6)
    return (
    [
        {
            source: { uri: `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`},
            dimensions: { width: 1080, height: 1920 },
            thumbnail: `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`,
            id: 0,
            title: "Imagem do produto 1",
            description: "Imagem 1",
        },
        {
            uri: `${CAMINHO_FOTOS}/PD${chaveAlt}_01.jpg`,
            thumbnail: `${CAMINHO_FOTOS}/PD${chaveAlt}_01.jpg`,
            id: 1,
            title: "Imagem do produto 2",
            description: "Imagem 2",
            // dimensions: { width: 1080, height: 1920 },
        },
        {
            source: { uri: `${CAMINHO_FOTOS}/PD${chaveAlt}_02.jpg`},
            dimensions: { width: 1080, height: 1920 },
            thumbnail: `${CAMINHO_FOTOS}/PD${chaveAlt}_02.jpg`,
            id: 2,
            title: "Imagem do produto 3",
            description: "Imagem 3",
        },
        {
            uri: `${CAMINHO_FOTOS}/PD${chaveAlt}_03.jpg`,
            thumbnail: `${CAMINHO_FOTOS}/PD${chaveAlt}_03.jpg`,
            id: 3,
            title: "Imagem do produto 4",
            description: "Imagem 4",
            // dimensions: { width: 1080, height: 1920 },
        }
    ])
}

function carregarImagem(chave) {
    let chaveAlt = Util.completarZerosEsquerda(chave, 6)
    const caminhoAbs = `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`
    if(caminhoAbs){
        return caminhoAbs
    }else{
        return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
    } 
}

class ProdutoDetalhe extends Component {
    

    state = {
        ...estadoInicial
    }

    componentDidMount = async () => { 
        await this.loadCarrinho()
    }

    loadCarrinho = async () => {
        try{
            await this.setState({carrinho: this.props.carrinho })
        }catch(e){
            showError(e)
        }
    }

    carregarImagem = (chave) => {
        let chaveAlt = Util.completarZerosEsquerda(chave, 6)
        const caminhoAbs = `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`
        if(caminhoAbs){
            return caminhoAbs
        }else{
            return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
        }  
    }

    carregarTexto = (chave) => {
        let chaveAlt = Util.completarZerosEsquerda(chave, 6)
        const caminhoAbs = `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`
        if(caminhoAbs){
            return caminhoAbs
        }else{
            return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
        }  
    }

    abrirMenu = async () => {
        //Alert.alert("MENU")
        this.props.navigation.openDrawer()
      }

    addProduto = async (chave, descricao, preco, quantidade, gIcms, un) => {
        let pos = await this.state.carrinho.map(function(e) { return e[0].chave }).indexOf(chave)    
        if(pos == -1){
            var total = preco * quantidade
            await this.incrementCount(total)
            await this.adicionaCarrinho(chave, descricao, preco, quantidade, gIcms, un)
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
            return {total: preco}
        })
    }

    
    adicionaCarrinho = async (chave, descricao, preco, quantidade, gIcms, un) => {
        var qtd = quantidade
        var valorUnitario = preco
        var jeiso = {chave: chave, 
                     descricao: descricao,
                     valorUnitario: valorUnitario,
                     quantidade: qtd,
                     valorTotal: qtd * valorUnitario,
                     gIcms: gIcms,
                     un: un
                    }
        await this.setState((state) => {
            return { produto: [...this.state.produto, jeiso] }
        })
    }

    filtrarDescricao(texto){
        const original = texto
        var regex = /(<descricao>)(.*)(descricao>)/
        var filtrado = regex.exec(original)[2]
        var resultado = filtrado.substring(0, filtrado.length - 2)
        return resultado
    }

    filtrarEspecificacao(texto){
        const original = texto
        var regex = /(<especificacao>)(.*)(especificacao>)/
        var filtrado = regex.exec(original)[2]
        var resultado = filtrado.substring(0, filtrado.length - 2)
        return resultado
    }

    voltarParaProdutos(){
        this.props.navigation.navigate('Auth')
    }

    render(){
        return(
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <Cabecalho abrirmenu={() => this.abrirMenu()} onClick={() => this.props.navigation.navigate('Carrinho')} abrirlogin={() => this.props.navigation.navigate('Auth')}/>
                <View style={styles.container}>
                    <View style={styles.cabecalho}>
                        <Text style={styles.tituloCabecalho}>Detalhes do Produto</Text>
                    </View>
                    <View style={styles.corpo}>
                        <View style={styles.tituloTexto}>
                            <Text style={styles.titulo}>{this.props.produto.Descricao}</Text>
                        </View>
                        <GallerySwiper
                            style={styles.galeria}
                            sensitiveScroll={true}
                            initialPage={this.state.galleryIndex}
                            images={carregarImagens(this.props.produto.chave)}
                            onPageSelected={
                                (index) => this.setState({ galleryIndex: index })
                            }
                            // imageComponent={(imageProps, d, i) => {
                            //     // console.log(imageProps);
                            //     return (
                            //         <Image
                            //             {...imageProps}
                            //             // resizeMode="cover"
                            //         />
                            //     );
                            // }}
                            
                            loadMinimal={true}
                            loadMinimalSize={2}
                            // onSingleTapConfirmed={() => console.log("1")}
                            // onDoubleTapConfirmed={() => console.log("2")}
                            // onLongPress={(i, j) => console.log(i, j)}
                        />
                        {this.props.produto.Obs != null && <Text>Descrição: {this.filtrarDescricao(this.props.produto.Obs)}</Text> }
                        {this.props.produto.Obs != null && <Text>Especificações: {this.filtrarEspecificacao(this.props.produto.Obs)}</Text> }
                        <View style={styles.propriedades}>
                            <Text style={styles.preco}>{this.props.produto.Preco_Venda.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
                            <Button primary style={styles.botaoAdd} onPress={() => this.addProduto(this.props.produto.chave, this.props.produto.Descricao, this.props.produto.Preco_Venda, this.state.quantidade, this.props.produto.G_Icms, this.props.produto.Unid_med)}>
                            <TouchableOpacity style={styles.botaoAdd} onPress={() => this.addProduto(this.props.produto.chave, this.props.produto.Descricao, this.props.produto.Preco_Venda, this.state.quantidade, this.props.produto.G_Icms, this.props.produto.Unid_med)}>
                                <FontAwesomeIcon icon={faCartPlus} size={30} color='#000'/>
                            </TouchableOpacity>
                            </Button>
                            <NumericInput 
                                initValue={1}
                                value={this.state.quantidade} 
                                minValue={1} 
                                maxValue={10} 
                                borderColor={'#fff'} 
                                leftButtonBackgroundColor={'#C7CBD6'}
                                rightButtonBackgroundColor={'#C7CBD6'}     
                                iconStyle={{ fontSize: 14, color: '#434A5E' }}
                                inputStyle={{ fontSize: 14, color: '#434A5E' }}
                                onChange={(qtd) => this.setState({quantidade: qtd})}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 2,
        marginBottom: 1
    },
    cabecalho: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    tituloCabecalho: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontFamily: commomStyles.fontFamily,
        borderBottomWidth: 2,
        marginBottom: 8
    },
    voltar: {
        
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
        fontSize: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: commomStyles.teste.fontFamily
    },
    tituloTexto: {
        alignItems: 'stretch',
        justifyContent: 'space-around',
        marginVertical: 8,
        marginHorizontal: 20
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
    }
})

const mapStateToProps = ({ produtos }) => {
    return {
        carrinho: produtos.produtos,
        produto: produtos.produto
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onProduto: produto => dispatch(add(produto))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoDetalhe)

/*
<GallerySwiper
                            // sensitiveScroll={true}
                            initialPage={this.state.galleryIndex}
                            images={[
                                {uri: `${carregarImagem(1)}`},
                                {uri: `${carregarImagem(2)}`},
                                {uri: `${carregarImagem(3)}`},
                                {uri: `${carregarImagem(4)}`},
                                {uri: `${carregarImagem(5)}`}
                            ]}
                            /*onPageSelected={
                                (index) => this.setState({ galleryIndex: index })
                            }
                            // imageComponent={(imageProps, d, i) => {
                            //     // console.log(imageProps);
                            //     return (
                            //         <Image
                            //             {...imageProps}
                            //             // resizeMode="cover"
                            //         />
                            //     );
                            // }}
                            loadMinimal={true}
                            loadMinimalSize={2}
                            // onSingleTapConfirmed={() => console.log("1")}
                            // onDoubleTapConfirmed={() => console.log("2")}
                            // onLongPress={(i, j) => console.log(i, j)}
                        />*/