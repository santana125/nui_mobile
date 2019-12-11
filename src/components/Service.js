import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import hairwork from '../assets/hairwork.png';
import nails from '../assets/nails.png';
import makeup from '../assets/makeup.png';
import haircut from '../assets/haircut.png';
import {TouchableOpacity} from 'react-native-gesture-handler';


export default class Service extends Component {
  constructor(props) {
    super(props);

  }
  getLogo = category => {
    switch (category) {
      case 'corte':
        return haircut;
      case 'maquiagem':
        return makeup;
      case 'manicure':
        return nails;
      case 'penteado':
        return hairwork;
      default:
        return haircut;
    }
  };

  render() {
    const {data, background} = this.props;
    return (
      <>

        <View style={styles.serviceContainer}>
          <View
            style={[
              styles.serviceCategoryContainer,
              {backgroundColor: background},
            ]}>
            <Image
              style={styles.categoryImage}
              source={this.getLogo(data.categoria)}
            />
          </View>
          <View style={styles.serviceDetailsContainer}>
            <Text style={styles.detailText}> {data.nome} </Text>
            <Text style={styles.detailText}> R$ {data.preco} </Text>
          </View>
          <TouchableOpacity
            style={styles.addToBasketButton}
            onPress={() => this.props.onPress(data)}>
            <Icon name="plus" color="#333" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.finalLine} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  serviceCategoryContainer: {
    marginHorizontal: 5,
    width: 56,
    height: 56,
    borderRadius: 28,
    padding: 10,
    elevation: 6,
    alignContent: 'center',
    alignItems: 'center',
  },
  categoryImage: {
    height: '100%',
    width: '100%',
  },
  serviceContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  serviceDetailsContainer: {
    alignSelf: 'stretch',
    flex: 3,
  },
  detailText: {
    marginTop: 6,
    fontWeight: '600',
  },
  finalLine: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: 2,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addToBasketButton: {
    marginEnd: 20,
  },
});
