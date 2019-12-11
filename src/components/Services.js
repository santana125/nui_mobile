import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  ToastAndroid
} from 'react-native';
import Service from './Service';
import Checkbasket from '../pages/CheckBasket';
import Appointment from './MainPage/Appointment';

export default class Services extends Component {
  constructor(props) {
    super(props);
    this.state = {
      servicesAdded: [],
      loading: false,
      modalVisible: false,
      showAppointmentModal: false
    };
  }

  finishBuy = () => {
    Alert.alert(
      'Serviço adicionado ao carrinho!',
      'Deseja adicionar mais produtos?',
      [
        {
          text: 'Não',
          onPress: () => this.setState({showAppointmentModal: true}),
        },
        {
          text: 'Sim',
        },
      ],
      {cancelable: false},
    );
  };

  selectService = service => {
    let ActualServices = this.state.servicesAdded;
    if (ActualServices.length <= 0) {
      ActualServices.push(service);
      this.setState({servicesAdded: ActualServices});
      this.finishBuy();
      return;
    }
    const check = ActualServices.some(elem => {
      return elem === service;
    });
    if (!check) {
      ActualServices.push(service);
      this.setState({servicesAdded: ActualServices});
      this.finishBuy();
    }else {
      ToastAndroid.show('Você já adicionou este serviço.', ToastAndroid.SHORT);
    }
  };
  render() {
    const {data, background, loading, logo, id} = this.props;

    if (!data) return null;

    return (
      <>
        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <Checkbasket
            background={background}
            services={this.state.servicesAdded}
            onCancel={() => this.setState({modalVisible: false})}
          />
        </Modal>
        <Modal
        animationType="fade"
        transparent
        visible={this.state.showAppointmentModal}
        logo={logo}
        onRequestClose={() => {
          this.setState({showAppointmentModal: false});
        }}>
        <Appointment
          background={background}
          services={this.state.servicesAdded}
          id={id}
          onCancel={() => this.setState({showAppointmentModal: false})}
        />
      </Modal>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : data.length === 0 ? (
              <Text>Nenhum serviço cadastrado</Text>
            ) : (
              <FlatList
                contentContainerStyle={{flexGrow: 0}}
                data={data}
                onRefresh={this.refreshPosts}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <Service
                    data={item}
                    background={background}
                    onPress={this.selectService}
                  />
                )}
              />
            )}
          </View>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  banner: {
    margin: 6,
    borderRadius: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    elevation: 1,
    padding: 6,
  },
  profileName: {
    color: '#2e3440',
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  profilePic: {
    borderRadius: 36,
    height: 72,
    width: 72,
  },
  profileInfo: {
    justifyContent: 'space-between',
    marginStart: 10,
    marginTop: 10,
    flex: 2,
    alignSelf: 'stretch',
  },
  profileView: {
    alignSelf: 'flex-start',
    borderRadius: 36,
    height: 72,
    width: 72,
    elevation: 3,
  },
  profileInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    alignSelf: 'stretch',
    paddingEnd: 15,
  },
});
