import { StyleSheet } from "react-native";

import * as commonColors from './commonColors';
import { screenWidth, screenHeight } from './commonStyles';

export default StyleSheet.create({
    header:{
        backgroundColor: commonColors.theme,
        borderBottomWidth: 0
    },
    c_left:{
        marginLeft: 6
    },
    header_txt:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10
    },
    header_center:{
        color: '#fff',
        fontWeight: 'bold'
    },
    header_search:{
        
    },
    input:{
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    bgLocation:{
        backgroundColor: '#f3f3f3'
    },
    content_address:{
        paddingTop: 10
    },
    address_item:{
        backgroundColor: '#fff',
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 0.9,
    },
    address_item_location:{
        paddingLeft: 7
    }
});
