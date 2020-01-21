import {
    AsyncStorage
} from 'react-native';

import * as async from 'async'
import * as _ from 'underscore'
import Polyline from '@mapbox/polyline';

const googleApiUrl = 'https://maps.googleapis.com/maps/api/';
const googleApiKey = 'AIzaSyAmiZazE0SlJ91ZmjCRm7Iz9y9k6xM7uFs'; //WeNexitus


module.exports = {

    async googleRequest(url, cb) {
        try {
            let response = await fetch(googleApiUrl + url + `&key=${googleApiKey}`,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
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

    getTripDuration(start, end, cb) {
        this.googleRequest(
            `distancematrix/json?origins=${start}&destinations=${end}&mode=driving`,
            (err, res) => {
                cb(err, res)
            })
    },

    async getAddress(lng, lat, cb){
        this.googleRequest(
            'geocode/json?latlng='+lat+','+lng,
            (err, res) => {
                if ( err == null ){
                    cb(null, res.results[0])
                    return;
                }
                cb(err, null)
            })
    },

    async getNearbyPlaces(lng, lat, cb){
        this.googleRequest(
            `place/nearbysearch/json?location=${lat},${lng}&sensor=false&radius=350&types=establishment`,
            (err, res) => {
                if ( err == null ){
                    cb(null, res.results)
                    return;
                }
                cb(err, null)
            })
    },

    getTripPath(start, end, cb){
        this.googleRequest(
            `directions/json?origin=${start}&destination=${end}&mode=driving`,
            (err, res) => {
                let points = Polyline.decode(res.routes[0].overview_polyline.points)
                let path = points.map((point)=>{
                    return {latitude: point[0], longitude: point[1]}
                })
                cb(err, path)
            })
    }
}
