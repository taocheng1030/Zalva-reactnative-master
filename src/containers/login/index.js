'use strict';

import React, { PureComponent } from 'react';
import { StatusBar, Alert, Keyboard } from 'react-native';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import LoginComponent from 'components/login';

/* Service */
import authService from 'services/authService';

class Login extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            password: '',
            isModalVisible: false,
            msg: ''
        };
        StatusBar.setBarStyle('dark-content');
    }

    handleBack = () => {
        Actions.pop();
    }

    handleForgot = () => {
        Actions.Forgot();
    }

    handleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    }

    handleChange = (key, e) => {
        if(key == 'email') {
            this.setState({ email: e });
        }else if(key == 'password') {
            this.setState({ password: e  });
        }
    }

    handleSubmit = () => {
        Keyboard.dismiss();

        const { email, password } = this.state;
        
        if(email == '') {
            Alert.alert('Error de validación', 'Por favor ingresar un e-mail');
            return;
        }else if(password == '') {
            Alert.alert('Error de validación', 'Por favor ingresar una contraseña');
            return;
        }

        this.setState({ loading: true });

        authService.login((this.state.email || '').trim(),
            (this.state.password || '').trim(), (error, user) => {
                if(error == null) {
                    Actions.Home();
                }else {
                    setTimeout(() => {
                        this.setState({ isModalVisible: true, password: '', msg: error.message});
                    }, 500); 
                }
                this.setState({ loading: false });
        })
    }

    render() {
        const { email, password, isModalVisible, msg, loading } = this.state;
        return(
            <LoginComponent
                loading={loading}
                handleBack={this.handleBack}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleForgot={this.handleForgot}
                handleModal={this.handleModal}
                isModalVisible={isModalVisible}
                msg={msg}
                email={email}
                password={password}
            />
        )
    }
}

export default Login;