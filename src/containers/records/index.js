'use strict';

import React, { PureComponent } from 'react';
import { Notifications } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import RecordsComponent from 'components/records';

import { getFromLocation } from 'storage/location';

/* Services */
import googleService from 'services/googleService';
import tripService from 'services/tripService';

/* Utils */
import Cache from 'utils/cache';

class Records extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: Cache.currentUser.user.id,
            trips: []
        };

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this._getTrips(this.state.userId);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    _getTrips(userId) {
        this.setState({ loading: true });
        tripService.getTripsByUser(userId, (err, res) => {
            this.setState({
                trips: res.items,
                loading: false
            });
        })
    }

    handleBack = () => {
        Actions.pop();
    }

    handleTripDetail = trip => {
        Actions.RecordDetail({
            tripId: trip.id
        });
    }

    render() {
        const { trips, loading } = this.state;
        return(
            <RecordsComponent
                handleBack={this.handleBack}
                handleTripDetail={this.handleTripDetail}
                loading={loading} 
                trips={trips}
            />
        )
    }
}

export default Records;