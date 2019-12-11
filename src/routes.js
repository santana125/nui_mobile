import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from 'react-navigation';

import {View, Image} from 'react-native';

import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import Main from './pages/Main';
import MainStab from './pages/MainStab';
import Welcome from './pages/Welcome';
import Login from './pages/Auth/Login';
import BasicSignup from './pages/Signup/Signup';
import UserSignup from './pages/Signup/UserSignup';
import Address from './pages/Signup/Address';
import EstabSignup from './pages/Signup/Estab';
import EstabProfile from './pages/EstabProfile';
import EstabUserView from './pages/EstabUserView';
import {ScrollView} from 'react-native-gesture-handler';

const drawerCustom = props => (
  <SafeAreaView>
    <View style={{height: 150, alignItems: 'center', marginTop: 20}}>
      <Image
        style={{height: 140, width: 140, borderRadius: 70}}
        source={{
          uri: 'http://192.168.2.125:5000/imgs/useravatar.jpeg',
        }}
      />
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);

const MainStack = createDrawerNavigator(
  {
    Main: Main,
    Help: {screen: Address, navigationOptions: {drawerLabel: 'Ajuda'}},
    Profile: {screen: MainStab, navigationOptions: {drawerLabel: 'Perfil'}},
    Payment: {
      screen: UserSignup,
      navigationOptions: {drawerLabel: 'Metodos de Pagamento'},
    },
    Exit: {screen: EstabSignup, navigationOptions: {drawerLabel: 'Sair'}},
  },
  {contentComponent: drawerCustom},
);

export default createAppContainer(
  createSwitchNavigator({
    Welcome,
    Login,
    BasicSignup,
    EstabSignup,
    UserSignup,
    MainStack,
    MainStab,
    EstabUserView,
    EstabProfile,
  }),
);
