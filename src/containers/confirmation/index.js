'use strict';

import React, { PureComponent } from 'react';
import { Notifications } from 'expo';
import { Vibration } from 'react-native';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import ConfirmationComponent from 'components/confirmation';

import { getFromLocation, deleteFromLocation } from 'storage/location';

import * as loadImages from 'utils/loadImages';
import * as config from '../../config';

/* Services */
import baseService from 'services/baseService';
import googleService from 'services/googleService';
import tripService from 'services/tripService';

/* Utils */
import Cache from 'utils/cache';

class Confirmation extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            vehicleImageSelected: '',
            vehicleDescription: '',
            loading: false,
            region: null,
            fromLocation: null,
            toLocation: null,
            findingDrivers: true,
            requestingTrip: false,
            kms: 0,
            mins: 0,
            basePrice: 0,
            priceKm: 0,
            total: 0,
            userId: Cache.currentUser.user.id,
            vehicleId: '',
            loading: false,
            tripId: '',
            trip: {},
            path: [],
            vehicleList: {
                total: 0,
                items: []
            },
            payment: '',
            showDetails: false,
            leftTime: 0,

            acceptDriver: false,
            nextRequests: 0,
            driversAvailables: 0,
            leftTime: 30
        };

        this.mounted = false;
    }

    async componentDidMount() {
        this.mounted = true;
        this._getVehicles();
        this.nearbyTimer = setInterval(() => this.getNearbyDrivers(), 3000)
        const { fromLocation, toLocation } = await getFromLocation();
        this.setState({ fromLocation, toLocation });
        //handle Notifications
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        if (notification) {
            const { tripId, navigate } = notification.data;
            if (navigate == config.TRIP_ACCEPTED) {
                
                Vibration.vibrate();

                this.setState({ acceptDriver: true, requestingTrip: false });
                
                //await deleteFromLocation();
                Actions.Traveling({
                    tripId: tripId,
                    update: () => {
                        Actions.pop();
                        Actions.Home();
                    }
                });
            }

            if (navigate == config.TRIP_COMPLETED) {
                Vibration.vibrate();
                if (this.props.update)
                    this.props.update();
                Actions.pop();
            }

            if(navigate == "DeclineTrip") {
                Vibration.vibrate();
                clearInterval(this.nearbyTimer);
                this.setState({ requestingTrip: false });
                alert('No hemos encontrado un conductor cercano');
            }

            if(navigate == config.TRIP_CANCELLED) {
                Vibration.vibrate();
                if (this.props.update)
                    this.props.update();
                Actions.pop();
            }
        }
    };

    getNearbyDrivers = async () => {
        const { fromLocation } = await getFromLocation();
        var coordinates = fromLocation.geoJson.coordinates;
        var data = {
            lat: coordinates[1],
            lng: coordinates[0]
        }
        console.log('getNearbyDrivers ===> ');
        baseService.getNearbyDrivers(data, (err, res) => {
            if (err == null) {
                this.setState({
                    driversAvailables: res.length
                });
            }
        });
    }

    _getVehicles() {
        baseService.getVehicles((err, res) => {
            if (err == null) {
                this.setState({ vehicleList: res });
            }
        })
    }

    async getRoute() {
        const { fromLocation, toLocation } = await getFromLocation();
        googleService.getTripPath(
            fromLocation.geoJson.coordinates[1] + ',' + fromLocation.geoJson.coordinates[0],
            toLocation.geoJson.coordinates[1] + ',' + toLocation.geoJson.coordinates[0],
            (err, res) => {
                this.setState({ path: res })
            }
        )
    }

    componentWillMount() {

    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.nearbyTimer);
    }

    async updateFromLocation() {
        const { fromLocation } = await getFromLocation();
        this.setState({ fromLocation });
    }

    async updateMyLocation() {
        const { fromLocation, toLocation } = await getFromLocation();

        let start = fromLocation.geoJson.coordinates[1] + ',' + fromLocation.geoJson.coordinates[0];
        let end = toLocation.geoJson.coordinates[1] + ',' + toLocation.geoJson.coordinates[0];

        this.setState({
            fromLocation: fromLocation,
            toLocation: toLocation,
        });

        // this.setState({ loading: true });

        // googleService.getTripDuration(start, end, (err, res) => {
        //     if (err == null) {
        //         let { duration, distance } = res.rows[0].elements[0]
        //         if (duration != undefined) {
        //             let countKms = distance.value / 1000;
        //             this.setState({
        //                 fromLocation: fromLocation,
        //                 toLocation: toLocation,
        //                 kms: Math.round(countKms),
        //                 loading: false
        //             });
        //         }
        //     }else{
        //         alert('Error');
        //         return;
        //     }
        // });
    }

    handleBack = () => {
        Actions.pop();
    }

    handleFromLocation = () => {
        Actions.Locations({
            target: 'fromLocation',
            update: () => {
                this.updateFromLocation();
            }
        });
    }

    handleToLocation = () => {
        this.setState({ showDetails: false });
        Actions.Locations({
            target: 'toLocation',
            update: () => {
                setTimeout(() => {
                    this.updateMyLocation();
                }, 300);
            }
        });
    }

    handleVehicleSelection = index => {
        this.setState({ selectedIndex: index });
        this.calculateDistances();
        setTimeout(() => {
            let vehicleSelected = this.state.vehicleList.items[this.state.selectedIndex];
            let vehicleBasePrice = Number(vehicleSelected['basePrice']);
            let vehiclePriceKm = Number(vehicleSelected['priceKm']);
            let imageSelected = vehicleSelected['image'];
            let vehicleDescription = vehicleSelected['description'];

            this.setState({
                vehicleId: vehicleSelected['id'],
                basePrice: vehicleBasePrice,
                priceKm: vehiclePriceKm,
                vehicleImageSelected: imageSelected,
                vehicleDescription: vehicleDescription
            })
        }, 100);
    }

    async calculateDistances() {

        const { fromLocation, toLocation } = await getFromLocation();

        let start = fromLocation.geoJson.coordinates[1] + ',' + fromLocation.geoJson.coordinates[0];
        let end = toLocation.geoJson.coordinates[1] + ',' + toLocation.geoJson.coordinates[0];

        this.setState({ loading: true });

        googleService.getTripDuration(start, end, (err, res) => {
            if (err == null) {
                let { duration, distance } = res.rows[0].elements[0]
                if (duration != undefined) {

                    let vehicleSelected = this.state.vehicleList.items[this.state.selectedIndex];
                    let vehicleBasePrice = Number(vehicleSelected['basePrice']);
                    let vehiclePriceKm = Number(vehicleSelected['priceKm']);

                    let countKms = distance.value / 1000;

                    //get price for kilometers
                    let totalKms = vehiclePriceKm * Math.round(countKms);

                    //get total price
                    let subtotal = vehicleBasePrice + totalKms;

                    //get duration trip
                    let countMins = duration.value / 60;
                    let totalMins = Math.round(countMins);

                    this.setState({
                        fromLocation: fromLocation,
                        toLocation: toLocation,
                        kms: Math.round(countKms),
                        total: subtotal,
                        mins: totalMins,
                        loading: false,
                        showDetails: true
                    });
                }
            } else {
                alert('Error');
                return;
            }
        })
    }

    handleRequestTrip = async () => {

        // send request to new trip
        const { fromLocation, toLocation } = await getFromLocation();
        const { userId, kms, vehicleId, total, payment, mins } = this.state;

        var data = {
            userId: userId,
            fromLocation: {
                location: fromLocation.title,
                lat: fromLocation.geoJson.coordinates[1],
                lng: fromLocation.geoJson.coordinates[0]
            },
            toLocation: {
                location: toLocation.title,
                lat: toLocation.geoJson.coordinates[1],
                lng: toLocation.geoJson.coordinates[0]
            },
            kms: kms,
            vehicleId: vehicleId,
            total: total,
            payment: 'cash',
            mins: mins
        }

        this.setState({
            requestingTrip: true
        });

        tripService.createRequestTrip(data, (err, res) => {
            console.log('error request ', err);

            if (err == null) {

                this.setState({
                    trip: res
                });

                // timer add
                //this.requestNext(data);

            } else {
                clearInterval(this.nearbyTimer);
                this.setState({ requestingTrip: false });
                alert(err.message);
            }
        });

    }

    requestNext = async (data) => {
        
        setTimeout(() => {
            
            if (!this.state.acceptDriver && this.state.nextRequests < 3) {
                
                // increase next requests
                this.setState({
                    nextRequests: this.state.nextRequests + 1
                });

                tripService.nextRequestTrip(data, (err, res) => {
                    if (err == null) {

                        this.setState({
                            trip: res
                        });
                        
                        // timer add
                        this.requestNext(data);

                    } else {
                        alert('Error');
                        return;
                    }
                })
            }
        }, 10000)
    }

    render() {
        const {
            fromLocation,
            toLocation,
            requestingTrip,
            path,
            loading,
            vehicleList,
            selectedIndex,
            total,
            kms,
            mins,
            showDetails,
            driversAvailables } = this.state;
        return (
            <ConfirmationComponent
                loading={loading}
                path={path}
                selectedIndex={selectedIndex}
                total={total}
                kms={kms}
                mins={mins}
                showDetails={showDetails}
                vehicleList={vehicleList}
                driversAvailables={driversAvailables}
                handleBack={this.handleBack}
                fromLocation={fromLocation}
                toLocation={toLocation}
                requestingTrip={requestingTrip}
                handleFromLocation={this.handleFromLocation}
                handleToLocation={this.handleToLocation}
                handleRequestTrip={this.handleRequestTrip}
                handleVehicleSelection={this.handleVehicleSelection}
            />
        )
    }
}

export default Confirmation;