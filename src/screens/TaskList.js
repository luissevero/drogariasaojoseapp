import React, {Component, useReducer} from 'react'
import {View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import 'moment/locale/pt-br'
import axios from 'axios'

import {server, showError} from '../common'
import todayImage from '../assets/imgs/today.jpg'
import tomorrowImage from '../assets/imgs/tomorrow.jpg'
import weekImage from '../assets/imgs/week.jpg'
import monthImage from '../assets/imgs/month.jpg'
import yearImage from '../assets/imgs/year.jpg'
import Task from '../components/Task'
import AddTask from './AddTask'
import UsersList from '../components/User'
import commomStyles from '../commomStyles'

function formatarData(dataCrua){
    const dataFormatada = moment().locale('pt-BR').format('YYYY[-]MM[-]DD')
    //const dataFormatada = dataCrua.format()
    return dataFormatada
}

const estadoInicial = {
    mostrarAddTask: false,
    mostrarTarefasConcluidas: true,
    tarefasVisiveis: [],
    tasks: []
}

export default class TaskList extends Component{

    state = {
        ...estadoInicial
    }

    //chamar a função para mostrar as tarefas concluidas quando o componente for montado
    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState')
        const savedState = JSON.parse(stateString) || estadoInicial
        this.setState({mostrarTarefasConcluidas: savedState.mostrarTarefasConcluidas},this.filterTasks)
        this.loadTasks()
    }

    loadTasks = async () => {
        try{
            //const maxDate = moment().endOf('day').toDate()
            const maxDate = moment().add({days: this.props.daysAhead}).format('YYYY-MM-DD 23:59:59')
            const res = await axios.get(`${server}/tasks?date=${maxDate}`)
            this.setState({tasks: res.data}, this.filterTasks)
        }catch(e){
            showError(e)
        }
    }

    toggleFilter = () => {
        this.setState({mostrarTarefasConcluidas: !this.state.mostrarTarefasConcluidas}, this.filterTasks)
    }

    filterTasks = () => {
        let tarefasVisiveis = null
        if(this.state.mostrarTarefasConcluidas){
            tarefasVisiveis = [...this.state.tasks]
        }else{
            const pendente = task => task.data_concluida === null
            tarefasVisiveis = this.state.tasks.filter(pendente)
        }

        this.setState({tarefasVisiveis})
        AsyncStorage.setItem('tasksState', JSON.stringify({mostrarTarefasConcluidas: this.state.mostrarTarefasConcluidas}))
    }

    toggleTask = async taskId => {
        try{
            await axios.put(`${server}/tasksToggle/${taskId}`)
            this.loadTasks()
        }catch(e){
            showError(e)
        }
    }

    addtask = async newTask => {
        if(!newTask.descricao || !newTask.descricao.trim()){
            Alert.alert('Dados Inválidos', 'Descrição não informada')
            return
        }
        try{
            const dataFormat = moment(newTask.data_estimada).format('YYYY-MM-DD 23:59:59')
            await axios.post(`${server}/tasks`, {
                descricao: newTask.descricao,
                data_estimada: dataFormat
            })
            this.setState({mostrarAddTask: false}, this.loadTasks)
        }catch(e){
            showError(e)
        }
    }

    deleteTask = async taskId => {
        try{
            await axios.delete(`${server}/tasks/${taskId}`)
            this.loadTasks()
        }catch(e){
            showError(e)
        }
    }

    getImage = () => {
        switch(this.props.daysAhead){
            case 0: return todayImage
            case 1: return tomorrowImage
            case 7: return weekImage
            case 30: return monthImage
            default: return yearImage

        }
    }

    getColor = () => {
        switch(this.props.daysAhead){
            case 0: return commomStyles.colors.today
            case 1: return commomStyles.colors.tomorrow
            case 7: return commomStyles.colors.week
            case 30: return commomStyles.colors.month
            default: return commomStyles.colors.year
        }
    }

    getUsers = () => {
        this.props.navigation.navigate('Users')

    }

    render(){

        const hoje = moment().locale('pt-BR').format('ddd, D [de] MMMM [de] YYYY')
        return (
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.mostrarAddTask}
                    onCancel={() => this.setState({mostrarAddTask: false})}
                    onSave={this.addtask}
                />
                <ImageBackground style={styles.background} source={this.getImage()}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                            <Icon name='bars' size={20} color={commomStyles.colors.secondary}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.getUsers}>
                            <Icon name='snowflake-o' size={25} color={commomStyles.colors.secondary}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.toggleFilter}>
                            <Icon name={this.state.mostrarTarefasConcluidas ? 'eye' : 'eye-slash'} size={20} color={commomStyles.colors.secondary}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Text style={styles.subTitle}>{hoje}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                        <FlatList 
                            data={this.state.tarefasVisiveis} 
                            keyExtractor={item => `${item.id}`}
                            renderItem={({item}) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask}/>}
                        />
                </View>
                <TouchableOpacity activeOpacity={.7} style={[styles.addButton, {backgroundColor: this.getColor()}]} onPress={() => this.setState({mostrarAddTask: true})}>
                    <Icon name="plus" size={20} color={commomStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 4
    },
    taskList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    },
    iconBar: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'space-between',
        marginTop: Platform.OS === 'ios' ? 40 : 30
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }
})