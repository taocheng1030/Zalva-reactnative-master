'use strict';

import React, { PureComponent } from 'react';
import { Notifications } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import RecordDetailComponent from 'components/records/recordDetail';

import { getFromLocation } from 'storage/location';

/* Services */
import googleService from 'services/googleService';
import tripService from 'services/tripService';

/* Utils */
import Cache from 'utils/cache';

class RecordDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            tripId: props.tripId,
            trip: {}
        };

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this._getTrip(this.state.tripId);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    _getTrip(tripId) {
        this.setState({ loading: true });
        tripService.getTrip(tripId, (err, res) => {
            this.setState({
                trip: res,
                loading: false
            });
        })
    }

    handleBack = () => {
        Actions.pop();
    }

    render() {
        const { trip, loading } = this.state;
        return(
            <RecordDetailComponent
                handleBack={this.handleBack}
                loading={loading} 
                trip={trip}
            />
        )
    }
}

export default RecordDetail;