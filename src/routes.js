import {createAppContainer, createSwitchNavigator, } from 'react-navigation';

import {createDrawerNavigator} from 'react-navigation-drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import Main from './pages/Main';
import MainStab from './pages/MainStab';
import Welcome from './pages/Welcome';
import Login from './pages/Auth/Login';
import Signup from './pages/Signup/Signup';
import UserSignup from './pages/Signup/UserSignup';
import Address from './pages/Signup/Address';
import EstabSignup from './pages/Signup/Estab';

const MainStack = createDrawerNavigator({
  Main: Main,
  Profile: Address,
});

export default createAppContainer(
  createSwitchNavigator({
    Welcome,
    Login,
    EstabSignup,
    UserSignup,
    MainStack,
    MainStab,
  }),
);
