import React, {Component} from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Alert,
  BackHandler,
} from 'react-native';

import backImage from '../assets/background.jpg';
import avatarImage from '../assets/avatar.png';
import Service from '../components/Service';
import Services from '../components/Services';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

export default class EstabUserView extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      estabData: {},
      loading: false
    };
  }
  getEstabData = async () => {
    const id = this.props.navigation.state.params.id;
    this.setState({loading: true});
    try {
      const token = await AsyncStorage.getItem('@UserToken');
      const response = await api.get(`/estabelecimento/${id}`, {
        headers: {Authorization: token},
      });
      this.setState({estabData: response.data});
      this.setState({loading: false});
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    this.getEstabData();
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.navigate('Main');
    return true;
  };
  render() {
    const {estabData, loading} = this.state;
    const background = estabData.background
      ? {uri: estabData.background}
      : backImage;
    const avatar = estabData.avatar ? {uri: estabData.avatar} : avatarImage;
    return (
      <View style={styles.container}>
        <View
          style={[styles.content, {backgroundColor: estabData.cor || '#FFF'}]}>
          <View style={{alignSelf: 'stretch'}}>
            <View style={styles.photoBack}>
              <View style={styles.backContainer}>
                <Image
                  source={background}
                  style={{width: '100%', height: '100%', borderRadius: 6}}
                />
              </View>
              <View style={styles.avatarContainer}>
                <Image
                  source={avatar}
                  style={{width: 120, height: 120, borderRadius: 60}}
                />
              </View>
            </View>
          </View>
          <View style={styles.salonServices}>
            <Text style={styles.salonName}>{estabData.nome}</Text>
            <View style={styles.estabInfo}>
              <Text>{estabData.endereco ? estabData.endereco.cidade : ""}</Text>
            </View>
            <Services data={estabData.servicos} background={estabData.cor} loading={loading} {...this.props} logo={avatar} id={estabData._id}/>
          </View>
        </View>
      </View>
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
  content: {
    backgroundColor: '#ae45ac',
    flex: 3,
    alignSelf: 'stretch',
    alignContent: 'center',
    marginHorizontal: 17,
    margin: 6,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  estabInfo: {
    alignItems: 'center'
  },
  avatarContainer: {
    marginTop: -150,
    elevation: 12,
    backgroundColor: '#FFF',
    borderRadius: 60,
  },
  backContainer: {
    width: '100%',
    height: '100%',
    elevation: 3,
    backgroundColor: '#FFF',
    borderRadius: 6,
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
    marginHorizontal: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 10,
  },
  avatar: {
    zIndex: 3,
  },
  salonName: {
    marginTop: 10,
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 22,
    color: '#0C0C0C',
    fontWeight: '500',
  },
  salonServices: {
    flex: 3,
    elevation: 3,
    marginHorizontal: 8,
    marginVertical: 24,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingBottom: 16,
  },
});
