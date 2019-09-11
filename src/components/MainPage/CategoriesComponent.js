
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';
import {AsyncStorage} from '@react-native-community/async-storage';

import api from '../../services/api'


export default class CategoriesComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      pesquisa: '',
      loading: false,
    };
  }
  render() {
    const {pesquisa} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer} 
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Icon name='bell' size={72} color='#fcfcfc'/>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Icon name='heart' size={72} color='#fcfcfc'/>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Icon name='eye' size={72} color='#fcfcfc'/>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Icon name='trophy' size={72} color='#fcfcfc'/>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Icon name='close' size={64} color='#fcfcfc'/>
            </LinearGradient>
          </TouchableOpacity>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin:6,
    borderRadius: 8,
    alignSelf:'stretch',
    alignItems: 'center',
    alignContent:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e5e9f0',
    height: 100,
    elevation: 4,
  },
  cardButton: {
    width: 84,
    margin: 5,
  },
  cardBackground: {
    height: 84,
    borderRadius: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
