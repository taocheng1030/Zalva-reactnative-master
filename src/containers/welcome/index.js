'use strict';

import React, { PureComponent } from 'react';
import { StatusBar, Keyboard, Alert, Platform } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import WelcomeComponent from 'components/welcome';

/* Service */
import authService from 'services/authService';

import googleService from 'services/googleService';
import Cache from 'utils/cache';

class Welcome extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        StatusBar.setBarStyle('dark-content');
    }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          alert('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
        } else {
          this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          alert('Permission to access location was denied');
        }
    };

    handleLogin = () => {
        Actions.Login();
    }

    handleRegister = () => {
        Actions.Register();
    }

    render() {
        return(
            <WelcomeComponent
                handleLogin={this.handleLogin}
                handleRegister={this.handleRegister}
            />
        )
    }
}

export default Welcome;