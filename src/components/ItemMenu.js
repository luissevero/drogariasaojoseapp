import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native'
import {  Header, Content, Card, CardItem, Text, Left, Body, Right } from 'native-base'

import TextoSobreposto from './TextoSobreposto'

import commonStyles from '../commomStyles'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

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

const styles = StyleSheet.create({
  container: {
    height: c.DIMENSIONS_HEIGHT / 2.5,
    marginRight: c.DIMENSIONS_WIDTH / 40
  },
  fonte: {
    fontFamily: commonStyles.teste.fontFamily,
    fontSize: 14
  },
  card: {
    height: '20%',
    backgroundColor: commonStyles.colors.primary
  },
  imagem: {
    height: '100%'
  },
  overlay: {
    marginTop: '50%',
    marginLeft: '10%',
    backgroundColor: '#000',
    borderRadius: 30
  },
  overlayHeart: {
    tintColor: '#fff',
  },
})

class ItemMenu extends Component {
  render() {
    return (
      
        <Content style={styles.container}>
          <Card>
            <CardItem cardBody style={styles.imagem}>
              <TouchableOpacity onPress={() => this.props.clicado()}>
                <ImageBackground source={this.props.logo} style={{height: 200, width: 200}}>
                  <View style={styles.overlay}>
                    <TextoSobreposto texto={this.props.titulo} />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              
            </CardItem>
          </Card>
        </Content>
      
      
    )
  }
}

export default ItemMenu

/** 
<CardItem style={styles.card}>
                <Body>
                  <Text style={styles.fonte}>{this.props.titulo}</Text>
                </Body>
            </CardItem>
**/