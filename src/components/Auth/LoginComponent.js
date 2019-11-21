import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'


class LoginComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      senha: '',
      loading: false,
    };
  }
  login = async () =>{
    const {email, senha} = this.state;
    this.setState({loading:true});
    try {
      const response = await api.post('/login', {email, senha});
      const {token} = response.data;
      await AsyncStorage.setItem('@UserToken', token);
      this.props.navigation.navigate('MainStack');
    } catch(error){
      console.log(error);
    }
    this.setState({loading:false});
    
  }
  render() {
    const {loading} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.dataInput}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="emailAddress"
            placeholder="E-mail..."
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
            returnKeyType='next'
            onSubmitEditing={() => this.refs.passEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
            placeholder="Senha..."
            value={this.state.senha}
            onChangeText={text => this.setState({ senha: text })}
            returnKeyType='go'
            ref={"passEntry"}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Text style={styles.esqueciSenha}>esqueci a senha</Text>
          <TouchableOpacity style={styles.loginButton} 
            onPress={this.login}>
            <LinearGradient
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.loginBackground}>
              {loading ?
              <ActivityIndicator size="small" color="white" /> :
              <Text style={styles.loginText}>LOGIN</Text>}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  dataInput: {
    alignSelf: 'stretch',
  },
  input: {
    height: 48,
    borderBottomWidth: 2,
    borderBottomColor: '#2e3440',
    textAlignVertical: 'bottom',
    alignSelf: 'stretch',
  },
  loginButton: {
    height: 48,
    borderRadius: 38,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  loginBackground: {
    height: 48,
    borderRadius: 38,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#e5e9f0',
  },
  buttonsContainer: {
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  esqueciSenha: {
    paddingTop: 15,
    paddingBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#4c566a',
  },
});

export default withNavigation(LoginComponent);
