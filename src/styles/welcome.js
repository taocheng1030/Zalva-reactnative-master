import { StyleSheet } from "react-native";

import * as commonStyles from './commonStyles';
import * as commonColors from './commonColors';

export default StyleSheet.create({
    main_background:{
        width: commonStyles.screenWidth,
        height: commonStyles.screenHeight,
    },
    get_started:{
        backgroundColor: commonColors.theme,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 13,
    },
    get_started_txt:{
        color: '#fff'
    },
    container: {
        flex: 1,
        backgroundColor: commonColors.theme
    },
    bg_screen:{
        backgroundColor: commonColors.theme
    },
    btn_handle:{
        marginBottom: 15,
        width:'95%',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    btn_handle_text:{
        color: '#000',
        textAlign:'center',
        fontWeight: 'bold',
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
        marginBottom: 30
    },
    input:{
        fontSize: 14,
        color: '#fff',
        height: 40,
        alignSelf: 'stretch',
        borderBottomColor:'#ddd',
        borderBottomWidth: 1,
    },
    btn_login:{
        backgroundColor: '#fff',
        alignSelf:'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btn_login_txt:{
        color: '#000',
        fontWeight: 'bold',
    },
    content_forgot:{
        alignContent: 'center',
        alignItems:'center',
        marginTop: 10
    },
    content_forgot_txt:{
        color:'#fff'
    },
    contentImage:{
        flex: 2,
        alignItems: 'center',
        justifyContent:'flex-end'
    },
    welcome_txt:{
        flex: 1,
        paddingHorizontal: 15,
        alignItems:'center',
        justifyContent:'flex-start',
        paddingTop: 40,
    },
    welcomeTitle:{
        fontFamily: 'AvenirHeavy',
        color: '#000',
        fontSize: 17
    },
    bellowTitle:{
        width: 20,
        height: 1,
        backgroundColor: commonColors.theme,
        borderRadius: 5,
    },
    welcomeLegend:{
        fontFamily: 'AvenirBook',
        textAlign:'center',
        marginTop: 8
    }
});