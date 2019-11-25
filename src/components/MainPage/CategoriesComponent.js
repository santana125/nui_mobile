
import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/EvilIcons';
import {AsyncStorage} from '@react-native-community/async-storage';

import api from '../../services/api';

import hairwork from '../../assets/hairwork.png';
import nails from '../../assets/nails.png';
import makeup from '../../assets/makeup.png';
import haircut from '../../assets/haircut.png';


export default class CategoriesComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      pesquisa: '',
      loading: false,
    };
    console.log(this.props)
  }
  render() {
    const {pesquisa} = this.state;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.cardButton} onPress={() => this.props.nav.navigate('MainStab')}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Image source={haircut} style={styles.categoryIcon} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}onPress={() => this.props.nav.navigate('EstabProfile')}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Image source={nails} style={styles.categoryIcon} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Image source={hairwork} style={styles.categoryIcon} />
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardButton}>
            <LinearGradient 
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.cardBackground}>
              <Image source={makeup} style={styles.categoryIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    borderRadius: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
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
  categoryIcon: {
    height: 72,
    width: 72,
  },
});
