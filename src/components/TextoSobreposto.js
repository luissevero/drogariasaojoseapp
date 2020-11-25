import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import commonStyles from '../commomStyles'

const styles = StyleSheet.create({
    fonte: {
        fontSize: 24,
        fontWeight: 'bold',
        color: commonStyles.colors.saojose,
        textAlign: 'auto',
        padding: 8
    }
})
export default class TextoSobreposto extends Component {
    render(){
        return (
            <Text style={styles.fonte}>{this.props.texto}</Text>
        )
    }
}
