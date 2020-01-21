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
    box_add_payment:{
        backgroundColor: '#fff',
        borderColor: '#efeef4',
        borderWidth: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5
    },
    card_radius:{
        backgroundColor: commonColors.theme,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent:'center'
    },
    box_add_payment_item:{
        flex: 1
    },
    arrow_payment:{
        marginRight: 15
    },
    box_cards_content:{
        marginTop: 25
    },
    payment_methods_title:{
        marginHorizontal: 20,
        marginBottom: 10,
    },
    payment_methods_title_txt:{
        color: '#b0b5c3',
        fontWeight: 'bold',
        fontSize: 13
    },
    payment_methods:{
        backgroundColor: '#fff',
        borderColor: '#efeef4',
        borderWidth: 0.9,
        marginHorizontal: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    payment_item:{
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'center',
        borderBottomColor: '#f4f4f8',
        borderBottomWidth: 0.9,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    credit_number:{
        marginLeft: 10
    }
});