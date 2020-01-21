'use strict';

import React, { PureComponent } from 'react';
import { Constants, Location, Permissions } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import LocationsComponent from 'components/locations';

import { getFromLocation, setFromLocation, setToLocation, getPlaces } from 'storage/location';

class Locations extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            target: props.target,
            nearbyPlaces: [],
            filtering: false,
            filledInput: false,
            fromAddress: '',
            address: ''
        };
    }

    async componentDidMount() {
        const { places } = await getPlaces();
        this.setState({ nearbyPlaces: places });
    }

    componentWillMount() {
        
    }

    handleSelectNearby = async (place) => {

        const { lng, lat } = place.location
        var data = {
            place_id: place.place_id,
            formatted_address: place.name
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

    async updateMyLocation() {
        const { fromLocation, toLocation } = await getFromLocation();
        this.setState({ fromLocation, toLocation });
    }

    handleFromLocation = () => {
        console.log('Listo para ir');
        Actions.LocationMap({
            target: 'fromLocation',
            update: () => {
                if (this.props.update)
                    this.props.update()
                Actions.pop();
            }
        });
    }

    handleToLocation = () => {
        Actions.LocationMap({
            target: 'toLocation',
            update: () => {
                if (this.props.update)
                    this.props.update()
                Actions.pop();
            }
        });
    }

    render() {
        const { nearbyPlaces, target } = this.state;
        return(
            <LocationsComponent 
                handleBack={this.handleBack}
                handleSelectNearby={this.handleSelectNearby}
                handleSelectPlaces={this.handleSelectPlaces}
                handleFromLocation={this.handleFromLocation}
                handleToLocation={this.handleToLocation}
                nearbyPlaces={nearbyPlaces}
                target={target}
            />
        )
    }
}

export default Locations;