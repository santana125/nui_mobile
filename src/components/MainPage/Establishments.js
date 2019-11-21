import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '../../services/api';


import Establishment from './Establishment';

class Establishments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pesquisa: '',
      loading: false,
      response: {},
      estabelecimentos: [],
    };
    this.getData();
  }
  async getData() {
    const UserToken = await AsyncStorage.getItem('@UserToken');
    if (UserToken == null) {
      this.props.navigation.navigate('Welcome');
      console.log('token not found');
    } else {
      try {
        this.state.response = await api.get('/estabelecimentos', {
          headers: {Authorization: UserToken},
        });
      } catch (err) {
        console.log(err);
        await AsyncStorage.removeItem('@UserToken');
        this.props.navigation.navigate('Welcome');
      }
      this.state.estabelecimentos = this.setState({
        estabelecimentos: this.state.response.data,
      });
    }
  }
  render() {
    const {pesquisa, estabelecimentos} = this.state;
    return (
      <KeyboardAvoidingView enabled behavior="height" style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {estabelecimentos.length === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              contentContainerStyle={{flexGrow: 0}}
              data={estabelecimentos}
              onRefresh={this.refreshPosts}
              keyExtractor={item => item._id}
              renderItem={({item, index}) => <Establishment item={item} />}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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

export default withNavigation(Establishments);
