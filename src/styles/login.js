import { StyleSheet } from "react-native";

import * as commonStyles from './commonStyles';
import * as commonColors from './commonColors';

export default StyleSheet.create({
    contentScreen:{
        backgroundColor: '#fff',
        flex: 1,
    },
    content_login:{
        marginTop: 35,
        paddingHorizontal: 25,
    },
    content_remember:{
        justifyContent:'center',
        alignContent: 'center',
        alignItems:'center',
        marginVertical: 10,
    },
    content_remember_txt:{
        color:'#fff',
        textAlign:'center'
    }, 
    input_content:{
        marginBottom: 20
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
    btn_login:{
        backgroundColor: commonColors.theme,
        alignSelf:'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_login_txt:{
        color: '#fff',
        fontWeight: 'bold',
    },
    content_forgot:{
        alignContent: 'center',
        alignItems:'center',
        marginTop: 10
    },
    content_forgot_txt:{
        color:'#000'
    },
    instruction:{
        textAlign:'center', 
        fontSize: 15, 
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
    }
});