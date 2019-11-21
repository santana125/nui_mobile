import React, {Component} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

class Address extends Component {
  static navigationOptions = {drawerLabel: 'Addr'};
  constructor(props) {
    super(props);
    this.state = {
      endereco: '',
      cidade: '',
      numero: '',
      cep: '',
      estado: '',
      loading: false,
    };
  }
  cadastraEndereco = async () => {
    const {endereco, cidade, numero, cep, estado} = this.state;
    const token = await AsyncStorage.getItem('@UserToken');

    try {
      const response = await api.post(
        '/endereco',
        {endereco, cidade, numero, cep, estado},
        {headers: {Authorization: token}},
      );
    } catch (error) {
      if (error.response.status === 404)
        Alert.alert('Erro', 'Não foi possível encontrar o servidor.');
      else Alert.alert('Erro', error.response.data.message);
    }
  };
  render() {
    const {loading} = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignSelf: 'stretch'}}>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="postalCode"
            placeholder="CEP"
            value={this.state.cep}
            onChangeText={text => this.setState({cep: text})}
            ref={`cepEntry`}
            onSubmitEditing={() => this.refs.cepEntry.focus()}
          />

          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="streetAddressLine1"
            placeholder="Endereço..."
            value={this.state.endereco}
            onChangeText={text => this.setState({endereco: text})}
            ref={`addressEntry`}
            onSubmitEditing={() => this.refs.numberEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="addressCity"
            placeholder="Cidade..."
            value={this.state.cidade}
            onChangeText={text => this.setState({cidade: text})}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.stateEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="addressState"
            placeholder="Estado..."
            value={this.state.estado}
            onChangeText={text => this.setState({estado: text})}
            returnKeyType="next"
            ref={`stateEntry`}
            onSubmitEditing={() => this.refs.addressEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="streetAddressLine2"
            placeholder="Numero..."
            value={this.state.numero}
            onChangeText={text => this.setState({numero: text})}
            ref={`numberEntry`}
            onSubmitEditing={() => this.refs.cepEntry.focus()}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.cadastraEndereco}>
          <LinearGradient
            colors={['#d737b3', '#ae45ac', '#8154a7']}
            style={styles.loginBackground}>
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={styles.loginText}>Proximo passo</Text>
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
});

export default withNavigation(Address);
