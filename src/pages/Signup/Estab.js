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
import ColorPalette from 'react-native-color-palette';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Establishment from '../../components/MainPage/Establishments';
import ImagePicker from 'react-native-image-crop-picker';

import background from '../../assets/background.jpg';
import avatar from '../../assets/avatar.png';

class EstabSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      cor: '',
      telefone: '',
      foto: '',
      endereco: '',
      cidade: '',
      numero: '',
      cep: '',
      estado: '',
      avatar: {},
      background: {},
      loading: false,
    };

    this.colors = [
      '#C0392B',
      '#E74C3C',
      '#9B59B6',
      '#2980B9',
      '#2E3440',
      '#3B4252',
      '#E5E9F0',
      '#ECEFF4',
      '#88C0D0',
      '#81A1C1',
      '#5E81AC',
      '#BF616A',
      '#D08770',
      '#EBCB8B',
      '#A3BE8C',
      '#FF69B4',
    ];
  }
  cadastraEstab = async () => {
    const {
      nome,
      cor,
      telefone,
      foto,
      endereco,
      cidade,
      numero,
      cep,
      estado,
      avatar,
      background,
    } = this.state;

    const token = await AsyncStorage.getItem('@UserToken');
    try {
      const formData = new FormData();
      formData.append('nome', nome);
      formData.append('cor', cor);
      formData.append('telefone', telefone);
      if (this.state.avatar.name) {
        formData.append('avatar', {
          name: avatar.name,
          uri: avatar.path,
          type: avatar.mime,
        });
      }
      if (this.state.background.name) {
        formData.append('background', {
          name: background.name,
          uri: background.path,
          type: background.mime,
        });
      }
      const Esresponse = await api.post('/estabelecimento', formData, {
        headers: {Authorization: token, 'Content-Type': 'multipart/form-data'},
      });
      const Enresponse = await api.post(
        '/endereco',
        {endereco, cidade, numero, cep, estado},
        {headers: {Authorization: token}},
      );
      const response = await api.post(
        '/me/finish',
        {},
        {
          headers: {Authorization: token},
        },
      );
      this.props.navigation.navigate('MainStab');
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

  handleBackgroundPick = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 200,
      cropping: true,
    }).then(image => {
      if (image.mime === 'image/jpeg') image.name = 'background.jpeg';
      if (image.mime === 'image/jpg') image.name = 'background.jpg';
      if (image.mime === 'image/png') image.name = 'background.png';
      this.setState({background: image});
    });
  };

  render() {
    const {loading} = this.state;
    const avatarImage = this.state.avatar.path
      ? {uri: this.state.avatar.path}
      : avatar;
    const backgroundImage = this.state.background.path
      ? {uri: this.state.background.path}
      : background;
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={{alignSelf: 'stretch'}}>
          <View style={styles.photoBack}>
            <TouchableOpacity
              style={{width: '100%', height: '100%'}}
              onPress={this.handleBackgroundPick}>
              <Image
                source={backgroundImage}
                style={{width: '100%', height: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginTop: -120, paddingBottom: 40}}
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
            onSubmitEditing={() => this.refs.telefoneEntry.focus()}
          />
          <TextInput
            style={styles.input}
            autoCorrect={false}
            textContentType="telephoneNumber"
            placeholder="Telefone..."
            value={this.state.telefone}
            onChangeText={text => this.setState({telefone: text})}
            returnKeyType="next"
            ref={`telefoneEntry`}
            onSubmitEditing={() => this.refs.addressEntry.focus()}
          />
          <Text style={styles.titleText}>Selecione uma cor: </Text>
          <ColorPalette
            onChange={color => {
              this.setState({cor: color});
            }}
            title=""
            value={this.state.coR}
            colors={this.colors}
            icon={
              <Icon name={'check-circle-outline'} size={25} color={'white'} />
            }
          />
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
            autoCompleteType="off"
            placeholder="Numero..."
            value={this.state.numero}
            onChangeText={text => this.setState({numero: text})}
            ref={`numberEntry`}
            onSubmitEditing={() => this.refs.cepEntry.focus()}
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

export default withNavigation(EstabSignup);
