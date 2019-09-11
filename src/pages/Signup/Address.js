import React from 'react';
import {SafeAreaView, View,StyleSheet, Text} from 'react-native';

function Address({navigation}){
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.titleText}>Hi I'm the Address Screen</Text>
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

export default Address
