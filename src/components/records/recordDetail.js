import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title } from 'native-base';
import { View, Text, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/* Config */
import * as config from '../../config';

/* Styles */
import styles from 'styles/recordDetail';

/* Utils */
import * as loadImages from 'utils/loadImages';
import Loader from 'components/utils/loader';
import UtilService from 'utils/util';

class RecordDetail extends Component {
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

    render(){
        const { 
            loading,
            handleBack, 
            trip } = this.props;
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
                        <Title style={styles.titleScreen}>DETALLE</Title>
                    </Body>
                    <Right/>
                </Header>
                
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={styles.boxNewTrip_header}>
                            <View style={[styles.boxNewTrip_header_Item, { flex: 2, flexDirection: 'row' }]}>
                                <View style={styles.boxTrip_content_avatar}>
                                    { trip.driver && <Image source={trip.driver.avatar == '' ? loadImages.user_empty : { uri: config.SERVICE_FILE_URL + trip.driver.avatar }} style={styles.boxTrip_avatar} />}
                                </View>
                                <View style={styles.boxTrip_user}>
                                    <Text style={styles.boxTrip_user_txt}>{ trip.driver && UtilService.getFullname(trip.driver) }</Text>
                                    <View style={styles.contentStatus}>
                                        { this.renderTripStatus(trip.tripStatus) }
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.boxNewTrip_header_Item, { flex: 1, alignItems:'flex-end'}]}>
                                <Text style={styles.amount}>₡ { UtilService.formatNumber(trip.total) }</Text>
                                <Text style={styles.kilometers}>{trip.kms} km</Text>
                            </View>
                        </View>
                        <View style={styles.boxNewTrip_content}>
                            <View style={[styles.boxTrip_address,{ 
                                borderBottomColor:'#cccbcb', 
                                borderBottomWidth: 0.6 } ]
                            }>
                                <Text style={styles.boxTrip_address_name}>ORIGEN:</Text>
                                <Text style={styles.boxTrip_address_location}>{ trip.fromLocation && trip.fromLocation.location }</Text>
                            </View>
                            <View style={styles.boxTrip_address}>
                                <Text style={styles.boxTrip_address_name}>DESTINO:</Text>
                                <Text style={styles.boxTrip_address_location}>{ trip.toLocation && trip.toLocation.location }</Text>
                            </View>
                        </View>
                        <View style={styles.trip_detail_pricing}>
                            <Text style={styles.pricing_title}>Detalles del viaje</Text>
                        </View>
                        <View style={styles.trip_list_detail}>
                            <View style={[styles.boxTrip_list, { paddingTop: 0}]}>
                                <View style={styles.boxTrip_list_left}>
                                    <Text style={styles.boxTrip_address_name}>VIAJE #:</Text>
                                </View>
                                <View style={styles.boxTrip_list_right}>
                                    <Text style={styles.boxTrip_list_right_txt}>{ trip.number }</Text>
                                </View>
                            </View>
                            <View style={styles.boxTrip_list}>
                                <View style={styles.boxTrip_list_left}>
                                    <Text style={styles.boxTrip_address_name}>FECHA:</Text>
                                </View>
                                <View style={styles.boxTrip_list_right}>
                                    <Text style={styles.boxTrip_list_right_txt}>{ UtilService.formatTripDate(trip.createdAt, 'DD/MM/YYYY') }</Text>
                                </View>
                            </View>
                            <View style={styles.boxTrip_list}>
                                <View style={styles.boxTrip_list_left}>
                                    <Text style={styles.boxTrip_address_name}>PRECIO BASE:</Text>
                                </View>
                                <View style={styles.boxTrip_list_right}>
                                    <Text style={styles.boxTrip_list_right_txt}>₡ { UtilService.formatNumber(trip.basePrice) }</Text>
                                </View>
                            </View>
                            <View style={styles.boxTrip_list}>
                                <View style={styles.boxTrip_list_left}>
                                    <Text style={styles.boxTrip_address_name}>DURACION:</Text>
                                </View>
                                <View style={styles.boxTrip_list_right}>
                                    <Text style={styles.boxTrip_address_location}>{ trip.mins }</Text>
                                </View>
                            </View>
                            <View style={styles.boxTrip_list}>
                                <View style={styles.boxTrip_list_left}>
                                    <Text style={styles.boxTrip_address_name}>TOTAL KMS:</Text>
                                </View>
                                <View style={styles.boxTrip_list_right}>
                                    <Text style={styles.boxTrip_address_location}>{ trip.kms }</Text>
                                </View>
                            </View>
                            <View style={[styles.boxTrip_list, { borderBottomWidth: 0}]}>
                                <View style={styles.boxTrip_list_left}>
                                    <Text style={styles.boxTrip_address_name}>TOTAL:</Text>
                                </View>
                                <View style={styles.boxTrip_list_right}>
                                    <Text style={styles.boxTrip_address_location}>₡ { UtilService.formatNumber(trip.total) }</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                
            </Container>
        )
    }
}

RecordDetail.propTypes = {
    handleBack: PropTypes.func.isRequired,
    trip: PropTypes.object
};

export default RecordDetail;