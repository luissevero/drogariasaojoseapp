import React, { Component } from "react"
import moment from 'moment'
//import {Button} from "native-base"
import {View, TouchableOpacity, Text, StyleSheet} from "react-native"
//import Icon from 'react-native-vector-icons/MaterialIcons'
import commonStyle from '../commomStyles'
import util from '../classes/Util'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'


const colorArray = ['black','red']
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

const tamanhoIcone = 40

const estadoInicial = {
    dataAtual: new Date().getTime(),
    dataFinal: new Date().getTime(),
    diff: 0,
    timer: 0,
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
}

class DeCron extends Component {

  constructor (props) {
    super(props)
    this.state = {
        ...estadoInicial
    }

  }

  startTimer = () => {
      this.clockCall = setInterval(() => {
          this.decrementClock()
      }, 1000)
  }

  async componentDidMount(){
      await this.setState({dataAtual: new Date().getTime()})
      await this.setState({dataFinal: new Date(this.props.fim)})
      await this.setState({diff: parseInt(((this.state.dataFinal - this.state.dataAtual) / 1000))})
      await this.setState({horas: parseInt(this.state.diff / 3600)})
      await this.setState({diff: this.state.diff % 3600})
      await this.setState({minutos: parseInt(this.state.diff / 60)})
      await this.setState({segundos: parseInt(this.state.diff % 60)})
      await this.setState({timer: Math.ceil(this.state.diff / (1000 * 60 * 60 * 24))})
      this.clockCall = setInterval(() => {
          this.decrementClock();
      }, 1000)
  }

  componentWillUnmount(){
      clearInterval(this.clockCall)
  }

  decrementClock = () => {
    if(this.state.segundos === 0){
      this.setState({segundos: 60})
      this.setState({minutos: this.state.minutos - 1})
    }
    if(this.state.minutos < 0){
      this.setState({minutos: 59})
      this.setState({horas: this.state.horas - 1})
    }   
    this.setState((prevstate) => ({segundos: prevstate.segundos - 1}))
    if(this.state.dias < 0){
      clearInterval(this.clockCall)
      this.setState({dias: 0, horas: 0, minutos: 0, segundos: 0}) 
    }
  }

  render() {
    return (
        <View style={styles.container}>
            <View style={styles.promocao}>
              <View>
                <Text style={styles.duramais}>A promoção dura por mais: </Text>
              </View>
              
              <View style={styles.relogio}>
                <Icon name='access-time' size={tamanhoIcone} color='#11e' />
                <Text style={styles.contador}>{this.state.horas}:{util.completarZerosEsquerda(this.state.minutos, 2)}:{util.completarZerosEsquerda(this.state.segundos, 2)} horas</Text>
              </View>
            </View>
        </View>
    )
  }
}

const styles=StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: c.DIMENSIONS_WIDTH * 9/10 - 10,
    justifyContent: 'center',
    minHeight: 40,
    backgroundColor: '#ededed',
    marginBottom: 3,
    borderRadius: 10
  },
  relogio: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  contador: {
    fontFamily: commonStyle.fontFamily,
    fontSize: 24,
    color: '#d11'
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue'
  }
})

export default DeCron