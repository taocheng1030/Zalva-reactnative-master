'use strict';

import React, { PureComponent } from 'react';
import { Notifications } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import PaymentComponent from 'components/payment';

import { getFromLocation } from 'storage/location';

/* Services */
import googleService from 'services/googleService';
import tripService from 'services/tripService';

/* Utils */
import Cache from 'utils/cache';

class Payment extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: Cache.currentUser.user.id,
            cards: []
        };

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleBack = () => {
        Actions.pop();
    }

    handleAddPayment = () => {
        Actions.AddPayment();
    }

    render() {
        const { loading } = this.state;
        return(
            <PaymentComponent 
                handleBack={this.handleBack}
                handleAddPayment={this.handleAddPayment}
                loading={loading}
            />
        )
    }
}

export default Payment;