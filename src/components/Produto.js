import React from 'react'
import {View, Image, StyleSheet, Text, TouchableOpacity, Alert, Platform} from 'react-native'
import {Button} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import semImagem from '../assets/produtos/coca.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faShoppingCart, faInfo } from '@fortawesome/free-solid-svg-icons'

import {CAMINHO_FOTOS} from '../../config'
import Util from '../classes/Util'

import BootstrapStyleSheet from 'react-native-bootstrap-styles'

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888';

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



if(Platform.OS === 'android') { // only android needs polyfill
    require('intl') // import intl object
    require('intl/locale-data/jsonp/pt-BR') // load the required locale details
}

export default props => {
        
    const addCarrinho = async (descricao, preco, chave) => {
        
        let keys = []
        let produto = {
            chave,
            descricao,
            preco    
        }

        //verificar se existe um item com a chave itens carrinho
        keys = await AsyncStorage.getAllKeys()
        if(keys.indexOf('itensCarrinho') != -1){
            AsyncStorage.mergeItem('itensCarrinho', JSON.stringify(produto))
            AsyncStorage.mergeItem('qtdProdutos', '2')
            Alert.alert("Carrinho", `Mais um item adicionado: ${chave}`)
        }else{
            AsyncStorage.setItem('itensCarrinho', JSON.stringify(produto))
            AsyncStorage.setItem('qtdProdutos', '1')
            Alert.alert("Carrinho", `${descricao} adicionado ao carrinho!`)
        }
        
    }

    const carregarImagem = (chave) => {
        let chaveAlt = Util.completarZerosEsquerda(chave, 6)
        const caminhoAbs = `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`
        if(caminhoAbs){
            return caminhoAbs
        }else{
            return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
        }  
    }

    const onErrou = (error) => {
        return semImagem
    }

    return (
        <View style={styles.container}>
           
            <View style={styles.containerImagem}>
                <TouchableOpacity onPress={() => props.produtoDetalhe(props.Descricao)}>
                    <Image
                        style={styles.imagem} 
                        source={{
                           uri: Util.urlExists(props.chave),
                        }}
                    />    
                </TouchableOpacity>   
            </View>
            
            <View style={styles.containerPreco}>
                <Text style={styles.preco}>{props.Preco_Venda.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
            </View>
            <View style={styles.containerDescricao}>
                <Text style={styles.titulo}>{props.Descricao}</Text>
            </View>
            <View style={styles.botoes}>    
                <Button light onPress={() => props.clicar(props.quantidade)} style={styles.botaoAdd}>
                    <TouchableOpacity onPress={() => props.clicar(props.quantidade)}>
                        <FontAwesomeIcon icon={faShoppingCart} color="#000" size={20} />
                    </TouchableOpacity>
                </Button>
                <Button light onPress={() => props.clicar(props.quantidade)} style={styles.botaoAdd}>
                    <TouchableOpacity onPress={() => props.produtoDetalhe(props.Descricao)}>
                        <FontAwesomeIcon icon={faInfo} color="#000" size={20} />
                    </TouchableOpacity>
                </Button>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.2,
        borderBottomColor: '#da1600',
        marginTop: 1,
        width: c.DIMENSIONS_WIDTH / 2
    },
    containerImagem: {
        width: c.DIMENSIONS_WIDTH / 4,
        height: c.DIMENSIONS_HEIGHT / 4,
        alignContent: 'center',
        justifyContent: 'center'
    },
    containerPreco: {
        height: c.DIMENSIONS_HEIGHT / 10,
        backgroundColor: '#343436',
        width: c.DIMENSIONS_WIDTH / 2,
        justifyContent: 'center'
    },
    containerDescricao: {
        width: c.DIMENSIONS_WIDTH / 3,
        height: c.DIMENSIONS_HEIGHT / 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 110,
        height: 110
    }, 
    titulo: {
        fontSize: 12,
        fontWeight: 'bold', 
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center'
    },
    preco: {
        fontSize: 16,
        color: '#fff',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    botoes: {
        flexDirection: 'row'
    },
    botaoAdd: {
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 3,
        marginRight: 3,
        height: 40,
        width: 40
    }
})

//<Text style={styles.preco}>{props.Preco_Venda.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
/*
                <NumericInput 
                    initValue={1}
                    value={props.value} 
                    minValue={0} 
                    maxValue={10} 
                    borderColor={'#fff'} 
                    leftButtonBackgroundColor={'#C7CBD6'}
                    rightButtonBackgroundColor={'#C7CBD6'}        
                    iconStyle={{ fontSize: 12, color: '#434A5E' }}
                    inputStyle={{ fontSize: 14, color: '#434A5E' }}
                    onChange={props.alteraQtd}
                />

<Image 
                        style={styles.imagem} 
                        source={{
                            uri: `${carregarImagem(props.chave)}`,
                        }}
                        
                    />    

                */