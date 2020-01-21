import React, { Component } from 'react';
import { Container, Header, Left, Right, Body, Button } from 'native-base';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from 'styles/locations';
import { screenWidth, screenHeight } from "styles/commonStyles";

import { Actions } from 'react-native-router-flux';

import * as commonColors from 'styles/commonColors';

import UtilService from 'utils/util';

class Locations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filtering: false
        }
    }

    renderTitle() {
        const { target } = this.props;
        if(target == 'fromLocation') {
            return <Text style={styles.header_center}>ORIGEN</Text>
        }

        if(target == 'toLocation') {
            return <Text style={styles.header_center}>DESTINO</Text>
        }
    }

    renderAutoComplete() {
        const { target } = this.props;
        return(
            <View style={{ flexDirection: 'row', height: this.state.filtering ? screenHeight : 50, backgroundColor: 'white' }}>
                <View style={{ flex: 1 }}>
                    <View style={{ position: 'absolute', width: '100%', backgroundColor: 'white' }}>
                        <GooglePlacesAutocomplete
                            placeholder={'Buscar lugar'}
                            minLength={1}
                            autoFocus={false}
                            textInputProps={{
                                ref: "input",
                                autoCorrect: false,
                                autoCapitalize: "none",
                                onChangeText: (text) => {
                                    this.setState({ filtering: (text.length > 0) })
                                }
                            }}

                            returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                            listViewDisplayed='auto'    // true/false/undefined
                            fetchDetails={true}
                            renderDescription={row => row.description} // custom description render
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true   
                                this.props.handleSelectPlaces(details);                                        
                            }}
                            
                            getDefaultValue={() => ''}
                            
                            query={{
                                key: 'AIzaSyAmiZazE0SlJ91ZmjCRm7Iz9y9k6xM7uFs',
                                language: 'es', // language of the results
                                types: '', // default: 'geocode'
                                components: 'country:cr'
                            }}
                            
                            styles={{
                                textInputContainer: {
                                    width: '100%',
                                    backgroundColor: commonColors.theme,
                                    height: 52,
                                    paddingBottom: 4,
                                    borderTopColor: 0
                                },
                                textInput: {
                                    height: 35,
                                    color: commonColors.normalText,
                                    fontSize: 15
                                },
                                description: {
                                    fontWeight: 'bold'
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                },
                                listView:{
                                    backgroundColor: '#fff',
                                },
                                row:{
                                    flex: 1,
                                    height: 52
                                }, 
                                separator:{
                                    backgroundColor:'#d8d8da'
                                },
                            }}
                            nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                            GoogleReverseGeocodingQuery={{
                                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                            }}
                            GooglePlacesSearchQuery={{
                                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                rankby: 'distance',
                                types: 'food'
                            }}

                            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                            debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                        />
                    </View>
                </View>
            </View>
        )
    }

    renderLocationMap() {
        const{ target, handleFromLocation, handleToLocation } = this.props;

        if(target == 'fromLocation') {
            return(
                <TouchableOpacity onPress={handleFromLocation} style={[styles.address_item, { marginBottom: 20}]}>
                    <View>
                        <Ionicons name="md-pin" size={19} color="#000" />
                    </View>
                    <View style={styles.address_item_location}>
                        <Text>Ubicar en mapa</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        if(target == 'toLocation') {
            return(
                <TouchableOpacity onPress={handleToLocation} style={[styles.address_item, { marginBottom: 20}]}>
                    <View>
                        <Ionicons name="md-pin" size={19} color="#000" />
                    </View>
                    <View style={styles.address_item_location}>
                        <Text>Ubicar en mapa</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }

    render(){
        const { nearbyPlaces } = this.props;
        return(
            <Container style={styles.bgLocation}>

                <Header iosBarStyle={"light-content"} style={styles.header}>
                    <Left style={styles.c_left}>
                        <Button 
                            transparent
                            onPress={() => Actions.pop() }>
                            <Ionicons name="md-close" size={25} color="#fff" />
                        </Button>
                    </Left>
                    <Body>
                        { this.renderTitle() }
                    </Body>
                    <Right/>
                </Header>

                { this.renderAutoComplete() }
                {!this.state.filtering && 
                    <View>

                        <View style={styles.address_item}>
                            <View>
                                <Ionicons name="md-locate" size={19} color="#000" />
                            </View>
                            <View style={styles.address_item_location}>
                                <Text>Ubicación Actual</Text>
                            </View>
                        </View>
                        { this.renderLocationMap() }
    
                        <View style={styles.content_address}>
                            <ScrollView>
                                {
                                    nearbyPlaces && nearbyPlaces.slice(0, 8).map((item, index) => {
                                        return(
                                            <TouchableOpacity onPress={() => this.props.handleSelectNearby(item)} key={index} style={styles.address_item}>
                                                <View>
                                                    <Ionicons name="md-business" size={19} color="#000" />
                                                </View>
                                                <View style={styles.address_item_location}>
                                                    <Text>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </ScrollView>
                        </View>
                    </View> 
                }
                

                

            </Container>
        )
    }
}

export default Locations;