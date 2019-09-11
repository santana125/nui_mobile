import {createAppContainer, createSwitchNavigator, createStackNavigator, NavigationActions} from 'react-navigation';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import Main from './pages/Main';
import Welcome from './pages/Welcome';
import Login from './pages/Auth/Login';
import Signup from './pages/Signup/Signup';
import Address from './pages/Signup/Address';

const SignupStack = createStackNavigator({ 
  Signup:{
    screen: Signup,
  navigationOptions: ({navigation}) => ({
  title: `Cadastro`,
  headerLeft: (
      <Icon
        style={{marginLeft:16, width: 50}}
        name='arrow-left'
        size={26}
        onPress={() => navigation.navigate('Welcome')}
        color="#222"
      />
    ),
  }) },
  Address: {
    screen: Address,
    navigationOptions: () => ({
      title:'Endereço',
    })
  }
});

export default createAppContainer(
    createSwitchNavigator({
        Welcome,
        Login,
        Main,
        SignupStack,
    })
);




