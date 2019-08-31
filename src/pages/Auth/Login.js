import React from 'react';
import {StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


import nui_logo from '../../assets/nui_logo.png';

import LoginComponent from '../../components/Auth/LoginComponent'


function Login({navigation}){
    function backToWelcome() {
        navigation.navigate('Welcome');
    };
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.nuiLogo} source={nui_logo} />
        </View>
        <View style={styles.content}>
          <LoginComponent style={styles.login} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={backToWelcome}>
            <Text style={styles.backText}>Voltar</Text>
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
	backText: {
		fontWeight: 'bold',
		fontSize: 22,
		color: '#e5e9f0',
	},
	backButton:{
		height: 48,
		borderRadius: 38,
		alignSelf: 'stretch',
		alignItems: 'center',
    marginHorizontal:32,
    marginTop: 40,
		justifyContent: 'center',
        backgroundColor: '#e74644',
        elevation: 2,
	},
	nuiLogo: {
		width: 200,
		height: 200,
	},
  endText: {
    textAlign: 'center',
    bottom: 0,
  },
});

export default Login 
