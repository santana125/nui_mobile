import React from 'react';
import {SafeAreaView, View, StyleSheet, Text, Alert} from 'react-native';
import HeaderComponent from '../components/MainPage/HeaderComponent';
import CategoriesComponent from '../components/MainPage/CategoriesComponent';
import Establishment from '../components/MainPage/Establishments';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import api from '../services/api';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  static navigationOptions = {drawerLabel: 'Home'};
  checkUser = async () => {
    const userToken = await AsyncStorage.getItem('@UserToken');
    if (!userToken) {
      this.props.navigation.navigate('Welcome');
    } else {
      const response = await api.get('/me', {
        headers: {Authorization: userToken},
      });
      const userInfo = response.data;
      if (userInfo.status === 0) {
        Alert.alert(
          'Você precisa terminar seu cadastro.',
          'Escolha entre Estabelecimento e Usuário',
          [
            {
              text: 'Estabelecimento',
              onPress: () => this.props.navigation.navigate('EstabSignup'),
            },
            {
              text: 'Usuário',
              onPress: () => this.props.navigation.navigate('UserSignup'),
            },
            {
              text: 'Cancelar',
              onPress: async () => {
                await AsyncStorage.removeItem('@UserToken');
                this.props.navigation.navigate('Welcome');
              },
              style: 'cancel',
            },
          ],
          {},
        );
      }
    }
  };

  getUserInfo = async () => {
    const token = await AsyncStorage.getItem('@UserToken');
    const user = await api.get('/me', {headers: {Authorization: token}});
    this.setState({user: user.data});
  };
  componentDidMount() {
    this.checkUser();
    this.getUserInfo();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <HeaderComponent avatar={this.state.user.avatar} />
        </View>
        <View style={styles.content}>
          <Text style={styles.titleText}>Categorias:</Text>
          <CategoriesComponent nav={this.props.navigation} />
          <Establishment style={styles.stabs} />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff4',
  },
  header: {
    alignItems: 'center',
  },
  footer: {
    alignSelf: 'stretch',
  },
  content: {
    alignSelf: 'stretch',
    padding: 8,
    flex: 3,
  },
  titleText: {
    paddingStart: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default withNavigation(Main);
