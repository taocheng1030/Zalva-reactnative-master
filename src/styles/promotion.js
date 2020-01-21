import { StyleSheet } from "react-native";
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
    c_right:{
        marginRight: 6
    },
    promotion:{
        marginHorizontal: 16, 
        marginTop: 20, 
        borderColor: 'rgb(178, 178, 186)', 
        borderRadius:3,
        borderWidth: 0.5, 
        padding: 8, 
        flexDirection: 'row', 
        backgroundColor: 'white'
    },
    promotion_buttom:{
        borderRadius: 3, 
        backgroundColor: commonColors.theme, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width:90, 
        height:30
    },
    promotion_txt:{
        color: 'white', 
        fontSize: 12, 
        fontWeight: 'bold'
    }
});