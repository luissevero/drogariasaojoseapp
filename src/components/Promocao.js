import React from 'react'
import {View, Image, StyleSheet, Text, TouchableOpacity, Alert, Platform} from 'react-native'
import {Button} from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import commonStyle from '../commomStyles'
import DeCron from './DeCron'
import semImagem from '../assets/produtos/coca.jpg'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

import {CAMINHO_FOTOS, CAMINHO_PROMOCOES} from '../../config'
import Util from '../classes/Util'


if(Platform.OS === 'android') { // only android needs polyfill
    require('intl') // import intl object
    require('intl/locale-data/jsonp/pt-BR') // load the required locale details
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

export default props => {

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
            <Text style={styles.fontePreta}>{props.descricao}</Text>
            <Image style={styles.imagem} source={{
                uri: `${CAMINHO_PROMOCOES}${props.url}.png`
            }}/>
            <DeCron fim={props.fim}/>
            <View style={styles.depor}>
              <Text style={styles.fonteBranca}>De: {props.valor_original.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})} Por: {props.valor_promocional.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
              <Text style={styles.fonteBranca}> Desconto de {parseInt(100 - (100 * (props.valor_promocional ? props.valor_promocional : 0.1) / (props.valor_original ? props.valor_original : 0.1)))}%</Text>
              <Text style={styles.fonteBranca}>Ainda {props.quantidade > 1 ? 'restam' : 'resta'} {props.quantidade} {props.quantidade > 1 ? 'unidades' : 'unidade' }</Text>
            </View>
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderRadius: 10,
        width: c.DIMENSIONS_WIDTH * 9/10,
    },
    promocao: {
        backgroundColor: '#ededed',
        borderRadius: 12
    },
    duramais: {
        fontFamily: commonStyle.teste.fontFamily,
        fontSize: 18
    },
    depor: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        minHeight: 50,
        width: '100%',
        paddingHorizontal: 10
    },
    containerImagem: {
        width: '50%',
        alignContent: 'center',
    },
    containerDescricao: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: c.DIMENSIONS_WIDTH * 4/5,
        height: 160,
        borderColor: '#b00',
        borderWidth: 1,
        marginBottom: 5
    }, 
    fonteBranca: {
        color: commonStyle.colors.eaBranco,
        fontSize: 18,
        fontFamily: commonStyle.fontFamily
    },
    fontePreta: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 5
    }
})

