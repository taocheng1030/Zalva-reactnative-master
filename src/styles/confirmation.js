import { StyleSheet } from "react-native";

import * as commonColors from './commonColors';
import { screenWidth, screenHeight } from './commonStyles';

export default StyleSheet.create({
    header:{
        backgroundColor: commonColors.theme,
        borderBottomWidth: 0
    },
    titleScreen:{
        color: '#fff'
    },
    item_pick:{
        paddingVertical: 15,
        paddingHorizontal: 10,
    },
    c_left:{
        marginLeft: 6
    },
    /* Request */
    blur_request:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pulse_animation:{

    },
    searching_drivers:{
        fontFamily: 'AvenirBlack',
        color: '#333',
        fontSize: 15
    },
    searching_drivers_waiting:{
        color: '#959595',
        fontFamily: 'AvenirBlack',
        fontSize: 13,
        marginTop: 10
    },
    request_cancel:{
        position: 'absolute',
        backgroundColor: 'red',
        bottom: 0,
        left: 0,
        right: 0
    },
    btn_cancel_request:{
        height: 53,
        backgroundColor: '#4871b7'
    },
    btn_cancel_request_txt:{
        color: '#fff',
        fontFamily: 'AvenirBlack'
    },
    vehicleList:{
        paddingHorizontal: 15
    },

    vehicleTitle:{
        fontFamily: 'AvenirBlack',
        color: '#000',
        fontSize: 17,
        paddingTop: 15
    },

    contentVehicleList:{
        flexDirection: 'row',
        paddingTop: 14,
    },

    vehicleItem:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginRight: 10,
        marginBottom: 1
    },

    vehicleImage:{
        width: 50,
        height: 50,
        alignSelf: 'center',
        resizeMode: 'contain'
    },

    vehicleName:{
        fontSize: 8,
        fontWeight: 'bold',
        textAlign:'center'
    },  
    confirm:{
        backgroundColor: commonColors.theme,
        borderRadius: 0
    },

    confirm_txt:{
        fontFamily: 'AvenirBlack',
        color: '#fff',
    },
    paymentOptions:{
        marginTop: 15,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    paymentOptionsItem:{
        flex: 1,
        paddingVertical: 10
    },
    paymentArrow:{
        position:'absolute',
        right: 40
    },
    amount:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'right'
    },
    paymentType:{
        paddingLeft: 10
    },
    contentDirections: {
        borderColor: '#dadada',
        borderWidth: 0.5,
        flexDirection: 'column',
        borderRadius: 5,
        marginBottom: 10
    },
    linerDirections: {
        position: 'absolute', 
        width:0.5, 
        height: 25, 
        backgroundColor: '#dadada', 
        top: -12, 
        left: 20
    },
    directionsItem:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingLeft: 16,
    },
    directionsItemCircle:{
        width: 8, 
        height: 8, 
        marginRight: 10, 
        borderRadius: 5
    },
    tripDetail:{
        flexDirection: 'column', 
        backgroundColor: '#fff', 
        padding: 10, 
        marginTop: 8
    },
    tripDetailItem:{
        flexDirection: 'row', 
        padding: 15, 
        borderBottomColor: '#dadada', 
        borderBottomWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
    },
    tripDetailFlex:{
        flex: 1
    },
    tripDetailValue:{
        flex: 1, 
        alignItems: 'flex-end'
    },
    tripTitle:{
        fontFamily: 'AvenirBlack',
        color: '#000',
        fontSize: 12,
        paddingHorizontal: 12
    },
    customerDetail:{
        flexDirection: 'row',
        alignItems:'center',
        paddingTop: 10
    },
    customerInfoItem:{
        alignItems: 'center',
        paddingVertical: 10
    },
    contentUserImage:{
        marginLeft: 13
    },
    contentUserInfo:{
        marginLeft: 10
    },
    customerInfoName:{
        fontFamily: 'AvenirBlack',
        color: '#333',
        marginTop: 10
    },
    vehicleName:{
        fontFamily: 'AvenirHeavy',
        color: '#9f9f9f',
    },
    contentRating:{
        flexDirection:'row', 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#e5e4e7', 
        borderColor: '#c7c6c6', 
        borderWidth: 0.6, 
        marginLeft: 7, 
        padding: 4,
        width: '37%',
        alignSelf: 'flex-start',
        marginTop: 10
    },
    customerInfoCallIcon:{
        marginTop: 13
    },
    customerInfoCall:{
        fontWeight: 'bold'
    },
    img_profile:{
        resizeMode: 'contain', 
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    number:{
        borderColor: '#000',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
        fontFamily: 'AvenirHeavy',
        fontSize: 12
    },
    trip_first:{
        flexDirection: 'row', 
        backgroundColor: '#f5f5f5', 
        paddingVertical: 15,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 0.8
    },
    trip_item:{
        flex: 1, 
        flexDirection:'row', 
        paddingHorizontal: 13,
    },
    tripNumber:{
        fontFamily: 'AvenirHeavy',
        fontSize: 13
    },
    cancel:{
        borderTopColor: '#cdcdd3', 
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
        borderRadius: 0
    },
    cancel_txt:{
        color:'#000',
        fontFamily: 'AvenirHeavy',
    }
});
