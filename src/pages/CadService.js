import React, {Component} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import CategoriesComponent from '../components/MainPage/CategoriesComponent';

class CadService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      categoria: '',
      descricao: '',
      tempoestimado: '',
      preco: '',
      loading: false,
    };
  }

  render() {
    const {loading} = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{minHeight: 10}}>
          <Text style={styles.titleText}>Cadastro de Serviço</Text>
        </View>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="Nome do serviço"
          value={this.state.nome}
          onChangeText={text => this.setState({nome: text})}
          returnKeyType="next"
          onSubmitEditing={() => this.refs.telefoneEntry.focus()}
        />
        <Text style={styles.titleText}>Categoria: </Text>
        <CategoriesComponent />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          textContentType="text"
          placeholder="Descrição"
          value={this.state.descricao}
          onChangeText={text => this.setState({descricao: text})}
          returnKeyType="next"
          ref={`telefoneEntry`}
          onSubmitEditing={() => this.refs.addressEntry.focus()}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          textContentType="text"
          keyboardType="number-pad"
          placeholder="Tempo estimado(em minutos)"
          value={this.state.tempoestimado}
          onChangeText={text => this.setState({tempoestimado: text})}
          ref={`cepEntry`}
          onSubmitEditing={() => this.refs.cepEntry.focus()}
        />
        <TextInput
          style={styles.input}
          autoCorrect={false}
          textContentType="text"
          keyboardType="number-pad"
          placeholder="Preço (em Reais)"
          value={this.state.preco}
          onChangeText={text => this.setState({preco: text})}
          ref={`cepEntry`}
          onSubmitEditing={() => this.refs.cepEntry.focus()}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            Alert.alert(
              'Sucesso!',
              'Seu serviço foi cadastrado e já pode ser requisitado por seus clientes.',
            );
          }}>
          <LinearGradient
            colors={['#d737b3', '#ae45ac', '#8154a7']}
            style={styles.loginBackground}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginText}>Cadastrar</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
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
    textAlign: 'center',
    justifyContent: 'space-around',
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
    textAlign: 'center',
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
    alignSelf: 'stretch',
    alignItems: 'center',
    marginBottom: 70,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoBack: {
    height: 160,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  avatar: {
    zIndex: 3,
  },
});

export default withNavigation(CadService);
