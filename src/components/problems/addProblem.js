import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab } from 'native-base';
import { View, Text, TextInput, Keyboard } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import styles from 'styles/problems';

import * as loadImages from 'utils/loadImages';

import Loader from 'components/utils/loader';

import UtilService from 'utils/util';

class AddProblem extends Component {
    state = {};

    render(){
        const {
            loading,
            handleBack,
            handleChange,
            handleSubmit,
            title,
            description
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
                        <Title style={styles.titleScreen}>SOPORTE</Title>
                    </Body>
                    <Right />
                </Header>
                
                <View style={{flex: 1, flexDirection: 'column', paddingTop: 30}}>
                    <View style={{marginHorizontal: 10}}>
                        <TextInput
                            ref="title"
                            autoCapitalize="none"
                            autoCorrect={true}
                            placeholder="¿En que podemos ayudarte?"
                            textAlign="left"
                            style={styles.title}
                            underlineColorAndroid="transparent"
                            returnKeyType={'next'}
                            value={title}
                            onChangeText={(text) => handleChange('title', text) }
                            onSubmitEditing={() => this.refs.description.focus()}
                        />
                    </View>
                    <View style={{marginHorizontal: 10}}>
                        <TextInput
                            ref="description"
                            autoCapitalize="none"
                            multiline={true}
                            autoCorrect={true}
                            placeholder="Cuentanos tu problema"
                            textAlign="left"
                            style={styles.description}
                            underlineColorAndroid="transparent"
                            textAlignVertical={'top'}
                            returnKeyType={'done'}
                            value={description}
                            onChangeText={(text) => handleChange('description', text) }
                            onSubmitEditing={() => Keyboard.dismiss() }
                        />
                    </View>
                </View>
                <Footer>
                    <FooterTab>
                        <Button full style={styles.btn_add} onPress={handleSubmit}>
                            <Text style={styles.btn_add_txt}>ENVIAR PROBLEMA</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

AddProblem.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    loading: PropTypes.bool
};

export default AddProblem;