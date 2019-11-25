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
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

import avatar from '../../assets/avatarUser.jpg';

class BasicSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      confirmaSenha: '',
      avatar: {},
      loading: false,
    };
  }
  cadastraEstab = async () => {
    const {nome, cpf, email, senha, confirmaSenha} = this.state;

    const token = await AsyncStorage.getItem('@UserToken');
    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não combinam.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('cpf', cpf);
      formData.append('email', email);
      formData.append('senha', senha);
      if (this.state.avatar.name) {
        formData.append('avatar', {
          name: avatar.name,
          uri: avatar.path,
          type: avatar.mime,
        });
      }
      const Esresponse = await api.post('/usuario', formData, {
        headers: {Authorization: token, 'Content-Type': 'multipart/form-data'},
      });

      this.props.navigation.navigate('Main');
    } catch (error) {
      console.log(error);
      if (error.response.status === 404) {
        Alert.alert('Erro', 'Não foi possível encontrar o servidor.');
      } else {
        Alert.alert('Erro', error.response.data.message);
      }
    }
  };

  handleAvatarPick = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      if (image.mime === 'image/jpeg') image.name = 'avatar.jpeg';
      if (image.mime === 'image/jpg') image.name = 'avatar.jpg';
      if (image.mime === 'image/png') image.name = 'avatar.png';
      this.setState({avatar: image});
    });
  };


  render() {
    const {loading} = this.state;
    const avatarImage = this.state.avatar.path
      ? {uri: this.state.avatar.path}
      : avatar;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignSelf: 'stretch'}}>
          <View style={styles.photoBack}>
            <TouchableOpacity
              style={{marginTop: 50, paddingBottom: 40}}
              onPress={this.handleAvatarPick}>
              <Image
                source={avatarImage}
                style={{width: 120, height: 120, borderRadius: 60}}
              />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            placeholder="Nome..."
            value={this.state.nome}
            onChangeText={text => this.setState({nome: text})}
            returnKeyType="next"
            onSubmitEditing={() => this.refs.cpfEntry.focus()}
          />
          <TextInput
          style={styles.input}
          autoCorrect={false}
          textContentType="text"
          placeholder="CPF..."
          value={this.state.cpf}
          onChangeText={text => this.setState({cpf: text})}
          ref={`cpfEntry`}
          onSubmitEditing={() => this.refs.emailEntry.focus()}
        />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="email"
            placeholder="Email..."
            value={this.state.email}
            onChangeText={text => this.setState({telefone: text})}
            returnKeyType="next"
            ref={`emailEntry`}
            onSubmitEditing={() => this.refs.senhaEntry.focus()}
          />


          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="password"
            secureTextEntry={true}
            placeholder="Senha"
            value={this.state.endereco}
            onChangeText={text => this.setState({endereco: text})}
            ref={`senhaEntry`}
            onSubmitEditing={() => this.refs.confSenhaEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="addressCity"
            placeholder="Confirme sua senha..."
            value={this.state.cidade}
            onChangeText={text => this.setState({cidade: text})}
            returnKeyType="next"
            ref={`confSenhaEntry`}
            onSubmitEditing={this.cadastraUsuario}
          />
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={this.cadastraEstab}>
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

export default withNavigation(BasicSignup);
