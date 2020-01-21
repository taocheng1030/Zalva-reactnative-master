import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from 'styles/problems';

import Loader from 'components/utils/loader';

class DetailProblem extends Component {
    state = {};

    render(){
        const {
            loading,
            handleBack,
            problem
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
                        <Title style={styles.titleScreen}>DETALLE</Title>
                    </Body>
                    <Right />
                </Header>
                
                <View style={{flexDirection: 'column', paddingTop: 30, marginHorizontal: 10}}>
                    
                    <Text style={{fontWeight:'bold'}}>Problema:</Text>    
                    <Text style={{marginTop: 4, fontSize: 13}}>{problem.title}</Text> 

                    <Text style={{fontWeight:'bold', marginTop: 10}}>Detalle de problema:</Text>    
                    <Text style={{marginTop: 4, fontSize: 13}}>{problem.description}</Text> 

                    { problem.answer != "" && <View style={{backgroundColor:'#d8d8da', height: 0.5, marginTop: 10}}/> }
                    { problem.answer != "" && <Text style={{fontWeight:'bold', marginTop: 10}}>Resolución:</Text> }
                    { problem.answer != "" && <Text style={{marginTop: 4, fontSize: 13}}>{problem.answer}</Text>  }
                    
                </View>
                
                
            </Container>
        )
    }
}

DetailProblem.propTypes = {
    handleBack: PropTypes.func.isRequired,
    problem: PropTypes.object,
    loading: PropTypes.bool
};

export default DetailProblem;