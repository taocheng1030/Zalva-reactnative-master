import { StyleSheet, Platform } from "react-native";
import * as commonStyles from './commonStyles';
import * as commonColors from './commonColors';

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
    box_add_payment:{
        backgroundColor: '#fff',
        borderColor: '#efeef4',
        borderWidth: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5
    },
    button_add:{
        backgroundColor: commonColors.theme
    }
});