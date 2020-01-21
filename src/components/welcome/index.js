import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Container, Button, Footer, FooterTab } from 'native-base';
import { LinearGradient } from 'expo';

/* Styles */
import styles from 'styles/welcome';

import * as loadImages from 'utils/loadImages';

class Welcome extends Component {
    render() {
        const { handleLogin, handleRegister } = this.props;
        return(
            <Container>
                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <View style={{ flex: 4, flexDirection:'column' }}>
                        <View style={styles.contentImage}>
                            <Image source={loadImages.intro} resizeMode={'contain'} style={{ width: 280, height: 280 }} />
                        </View>
                        <View style={styles.welcome_txt}>
                            <Text style={styles.welcomeTitle}>La nueva forma de viajar</Text>
                            <View style={styles.bellowTitle} />
                            <Text style={styles.welcomeLegend}>Ahora viajar es más fácil con la nueva app de transporte</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={handleLogin} style={styles.get_started}>
                            <Text style={styles.get_started_txt}>INICIAR AHORA</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleRegister} style={[styles.get_started, { backgroundColor: '#000'}]}>
                            <Text style={[styles.get_started_txt, { color: '#fff' }]}>REGISTRARSE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Container>
        )
    }
}

Welcome.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleRegister: PropTypes.func.isRequired
};

export default Welcome;