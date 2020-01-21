import {
    AsyncStorage
} from 'react-native';

import moment from 'moment';
import * as config from '../config';
import Cache from 'utils/cache';
import Centrifuge from 'centrifuge';

class UtilService {

    static getFullname(obj) {
        if (obj) {
            if ((obj.firstname != undefined && obj.firstname.length != 0) || (obj.lastname != undefined && obj.lastname.length != 0)) {
                return obj.firstname + " " + obj.lastname
            }
            return obj.email
        }
        return ""
    }

    static calculateArrivalTime(min) {
        return moment().add(min, 'minutes').format('hh:mm A');
    };

    static formatTripDate(date, format) {
        return moment.unix(date).format(format);
    }

    static getCurrentDate() {
        return moment().unix();
    }
    
    static async saveLocalStringData(key, strValue) {
        await AsyncStorage.setItem('@zalva:' + key, strValue);
        return true;
    }

    static async saveLocalObjectData(key, obj) {
        await AsyncStorage.setItem('@zalva:' + key, JSON.stringify(obj));
    }

    static async getLocalStringData(key) {
        let ret = await AsyncStorage.getItem('@zalva:' + key);
        return ret
    }

    static async getLocalObjectData(key) {
        let ret = await AsyncStorage.getItem('@zalva:' + key);
        if (ret != null) {
            return JSON.parse(ret)
        } else {
            return null
        }
    }

    static async removeLocalObjectData(key) {
        let ret = await AsyncStorage.removeItem('@zalva:' + key);
        return true
    }

    static getTrimText(val, len) {
        if (val.length < len) return val

        return val.substr(0, len) + "..."
    }

    static showRatingUser(rating) {
        return rating.toFixed(1);
    }

    static showLeftTime(number){
        return Math.round(number);
    }

    static getWebSocketConnection(userId, cb) {
        
        var token = Cache.currentUser['token'];

        Cache.socketConnection = new Centrifuge(config.WS_CENTRIFUGO);
        Cache.socketConnection.setToken(token);
        Cache.socketConnection.connect();
        
        Cache.socketConnection.on('error', function (error) {
            // handle error in a way you want, here we just log it into browser console.
            cb(error, null);
        });

        Cache.socketConnection.on('disconnect', function (context) {
            // do whatever you need in case of disconnect from server
            cb(context, null);
        });

        Cache.socketConnection.on('connect', (context) => {
            //console.log('WS - connect', context)
            cb(null, Cache.socketConnection);
        });
    }

    static formatNumber(number) {
        var splitNum;
        number = Math.abs(number);
        number = number.toFixed(0);
        splitNum = number.split('.');
        splitNum[0] = splitNum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return splitNum.join(".");
    }

    static calculateTripMoto(mins) {
        var percent = 0.4;
        var time = mins * percent;
        var total = mins - time
        return Math.round(total);
    }
}

export default UtilService;