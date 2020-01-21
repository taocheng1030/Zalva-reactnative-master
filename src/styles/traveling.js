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
    customerDetail:{
        flexDirection: 'row',
        paddingTop: 10,
    },
    customerInfoItem:{
        alignItems: 'center',
        paddingVertical: 10
    },
    contentUserImage:{
        marginLeft: 10
    },
    contentUserInfo:{
        marginLeft: 10
    },
    customerInfoName:{
        color: '#333',
        marginTop: 10
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
        alignSelf: 'center',
        marginTop: 10
    },
    customerInfoCallIcon:{
        marginTop: 13
    },
    customerInfoCall:{
        fontWeight: 'bold'
    },
});