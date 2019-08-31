import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Main from './pages/Main';
import Welcome from './pages/Welcome';
import Login from './pages/Auth/Login';

export default createAppContainer(
    createSwitchNavigator({
        Main,
        Welcome,
        Login,
    })
);




