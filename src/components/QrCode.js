import React, {Component} from 'react'
import {View, TextInput, StyleSheet, Text, Alert} from 'react-native'
import {CAMINHO_FOTOS} from '../../config'
import logo from '../images/logoqrcode.png'
import QRCode from 'react-native-qrcode-svg'
import Util from '../classes/Util'
import moment from 'moment'

if(Platform.OS === 'android') { // only android needs polyfill
    require('intl') // import intl object
    require('intl/locale-data/jsonp/pt-BR') // load the required locale details
}

class QrCode extends Component {
        
    state = {
        texto: 't',
        digest: []
    } 

    componentDidMount = async () => {
        
        await this.setState({texto: `${Util.completarZerosEsquerda(moment().format('D'), 2)}APP${Util.completarZerosEsquerda(moment().format('M'), 2)}${Util.completarZerosEsquerda(this.props.chave, 8)}${moment().format('Y')}`})
        //Alert.alert(`${JSON.stringify(this.state.texto)}`)
    }

    render(){
        return (
            <View style={styles.container}>
                <QRCode
                 value={this.state.texto}
                 color={'green'}
                 size={120}
                 logo={logo}
                 logoMargin={50}
                 logoBorderRadius={15}
                 logoBackgroundColor='transparent'
                 />   
            </View>
        )
    }   
}

export default QrCode

const styles = StyleSheet.create({
    container: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10
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
        width: 160,
        height: 160,
        borderColor: '#b00',
        borderWidth: 1,
        marginBottom: 5
    }, 
    titulo: {
        fontSize: 12,
        fontWeight: 'bold', 
        marginLeft: 5,
        marginRight: 5,
        textAlign: 'center'
    },
    preco: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign: 'center',
        borderWidth: .5,
        width: '50%',
        borderRadius: 10
    },
    botaoAdd: {
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
        marginBottom: 5,
        width: 50
    }
})