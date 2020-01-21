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
    /* Request */
    boxNewTrip: {
        backgroundColor: '#f6f6f6',
        marginBottom: 15,
        borderColor: '#ececec',
        borderWidth: 0.9,
        // shadowColor: '#e8e9eb',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 2,
        // elevation: 7,
        marginHorizontal: 10,
        borderRadius: 5
    },
    boxNewTrip_header: {
       backgroundColor: '#f6f6f6',
       flexDirection: 'row',
       alignItems:'center',
       paddingVertical: 7,
       paddingHorizontal: 10,
       borderRadius: 5
    },
    boxNewTrip_header_Item:{
        
    },
    boxTrip_avatar: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        borderRadius: 25
    },
    boxTrip_user:{
        marginLeft: 10
    },
    boxTrip_user_txt:{
        fontWeight: 'bold'
    },
    boxNewTrip_content:{
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    boxTrip_address: {
        paddingVertical: 10
    },
    boxTrip_address_name:{
        color: '#a5a4a4',
        fontWeight: 'bold',
        fontSize: 10
    },
    boxNewTrip_footer:{
        flexDirection:'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    boxTrip_btns: {
        flex: 1,
    },
    boxTrip_cancel:{
        alignSelf: 'center',
        width: '60%',
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    boxTrip_cancel_txt:{
        textAlign: 'center',
        color: '#fff'
    },
    boxTrip_accept:{
        backgroundColor: commonColors.theme,
        width: '60%',
        justifyContent: 'center'
    },
    boxTrip_accept_txt:{
        textAlign: 'center',
        color: '#fff'
    },
    contentStatus:{
        flex: 1, 
        alignSelf: 'flex-start',
        marginTop: 3,
    },
    tripStatus:{
        backgroundColor: '#00a651', 
        borderRadius: 4, 
        paddingHorizontal: 5, 
        paddingVertical: 4, 
    },
    tripStatusText:{
        color: 'white', 
        fontSize: 9, 
        fontWeight: 'bold', 
        textAlign:'center'
    },
    kilometers:{
        color: '#a9a9b2',
        fontWeight: 'bold',
        fontSize: 13
    }
});