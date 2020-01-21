import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import styles from 'styles/payment';

import * as loadImages from 'utils/loadImages';

import Loader from 'components/utils/loader';

import UtilService from 'utils/util';

class Payment extends Component {
    state = {};

    renderAddPayment() {
        const { handleAddPayment } = this.props;
        return(
            <TouchableOpacity onPress={handleAddPayment}>
                <View style={styles.box_add_payment}>
                    <View style={[styles.box_add_payment_item, { alignItems: 'center'}]}>
                        <View style={styles.card_radius}>
                            <Ionicons name="md-card" size={25} color="white" />
                        </View>
                    </View>
                    <View style={styles.box_add_payment_item}>
                        <Text>AGREGAR PAGO</Text>
                    </View>
                    <View style={[styles.box_add_payment_item, { alignItems:'flex-end'}]}>
                        <Ionicons style={styles.arrow_payment} name="ios-arrow-forward" size={20} color="#b3b3b3" />
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    renderCardList() {
        return(
            <View style={styles.box_cards_content}>
                <View style={styles.payment_methods_title}>
                    <Text style={styles.payment_methods_title_txt}>{ 'Métodos de pago'.toUpperCase() }</Text>
                </View>
                <View style={styles.payment_methods}>
                    <View style={styles.payment_item}>
                        <View>
                            <View>
                                <FontAwesome name="cc-visa" size={25} color="#242937" />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.credit_number}>**** *** ***** 4242</Text>
                        </View>
                    </View>
                    <View style={styles.payment_item}>
                        <View>
                            <View>
                                <FontAwesome name="cc-mastercard" size={25} color="#242937" />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.credit_number}>**** *** ***** 9842</Text>
                        </View>
                    </View>
                    <View style={[styles.payment_item, { borderBottomWidth: 0 }]}>
                        <View>
                            <View>
                                <FontAwesome name="money" size={25} color="#242937" />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.credit_number}>{'Efectivo'}</Text>
                        </View>
                    </View>
                </View>
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
                            <Ionicons name="ios-arrow-back" size={25} color="#fff" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleScreen}>PAGO</Title>
                    </Body>
                    <Right/>
                </Header>
                
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ height: 30 }} />
                        { this.renderAddPayment() }
                        { this.renderCardList() }
                    </ScrollView>
                </View>

            </Container>
        )
    }
}

Payment.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleAddPayment: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default Payment;