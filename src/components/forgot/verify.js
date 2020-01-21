import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text } from 'react-native';
import { Container, Button } from 'native-base';
import CodeInput from 'react-native-confirmation-code-input';

/* Components */
import NavHeader from '../common/navHeader';
import Loader from '../utils/loader';
import ModalMessage from '../utils/modal';

/* Styles */
import styles from 'styles/login';
import * as commonStyles from 'styles/commonStyles';

class Verify extends Component {
    render() {
        const { handleBack, handleCode, isModalVisible, msg, handleModal, loading } = this.props;
        return(
            <Container>
                <Loader loading={loading} />
                <SafeAreaView />
                <NavHeader
                    buttons={commonStyles.NavBackButton}
                    onBack={handleBack}
                    title={'VERIFICAR'}
                />
                <SafeAreaView style={styles.contentScreen}>
                    <View style={styles.content_login}>
                        <Text style={styles.instruction}>Hemos enviado un código de 4 digitos a su correo electrónico. Por favor revisa tu bandeja de entrada e ingresa el código.</Text>
                        <View style={styles.input_content}>
                            <CodeInput
                                ref="codeInputRef1"
                                codeLength={4}
                                inputPosition='center'
                                keyboardType="numeric"
                                onFulfill={(code) => handleCode(code)}
                                inactiveColor={'rgb(180, 180, 180)'}
                                activeColor={'rgb(0, 0, 0)'}
                            />
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

Verify.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleCode: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
    isModalVisible: PropTypes.bool,
    msg: PropTypes.string,
    loading: PropTypes.bool
};

export default Verify;