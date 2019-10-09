import React, { Component } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Button, Text} from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto'
import { TouchableOpacity } from 'react-native-gesture-handler';


class TypeSelect extends Component {

  render() {
    return (
      <View style={styles.container}>
      <Text>Você é?</Text>
        <View style={styles.cards}>
          <TouchableOpacity style={styles.card}>
          <Text>Usuario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
          <Text>Estabelecimento</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 230,
    flexDirection: 'column',
    alignItems: 'center',
  },

});

export default TypeSelect;
