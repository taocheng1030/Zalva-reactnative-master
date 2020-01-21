'use strict';

import React, { PureComponent } from 'react';
import { StatusBar, Alert, Keyboard } from 'react-native';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import RegisterComponent from 'components/register';

/* Service */
import authService from 'services/authService';

class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            firstname: '',
            lastname: '',
            phone: '',
            email: '',
            password: '',
            isModalVisible: false,
        };
        StatusBar.setBarStyle('dark-content');
    }

    handleBack = () => {
        Actions.pop();
    }

    handleChange = (key, e) => {
        this.setState({ [key]: e });
    }

    handleSubmit = () => {
        Keyboard.dismiss();

        console.log('Here ')

        const { firstname, lastname, phone, email, password } = this.state;

        if (firstname == '') {
            Alert.alert('Nombre', 'Por favor ingrese su nombre.');
            return;
        }else if(lastname == '') {
            Alert.alert('Apellido', 'Por favor ingrese su apellido.');
            return;
        }else if (phone == '') {
            Alert.alert('Telégono', 'Por favor ingrese su numero de telefono.');
            return;
        }else if(email == '') {
            Alert.alert('Error de validación', 'Por favor ingresar un e-mail');
            return;
        }else if(password == '') {
            Alert.alert('Error de validación', 'Por favor ingresar una contraseña');
            return;
        }

        this.setState({ loading: true });
        
        authService.signup({
            firstname: firstname.trim(),
            lastname:  lastname.trim(),
            email: email.trim(),
            password: password.trim(),
            phone: (phone || '').trim()
        }, (error, user) => {
            if (error == null) {
                Actions.Home();
            }else {
                this.setState({ msg: error.message, isModalVisible: true});
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { 
            firstname,
            lastname,
            phone,
            email, 
            password, 
            isModalVisible, 
            loading } = this.state;
        return(
            <RegisterComponent
                loading={loading}
                handleBack={this.handleBack}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                isModalVisible={isModalVisible}
                firstname={firstname}
                lastname={lastname}
                phone={phone}
                email={email}
                password={password}
            />
        )
    }
}

export default Register;