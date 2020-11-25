import React from 'react'
import {View, Image, StyleSheet, Text, TouchableOpacity, Alert, Platform} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faCartArrowDown} from '@fortawesome/free-solid-svg-icons'

import Util from '../classes/Util'
import {CAMINHO_FOTOS} from '../../config'
import commomStyles from '../commomStyles'

if(Platform.OS === 'android') { // only android needs polyfill
    require('intl') // import intl object
    require('intl/locale-data/jsonp/pt-BR') // load the required locale details
}
/*
async function carregarImagem(chave){
    //const enderecoImagem = require(`../assets/produtos/${chave}.jpg`
    let logo = require( `../assets/produtos/${chave}.jpg`)
    if(logo){
        return logo
    }else{
        return Imagem
    }  
}
*/
export default props => {

    const carregarImagem = (chave) => {
        //Alert.alert("Aqui", `${chave}`)
        let chaveAlt = Util.completarZerosEsquerda(chave, 6)
        const caminhoAbs = `${CAMINHO_FOTOS}/PD${chaveAlt}.jpg`
        if(caminhoAbs){
            return caminhoAbs
        }else{
            return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.gif'
        }  
    }

    const alterarQuantidade = async (qtd) => {
        Alert.alert("Quantidade", `${qtd}`)
        //await this.props.onAlterarQuantidade(chave, qtd)

    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.imagem} 
                source={{
                    uri: `${carregarImagem(props.chave)}`,
                }}
            />    
            
            <Text style={styles.descricao}>{props.descricao}</Text>
            <Text style={styles.titulo}>{props.quantidade}</Text>
            <Text style={styles.preco}>{props.valorUnitario.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
            <Text style={styles.titulo}>{props.valorTotal.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => props.apagar()}>
                <FontAwesomeIcon icon={faCartArrowDown} color={commomStyles.colors.saojose}/>
            </TouchableOpacity>   
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderBottomColor: '#da1600',
        flexDirection: 'row',

    },
    imagem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderColor: '#b00',
        borderWidth: 1,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 15
    }, 
    titulo: {
        fontSize: 12,
        fontWeight: 'bold', 
        marginLeft: 2,
        marginRight: 2,
        textAlign: 'center',
        width: '15%',
        fontFamily: commomStyles.teste.fontFamily
    },
    descricao: {
        fontSize: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '30%',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: '#eee'
    },
    preco: {
        fontSize: 10,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '15%'
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 7,
        marginBottom: 5,
        width: 25,
        margin: 2
    }
})

/*
const mapDispatchToProps = dispatch => {
    return{
        onAlterarQuantidade: (item) => dispatch(alterar(item)),
    }
}

const mapStateToProps = ({ produtos, user, empresa }) => {
    return {
        total: produtos.totalVenda, carrinho: produtos.produtos, frete: produtos.frete,
        nome: user.name, chave: user.chave,
        empresa: empresa.empresa
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(props)

<NumericInput 
type={'up-down'}
initValue={props.quantidade}
value={props.quantidade} 
minValue={1} 
maxValue={10} 
borderColor={'#fff'}
totalWidth={75}
upDownButtonsBackgroundColor={'#eee'}
onChange={(qtd) => alterarQuantidade(qtd)}
iconStyle={{ fontSize: 12, color: '#434A5E' }}
inputStyle={{ fontSize: 12, color: '#434A5E' }}
/>

<FontAwesomeIcon icon={faCoffee} />

*/