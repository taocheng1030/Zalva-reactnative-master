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
    bgLocation:{
        backgroundColor: '#e0e0e3'
    },
    contentMap:{
        justifyContent:'center',
        alignItems: 'center',
    },
    contentLocation:{
        backgroundColor:'transparent', 
        position: 'absolute',
        zIndex: 1, 
        height: 100
    },
    map:{
        width: '100%',
        height: '100%',
    },
    pickup:{
        width: 50,
        height: 50,
        
    },
    done:{
        height: 50, 
        width: '100%',
        position: 'absolute', 
        bottom: 0,
        backgroundColor: commonColors.theme, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    done_txt:{
        fontSize: 16, 
        fontWeight: 'bold', 
        color: 'white'
    }
});
