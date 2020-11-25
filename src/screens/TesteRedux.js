import React, { Component } from 'react'
import {connect} from 'react-redux'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'

const mapStateToProps = store => ({
    newValue: store.clickState.newValue
})

export default connect(mapStateToProps)(TesteRedux)

class TesteRedux extends Component {
    
    render(){
        
        const {newValue} = this.props
        
        return(
            <View>
                <TextInput style={styles.input}/>
                <TouchableOpacity><Text>Clique aqui</Text></TouchableOpacity>
                <Text>{this.newValue}</Text>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2
    }
})