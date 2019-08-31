import React from 'react';
import {SafeAreaView, View,StyleSheet, Text} from 'react-native';
import HeaderComponent from '../components/MainPage/HeaderComponent'
import CategoriesComponent from '../components/MainPage/CategoriesComponent'


function Main(){
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <HeaderComponent/>
          </View>
          <View style={styles.content}>
            <Text style={styles.titleText}>Categorias:</Text>
            <CategoriesComponent/> 
            <View style={styles.placeholder}>
              <Text>I'm a Beautiful Placeholder</Text>
            </View>
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
      flex:2,
      alignSelf:'flex-start',
      padding: 8,
    },
    titleText:{
      paddingStart:10,
      fontSize:22,
      fontWeight:'bold',
      textAlign:'left',
    },
  placeholder:{
      flex:2,
      backgroundColor: '#e5e9f0',
      borderRadius: 8,
      paddingTop: 12,
      padding: 10,
      elevation:7,
      alignSelf:'stretch',
  }
})

export default Main
