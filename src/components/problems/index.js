import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import styles from 'styles/problems';

import * as loadImages from 'utils/loadImages';

import Loader from 'components/utils/loader';

import UtilService from 'utils/util';

class Problem extends Component {
    state = {};
    
    renderStatus(status) {
        switch(status) {
            case 0:
                return(
                    <View style={[styles.problemStatus, { backgroundColor: '#f05050' }]}>
                        <Text style={{fontSize: 8, fontWeight:'bold', color: '#fff'}}>Pendiente</Text>
                    </View>
                )
            case 1:
                return(
                    <View style={[styles.problemStatus, { backgroundColor: '#ff902b' }]}>
                        <Text style={{fontSize: 8, fontWeight:'bold', color: '#fff'}}>En Proceso</Text>
                    </View>
                )
            case 2:
                return(
                    <View style={[styles.problemStatus, { backgroundColor: '#00a651' }]}>
                        <Text style={{fontSize: 8, fontWeight:'bold', color: '#fff'}}>Resuelto</Text>
                    </View>
                )
        }
    }

    render(){
        const {
            loading,
            handleBack,
            problems,
            handleAddProblem,
            detailProblem
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
                
                <ScrollView>
                    <View style={styles.contentProblems}>
                        {
                            problems && problems.items.map((item, index) => (
                            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => detailProblem(item) }>
                                <View style={styles.problemItem}>
                                    <View style={{flex: 6, justifyContent: 'center'}}>
                                        <Text style={{ fontWeight:'bold' }}>{item.title}</Text>
                                        <Text style={{fontSize: 12 }}>{ UtilService.getTrimText(item.description, 30) }</Text>
                                        { this.renderStatus(item.status) }
                                    </View>
                                    
                                    <View style={{flex: 1, alignItems: 'center', alignContent: 'center', justifyContent: 'center'}}>
                                        <Ionicons name="ios-arrow-forward" size={20} color="#b3b3b3" />
                                    </View>
                                </View>
                            </TouchableOpacity>))
                        }
                    </View>{/* contentProblems */}
                </ScrollView>
                
                <TouchableOpacity onPress={handleAddProblem} style={styles.btnAdd}>
                    <Ionicons name="ios-add" size={28} color="#fff" />
                </TouchableOpacity>

            </Container>
        )
    }
}

Problem.propTypes = {
    handleBack: PropTypes.func.isRequired,
    handleAddProblem: PropTypes.func.isRequired,
    detailProblem: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default Problem;