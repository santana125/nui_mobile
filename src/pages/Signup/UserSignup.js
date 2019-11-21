import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      senha: '',
      senha2: '',
      email: '',
      cadastroPessoa: '',
      loading: false,
      token: '',
    };
  }
  cadastrar = async () => {
    const {nome, senha, senha2, email, cadastroPessoa} = this.state;
    try {
      const response = await api.post('/usuario', {
        nome,
        senha,
        senha2,
        email,
        cadastroPessoa,
      });
      const token = response.data.message;
      await AsyncStorage.setItem('@UserToken', token);
      this.props.navigation.navigate('Main');
    } catch (err) {
      console.log(err.response.message);
    }
  };
  backToWelcome = () => {
    this.props.navigation.navigate('Welcome');
  };

  render() {
    const {loading} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignSelf: 'stretch'}}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="name"
            placeholder="Nome..."
            value={this.state.nome}
            onChangeText={text => this.setState({nome: text})}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.emailEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="emailAddress"
            placeholder="E-mail..."
            value={this.state.email}
            onChangeText={text => this.setState({email: text})}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.cadEntry.focus()}
            ref={'emailEntry'}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="CPF ou CNPJ"
            value={this.state.cadastroPessoa}
            onChangeText={text => this.setState({cadastroPessoa: text})}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.passEntry.focus()}
            ref={'cadEntry'}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
            placeholder="Senha..."
            value={this.state.senha}
            onChangeText={text => this.setState({senha: text})}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.confpassEntry.focus()}
            ref={'passEntry'}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
            placeholder="Confirme a senha..."
            value={this.state.senha2}
            onChangeText={text => this.setState({senha2: text})}
            returnKeyType="go"
            onSubmitEditing={() => this.cadastrar}
            ref={'confpassEntry'}
          />
        </View>
        <View style={{alignSelf: 'stretch'}}>
          <TouchableOpacity style={styles.loginButton} onPress={this.cadastrar}>
            <LinearGradient
              colors={['#d737b3', '#ae45ac', '#8154a7']}
              style={styles.loginBackground}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.loginText}>Continuar</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={this.backToWelcome}>
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff4',
    alignSelf: 'stretch',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignSelf: 'stretch',
  },
  titleText: {
    marginTop: 10,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cards: {
    maxHeight: 230,
    flexDirection: 'row',
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
    fontSize: 18,
  },
  loginButton: {
    height: 48,
    borderRadius: 38,
    marginHorizontal: 32,
    marginBottom: 20,
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
  backText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#e5e9f0',
  },
  backButton: {
    height: 48,
    borderRadius: 38,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 32,
    marginBottom: 40,
    justifyContent: 'center',
    backgroundColor: '#e74644',
    elevation: 2,
  },
});

export default withNavigation(UserSignup);
