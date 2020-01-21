import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab } from 'native-base';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { ImagePicker } from 'expo';

import styles from 'styles/editAccount';
import * as loadImages from 'utils/loadImages';
import Loader from 'components/utils/loader';
import UtilService from 'utils/util';

class EditAccount extends Component {
    state = {
        image: ''
    };

    takePicture = async () => {

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
    
        if (!result.cancelled) {
            this.setState({
                image: result.uri
            });
            this.props.handleUpload(result.uri);
        }
    }

    renderCircleImage() {
        const { avatar } = this.props;
        return (
            <View style={styles.boxCircle}>
                <TouchableOpacity onPress={this.takePicture} style={styles.contentCircle}>
                    <Image source={avatar} style={styles.imageCircle}/>
                    <View style={styles.absoluteIcon}>
                        <Ionicons name="ios-camera" size={20} color={'white'} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    renderBody() {
        const { handleChange } = this.props;
        const{ firstname, lastname, phone } = this.props;
        return (
            <View style={styles.contentEdit}>
                
                <View style={styles.formGroup}>
                    <Text style={styles.labelInput}>Primer Nombre</Text>
                    <TextInput
                        ref="firstname"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="firstname"
                        placeholderTextColor={'black'}
                        textAlign="left"
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        returnKeyType={'done'}
                        value={firstname}
                        onChangeText={(text) => handleChange('firstname', text) }
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelInput}>Primer Apellido</Text>
                    <TextInput
                        ref="lastname"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="lastname"
                        placeholderTextColor={'black'}
                        textAlign="left"
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        returnKeyType={'done'}
                        value={lastname}
                        onChangeText={(text) => handleChange('lastname', text) }
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.labelInput}>Teléfono</Text>
                    <TextInput
                        ref="phone"
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholderTextColor={'black'}
                        textAlign="left"
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        keyboardType='phone-pad'
                        value={phone}
                        returnKeyType={'done'}
                        onChangeText={(text) => handleChange('phone', text) }
                    />
                </View>

            </View>
        )
    }

    render(){
        const {
            loading,
            handleBack,
            handleSubmit
        } = this.props;
        return(
            <Container style={{ backgroundColor: '#f7f8fa' }}>
                <Loader loading={loading} />
                <Header iosBarStyle={"light-content"} style={styles.header}>
                    <Left style={styles.c_left}>
                        <Button 
                            transparent
                            onPress={handleBack}>
                            <Ionicons name="ios-arrow-back" size={25} color="#fff" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleScreen}>EDITAR</Title>
                    </Body>
                    <Right />
                </Header>
                
                <View style={{ flex: 1 }}>
                    { this.renderCircleImage() }
                    { this.renderBody() }
                </View>

                <Footer>
                    <FooterTab>
                        <Button full onPress={handleSubmit} style={styles.btn_update}>
                            <Text style={styles.btn_update_txt}>ACTUALIZAR</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

EditAccount.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func,
    loading: PropTypes.bool
};

export default EditAccount;