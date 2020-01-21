import { StyleSheet, Platform } from "react-native";
import * as commonStyles from './commonStyles';
import * as commonColors from './commonColors';

import { screenWidth } from './commonStyles';

export default StyleSheet.create({
    header:{
        backgroundColor: commonColors.theme
    },
    titleScreen:{
        color: '#fff'
    },
    c_left:{
        marginLeft: 6
    },
    input:{
        fontSize: 14,
        color: '#000',
        height: 40,
        alignSelf: 'stretch',
        borderColor: '#d8d8da',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
    boxCircle:{
        width: '100%', 
        backgroundColor:'rgb(240, 240, 240)', 
        height: 150
    },
    contentCircle:{
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20
    },
    imageCircle:{
        borderRadius: 50, 
        width: 100, 
        height: 100
    },
    absoluteIcon:{
        width: 30, 
        height: 30, 
        backgroundColor: 'rgb(200,70, 86)', 
        borderRadius: 15, 
        justifyContent: 'center', 
        alignItems: 'center',
        position: 'absolute', 
        left: screenWidth / 2 + 20, 
        bottom: 0
    },
    contentEdit:{
        marginTop: 20,
        marginHorizontal: 15
    },
    formGroup:{
        marginBottom: 11
    },
    labelInput:{
        fontFamily: 'AvenirBook',
        paddingBottom: 2,
    },
    btn_update:{
        backgroundColor: commonColors.theme
    },
    btn_update_txt:{
        color: '#fff'
    }
});