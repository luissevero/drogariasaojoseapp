import React from 'react'
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'

import commonStyles from '../commomStyles'
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from 'moment'
import 'moment/locale/pt-br'

const estilos = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'

    },
    pendente: {
        height: 25,
        width: 25,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#555'
    },
    concluida: {
        height: 25,
        width: 25,
        borderRadius: 12,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    descricao: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    data: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12
    },
    swipeableRight: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    swipeableLeft: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textoExcluir: {
        fontFamily: commonStyles.fontFamily,
        color: 'white',
        fontSize: 16,
        margin: 10
    },
    iconeExcluir: {
        marginLeft: 10
    }
})

function getCheckView(dataConcluida) {
    if(dataConcluida != null){
        return (
            <View style={estilos.concluida}>
                <Icon name='check' size={20} color={commonStyles.colors.secondary}></Icon>
            </View>
        )
    }else{
        return (
            <View style={estilos.pendente}></View>
        )
    }
}
export default props => {

    const doneOrNotStyle = props.dataConcluida != null ?
        {textDecorationLine: 'line-through'} : {}
    
    const date = props.dataConcluida ? props.dataConcluida : props.dataEstimada
    const dataFormatada = moment(date).locale('pt-br').format('ddd, D [de] MMMM')    

    const getRightContent = () => {
        return (
            <TouchableOpacity style={estilos.swipeableRight}>
                <Icon name="trash" size={30} color="#fff" onPress={() => props.onDelete && props.onDelete(props.id)}></Icon>
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={estilos.swipeableLeft}>
                <Icon style={estilos.iconeExcluir} name="trash" size={20} color="#fff"></Icon>
                <Text style={estilos.textoExcluir}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable 
        renderRightActions={getRightContent}
        renderLeftActions={getLeftContent}
        onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
            <View style={estilos.container}>
                <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                    <View style={estilos.checkContainer}>
                        {getCheckView(props.dataConcluida)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[estilos.descricao, doneOrNotStyle]}>{props.descricao}</Text>
                    <Text style={estilos.data}>{dataFormatada}</Text>
                </View>
            </View>
        </Swipeable>  
    )
}