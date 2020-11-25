import React, {Component} from 'react'
import axios from 'axios'

import {ImageBackground, 
        Text, 
        StyleSheet, 
        View, 
        TouchableOpacity,
        Platform,
        TextInput,
        Alert,
        ScrollView,
        ActivityIndicator,
        KeyboardAvoidingView
    } 
from 'react-native'

import CEP from 'cep-promise'
import AsyncStorage from '@react-native-community/async-storage'      
import {connect} from 'react-redux'
import {CAMINHO_SERVIDOR, NOME_EMPRESA} from '../../config'
import {login} from '../store/actions/user'
import commonStyles from '../commomStyles'
import AuthInput from '../components/AuthInput'
import {server, showError, showSuccess} from '../common'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const estadoInicial = {
    chave: 0,
    Nome: '',
    login: 'luisseverofelipe@gmail.com',
    senha: 'trade6760',
    //login: '',
    //senha: '',
    confirmPassword: '',
    Cnpj_Cpf: '',    
    endereco: '',
    numero: '',
    complemento: '',
    cidade: '',
    uf: '',
    bairro: '',
    cep: '',
    codigo: null,
    stageNew: false,
    loading: false,
    completaDados: false
}


class Auth extends Component {
    
    constructor(props){
        super(props)
    }
    
    state = {
        ...estadoInicial
    }
    
    signinOrSignup = () => {
        if(this.state.stageNew){
            this.signup()
        }else{
            this.signin()
        }
    }

    signup = async () => {
        try{
           const res = await axios.get(`${server}/pessoas/${this.state.login}`)
           let cpf = res.data[0].contador
           if(cpf == 0){
            await this.setState({codigo: proximo})
            await axios.post(`${server}/signup`, {
                Nome: this.state.Nome,
                login: this.state.login,
                Cnpj_Cpf: this.state.Cnpj_Cpf,
                senha: this.state.senha,
                confirmPassword: this.state.confirmPassword,    
                endereco: this.state.endereco,
                numero: this.state.numero,
                complemento: this.state.complemento,
                cidade: this.state.cidade,
                uf: this.state.uf,
                bairro: this.state.bairro,
                cep: this.state.cep,
                inclusao: moment().format()
            })
            const resPes = await axios.get(`${server}/maxpessoa`)
            let proximo = resPes.data.chave
            await axios.put(`${server}/signup`, {
                codigo: proximo,
                chave: proximo
            })
            await axios.post(`${server}/email`, {
                email: this.state.login,
                usuario: this.state.login,
                senha: this.state.senha
            })
            showSuccess('Usuário cadastrado!')
            this.setState({...estadoInicial})
           }else{
            Alert.alert("Falha no cadastro", "Já existe um cadastro com este usuário!")
           }
        }catch(e){
            showError(e)
        }
    }

    signin = async () => {
        
        try{
            const res = await axios.post(`${server}/signin`, {
                login: this.state.login,
                senha: this.state.senha,
            })
            const res2 = await axios.get(`${server}/signin/${this.state.login}`)
            await this.setState({chave: res2.data.Chave})
            await this.setState({Nome: res2.data.Nome})
                        
            AsyncStorage.setItem('userData', JSON.stringify(res.data))
            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            await this.props.onLogin({...this.state})
            this.props.navigation.navigate('Home', res.data)
            
        }catch(e){
            showError(e)
        }     
    }

    buscarDados = async (cep) => {
        this.setState({loading: true})
        try{  
          var obj = await CEP(cep)
          var bairro = obj.neighborhood
          var endereco = obj.street
          var cidade = obj.city
          var uf = obj.state
          this.setState({bairro, endereco, cidade, uf})
        }catch(e){
          
        }
        this.setState({completaDados: true})
        this.setState({loading: false})
    }

