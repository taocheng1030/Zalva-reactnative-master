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
    c_right:{
        marginRight: 6
    },
    contentProblems:{
        paddingTop: 10,
    },
    problemItem:{
        marginBottom: 5, 
        flexDirection: 'row',
        borderBottomColor: '#d8d8da',
        borderBottomWidth: 0.5,
        padding: 10,
    },
    problemStatus:{
        paddingHorizontal: 2, 
        paddingVertical: 2, 
        borderRadius: 5, 
        width: 70, 
        alignItems:'center',
        position: 'relative',
        top: 2
    },
    btnAdd:{
        position: 'absolute',
        bottom: 20,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        backgroundColor: commonColors.theme,
        borderRadius: 50,
    },
    title:{
        borderColor: '#d8d8da',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    description:{
        borderColor: '#d8d8da',
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        height: 130
    },
    btn_add:{
        backgroundColor: commonColors.theme
    },
    btn_add_txt:{
        color: '#fff'
    }
});