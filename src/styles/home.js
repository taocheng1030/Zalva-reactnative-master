import { StyleSheet } from "react-native";

import * as commonColors from './commonColors';
import { screenWidth, screenHeight } from './commonStyles';

export default StyleSheet.create({
    header:{
        backgroundColor: '#ceedce',
        borderBottomWidth: 0,
    },
    c_left:{
        marginLeft: 6
    },
    header_ride:{
        justifyContent: 'center',
        alignContent: 'center',
        paddingVertical: 10,
    },
    go_to_ride:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign:'center'
    },
    map:{
        width: screenWidth,
        height: screenHeight
    },
    bottom_position:{
        position: 'absolute',
        width: '90%',
        backgroundColor: 'transparent',
        top: 20,
        alignSelf: 'center'
    },
    input_pickup:{
        backgroundColor: 'red',
        paddingVertical: 15,
        paddingHorizontal: 15,
        width: '100%'
    },
    btn_pickup:{
        backgroundColor: commonColors.theme,
        height: 52,
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
        justifyContent:'center',
    },
    pickup_txt:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    question_home:{
        flexDirection: 'column',
        paddingVertical: 10,
        paddingLeft: 4,
        marginBottom: 15
    },
    question_say:{
        fontFamily: 'AvenirBook',
    },
    question_home_txt:{
        fontFamily: 'AvenirBlack',
        color: '#000',
        textAlign: 'left'
    },
    box_locations:{
        backgroundColor: '#fff',
        borderColor: '#dadada',
        borderWidth: 1,
        borderRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowColor: '#858585',
        shadowOffset: { height: 0, width: 0 },
    },
    contentDirections: {
        backgroundColor: '#fff',
        borderColor: '#dadada',
        borderWidth: 0.5,
        flexDirection: 'column',
        borderRadius: 5,
        shadowOpacity: 0.25,
        shadowRadius: 5,
        shadowColor: '#858585',
        shadowOffset: { height: 0, width: 0 },
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
        paddingVertical: 18,
        paddingLeft: 16,
        flex: 1,
    },
    directionsItemCircle:{
        width: 8, 
        height: 8, 
        marginRight: 10, 
        borderRadius: 5
    },

});
