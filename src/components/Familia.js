import React from 'react'
import {View, StyleSheet, Text, Alert, TouchableOpacity, Image} from 'react-native'
import commonStyles from '../commomStyles'
import {CAMINHO_SERVIDOR} from '../../config'
import Util from '../classes/Util'

function listarProdutos(){
    Alert.alert("Familia", "familia selecionada: ")
}

const carregarImagem = (chave) => {
    let chaveAlt = Util.completarZerosEsquerda(chave, 6)
    const caminhoAbs = `${CAMINHO_SERVIDOR}/GP${chaveAlt}.png`
    if(caminhoAbs){
        return caminhoAbs
    }else{
        return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
    }  
  }


export default props => { 

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                style={styles.container} 
                onPress={() => props.familia()}>
                <View>
                    <Image 
                        style={styles.imagem}
                        resizeMode={'stretch'} 
                        source={{
                        uri: `${carregarImagem(props.Chave)}`,
                    }}
                    />
                    <View style={styles.bkgTitulo}>
                        <Text style={styles.titulo}>{props.Descricao}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 160,
        height: 180,
        borderRadius: 2,
        opacity: .9,
        backgroundColor: '#eee'
    },
    bkgTitulo: {
        marginTop: 1
    },
    
    titulo: {
        fontFamily: commonStyles.teste.fontFamily,
        color: '#000',
        backgroundColor: '#fff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 40,
        width: 160,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        fontSize: 10
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        flexBasis: 0
    },
    imagem: {
        width: 160,
        height: 140,
        margin: 0,
        padding: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    }
})