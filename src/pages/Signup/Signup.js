import React from 'react';
import { ScrollView, View, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import IconFontisto from 'react-native-vector-icons/Fontisto'
import LinearGradient from 'react-native-linear-gradient';
import {withNavigation} from 'react-navigation'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      type: false,
      nome: '',
      senha: '',
      senha2: '',
      email: '',
      cadPessoa: ''
    }
  }
  selectType = type => {
    this.setState({ type })
  }
  goToSignup = () => {
    this.state.type ? this.props.navigation.navigate('EstabSignup') : this.props.navigation.navigate('SignupUser')
  }

  move = delta => {
    const page = this.state.page + delta;
    this.go(page);
  }

  go = page => {
    this.viewPager.setPage(page);
    this.setState({ page });
  }

  render() {
    const { page, type } = this.state;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{flex:1}}>
        <KeyboardAvoidingView style={styles.content} enabled behavior="padding">
        <View style={{ flex: 1, alignSelf:'stretch'}}>
          <KeyboardAvoidingView key='0' style={{ alignItems: 'center', justifyContent: 'space-between', marginVertical: 20, flex:1 }}>
            <Text style={styles.titleText}>Escolha uma opção:</Text>
            <View style={styles.cards}>
              <TouchableOpacity style={[!type ? styles.cardSelected : styles.card, { marginRight: 5 }]} onPress={() => this.selectType(false)}>
                <IconFontisto name='smiley' size={64} />
                <Text style={styles.subtitle}>Usuario</Text>
              </TouchableOpacity>
              <TouchableOpacity style={type ? styles.cardSelected : styles.card} onPress={() => this.selectType(true)}>
                <IconFontisto name='shopping-store' size={64} />
                <Text style={styles.subtitle}>Estabelecimento</Text>
              </TouchableOpacity>
            </View>
                    <TouchableOpacity style={styles.loginButton} onPress={this.goToSignup}>
          <LinearGradient
            colors={['#d737b3', '#ae45ac', '#8154a7']}
            style={styles.loginBackground}>
            <Text style={styles.loginText}>Proxima etapa</Text>
          </LinearGradient>
        </TouchableOpacity>
          </KeyboardAvoidingView>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eceff4',
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
    flex:1,
    alignItems:'center',
    alignSelf:'stretch'
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
  loginBackground:{
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

export default withNavigation(Signup)
