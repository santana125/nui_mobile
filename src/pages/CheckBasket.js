import React, {Component} from 'react';
import {
  Text,
  View,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

export default class Checkbasket extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
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
    const {services, background} = this.props;
    let total = 0;
    return (
      <View style={styles.container}>
        <View style={[styles.content, {backgroundColor: background || '#FFF'}]}>
          <View style={styles.salonServices}>
            <Text style={styles.salonName}>SERVIÇOS</Text>
            <Text style={styles.value}>VALOR</Text>
            <View>
              {services
                ? services.map(item => {
                    total += item.preco;
                    return (
                      <>
                        <View style={styles.servicesList}>
                          <Text>{item.nome}</Text>
                          <Text>R$ {item.preco},00</Text>
                        </View>
                        <View style={styles.finalLine} />
                      </>
                    );
                  })
                : null}
              <Text style={styles.valueTotal}>TOTAL R$ {total},00</Text>
              <TouchableOpacity onPress={() => this.props.onCancel()}>
                <Text style={styles.addMore}>Adicionar mais serviços</Text>
              </TouchableOpacity>
              <Text style={styles.salonName}>FORMA DE PAGAMENTO</Text>
              <Text style={styles.creditCard}>Cartão de Crédito - 9832 <Icon name="chevron-down" color="#ae45ac" size={22} /></Text>
            </View>
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
  servicesList: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
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
    marginLeft: 28,
    fontSize: 18,
    color: '#0C0C0C',
    fontWeight: '700',
  },
  value: {
    marginHorizontal: 22,
    marginBottom: 18,
    fontSize: 18,
    color: '#be5fcf',
    textAlign: 'right',
    fontWeight: '700',
  },
  valueTotal: {
    marginHorizontal: 22,
    marginTop: 18,
    fontSize: 18,
    color: '#be5fcf',
    textAlign: 'right',
    fontWeight: '700',
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
    fontSize: 15
  }
});
