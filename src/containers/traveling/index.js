'use strict';

import React, { PureComponent } from 'react';
import { Alert, View, Text, ActivityIndicator } from 'react-native';
import { Notifications } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import TravelingComponent from 'components/traveling';

import { getFromLocation } from 'storage/location';

/* Services */
import googleService from 'services/googleService';
import tripService from 'services/tripService';

/* Utils */
import Cache from 'utils/cache';
import UtilService from 'utils/util';


/* Styles */
import styles from 'styles/common';

import * as config from '../../config';

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

class Traveling extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tripId: props.tripId,
            trip: {},
            region: null,
            driverPosition: null,
            arrivalTime: '',
            loader: false,
            apiCalling: false
        };
        this.oldCarPosition = null
        this.subscription = null;
        this.mounted = false;
    }

    async componentDidMount() {
        this.mounted = true;
        const { tripId } = this.state;

        let trip = await tripService.getCurrentTrip(tripId);
        this.setState({ trip: trip, loader: true }); 

        let latitude    = trip.fromLocation.lat
        let longitude   = trip.fromLocation.lng

        this.setState({
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
        });

        this._initConnection(trip.driver.id);
    }

    _initConnection(channel) {
        UtilService.getWebSocketConnection(channel, (err, con) => {
            if (err) {
                console.log("connection error:", err)
                return;
            }
            this.connection = con
            this._subscribeSocket(channel);
        })
    }

    _disconnect() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.connection) {
            this.connection.disconnect();
            this.connection = null;
        }
    }

    async setCarPosition(pos) {
        this.oldCarPosition = pos;
        const { fromLocation } = await getFromLocation();
        var coordinates = fromLocation.geoJson.coordinates;
        if (this.oldCarPosition != null) {

            this.setState({ 
                driverPosition: pos,
                region: {
                    latitude: pos.latitude,
                    longitude: pos.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            });

            this.getDistanceTime(pos.latitude, pos.longitude);
        }
    }

    async getDistanceTime(pos) {
        const { fromLocation } = await getFromLocation();
        
        let start = fromLocation.geoJson.coordinates[1] + ',' + fromLocation.geoJson.coordinates[0];
        let end = pos.latitude + ',' + pos.longitude;

        googleService.getTripDuration(start, end, (err, res) => {
            if (err == null) {
                let { duration, distance } = res.rows[0].elements[0]
                if (duration != undefined) {
                    let countDistance = duration.text;
                    this.setState({
                        arrivalTime: countDistance
                    });
                }
            }else{
                alert('Error requesting google api');
                return;
            }
        });
    }

    _subscribeSocket(channel) {
        var $this = this;
        var callbacks = {
            "publish": function(message) {
                // See below description of message format
                const { data } = message;
                $this.oldCarPosition = data;
                if ($this.oldCarPosition != null) {
                    $this.setState({ driverPosition: data });
                    $this.getDistanceTime(data);
                }
            },
            "join": function(message) {
                // See below description of join message format
                console.log("Join ", message);
            },
            "leave": function(message) {
                // See below description of leave message format
                console.log("leave ", message);
            },
            "subscribe": function(context) {
                // See below description of subscribe callback context format
                console.log('subscribe ', context);
            },
            "error": function(errContext) {
                // See below description of subscribe error callback context format
                console.log(err);
            },
            "unsubscribe": function(context) {
                // See below description of unsubscribe event callback context format
                console.log(context);
            }
        }

        this.subscription = this.connection.subscribe("public:" + channel, callbacks);
    }

    componentWillMount() {
        
    }

    componentWillUnmount() {
        this.mounted = false;
        this._disconnect();
    }

    render() {
        const { trip, region, driverPosition, arrivalTime, loader } = this.state;

        if(!loader) {
            return(
                <View style={styles.indicator}>
                    <ActivityIndicator color="#8DC63F" size="large" />
                </View>
            )
        }

        return(
            <TravelingComponent 
                driverPosition={driverPosition}
                arrivalTime={arrivalTime}
                trip={trip}
                region={region}
            />
        )
    }
}

export default Traveling;