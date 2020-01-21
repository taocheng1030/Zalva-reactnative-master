'use strict';

import React, { PureComponent } from 'react';
import { StatusBar, Alert, Keyboard } from 'react-native';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import VerifyComponent from 'components/forgot/verify';

/* Service */
import authService from 'services/authService';

class Verify extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            email: props.email,
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

    handleCode = code => {
        let { email } = this.state;

        var data = {
            email: email,
            code: code,
            role: 'user'
        }

        this.setState({ loading: true });

        authService.verification(data, (error, res) => {
            if(error == null) {
                Actions.Change();
            }else {
                setTimeout(() => {
                    this.setState({ isModalVisible: true, msg: error.message });
                }, 500); 
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { isModalVisible, msg, loading } = this.state;
        return(
            <VerifyComponent
                loading={loading}
                handleBack={this.handleBack}
                handleCode={this.handleCode}
                isModalVisible={isModalVisible}
                handleModal={this.handleModal}
                msg={msg}
            />
        )
    }
}

export default Verify;