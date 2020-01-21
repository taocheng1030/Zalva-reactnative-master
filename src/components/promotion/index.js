import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* Config */
import * as config from '../../config';

/* Styles */
import styles from 'styles/promotion';

/* Utils */
import * as loadImages from 'utils/loadImages';
import Loader from 'components/utils/loader';
import UtilService from 'utils/util';

class Promotion extends Component {

    state = {};

    render(){
        const { 
            loading,
            handleBack,
            changePromotionCode, 
            code,
            handleApplyPromotion } = this.props;
        return(
            <Container style={{ backgroundColor: '#ebecee' }}>
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
                        <Title style={styles.titleScreen}>PROMOCION</Title>
                    </Body>
                    <Right/>
                </Header>
                
                <View style={styles.promotion}>

                    <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Código Promocional"
                        placeholderTextColor={'rgb(158,158,164)'}
                        textAlign="left"
                        style={{ flex:1, marginLeft:16, fontSize:15 }}
                        underlineColorAndroid="transparent"
                        value={code}
                        onChangeText={(text) => changePromotionCode(text)}
                    />
                    <TouchableOpacity onPress={handleApplyPromotion} style={styles.promotion_buttom}>
                        <Text style={styles.promotion_txt}>APLICAR</Text>
                    </TouchableOpacity>

                </View>

            </Container>
        )
    }
}

Promotion.propTypes = {
    handleBack: PropTypes.func.isRequired,
    changePromotionCode: PropTypes.func.isRequired,
    handleApplyPromotion: PropTypes.func.isRequired,
    code: PropTypes.string.isRequired
};

export default Promotion;