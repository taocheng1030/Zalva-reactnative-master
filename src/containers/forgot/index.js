'use strict';

import React, { PureComponent } from 'react';
import { StatusBar, Alert, Keyboard } from 'react-native';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import ForgotComponent from 'components/forgot';

/* Service */
import authService from 'services/authService';

class Forgot extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: '',
            msg: '',
            isModalVisible: false,
        };
        StatusBar.setBarStyle('dark-content');
    }

    handleBack = () => {
        Actions.pop();
    }

    handleChange = (key, e) => {
        this.setState({
            [key]: e
        });
    }

    handleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        });
    }

    handleForgot = () => {

        Keyboard.dismiss();

        const { email } = this.state;
        
        if(email == '') {
            Alert.alert('Error de validación', 'Por favor ingresar un e-mail');
            return;
        }

        this.setState({ loading: true })

        var data = {
            email: this.state.email,
            role: 'user'
        }

        authService.forgotPassword(data, (error, res) => {
            if(error == null) {
                Actions.Verify({
                    email: this.state.email
                });
            }else {
                setTimeout(() => {
                    this.setState({ isModalVisible: true, msg: error.message});
                }, 500); 
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { email, isModalVisible, msg, loading } = this.state;
        return(
            <ForgotComponent
                loading={loading}
                handleBack={this.handleBack}
                handleChange={this.handleChange}
                handleForgot={this.handleForgot}
                isModalVisible={isModalVisible}
                handleModal={this.handleModal}
                email={email}
                msg={msg}
            />
        )
    }
}

export default Forgot;