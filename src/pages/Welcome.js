
import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import nui_logo from '../assets/nui_logo.png';


function Welcome({navigation}){
    function goToLogin() {
        navigation.navigate('Login');
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.nuiLogo} source={nui_logo} />
          <Text style={styles.welcome}>Olá, tudo bem?</Text>
        </View>
        <View style={styles.content}>
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
        </View>
        <View style={styles.footer}>
          <Text style={styles.endText}>Nui Ver. 0.0.1</Text>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
		  backgroundColor: '#eceff4',
    },
    header:{
      alignItems: 'center',
      paddingTop: 40,
      paddingHorizontal: 40,
      alignSelf:'stretch'
    },
    footer: {
      alignSelf:'stretch'
    },
    content: {
      alignItems:'center',
      paddingHorizontal: 32,
      alignSelf:'stretch'
    },
	welcome: {
    textAlign:'center',
		fontWeight: 'bold',
		fontSize: 26,
		color: '#4c566a',
    paddingTop: 20,
	},
	loginButton: {
		height: 48,
		borderRadius: 38,
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
		marginHorizontal: 32,
		alignSelf: 'stretch',
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: '#a3be8c',
        elevation: 2,
	},
    signinText:{
      paddingTop: 15,
      paddingBottom: 5,
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 14,
      color: '#4c566a',
    },
    endText: {
      textAlign:'center',
      bottom: 0,
	},
	nuiLogo: {
		width: 200,
		height: 200,
	},
});

export default Welcome 
