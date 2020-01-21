
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

    async getVehicles(cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/vehicles',
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
                cb(responseJson)
            }
        } catch (error) {
            cb(error)
        }
    },

    async getNearbyDrivers(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/trips/nearDrivers',
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

    async uploadFile(file, cb) {
        try {
            
            let image = {
                uri:  file,
                type: 'image/jpeg',
                name: 'file.jpeg'
            }
            
            let formData = new FormData();
            formData.append('path', 'users');
            formData.append('file', image);

            let response = await fetch(config.API_SERVICE + '/uploads/image',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + Cache.currentUser['token'],
                    },
                    body: formData
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
}
