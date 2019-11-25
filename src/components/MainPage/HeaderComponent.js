import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {AsyncStorage} from '@react-native-community/async-storage';

import avatar from '../../assets/avatarUser.jpg';

import api from '../../services/api';

export default class HeaderComponent extends Component {
  constructor(props) {
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
        <View style={styles.searchBar}>
          <Icon name="search" size={24} color="#ae45ac" />
          <TextInput
            hideChevron={true}
            style={styles.searchInput}
            placeholder="Pesquisar..."
            maxLength={40}
            value={pesquisa}
            onChangeText={text => this.setState({pesquisa: text})}
          />
          {!pesquisa ? (
            <Text> </Text>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => this.setState({pesquisa: ''})}>
              <Icon
                name="close-o"
                style={styles.deleteButton}
                size={20}
                color="#bf616a"
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={styles.filter}>
          <Icon name="plus" size={24} color="#ae45ac" />
          <Text> Filtrar</Text>
        </View>
        <Image
          style={styles.profilePic}
          source={this.props.avatar ? {uri: this.props.avatar} : avatar}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#e5e9f0',
    height: 60,
    margin: 8,
    padding: 25,
    elevation: 4,
  },
  profilePic: {
    borderWidth: 2,
    borderColor: '#ae45ac',
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  searchBar: {
    flex: 1,
    marginStart: 10,
    marginEnd: 6,
    flexDirection: 'row',
    paddingStart: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#d8dee9',
    borderRadius: 12,
    height: 32,
  },
  searchInput: {
    flex: 3,
    alignContent: 'stretch',
    alignSelf: 'flex-start',
    right: 0,
    left: 0,
    height: 32,
    textAlignVertical: 'center',
    margin: 0,
    padding: 0,
  },
  filter: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  deleteButton: {
    marginEnd: 5,
  },
});
