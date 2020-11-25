import React, {Component} from 'react'
import {View, StyleSheet, Text, Alert, FlatList, ActivityIndicator} from 'react-native'
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

class PromocoesHome extends Component {
    
    state = {
        ...estadoInicial
    } 
    
    componentDidMount = () => {
        this.loadPromocoes()
    }

    loadPromocoes = async () => {
        try{
            const res = await axios.get(`${server}/promocoes`)
            await this.setState({promocoes: res.data})
            await this.setState({loading: false})
        }catch(e){
            showError(e)
        }
    }

    renderLoading = () => {
        if(!this.state.loading) return null
        return (
            <View style={styles.loading}>
              <ActivityIndicator size='large' color={commonStyles.colors.eaCinza} />
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <ActivityIndicator size='large' color={commonStyles.colors.eaCinza}/>
            </View>
          )
    }

    abrirMenu = () => {

    }

    render(){
        return (
            <View style={styles.container}>
                <CabecalhoHome onClick={() => this.props.navigation.navigate('Selecao')} abreMenu={() => this.abrirMenu()}/>
                <Text style={styles.titulo}>Promoções</Text>
                {this.renderLoading()}
                <FlatList 
                    data={this.state.promocoes} 
                    keyExtractor={item => `${item.chave}`}
                    onEndReachedThreshold={0.1}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}) => 
                        <Promocao {...item} indice={index} /> 
                    }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        backgroundColor: commonStyles.colors.eaPreto,
        flex: 1
    },
    titulo: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: commonStyles.colors.eaBranco,
        fontFamily: commonStyles.fontFamily,
        borderBottomWidth: 2,
        borderBottomColor: commonStyles.colors.eaCinza,
        marginBottom: 10,
        width: c.DIMENSIONS_WIDTH
    }
})

export default PromocoesHome