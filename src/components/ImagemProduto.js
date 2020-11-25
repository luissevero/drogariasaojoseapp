import React from 'react';
import { View, Image, StyleSheet, Text, Alert } from 'react-native';

import {CAMINHO_SERVIDOR, CAMINHO_FOTOS} from '../../config'

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  imagem: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginBottom: 1,
    marginHorizontal: 2,
    padding: 2,
    flexBasis: 0,
    width: 175,
    height: 120,
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#fff'
  },
})

//const caminho = 'http://192.168.15.150/severo/assets/obino.jpg'

const carregarImagem = (imagem) => {

  const caminhoAbs = `${CAMINHO_FOTOS}/${imagem}.png`
  if(caminhoAbs){
    //Alert.alert("Teste", `${caminhoAbs}`)
      return caminhoAbs
  }else{
      return 'http://192.168.15.150/severo/assets/produtos/sem_imagem.png'
  }  
}

const ImagemProduto = props => {
  return (
    <View style={styles.container}>
        <Image 
            resizeMode='stretch'
            style={styles.imagem} 
            source={{
              uri: `${carregarImagem(props.imagem_app)}`,
          }}
      />
    </View>
  );
}

//uri: 'https://reactnative.dev/img/tiny_logo.png' uri: `${caminho}`
export default ImagemProduto

// <Text style={{color: '#f00'}}>{props.imagem_app}</Text>