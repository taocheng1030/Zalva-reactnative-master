import {
    AsyncStorage
} from 'react-native';

import Cache from 'utils/cache';
import * as config from '../config';

module.exports = {

    async getProblems(id, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/problems/user?userID=' + id + '&field=createdAt&sort=-1',
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

    async getDetailProblem(id, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/problems/' + id,
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

    async createRequestProblem(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/problems',
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
    }
}
