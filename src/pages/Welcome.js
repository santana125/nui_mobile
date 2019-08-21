
import React from 'react';
import {StyleSheet, SafeAreaView, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import nui_logo from '../assets/nui_logo.png';


function Welcome({navigation}){
    function goToLogin() {
        navigation.navigate('Login');
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image source={nui_logo}/>
            <Text style={styles.welcome}>Olá, tudo bem?</Text>
			<TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
				<LinearGradient 
					colors={['#d737b3', '#ae45ac', '#8154a7']} 
					style={styles.loginBackground}>
						<Text style={styles.loginText}>LOGIN</Text>
				</LinearGradient>
            </TouchableOpacity>
                <Text style={styles.signinText}> Ainda não é cadastrado ?</Text>
            <TouchableOpacity style={styles.signinButton}>
                <Text style={styles.loginText}>CADASTRAR</Text> 
            </TouchableOpacity>
            <Text style={styles.endText}>Nui Ver. 0.0.1</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
		backgroundColor: '#eceff4',
    },
	welcome: {
		paddingTop: 52,
		fontWeight: 'bold',
		fontSize: 26,
		color: '#4c566a',
	},
	loginButton: {
		height: 48,
		borderRadius: 38,
		marginVertical: 10,
		marginHorizontal: 32,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
        elevation: 2,
	},
	loginBackground:{
		height: 48,
		borderRadius: 38,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: '#e5e9f0',
	},
	signinButton:{
		height: 48,
		borderRadius: 38,
		marginVertical: 6,
		marginHorizontal: 32,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#a3be8c',
        elevation: 2,
	},
    signinText:{
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4c566a',
    },
    endText:{
        position: 'absolute',
        bottom: 0,
    }
});

export default Welcome 
