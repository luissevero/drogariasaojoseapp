import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAt, faAsterisk, faUser, faStreetView, faMapMarker, faHome } from '@fortawesome/free-solid-svg-icons'

import commonStyles from '../commomStyles'

export default props => {
    return (
        <View style={[styles.container, props.style]}>
            <FontAwesomeIcon 
                icon={
                    props.icon=='faHome' ? faHome : props.icon=='faAt' ? faAt : props.icon=='faAsterisk' ? 
                    faAsterisk : props.icon=='faStreetView' ? faStreetView : props.icon=='map-marker' ? faMapMarker : faUser
                } 
                style={styles.icon} 
                name={props.icon} 
                size={20}
            />
            <TextInput style={styles.input} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: '#eee',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        color: commonStyles.colors.saojose,
        marginLeft: 20
    },
    input: {
        marginLeft: 1,
        width: '92%',
        borderWidth: 1,
        borderColor: '#000',
        fontFamily: commonStyles.teste.fontFamily
    }
})