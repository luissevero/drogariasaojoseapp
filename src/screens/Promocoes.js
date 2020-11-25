import React, {Component} from 'react'
import {View, StyleSheet, Text, Alert, FlatList} from 'react-native'
import axios from 'axios'
import {server, serverLocal, showError} from '../common'
import Promocao from '../components/Promocao'
import CabecalhoHome from '../components/CabecalhoHome'
import commonStyles from '../commomStyles'
import {PROMOCOES} from '../../config'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

const estadoInicial = {
    pesquisa: '',
    promocoes: [],
    loading: true
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

class Promocoes extends Component {
    
    state = {
        ...estadoInicial
    }    

    render(){

        return(
            <View style={styles.container}>
                <Text style={styles.titulo}>{PROMOCOES}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: '#eee'
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontFamily: commonStyles.fontFamily,
        borderBottomWidth: 2,
        marginBottom: 5
    }
})

export default Promocoes
