import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import nui_logo from '../../assets/nui_logo.png';


function Login({navigation}){
    function backToWelcome() {
        navigation.navigate('Welcome');
    };
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.nuiLogo} source={nui_logo}/>
            <View style={styles.dataInput}>
            <TextInput style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                textContentType='emailAddress'
                placeholder="E-mail..."/>
            <TextInput style={styles.input}
                autoCorrect={false}
                autoCapitalize='none'
                secureTextEntry={true}
                textContentType='password'
                placeholderColor='#'
                placeholder="Senha..."/>
            </View>
			<TouchableOpacity style={styles.loginButton}>
				<LinearGradient 
					colors={['#d737b3', '#ae45ac', '#8154a7']} 
					style={styles.loginBackground}>
						<Text style={styles.loginText}>LOGIN</Text>
				</LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={backToWelcome}>
                <Text style={styles.loginText}>Voltar</Text> 
            </TouchableOpacity>
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
    dataInput: {
		alignSelf: 'stretch',
        paddingTop: 40,
        paddingBottom: 20,
    },
    input:{
        paddingBottom: 2,
		height: 48,
        borderBottomWidth: 2,
        borderBottomColor: '#2e3440',
        marginHorizontal: 32,
        textAlignVertical: 'bottom',
		alignSelf: 'stretch',
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
	backButton:{
		height: 48,
		borderRadius: 38,
		marginVertical: 30,
		marginHorizontal: 32,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#e74644',
        elevation: 2,
	},
    signinText:{
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#4c566a',
    },
	nuiLogo: {
		width: 200,
		height: 200,
	},
});

export default Login 
