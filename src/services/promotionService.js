import {
    AsyncStorage
} from 'react-native';

import Cache from 'utils/cache';
import * as config from '../config';

module.exports = {

    async getPromotionsByUser(id) {
        try {
            let response = await fetch(config.API_SERVICE + '/coupons/' + id,
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

    async applyUserPromotion(data, cb) {
        try {
            let response = await fetch(config.API_SERVICE + '/coupons/apply',
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
