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
    headerAccount:{
        backgroundColor: '#fff', 
        flexDirection: 'row', 
        padding: 15, 
        paddingTop: 15, 
        paddingBottom: 15
    },
    headerContAccount:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    avatarAccount:{
        borderRadius: 50, 
        width: 100, 
        height: 100, 
        margin: 10
    },
    userName:{
        fontWeight: 'bold', 
        color: 'black', 
        margin: 10
    },
    editAccount:{
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 4
    },
    textEditAccount:{
        color: '#000', 
        fontWeight: 'bold',
        fontSize: 13
    },
    account_detail_info:{
        paddingHorizontal: 10,
        paddingTop: 15,
        marginBottom: 10,
    },
    account_detail_info_txt:{
        color: '#000',
        fontSize: 17
    },
    account_list_detail:{
        paddingHorizontal: 11,
        paddingVertical: 15,
        backgroundColor: '#fff'
    },
    account_list: {
        flexDirection: 'row',
        borderBottomColor: '#cccbcb',
        borderBottomWidth: 0.6,
        paddingTop: 10,
        paddingBottom: 10,
    },
    account_list_left:{
        flex: 1,
        justifyContent:'center'
    },
    account_list_left_txt:{
        fontSize: 10
    },
    account_list_right:{
        flex: 1,
        alignItems:'flex-end',
        justifyContent:'center'
    },
    account_list_right_txt:{
        color: '#000',
        fontSize: 12
    },
    btn_edit:{
        backgroundColor: commonColors.theme
    },
    btn_edit_txt:{
        color: '#fff',
        fontWeight: 'bold'
    }
});