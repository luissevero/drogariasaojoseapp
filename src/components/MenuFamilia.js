import React from 'react'
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import commomStyles from '../commomStyles'

export default props => {
    
    return(
        <View>
            <TouchableOpacity onPress={props.selecionaCategoria} style={styles.opcoes}><Text style={styles.descricao}>{props.Descricao}</Text></TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    opcoes: {
        marginBottom: 12
    },
    descricao: {
        fontFamily: commomStyles.teste.fontFamily
    }
})