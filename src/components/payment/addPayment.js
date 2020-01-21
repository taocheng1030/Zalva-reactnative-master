import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab } from 'native-base';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";

import styles from 'styles/addPayment';

import * as loadImages from 'utils/loadImages';

import Loader from 'components/utils/loader';

import UtilService from 'utils/util';

class AddPayment extends Component {
    state = {};

    renderAddPayment() {
        return(
            <View style={styles.box_add_payment}>
                <LiteCreditCardInput 
                    onChange={this._onChange} 
                />
            </View>
        )
    }

    render(){
        const {
            loading,
            handleBack 
        } = this.props;
        return(
            <Container style={{ backgroundColor: '#f7f8fa' }}>
                <Loader loading={loading} />
                <Header iosBarStyle={"light-content"} style={styles.header}>
                    <Left style={styles.c_left}>
                        <Button 
                            transparent
                            onPress={handleBack}>
                            <Ionicons name="ios-close" size={35} color="#fff" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleScreen}>AGREGAR</Title>
                    </Body>
                    <Right/>
                </Header>
                
                <View style={{ flex: 1 }}>
                    <View style={{ height: 20 }} />
                    { this.renderAddPayment() }
                </View>

                <Footer>
                    <FooterTab>
                        <Button full style={styles.button_add}>
                            <Text>AGREGAR TARJETA</Text>
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        )
    }
}

AddPayment.propTypes = {
    handleBack: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default AddPayment;