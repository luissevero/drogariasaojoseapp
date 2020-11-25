import React, {Component} from 'react'
import {View, TextInput, Modal, TouchableWithoutFeedback, StyleSheet, Text, TouchableOpacity} from 'react-native'

import commomStyles from '../commomStyles';
const estadoInicial = {pesquisa: ''}

export default class Pesquisar extends Component {

    state = {
        ...estadoInicial
    }

    render(){
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible} 
                onRequestClose={this.props.onCancel} 
                animationType='slide'>
                    <TouchableWithoutFeedback onPress={this.props.onCancel}>
                        <View style={styles.overlay}></View>
                    </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Pesquisa</Text>
                    <TextInput style={styles.input} placeholder={'Pesquisar...'}  onChangeText={pesquisa => this.setState({pesquisa})} value={this.state.pesquisa} />
                    <View style={styles.botoes}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.botao}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.salvar}>
                            <Text style={styles.botao}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            </Modal>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    header: {
        fontFamily: commomStyles.fontFamily,
        backgroundColor: commomStyles.colors.today,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commomStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 16,
        paddingHorizontal: 6,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    botoes: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    botao: {
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.today
    },
})