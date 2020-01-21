'use strict';

import React, { PureComponent } from 'react';
import { Constants, Location, Permissions } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

import { screenWidth, screenHeight } from 'styles/commonStyles';

/* Components  */
import MapComponent from 'components/locationMap';

import { setToLocation, setFromLocation } from 'storage/location';

import googleService from 'services/googleService';

class LocationMap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            target: props.target,
            fromLocation: null,
            toLocation: null,
            region: null,
            latitudeDelta: 0.0522
        };
    }

    async componentDidMount() {
        this._getLocationAsync();
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
        this.setState({
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.latitudeDelta * screenWidth / screenHeight * this.state.latitudeDelta,
            }
        });        
    }

    componentWillMount() {
        
    }

    handleSelectPlaces = async (place) => {
        const { lng, lat } = place.geometry.location
        var data = {
            place_id: place.place_id,
            formatted_address: place.formatted_address
        }
        if(this.state.target == 'fromLocation') {
            console.log('fromLocation');
            await setFromLocation(data, lng, lat);
            if (this.props.update)
                this.props.update()
            Actions.pop();
        }
        
        if(this.state.target == 'toLocation') {
            console.log('toLocation');
            await setToLocation(data, lng, lat);
            if (this.props.update)
                this.props.update()
            Actions.pop();
        }
    }

    handleBack = () => {
        Actions.pop();
    }

    onRegionChange = region => {
        let { latitude, longitude} = region
        googleService.getAddress(longitude, latitude, async (err, res) => {
            if (err == null) {

                var data = {
                    place_id: res.place_id,
                    formatted_address: res.formatted_address
                }

                if(this.state.target == 'fromLocation') {
                    await setFromLocation(data, longitude, latitude);
                }
                
                if(this.state.target == 'toLocation') {
                    await setToLocation(data, longitude, latitude);
                }
            }
        })

        this.setState({
            region: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: this.state.latitudeDelta,
                longitudeDelta: this.state.latitudeDelta * screenWidth / screenHeight * this.state.latitudeDelta,
            }
        });
        
    }

    locationDone = () => {
        if (this.props.update)
            this.props.update()
        Actions.pop();
    }

    render() {
        const { target, region } = this.state;
        return(
            <MapComponent 
                handleBack={this.handleBack}
                onRegionChange={this.onRegionChange}
                locationDone={this.locationDone}
                target={target}
                region={region}
            />
        )
    }
}

export default LocationMap;