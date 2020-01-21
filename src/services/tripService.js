
import {
    AsyncStorage
} from 'react-native';

import * as async from 'async'
import * as _ from 'underscore'
import moment from 'moment'
import Cache from 'utils/cache';
import UtilService from 'utils/util';
import * as config from '../config';

module.exports = {

    async tripRequest(url, method, body, cb) {
        let header = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + Cache.currentUser['token'],
            },
        }

        _.extend(header, method == "GET" ? {} : { body: JSON.stringify(body) })
        try {
            let response = await fetch(config.API_SERVICE + url, header)

            let responseJson = await response.json();
            if (response.status == 200) {

                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async createRequestTrip(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/trips/request',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                    body: JSON.stringify(data),
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async nextRequestTrip(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/trips/next',
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                    body: JSON.stringify(data),
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },


    async getTripsByUser(id, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/trips/collaborators?userID=' + id + '&field=createdAt&sort=-1',
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson.message)
            }
        } catch (error) {
            cb(error)
        }
    },

    async getTrip(id, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/trips/' + id,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                cb(null, responseJson);
            } else {
                cb(responseJson.message)
            }
        } catch (error) {
            cb(error)
        }
    },

    async getCurrentTrip(id) {
        try {
            let response = await fetch(config.API_SERVICE + '/trips/' + id,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                })
            let responseJson = await response.json();
            if (response.status == 200) {
                return responseJson;
            } else {
                return responseJson.message;
            }
        } catch (error) {
            return error;
        }
    },

    async submitRate(tripId, driverRate, driverFeedback, cb){
        this.tripRequest('/trips/submit/by/user', 'POST', {
            id:tripId,
            userId:Cache.currentUser.user.id,
            driverRate:driverRate,
            driverFeedback:driverFeedback,
        }, (err, res)=>{
            cb(err, res)
        })
    }
}
