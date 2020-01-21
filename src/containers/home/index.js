'use strict';

import React, { PureComponent } from 'react';
import { Constants, Location, Permissions, Notifications } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import HomeComponent from 'components/home';

import { getFromLocation, setFromLocation, setPlaces } from 'storage/location';

import googleService from 'services/googleService';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            nearbyPlaces: [],
            region: null,
            fromLocation: null,
            toLocation: null
        };
    }

    async componentDidMount() {
        this._getLocationAsync();
        this._registerForPushNotifications();
    }

    async updateMyLocation() {
        const { fromLocation, toLocation } = await getFromLocation();
        this.setState({ fromLocation, toLocation });
    }

    componentWillMount() {
        
    }

    async _registerForPushNotifications() {
        
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();

        console.log('Token to use is ', token)
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          alert('Permission to access location was denied');
        }
        let { coords } = await Location.getCurrentPositionAsync({});
        this.updateMyPosition(coords);
    };

    updateMyPosition(currentPosition) {
        let { longitude, latitude } = currentPosition;

        // this.setState({
        //     region: {
        //         latitude: latitude,
        //         longitude: longitude,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421
        //     }
        // });

        googleService.getAddress(longitude, latitude, async (err, res) => {
            if (err == null) {
                await setFromLocation(res, longitude, latitude);
                this.updateMyLocation();
            }
        });

        googleService.getNearbyPlaces(longitude, latitude, (err, res) => {
            if (err == null) {
                setPlaces(res);
            }
        });
        
    }

    handleFromLocation = () => {
        Actions.Locations({
            target: 'fromLocation',
            update: () => {
                this.updateMyLocation();
            }
        });
    }

    handleToLocation = () => {
        Actions.Locations({
            target: 'toLocation',
            update: () => {
                this.updateMyLocation();
            }
        });
    }

    handleConfirmation = () => {
        Actions.Confirmation({
            update: () => {
                Actions.pop();
                Actions.Home();
            }
        });
    }

    render() {
        const { nearbyPlaces, region, fromLocation, toLocation } = this.state;
        return(
            <HomeComponent 
                nearbyPlaces={nearbyPlaces}
                fromLocation={fromLocation}
                toLocation={toLocation}
                handleFromLocation={this.handleFromLocation}
                handleToLocation={this.handleToLocation}
                handleConfirmation={this.handleConfirmation}
                region={region}
            />
        )
    }
}

export default Home;