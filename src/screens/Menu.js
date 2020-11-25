import React from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
//import {DrawerItems} from 'react-navigation-drawer'
import {Gravatar} from 'react-native-gravatar'
import commomStyles from '../commomStyles'
import axios from 'axios'
import {connect} from 'react-redux'
import {logout} from '../store/actions/user'
import MenuFamilias from '../screens/MenuFamilias'
import QrCode from '../components/QrCode'
import logo from '../images/logosaojosenew.png'
import logo2 from '../images/logoqrcode.png'

import BootstrapStyleSheet from 'react-native-bootstrap-styles'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons'

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
    header: {
        borderBottomWidth: 1,
        borderColor: '#f00',
        backgroundColor: commomStyles.colors.saojose,
        marginBottom: 6,
        resizeMode: 'stretch'
    },
    backLogo: {
        height: c.DIMENSIONS_HEIGHT,
        resizeMode: 'center'
    },
    gravatar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    qrcode: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#fff',
        fontFamily: commomStyles.fontFamily,
        fontSize: 30,
        paddingTop: 10,
        padding: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderRadius: 25,
        margin: 10,
        marginTop: 5,
    },
    userInfo: {
        marginLeft: 4,
        marginTop: 3,
        textAlign: 'center'
    },
    nome: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 20,
        marginBottom: 6,
        color: commomStyles.colors.mainText

    },
    email: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 15,
        color: commomStyles.colors.subText,
        marginBottom: 6
    },
    itensAcesso: {
        fontSize: 13,
        color: commomStyles.colors.saojose,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 10
    },
    logoutIcon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 12,
        marginTop: 10
    },
    sair: {
        fontSize: 24, 
        marginLeft: 10, 
        fontFamily: commomStyles.teste.fontFamily,
        color: commomStyles.colors.secondary
    }
})

const mapStateToProps = ({ user }) => {
    return {
        uNome: user.name,
        uLogin: user.email,
        uChave: user.chave       
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogout: () => dispatch(logout()),
        onClassificado: (classificado) => dispatch(grupoClassificado(classificado))
    }
}


//export default props => {
export default connect(mapStateToProps, mapDispatchToProps)(props => {
    
    const logout = async () => {
        Alert.alert("entrou aqui")
        var keys =  await AsyncStorage.getAllKeys()
        await props.onLogout({})
        try{
            if(keys.indexOf('userData') != -1){
                delete axios.defaults.headers.common['Authorization']
                AsyncStorage.removeItem('userData')
                props.navigation.navigate('Home')
            }else{
                props.navigation.navigate('Home')
            }
        }catch(e){
            Alert.alert("Erro", `${e}`)
        }
    }

    const fecharMenu = () => {
        this.props.navigation.closeDrawer()
    }

    return (
        <ScrollView> 
            <View style={{backgroundColor: commomStyles.colors.saojose}}>
     
                <Image source={logo} style={styles.header} />
                
            </View>
            
            <View style={styles.gravatar}>
                <View style={styles.userInfo}>
                    <Text style={styles.nome}>{props.uNome}</Text>
                    <Text style={styles.email}>{props.uLogin}</Text>
                </View>
            </View>
            
            {!props.uChave &&
                <TouchableOpacity onPress={(props) => this.props.navigation.navigate('Auth')}>
                    <Text style={styles.itensAcesso}>Fazer Login</Text>
                </TouchableOpacity>
            }
   
            {props.uChave &&
                <TouchableOpacity onPress={() => logout()}>
                    <Text style={styles.itensAcesso}>Logout</Text>
                </TouchableOpacity>
            }

            {props.uChave &&
            <QrCode style={styles.qrcode} login={props.uLogin} chave={props.uChave}/>
            }

        </ScrollView>
    )
})

/** 
<TouchableOpacity onPress={logout}>                    
                    <View style={styles.logoutIcon}>
                        <FontAwesomeIcon icon={faSignOutAlt} size={30} color={commomStyles.colors.primary} />
                        <Text style={styles.sair}>Sair</Text>
                    </View>
                </TouchableOpacity> 
**/