    renderFooter = () => {
       return(
        <View style={styles.footer}>
            <TouchableOpacity style={{padding: 1, marginTop: 1}} onPress={() => this.setState({stageNew: !this.state.stageNew})}>
                <Text style={styles.buttonText}>{this.state.stageNew ? 'Já possui conta?' : 'Ainda não possui conta?'}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.rodape}
                onPress={() => this.props.navigation.navigate('Home')}
            >
                <FontAwesomeIcon style={styles.buttonText} icon={faArrowLeft} size={20} color={commonStyles.colors.saojose} />
                <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
        </View>
       )
    }

    render() {
        const validations = []
        validations.push(this.state.login && this.state.login.includes('@'))
        validations.push(this.state.senha && this.state.senha.length >= 6)
        if(this.state.stageNew){
            validations.push(this.state.Nome && this.state.Nome.trim().length >= 3)
            validations.push(this.state.senha === this.state.confirmPassword)
            validations.push(this.state.Cnpj_Cpf && toString(this.state.Cnpj_Cpf).trim().length >= 11)
            validations.push(this.state.cep && this.state.cep.trim().length == 8)
            validations.push(this.state.cidade && this.state.cep.trim().length >= 3)
            if(this.state.completaDados){
                validations.push(this.state.endereco && this.state.endereco.trim().length >= 4)
                validations.push(this.state.uf && this.state.uf.trim().length === 2)
                validations.push(this.state.bairro && this.state.bairro.trim().length >= 2)
                validations.push(this.state.numero && toString(this.state.numero).trim().length >= 1)
            }
        }
        
        //o formulário só será válido se todas as validações forem verdadeiras, com este reduce implementado
        const validForm = validations.reduce((t, a) => t && a)
        return (
            <ImageBackground 
                source={{
                    uri: `${CAMINHO_SERVIDOR}/assets/espacoacervo.png`,
                }}
                style={styles.background}
            >
                <KeyboardAvoidingView
                    keyboardVerticalOffset={15}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <Text style={styles.title}>{NOME_EMPRESA}</Text>
                    <View style={styles.formContainer}>
                    <ScrollView style={{height: this.state.stageNew ? '80%' : '60%'}}> 
                        <Text style={styles.subTitle}>{this.state.stageNew ? 'Crie a sua conta' : 'Informe seus dados'}</Text>
                        {this.state.stageNew && <Text style={styles.textoEndereco}>Dados de Acesso</Text> }
                        {this.state.stageNew &&
                        <AuthInput icon='faUser' style={styles.input} 
                                    placeholder='Nome                       ' 
                                    value={this.state.Nome} 
                                    onChangeText={Nome => this.setState({Nome})} 
                        />
                        }
                        {this.state.stageNew &&
                            <AuthInput icon='faUser' style={styles.input} 
                                    placeholder='CPF/CNPJ (Somente números)'
                                    keyboardType='numeric' 
                                    value={this.state.Cnpj_Cpf} 
                                    onChangeText={Cnpj_Cpf => this.setState({Cnpj_Cpf})} 
                            />
                        } 
                        <AuthInput icon='faAt' style={styles.input} 
                                placeholder='E-mail                 ' 
                                value={this.state.login} 
                                onChangeText={login => this.setState({login})} 
                        />
                        <AuthInput icon='faAsterisk' style={styles.input} 
                                placeholder='Senha                ' 
                                value={this.state.senha} 
                                secureTextEntry={true}
                                onChangeText={senha => this.setState({senha})} 
                        />
                        {this.state.stageNew &&
                            <AuthInput icon='faAsterisk' style={styles.input} 
                                    placeholder='Confirmar senha' 
                                    value={this.state.confirmPassword} 
                                    secureTextEntry={true}
                                    onChangeText={confirmPassword => this.setState({confirmPassword})} 
                            />
                        }
                        {this.state.stageNew && <Text style={styles.textoEndereco}>Endereço</Text> }
                        {this.state.stageNew &&
                            
                            <AuthInput icon='faStreetView' style={styles.input} 
                                    placeholder='CEP              ' 
                                    value={this.state.cep}
                                    keyboardType='numeric' 
                                    onChangeText={cep => this.setState({cep})}
                                    onBlur={() => this.buscarDados(this.state.cep)} 
                            />
                        }
                        {this.state.loading && <ActivityIndicator size="large" color="#aaa" /> }
                        {this.state.completaDados && this.state.stageNew &&
                            <AuthInput icon='faHome' style={styles.input} 
                                    placeholder='Rua/Av.         ' 
                                    value={this.state.endereco} 
                                    onChangeText={endereco => this.setState({endereco})} 
                            />
                        }
                        {this.state.completaDados && this.state.stageNew &&
                            <AuthInput icon='map-marker' style={styles.input} 
                                    placeholder='Nº              ' 
                                    value={this.state.numero}
                                    keyboardType='numeric' 
                                    onChangeText={numero=> this.setState({numero})} 
                            />
                        }
                        {this.state.completaDados && this.state.stageNew &&
                            <AuthInput icon='map-marker' style={styles.input} 
                                    placeholder='Complemento      ' 
                                    value={this.state.complemento} 
                                    onChangeText={complemento => this.setState({complemento})} 
                            />
                        }
                        {this.state.completaDados && this.state.stageNew &&
                            <AuthInput icon='map-marker' style={styles.input} 
                                    placeholder='Bairro           ' 
                                    value={this.state.bairro} 
                                    onChangeText={bairro=> this.setState({bairro})} 
                            />
                        }
                        {this.state.completaDados && this.state.stageNew &&
                            <AuthInput icon='map-marker' style={styles.input} 
                                    placeholder='Cidade           ' 
                                    value={this.state.cidade} 
                                    onChangeText={cidade=> this.setState({cidade})} 
                            />
                        }
                        {this.state.completaDados && this.state.stageNew &&
                            <AuthInput icon='map-marker' style={styles.input} 
                                    placeholder='UF               ' 
                                    value={this.state.uf} 
                                    onChangeText={uf => this.setState({uf})} 
                            />
                        }

                        <TouchableOpacity onPress={this.signinOrSignup} disabled={!validForm}>
                            <View style={[styles.button, validForm ? {} : {backgroundColor: '#aaa'}]}>
                                <Text style={styles.buttonText}>{this.state.stageNew ? 'Registrar' : 'Entrar' }</Text>
                            </View>
                        </TouchableOpacity>
                        </ScrollView>
                    </View>
                    {this.renderFooter()}
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
} 

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.espacoacervo,
        fontSize: 32 ,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 3,
        fontSize: 20
    },
    textoEndereco: {
        color: '#fff',
        fontSize: 16,
        marginTop: 15,
        marginStart: 5 
    },
    input: {
        marginTop: 4,
        marginBottom: 4,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fff',
        paddingLeft: 5
    },
    formContainer: {
        backgroundColor: commonStyles.colors.primary,
        padding: 20,
        width: '90%'
    },
    button: {
        backgroundColor: commonStyles.colors.saojose,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.primary,
        fontSize: 18,
        marginTop: 10
    },
    icone: {
        marginRight: 1,
        padding: 1,
        marginTop: 40,
        color: commonStyles.colors.eaCinza
    },
    rodape: {
        padding: 1,
        marginTop: 1,
        marginLeft: 30,
        flexDirection: 'row'
    },
    footer: {
        flexDirection: 'row'
    }
})

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (usuario) => dispatch(login(usuario))
    }
}

export default connect(null, mapDispatchToProps)(Auth)
