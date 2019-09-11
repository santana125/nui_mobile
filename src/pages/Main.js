import React from 'react';
import {SafeAreaView, View,StyleSheet, Text} from 'react-native';
import HeaderComponent from '../components/MainPage/HeaderComponent';
import CategoriesComponent from '../components/MainPage/CategoriesComponent';
import EstablishmentComponent from '../components/MainPage/EstablishmentComponent';

function Main({navigation}){
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <HeaderComponent/>
          </View>
          <View style={styles.content}>
            <Text style={styles.titleText}>Categorias:</Text>
            <CategoriesComponent/> 
            <EstablishmentComponent style={styles.stabs}/>
          </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
		  backgroundColor: '#eceff4',
    },
    header:{
      alignItems: 'center',
    },
    footer: {
      alignSelf:'stretch'
    },
    content: {
      alignSelf:'stretch',
      padding: 8,
      flex:3,
    },
    titleText:{
      paddingStart:10,
      fontSize:22,
      fontWeight:'bold',
      textAlign:'left',
    },
})

export default Main
