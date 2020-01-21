import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Container, Button } from 'native-base';

/* Components */
import NavHeader from '../common/navHeader';
import Loader from '../utils/loader';
import ModalMessage from '../utils/modal';

/* Styles */
import styles from 'styles/login';
import * as commonStyles from 'styles/commonStyles';

class Login extends Component {
    render() {
        const { handleBack, handleChange, handleSubmit, handleForgot, handleModal, isModalVisible, email, password, msg, loading } = this.props;
        return(
            <Container>
                <Loader loading={loading} />
                <SafeAreaView />
                <NavHeader
                    buttons={commonStyles.NavBackButton}
                    onBack={handleBack}
                    title={'INGRESAR'}
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
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Contraseña"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType={'done'}
                                secureTextEntry={true}
                                value={password}
                                onChangeText={(text) => handleChange('password', text)}
                            />
                        </View>{/* input_content */}

                        <View style={styles.input_content}>
                            <Button onPress={handleSubmit} style={styles.btn_login}>
                                <Text style={styles.btn_login_txt}>INICIAR AHORA</Text>
                            </Button>
                        </View>{/* input_content */}

                        <View style={styles.content_forgot}>
                            <Text style={styles.content_forgot_txt} onPress={handleForgot}>¿Olvido su contraseña?</Text>
                        </View>
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

Login.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleForgot: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    msg: PropTypes.string,
    loading: PropTypes.bool
};

export default Login;