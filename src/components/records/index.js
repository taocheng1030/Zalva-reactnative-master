import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* Config */
import * as config from '../../config';

/* Styles */
import styles from 'styles/records';

/* Utils */
import * as loadImages from 'utils/loadImages';
import Loader from 'components/utils/loader';
import UtilService from 'utils/util';

class Records extends Component {
    state = {};

    renderTripStatus(status) {
        switch(status) {
            case config.TRIP_ACCEPTED:
            return(
                <View style={[styles.tripStatus, { backgroundColor: '#283593' }]}>
                    <Text style={styles.tripStatusText}>Aceptado</Text>
                </View>
            )
            case config.TRIP_STARTED:
            return(
                <View style={[styles.tripStatus, { backgroundColor: '#00a651' }]}>
                    <Text style={styles.tripStatusText}>En Viaje</Text>
                </View>
            )
            case config.TRIP_COMPLETED:
            return(
                <View style={[styles.tripStatus, { backgroundColor: '#f05050' }]}>
                    <Text style={styles.tripStatusText}>Completado</Text>
                </View>
            )
        }
    }

    renderTrip(item, i) {
        const { handleTripDetail } = this.props;
        return(
            <TouchableOpacity key={i} onPress={() => handleTripDetail(item)}>
                <View style={styles.boxNewTrip}>
                    <View style={styles.boxNewTrip_header}>
                        <View style={[styles.boxNewTrip_header_Item, { flex: 2, flexDirection: 'row' }]}>
                            <View style={styles.boxTrip_content_avatar}>
                                <Image source={item.driver.avatar == '' ? loadImages.user_empty : { uri: config.SERVICE_FILE_URL + item.driver.avatar }} style={styles.boxTrip_avatar} />
                            </View>
                            <View style={styles.boxTrip_user}>
                                <Text style={styles.boxTrip_user_txt}>{ UtilService.getFullname(item.driver) }</Text>
                                <View style={styles.contentStatus}>
                                    { this.renderTripStatus(item.tripStatus) }
                                </View>
                            </View>
                        </View>
                        <View style={[styles.boxNewTrip_header_Item, { flex: 1, alignItems:'flex-end'}]}>
                            <Text style={styles.amount}>₡ { UtilService.formatNumber(item.total) }</Text>
                            <Text style={styles.kilometers}>{item.kms}km</Text>
                        </View>
                    </View>
                    <View style={styles.boxNewTrip_content}>
                        <View style={[styles.boxTrip_address,{ 
                            borderBottomColor:'#cccbcb', 
                            borderBottomWidth: 0.6 } ]
                        }>
                            <Text style={styles.boxTrip_address_name}>ORIGEN:</Text>
                            <Text style={styles.boxTrip_address_location}>{ item.fromLocation && item.fromLocation.location }</Text>
                        </View>
                        <View style={styles.boxTrip_address}>
                            <Text style={styles.boxTrip_address_name}>DESTINO:</Text>
                            <Text style={styles.boxTrip_address_location}>{ item.toLocation && item.toLocation.location }</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    render(){
        const { 
            loading,
            handleBack, 
            trips } = this.props;
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
                        <Title style={styles.titleScreen}>HISTORIAL</Title>
                    </Body>
                    <Right/>
                </Header>
                
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{ height: 15 }} />
                        {
                            trips && trips.map((item, i) => {
                                return this.renderTrip(item, i);
                            })
                        }
                    </ScrollView>
                </View>

            </Container>
        )
    }
}

Records.propTypes = {
    handleBack: PropTypes.func.isRequired,
    trips: PropTypes.array,
    handleTripDetail: PropTypes.func.isRequired
};

export default Records;