import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { Container, Button } from 'native-base';

/* Components */
import NavHeader from '../common/navHeader';
import Loader from '../utils/loader';
import ModalMessage from '../utils/modal';

/* Styles */
import styles from 'styles/login';
import * as commonStyles from 'styles/commonStyles';

class Forgot extends Component {
    render() {
        const { handleBack, handleChange, handleForgot, isModalVisible, handleModal, msg, email, loading } = this.props;
        return(
            <Container>
                <Loader loading={loading} />
                <SafeAreaView />
                <NavHeader
                    buttons={commonStyles.NavBackButton}
                    onBack={handleBack}
                    title={'RECUPERAR'}
                />
                <SafeAreaView style={styles.contentScreen}>
                    <View style={styles.content_login}>
                        <View style={styles.input_content}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="E-mail"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                keyboardType="email-address"
                                value={email}
                                onChangeText={(text) => handleChange('email', text) }
                            />
                        </View>{/* input_content */}
                        

                        <View style={styles.input_content}>
                            <Button onPress={handleForgot} style={styles.btn_login}>
                                <Text style={styles.btn_login_txt}>{ 'Recuperar contraseña'.toUpperCase() }</Text>
                            </Button>
                        </View>{/* input_content */}

                    </View>{/* content_login */}

                    <ModalMessage 
                        isVisible={isModalVisible}
                        title={'Error'}
                        msg={msg}
                        footer={'ACEPTAR'}
                        handleModal={handleModal}
                    />

                </SafeAreaView>
            </Container>
        )
    }
}

Forgot.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleForgot: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
    isModalVisible: PropTypes.bool,
    email: PropTypes.string,
    msg: PropTypes.string,
    loading: PropTypes.bool
};

export default Forgot;