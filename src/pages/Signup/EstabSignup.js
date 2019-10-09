import React, { Component } from 'react'
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import {withNavigation} from 'react-navigation'
import api from '../../services/api'

class EstabSignup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      senha: '',
      senha2: '',
      email: '',
      cadastroPessoa: '',
      loading: false,
      token: ''
    }
  }
  cadastrarEstabelecimento = async () => {
    const {nome,senha,senha2,email,cadastroPessoa, token} = this.state
    const  response = await api.post('/usuario', {nome, senha, senha2, email, cadastroPessoa})
    this.setState({token: response.data.message})
    this.props.navigation.navigate('Address', {userToken: this.state.token})
  }

  render() {
    const { loading } = this.state
    return (
      <KeyboardAvoidingView style={styles.container}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="emailAddress"
          placeholder="Nome..."
          value={this.state.email}
          onChangeText={text => this.setState({ email: text })}
          returnKeyType='next'
          onSubmitEditing={() => this.refs.passEntry.focus()}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="emailAddress"
          placeholder="E-mail..."
          value={this.state.nome}
          onChangeText={text => this.setState({ nome: text })}
          returnKeyType='next'
          onSubmitEditing={() => this.refs.passEntry.focus()}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          textContentType="emailAddress"
          placeholder="CPF ou CNPJ"
          value={this.state.cadastroPessoa}
          onChangeText={text => this.setState({ cadastroPessoa: text })}
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
        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
          placeholder="Confirme a senha..."
          value={this.state.senha2}
          onChangeText={text => this.setState({ senha2: text })}
          returnKeyType='go'
          ref={"passEntry"}
        />
          <TouchableOpacity style={styles.loginButton}
            onPress={this.cadastrarEstabelecimento}>
            <LinearGradient
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.loginBackground}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text style={styles.loginText}>Proximo passo</Text>}
            </LinearGradient>
          </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff4',
    alignSelf: 'stretch',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    alignItems: 'center',
  },
  footer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  titleText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cards: {
    maxHeight: 230,
    flexDirection: 'row'
  },
  card: {
    padding: 10,
    paddingTop: 60,
    paddingBottom: 40,
    borderRadius: 20,
    height: 260,
    width: 180,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eceff4',
  },
  cardSelected: {
    padding: 10,
    paddingTop: 60,
    paddingBottom: 40,
    borderRadius: 20,
    height: 260,
    width: 180,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#d8dee9',
    elevation: 2,
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  loginButton: {
    height: 48,
    borderRadius: 38,
    marginHorizontal: 32,
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
  input: {
    height: 48,
    marginHorizontal: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#2e3440',
    textAlignVertical: 'bottom',
    alignSelf: 'stretch',
  },
  userImage: {
    elevation: 3,
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#FAA',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default withNavigation(EstabSignup)