import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab } from 'native-base';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import styles from 'styles/account';

import Loader from 'components/utils/loader';
import UtilService from 'utils/util';

class Account extends Component {
    state = {};
    
    render(){
        const {
            loading,
            handleBack,
            handleEditAccount
        } = this.props;
        const { avatar, user } = this.props;
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
                        <Title style={styles.titleScreen}>CUENTA</Title>
                    </Body>
                    <Right />
                </Header>
                
                <ScrollView>
                    <View style={styles.headerAccount}>
                        <View style={styles.headerContAccount}>
                            <Image source={avatar} style={styles.avatarAccount} />
                                <Text style={styles.userName}>{ UtilService.getFullname(user).toUpperCase() }</Text>
                                <View style={styles.editAccount}>
                                    <Text style={styles.textEditAccount}>{ UtilService.showRatingUser(user.rating) } <Ionicons name="ios-star" size={14} color="#000" /></Text>
                                </View>
                        </View>
                    </View>

                    <View style={styles.account_detail_info}>
                        <Text style={styles.account_detail_info_txt}>Información</Text>
                    </View>

                    <View style={styles.account_list_detail}>
                        <View style={[styles.account_list, { paddingTop: 0}]}>
                            <View style={styles.account_list_left}>
                                <Text style={styles.account_list_left_txt}>PRIMER NOMBRE:</Text>
                            </View>
                            <View style={styles.account_list_right}>
                                <Text style={styles.account_list_right_txt}>{ user.firstname }</Text>
                            </View>
                        </View>
                        <View style={styles.account_list}>
                            <View style={styles.account_list_left}>
                                <Text style={styles.account_list_left_txt}>PRIMER APELLIDO:</Text>
                            </View>
                            <View style={styles.account_list_right}>
                                <Text style={styles.account_list_right_txt}>{ user.lastname }</Text>
                            </View>
                        </View>
                        <View style={styles.account_list}>
                            <View style={styles.account_list_left}>
                                <Text style={styles.account_list_left_txt}>TELEFONO:</Text>
                            </View>
                            <View style={styles.account_list_right}>
                                <Text style={styles.account_list_right_txt}>{ user.phone }</Text>
                            </View>
                        </View>
                        <View style={[styles.account_list, { borderBottomWidth: 0 }]}>
                            <View style={styles.account_list_left}>
                                <Text style={styles.account_list_left_txt}>E-MAIL:</Text>
                            </View>
                            <View style={styles.account_list_right}>
                                <Text style={styles.account_list_right_txt}>{ user.email }</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer>
                    <FooterTab>
                        <Button full onPress={handleEditAccount} style={styles.btn_edit}>
                            <Text style={styles.btn_edit_txt}>EDITAR CUENTA</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}

Account.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleEditAccount: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default Account;