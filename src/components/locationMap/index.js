import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Button, Footer, FooterTab } from 'native-base';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MapView } from 'expo';

import styles from 'styles/locationMap';
import { screenWidth, screenHeight } from "styles/commonStyles";

import { Actions } from 'react-native-router-flux';

import * as commonColors from 'styles/commonColors';
import * as loadImages from 'utils/loadImages';

import UtilService from 'utils/util';

class LocationMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    renderTitle() {
        const { target } = this.props;
        if(target == 'fromLocation') {
            return <Text style={styles.header_center}>ORIGEN</Text>
        }

        if(target == 'toLocation') {
            return <Text style={styles.header_center}>DESTINO</Text>
        }
    }

    render(){
        const { region, onRegionChange, locationDone } = this.props;
        return(
            <Container style={styles.bgLocation}>
                <Header iosBarStyle={"light-content"} style={styles.header}>
                    <Left style={styles.c_left}>
                        <Button 
                            transparent
                            onPress={() => Actions.pop() }>
                            <Ionicons name="md-close" size={25} color="#fff" />
                        </Button>
                    </Left>
                    <Body>
                        { this.renderTitle() }
                    </Body>
                    <Right/>
                </Header>

                <View style={styles.contentMap}>
                    <View style={styles.contentLocation}>
                        <Image
                            source={loadImages.pickup_pin}
                            style={styles.pickup}
                            resizeMode={'contain'}/>
                    </View>
                    <MapView
                        style={styles.map}
                        provider={'google'}
                        region={region}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        onRegionChangeComplete={region => onRegionChange(region) }
                    />
                </View>

                <TouchableOpacity onPress={locationDone} style={styles.done}>
                    <Text style={styles.done_txt}>LISTO</Text>
                </TouchableOpacity>

            </Container>
        )
    }
}

export default LocationMap;