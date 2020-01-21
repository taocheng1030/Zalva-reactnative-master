'use strict';

import React, { PureComponent } from 'react';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import AccountComponent from 'components/account';

import * as config from '../../config';

/* Utils */
import Cache from 'utils/cache';
import * as loadImages from 'utils/loadImages';

class Account extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: Cache.currentUser.user.id,
            avatar: Cache.currentUser.user.avatar == '' ? loadImages.user_empty : { uri: config.SERVICE_FILE_URL + Cache.currentUser.user.avatar },
            user: Cache.currentUser.user
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

    handleEditAccount = () => {
        Actions.EditAccount({
            update: () => {
                this.setState({
                    avatar: Cache.currentUser.user.avatar == '' ? loadImages.user_empty : { uri: config.SERVICE_FILE_URL + Cache.currentUser.user.avatar },
                    user: Cache.currentUser.user
                });
            }
        });
    }

    render() {
        const { loading, avatar, user } = this.state;
        return(
            <AccountComponent 
                handleBack={this.handleBack}
                handleEditAccount={this.handleEditAccount}
                avatar={avatar}
                user={user}
                loading={loading}
            />
        )
    }
}

export default Account;