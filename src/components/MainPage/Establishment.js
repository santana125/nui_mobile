import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import avatar from '../../assets/avatar.png';
export default class Establishment extends Component {
  constructor(props) {
    super(props);
  }
  handlePress = func => {
    func(this.props.item._id);
  };
  render() {
    const {item, onPress} = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.handlePress(onPress);
        }}>
        <View style={styles.banner} key={item._id}>
          <View style={styles.profileView}>
            <Image
              style={styles.profilePic}
              source={item.avatar ? {uri: item.avatar} : avatar}
            />
          </View>
          <View style={styles.profileInfo}>
            <View style={styles.profileInfoRow}>
              <Text style={styles.profileName}>{item.nome}</Text>
              <Text>{item.is_opened ? 'Aberto' : 'Fechado'}</Text>
            </View>
            <View style={styles.profileInfoRow}>
              <Icon name="star" color="#fccf03" size={22}>
                <Text> {item.nota}</Text>
              </Icon>
              <Text>{item.endereco ? item.endereco.endereco : null}</Text>
              <Text>{'$'.repeat(item.valor)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    borderRadius: 8,
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e5e9f0',
    height: 100,
    elevation: 4,
    padding: 4,
    flex: 1,
  },
  banner: {
    margin: 6,
    borderRadius: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    elevation: 1,
    padding: 6,
  },
  profileName: {
    color: '#2e3440',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  profilePic: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  profileInfo: {
    justifyContent: 'space-between',
    marginStart: 10,
    marginTop: 10,
    flex: 2,
    alignSelf: 'stretch',
  },
  profileView: {
    alignSelf: 'flex-start',
    borderRadius: 36,
    height: 72,
    width: 72,
    elevation: 3,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    alignSelf: 'stretch',
    paddingEnd: 15,
  },
});
