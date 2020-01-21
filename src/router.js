import React, { PureComponent } from 'react';
import { Actions, Scene, Router, Modal } from 'react-native-router-flux';
import { Permissions, Notifications } from 'expo';

/* Screens */
import Welcome from 'containers/welcome';
import Login from 'containers/login';
import Forgot from 'containers/forgot';
import Verify from 'containers/forgot/verify';
import Change from 'containers/forgot/change';
import Register from 'containers/register';
import Home from 'containers/home';
import Locations from 'containers/locations';
import LocationMap from 'containers/locationMap';
import Promotion from 'containers/promotion';
import Confirmation from 'containers/confirmation';
import Traveling from 'containers/traveling';
import Records from 'containers/records';
import RecordDetail from 'containers/records/recordDetail';
import Payment from 'containers/payment';
import AddPayment from 'containers/payment/addPayment';
import Problems from 'containers/problems';
import AddProblem from 'containers/problems/addProblem';
import DetailProblem from 'containers/problems/detailProblem';
import Account from 'containers/account';
import EditAccount from 'containers/account/editAccount';

/* Services */
import authService from 'services/authService';

import { setUserPushToken } from 'storage/base';

class RootRouter extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            initialize: false,
            loggedIn: false
        };
    }

    componentDidMount() {

        this._registerForPushNotifications();

        authService.init((err, activeUser) => {
            if (activeUser) {
                this.setState({
                    initialize: true,
                    loggedIn: true
                });
                return;
            }
            this.setState({
                initialize: true,
                loggedIn: false,
            })
        });
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

        await setUserPushToken(token);
    }

    render() {
        if (this.state.initialize === false) return null;
        const scenes = Actions.create(
            <Modal key="modal" hideNavBar>

                <Scene key="root" hideNavBar>
                    <Scene key="Welcome" component={Welcome} hideNavBar />
                    <Scene key="Login" component={Login} hideNavBar />
                    <Scene key="Forgot" component={Forgot} hideNavBar />
                    <Scene key="Verify" component={Verify} hideNavBar />
                    <Scene key="Change" component={Change} hideNavBar />
                    <Scene key="Register" component={Register} hideNavBar />
                    <Scene key="Home" component={Home} initial={this.state.loggedIn} panHandlers={null} hideNavBar />
                    <Scene key="Records" component={Records} hideNavBar />
                    <Scene key="RecordDetail" component={RecordDetail} hideNavBar />
                    <Scene key="Promotion" component={Promotion} hideNavBar />
                    <Scene key="Payment" component={Payment} hideNavBar />
                    <Scene key="Problems" component={Problems} hideNavBar />
                    <Scene key="DetailProblem" component={DetailProblem} hideNavBar />
                    <Scene key="Account" component={Account} hideNavBar />
                    <Scene key="EditAccount" component={EditAccount} hideNavBar />

                    <Scene key="Confirmation" component={Confirmation} panHandlers={null} hideNavBar />
                    <Scene key="LocationMap" component={LocationMap} panHandlers={null} hideNavBar />
                    <Scene key="Traveling" component={Traveling} panHandlers={null} hideNavBar />
                    <Scene key="Locations" component={Locations} panHandlers={null} hideNavBar />

                </Scene>

                
                <Scene key="AddPayment" component={AddPayment} hideNavBar />
                <Scene key="AddProblem" component={AddProblem} hideNavBar />

            </Modal>
        )
        return(
            <Router hideNavBar scenes={scenes} />
        )
    }
}

export default RootRouter;