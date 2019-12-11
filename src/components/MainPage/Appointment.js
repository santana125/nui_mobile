import React, {Component} from 'react';
import {
  Text,
  View,
  BackHandler,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import DateTimePicker from 'react-native-modal-datetime-picker';

import HourPicker from '../HourPicker';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      selectedDateAPI: '',
      selectedHour: '',
      hours: [],
      show: false,
      showHour: false,
    };
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackPress,
    );
  }

  getHours = async (date) => {
    try {
      const token = await AsyncStorage.getItem('@UserToken');
      const response = await api.post('/horarioslivres', {estabelecimentoId: this.props.id, dataMarcada: date}, {headers: {Authorization: token}})
      console.log(response.data)
      this.setState({hours: response.data.horariosLivres})
    }catch (err) {console.log(err)}
  }

  setDate = date => {
    let data = date,
      dia = data
        .getDate()
        .toString()
        .padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'),
      ano = data.getFullYear();
    let selectedDate = dia + '/' + mes + '/' + ano;
    let selectedDateAPI = ano + '-' + mes + '-' + dia;
    this.setState({selectedDate, selectedDateAPI});
    this.show();
  };

  show = () => {
    this.setState({
      show: !this.state.show,
    });
  };
  setHour = hour => {
    this.setState({
      selectedHour: hour,
    });
    this.toggleHour()
  };
  toggleHour = () => {
    this.setState({
      showHour: !this.state.showHour})
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  handleBackPress = () => {
    this.props.navigation.navigate('Main');
    return true;
  };
  render() {
    const {background, logo, services} = this.props;
    const {show, selectedDate, showHour, selectedHour, hours} = this.state;
    let total = 0;
    services.forEach(currentItem => {
      total += currentItem.preco;
    });
    return (
      <View style={styles.container}>
        <HourPicker isVisible={showHour} onConfirm={this.setHour} hours={hours} />
        <DateTimePicker
          isVisible={show}
          defaultDate={new Date()}
          minimumDate={new Date(2019, 11, 11)}
          maximumDate={new Date(2030, 12, 31)}
          locale={'pt-br'}
          modalTransparent={false}
          animationType={'fade'}
          androidMode={'default'}
          onConfirm={this.setDate}
          onCancel={() => this.setState({show: !this.state.show})}
          mode={'date'}
        />
        <View style={[styles.content, {backgroundColor: background || '#FFF'}]}>
          <View style={styles.avatarContainer}>
            <Image
              source={logo}
              style={{width: 120, height: 120, borderRadius: 60}}
            />
          </View>
          <View style={styles.salonServices}>
            <Text style={styles.salonName}>{services.length} SERVIÇOS</Text>
            <Text style={styles.value}>R$ {total},00</Text>
            <Text style={styles.formTitle}>DATA</Text>
            <TouchableOpacity style={styles.btnDate} onPress={this.show}>
              <Text>{selectedDate}</Text>
            </TouchableOpacity>
            <Text style={styles.formTitle}>HORÁRIO</Text>
            <TouchableOpacity style={styles.btnDate} onPress={() => {this.getHours(); this.toggleHour();}}>
              <Text>{selectedHour}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonExit}
                onPress={() => this.props.onCancel()}>
                <Icon name="x" color="#FFF" size={32} />
              </TouchableOpacity>
              <Text style={styles.buttonText}>VOLTAR</Text>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.buttonComplete}
                onPress={this.props.onGo}>
                <Icon name="check" color="#FFF" size={32} />
              </TouchableOpacity>
              <Text style={styles.buttonText}>AGENDAR</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    paddingVertical: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: '#ae45ac',
    flex: 3,
    alignSelf: 'stretch',
    marginHorizontal: 17,
    margin: 6,
    padding: 15,
    borderRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    marginTop: 90,
    marginBottom: -76,
    alignSelf: 'center',
    elevation: 12,
    height: 128,
    width: 128,
    backgroundColor: '#FFF',
    borderRadius: 60,
  },
  servicesList: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
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
    marginTop: 60,
    marginBottom: 16,
    marginLeft: 28,
    fontSize: 18,
    color: '#0C0C0C',
    textAlign: 'center',
    fontWeight: '700',
  },
  value: {
    fontSize: 18,
    color: '#be5fcf',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  salonServices: {
    alignSelf:'stretch',
    elevation: 3,
    marginHorizontal: 8,
    marginVertical: 24,
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingBottom: 16,
  },
  buttonsContainer: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonExit: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#e04128',
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonComplete: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#2bcf83',
    elevation: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  buttonText: {
    marginTop: 4,
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
  formTitle: {
    marginTop: 6,
    borderRadius: 4,
    fontSize: 15,
    textAlign: 'center',
  },
  finalLine: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: 2,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  addMore: {
    color: '#3c41ff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
  },
  creditCard: {
    marginHorizontal: 22,
    fontSize: 15,
  },
  btnDate: {
    alignSelf: 'stretch',
    backgroundColor: '#cccccc',
    marginHorizontal: 20,
    borderRadius: 6,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
