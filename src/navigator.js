import React from 'react'
import {View, SafeAreaView, Text} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerScreenProps} from '@react-navigation/drawer'


import Auth from './screens/Auth'
import Home from './screens/Home'
import Carrinho from './screens/Carrinho'
import ProgramaPontos from './screens/ProgramaPontos'
import commonStyles from './commomStyles'
import ParcelasAberto from './screens/ParcelasAberto'
import ComprasRealizadas from './screens/ComprasRealizadas'
import Promocoes from './screens/Promocoes'
import MinhaConta from './screens/MinhaConta'
import MenuPrincipal from './screens/Menu'
import Cabecalho from './components/Cabecalho'

const Stack = createStackNavigator()

function Stacks(){
    return(
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} options={{
                title: "Início"
            }}
            />
            <Drawer.Screen name="ParcelasAberto" component={ParcelasAberto} options={{
                title: "Parcelas em Aberto",
                headerTitle: 'Parcelas em Aberto'
            }}
            />
            <Drawer.Screen name="ComprasRealizadas" component={ComprasRealizadas} options={{
                title: "Compras Realizadas"
            }}
            />
        </Drawer.Navigator>
    )
}

const Drawer = createDrawerNavigator()

function CustomDrawerContent(props){
    return (
        <DrawerContentScrollView {...props}>
          <MenuPrincipal />
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      );

}

function Navigator(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" headerMode='screen' screenOptions={{
                headerStyle: {backgroundColor: commonStyles.colors.saojose},
                headerTitleAlign: 'center',
                title: 'Drogaria São José'
            }}>
                <Stack.Screen name="Home" component={Stacks}/>
                <Stack.Screen name="Carrinho" component={Carrinho} options={{
                        title: 'Meu Carrinho'
                    }}    
                />
                <Stack.Screen name="Login" component={Auth} options={{
                        title: 'Faça seu Login'
                    }}
                />
                <Stack.Screen name="ComprasRealizadas" component={ComprasRealizadas} options={{
                        title: 'Minhas Compras Realizadas'
                    }}
                />
                <Stack.Screen name="ParcelasAberto" component={ParcelasAberto} options={{
                        title: "Parcelas em Aberto",    
                    }}
                />
                <Stack.Screen name="ProgramaPontos" component={ProgramaPontos} options={{
                        title: "Programa de Pontos",    
                    }}
                />
                <Stack.Screen name="Promocoes" component={Promocoes} options={{
                        title: "Promoções",    
                    }}
                />
                <Stack.Screen name="MinhaConta" component={MinhaConta} options={{
                        title: "Minha Conta",    
                    }}
                />

                <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
                <Stack.Screen name="Cabecalho" component={Cabecalho} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigator

/** 
**/