import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Icon, Title, Content, Footer, FooterTab } from 'native-base';
import { View, Text, TouchableOpacity, Image, Platform, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from 'styles/confirmation';
import { MapView } from 'expo';
import phoneCall from 'react-native-phone-call';

import * as loadImages from 'utils/loadImages';
import * as config from '../../config';

import Loader from 'components/utils/loader';

import UtilService from 'utils/util';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class Traveling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionDriver: props.driverPosition,
            coordinate: new MapView.AnimatedRegion({
                latitude: 0,
                longitude: 0
            }),
            heading: 0
        }
        this.spinValue = new Animated.Value(0)
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        const duration = 500;

        const { coordinate, maping } = this.state;

        if (this.props.driverPosition !== prevProps.driverPosition) {

            if(prevProps.driverPosition != null) {

                const newCoordinate = {
                    latitude: prevProps.driverPosition.latitude,
                    longitude: prevProps.driverPosition.longitude
                };

                const mapCoordinate = {
                    latitude: prevProps.driverPosition.latitude,
                    longitude: prevProps.driverPosition.longitude,
                    latitudeDelta:  0.01,
                    longitudeDelta: 0.01,
                };

                if(Platform === 'android') {
                    //update marker
                    if(this.marker) {
                        this.marker._component.animateMarkerToCoordinate(newCoordinate, duration);
                    }
                    //update map
                    // if(this.mapView) {
                    //     this.mapView.root.animateToRegion(mapCoordinate, duration)
                    // }
                }else {
                    coordinate.timing(newCoordinate).start();  
                    //maping.timing(mapCoordinate).start();
                }

                this.setState({
                    heading: prevProps.driverPosition.heading
                });
            }
        }
    }

    renderDriverDetail() {
        const { trip } = this.props;
        let driver = trip.driver && trip.driver;
        return(
            <View style={styles.customerDetail}>
                <View style={[styles.customerInfoItem, { flex: 2, flexDirection: 'row' } ]}>
                    <View style={styles.contentUserImage}>
                        <Image source={trip.driver.avatar == '' ? loadImages.user_empty : { uri: config.SERVICE_FILE_URL + trip.driver.avatar }} style={styles.img_profile} />
                    </View>
                    <View style={[styles.contentUserInfo, { flex: 1 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Text style={styles.customerInfoName}>{ driver.firstname }</Text>
                            <Text style={[styles.customerInfoName, { marginLeft: 4 }]}> { UtilService.showRatingUser(driver.rating) } <Ionicons style={styles.start} name="md-star" size={13} color="#333" /></Text>
                        </View>
                        <View>
                            <Text style={styles.vehicleName}>Moto SP - AERD203</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.customerInfoItem, { flex: 1 }]}>
                    <Text onPress={() => phoneCall({
                                    number: driver.phone,
                                    prompt: false,
                    }).catch(console.error) } style={styles.number}>CONTACTAR</Text>
                </View>
            </View>
        )
    }

    render(){
        const { trip, driverPosition, region, arrivalTime } = this.props;
        const { positionDriver, coordinate, heading } = this.state;
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });
        console.log('current Trip ==> ', trip);
        return(
            <Container>
                <Header iosBarStyle={"light-content"} style={styles.header}>
                    <Left />
                    <Body>
                        <Title style={styles.titleScreen}>EN VIAJE</Title>
                    </Body>
                    <Right/>
                </Header>

                <View style={{ flex: 1}}>

                    <View style={{ flex: 3 }}>
                        <MapView
                            //ref={(ref)=> this.mapView = ref}
                            provider={'google'}
                            style={{ height: '100%', width: '100%' }}
                            initialRegion={region}>
                            {
                                driverPosition != null &&
                                <MapView.Marker.Animated
                                    coordinate={coordinate}
                                    ref={marker => { this.marker = marker }}
                                    flat>
                                    <Animated.Image
                                        style={{
                                            width: 40, 
                                            height: 40,
                                            transform: [{ rotate: `${heading}deg` }],
                                            position: 'relative',
                                            top: 5
                                        }}
                                        resizeMode={'contain'}
                                        source={loadImages.moto_icon}
                                    />
                                </MapView.Marker.Animated>
                            }
                        </MapView>
                    </View>
                    <View style={{ flex: 2 }}>
                        
                        <View style={styles.trip_first}>
                            <View style={[styles.trip_item, { alignItems:'flex-start'}]}>
                                <Text style={styles.tripNumber}>Viaje: # {trip.number}</Text>
                            </View>
                            <View style={[styles.trip_item, { justifyContent: 'center' }]}>
                                <Text style={styles.tripNumber}>{ arrivalTime }</Text>
                            </View>
                        </View>

                        { this.renderDriverDetail() }
                        
                    </View>

                    <Footer>
                        <FooterTab>
                            <Button style={styles.cancel}>
                                <Text style={styles.cancel_txt}>{ 'Cancelar'.toUpperCase() }</Text>
                            </Button>
                        </FooterTab>
                    </Footer>

                </View>
    
            </Container>
        )
    }
}

Traveling.propTypes = {

};

export default Traveling;