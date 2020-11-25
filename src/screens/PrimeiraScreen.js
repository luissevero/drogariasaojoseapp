import React, {Component} from 'react'
import {View, Text} from 'react-native'

import PrimeiroComponente from '../components/PrimeiroComponente'

export default class PrimeiraScreen extends Component{
    render(){
        return(
            <View>
                <PrimeiroComponente />
                <Text>Texto screen editado</Text>
            </View>
        )
    }
}
 