'use strict';

import React, { PureComponent } from 'react';
import { StatusBar, Keyboard, Alert } from 'react-native';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import ChangeComponent from 'components/forgot/change';

/* Service */
import authService from 'services/authService';

class Change extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: props.email,
            password: '',
            confirm: '',
            isModalVisible: false,
            msg: ''
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

    handleChangePass = code => {
        Keyboard.dismiss();

        let { password, confirm } = this.state;

        if (password == '') {
            Alert.alert("Contraseña Requerido", "Por favor ingresa una contraseña");
            return;
        }

        if (confirm == '') {
            Alert.alert("Confirmación Requerida", "Por favor ingresa una confirmacion de tu contraseña");
            return;
        }

        if (password != confirm) {
            Alert.alert("Error", "Las contraseñas deben coincidir");
            return;
        }

        this.setState({ loading: true });

        var data = {
            role: 'user',
            old_password: password.trim(),
            new_password: password.trim()
        }

        authService.resetPassword(data, (error, res) => {
            if(error == null) {
                setTimeout(() => {
                    Alert.alert(
                      'Correcto',
                      'Su contraseña se ha actualizado correctamente',
                      [
                        {text: 'OK', onPress: () => Actions.Welcome() },
                      ],
                      { cancelable: false }
                    )
              }, 500);
            }else {
                setTimeout(() => {
                    this.setState({ isModalVisible: true, msg: error.message});
                }, 500); 
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { password, confirm, isModalVisible, msg, loading } = this.state;
        return(
            <ChangeComponent
                loading={loading}
                handleBack={this.handleBack}
                handleChange={this.handleChange}
                handleChangePass={this.handleChangePass}
                handleModal={this.handleModal}
                isModalVisible={isModalVisible}
                password={password}
                confirm={confirm}
                msg={msg}
            />
        )
    }
}

export default Change;