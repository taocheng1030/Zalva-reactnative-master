import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { Container, Button } from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';

/* Components */
import NavHeader from '../common/navHeader';
import Loader from '../utils/loader';
import ModalMessage from '../utils/modal';

/* Styles */
import styles from 'styles/login';
import * as commonStyles from 'styles/commonStyles';

class Change extends Component {
    render() {
        const { handleBack, handleChange, handleChangePass, isModalVisible, handleModal, msg, password, confirm, loading } = this.props;
        return(
            <Container>
                <Loader loading={loading} />
                <SafeAreaView />
                <NavHeader
                    buttons={commonStyles.NavBackButton}
                    onBack={handleBack}
                    title={'ACTUALIZAR'}
                />
                <SafeAreaView style={styles.contentScreen}>
                    <View style={styles.content_login}>
                        <View style={styles.input_content}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Contraseña"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                keyboardType="email-address"
                                value={password}
                                onChangeText={(text) => handleChange('password', text) }
                            />
                        </View>{/* input_content */}
                        <View style={styles.input_content}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Confirmar Contraseña"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                keyboardType="email-address"
                                value={confirm}
                                onChangeText={(text) => handleChange('confirm', text) }
                            />
                        </View>{/* input_content */}

                        <View style={styles.input_content}>
                            <Button onPress={handleChangePass} style={styles.btn_login}>
                                <Text style={styles.btn_login_txt}>{ 'Actualizar contraseña'.toUpperCase() }</Text>
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

Change.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleChangePass: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
    password: PropTypes.string,
    confirm: PropTypes.string,
    msg: PropTypes.string,
    loading: PropTypes.bool
};

export default Change;