import * as async from 'async';
import { Platform } from 'react-native';
import Cache from 'utils/cache';
import UtilService from 'utils/util';
import * as config from '../config';

import { getUserPushToken } from 'storage/base';

module.exports = {
    
    async init(cb) {
        var username = await UtilService.getLocalStringData('username');
        var password = await UtilService.getLocalStringData('password');
        if (password) {
            this.login(username, password, (err, user) => {
                cb(err, user)
            })
        } else {
            cb(null)
        }
    },

    async login(username, password, cb) {
        const { push_token } = await getUserPushToken();
        if (push_token == undefined || push_token == null) return;

        try {
            let response = await fetch(config.API_SERVICE + '/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: username,
                        password: password,
                        platform: Platform.OS,
                        token: push_token
                    })
                })

            let status = response.status

            let responseJson = await response.json();
            if (status == 200) {
                Cache.currentUser = responseJson
                await UtilService.saveLocalStringData('username', username);
                await UtilService.saveLocalStringData('password', password);
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async signup(userData, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/user/register',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstname: userData.firstname,
                        lastname:  userData.lastname,
                        email:     userData.email,
                        password:  userData.password,
                        phone:     userData.phone,
                        platform:  Platform.OS,
                        token:     'token',
                        status: true,
                        verify:{
                            isVerified: true
                        },
                        rating: 5
                    })
                })

            let status = response.status
            let responseJson = await response.json();

            if (status == 200) {
                Cache.currentUser = responseJson

                await UtilService.saveLocalObjectData('currentUser', Cache.currentUser)
                await UtilService.saveLocalStringData('username', userData.email);
                await UtilService.saveLocalStringData('password', userData.password);
                
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async logout() {
        Cache.currentUser = null;
        await UtilService.removeLocalObjectData('username');
        await UtilService.removeLocalObjectData('password');
    },

    async forgotPassword(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/forgotPassword',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })

            let status = response.status

            let responseJson = await response.json();
            if (status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async verification(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/verifyCode',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                Cache.currentUser = { token: responseJson.token }
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async resetPassword(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/me/resetPassword',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                    body: JSON.stringify(data)
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                Cache.currentUser = null;
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async updateUser(user, cb) {
        if (user == null)
            return;

        try {
            let response = await fetch(config.API_SERVICE + '/users/' + user.id,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                    body: JSON.stringify(user)
                })

            let responseJson = await response.json();
            if (response.status == 200) {
                Cache.currentUser['user'] = responseJson
                await UtilService.saveLocalObjectData('currentUser', Cache.currentUser)
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    getActiveUser() {
        return Cache.currentUser.user;
    },
}