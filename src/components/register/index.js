import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { Container, Footer, FooterTab, Button } from 'native-base';

/* Components */
import NavHeader from '../common/navHeader';
import Loader from '../utils/loader';

/* Styles */
import styles from 'styles/login';
import * as commonStyles from 'styles/commonStyles';

class Register extends Component {
    render() {
        const { 
            handleBack, 
            handleChange, 
            handleSubmit, 
            firstname, 
            lastname, 
            phone, 
            email, 
            password, 
            loading } = this.props;
        return(
            <Container>
                <Loader loading={loading} />
                <SafeAreaView />
                <NavHeader
                    buttons={commonStyles.NavBackButton}
                    onBack={handleBack}
                    title={'REGISTRARSE'}
                />
                <SafeAreaView style={styles.contentScreen}>
                    <View style={styles.content_login}>
                        <View style={styles.input_content}>
                            <TextInput
                                autoCapitalize="words"
                                autoCorrect={false}
                                placeholder="Primer Nombre"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                value={firstname}
                                onChangeText={(text) => handleChange('firstname', text) }
                                onSubmitEditing={() => this.refs.lastname.focus() }
                            />
                        </View>{/* input_content */}
                        <View style={styles.input_content}>
                            <TextInput
                                ref="lastname"
                                autoCapitalize="words"
                                autoCorrect={false}
                                placeholder="Primer Apellido"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType={'next'}
                                value={lastname}
                                onChangeText={(text) => handleChange('lastname', text) }
                                onSubmitEditing={() => this.refs.phone.focus() }
                            />
                        </View>{/* input_content */}
                        <View style={styles.input_content}>
                            <TextInput
                                ref="phone"
                                autoCapitalize="none"
                                autoCorrect={false}
                                placeholder="Teléfono"
                                placeholderTextColor={'black'}
                                textAlign="left"
                                style={styles.input}
                                underlineColorAndroid="transparent"
                                returnKeyType="next"
                                keyboardType="numeric"
                                value={phone}
                                onChangeText={(text) => handleChange('phone', text) }
                            
                            />
                        </View>{/* input_content */}
                        <View style={styles.input_content}>
                            <TextInput
                                ref="email"
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
                                onSubmitEditing={() => this.refs.password.focus() }
                            />
                        </View>{/* input_content */}
                        <View style={styles.input_content}>
                            <TextInput
                                ref="password"
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
                                <Text style={styles.btn_login_txt}>REGISTARSE</Text>
                            </Button>
                        </View>{/* input_content */}

                    </View>{/* content_login */}
                </SafeAreaView>
            </Container>
        )
    }
}

Register.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    loading: PropTypes.bool
};

export default Register;