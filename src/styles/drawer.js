import { StyleSheet } from "react-native";

import * as commonColors from './commonColors';

export default StyleSheet.create({
    drawer:{
        flex:1, 
        backgroundColor: '#fff'
    },
    header:{
        backgroundColor: commonColors.theme,
        height: 155,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    content_header:{
        flexDirection:'row',
        alignItems:'center',
        paddingLeft: 20
    },
    content_logo:{
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    img_profile:{
        resizeMode: 'contain', 
        borderRadius: 40,
        width: 80,
        height: 80,
    },
    content_user:{
        paddingLeft: 15
    },
    content_user_txt:{
        color: '#000',
        fontWeight: 'bold',
        fontSize: 14
    },
    icon_logo:{
        width: 45,
        height: 45,
        resizeMode: 'contain'
    },
    content_menu:{
        paddingTop: 10
    },
    item:{
        width:'100%',
        height: 50,
        marginBottom: 5,
        borderBottomWidth: 0
    },
    item_txt:{
        color: '#000',
        paddingLeft: 25,
    },
    imgIcon:{
        width: 20,
        height: 15,
        resizeMode: 'contain'
    }
});
