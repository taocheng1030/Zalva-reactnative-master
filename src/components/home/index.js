import React, { Component } from 'react';
import { Drawer, Container, Header, Left, Right, Body, Button, Icon, Content, Footer, FooterTab } from 'native-base';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import SidebarDrawer from 'components/drawer';
import * as Animatable from 'react-native-animatable';

import styles from 'styles/home';

import * as loadImage from 'utils/loadImages';

import { getFromLocation } from 'storage/location';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: null,
            current: ''
        }
    }

    componentWillMount() {
        this.getLetter();
    }

    _playAnimation = () => {
        if (!this.state.animation) {
          this._loadAnimation();
        } else {
          this.animation.reset();
          this.animation.play();
        }
    };

    _stopAnimation = () => {
        this.animation.reset();
    };

    _loadAnimation = () => {
        this.setState({ animation: loadImage.pulse }, this._playAnimation);
    };
    
    getLetter() {
        const letters = ['¿A dónde vas?','¿vas al brete?','¿vas a chepe?'];
        count = 0;
        this.myInterval = setInterval(() => {
            count++;
            this.setState({ current: letters[count % letters.length ] });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.myInterval);
    }

    render(){
        const { fromLocation, toLocation, handleFromLocation, handleToLocation, handleConfirmation, region } = this.props;
        
        closeDrawer = () => {
            this.drawer._root.close()
        };

        openDrawer = () => {
            this.drawer._root.open()
        };

        return(
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={ <SidebarDrawer navigator={closeDrawer} />}
                onClose={() => closeDrawer() } >
                <Container>
                    <Header iosBarStyle={"light-content"} style={styles.header}>
                        <Left style={styles.c_left}>
                            <Button 
                                transparent
                                onPress={() => openDrawer() }>
                                <Icon
                                    active
                                    ios="ios-menu"
                                    android="md-menu"
                                    style={{ fontSize: 28, color: "white" }}
                                />
                            </Button>
                        </Left>
                        <Body>
                            <Image style={{ resizeMode: 'contain', width: 90 }}  source={loadImage.logo_white} />
                        </Body>
                        <Right/>
                    </Header>
                    
                    <View style={{ flex: 1, flexDirection: 'column' }}>

                        <View style={{ flex: 2 }}>
                            <Image source={loadImage.cover_home} style={{ width: '100%', height: '100%' }} />
                        </View>

                        <View style={{ flex: 2, alignItems:'center' }}>
                        <View style={styles.bottom_position}>

                            <View style={styles.question_home}>
                                <Text style={styles.question_say}>¡Hola!</Text>
                                <Animatable.Text animation="bounceIn" style={styles.question_home_txt}>{ this.state.current ? this.state.current.toUpperCase() : '¿A dónde vas?'.toUpperCase() }</Animatable.Text>
                            </View>

                            <View style={styles.contentDirections}>
                                <TouchableOpacity onPress={handleFromLocation} style={styles.directionsItem}>
                                    <View style={[styles.directionsItemCircle, { backgroundColor: 'green' }]} />
                                        <Text style={styles.blackColor}>{ fromLocation ? fromLocation.title : 'Actualizando ubicación...' }</Text>
                                    <View style={{ backgroundColor: '#dadada', width: '95%', height: 0.5, position:'absolute', bottom: 0, right: 0 }}/>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={handleToLocation} style={styles.directionsItem}>
                                    <View style={styles.linerDirections}/>
                                        <View style={[styles.directionsItemCircle, { backgroundColor: 'red' }]} />
                                    <Text style={styles.blackColor}>{ toLocation ? toLocation.title : 'Destino' }</Text>
                                </TouchableOpacity> 
                            </View>{/* contentDirections */}


                            <View style={styles.content_button}>
                                <Button onPress={handleConfirmation} style={styles.btn_pickup}><Text style={styles.pickup_txt}>CONFIRMAR</Text></Button>
                            </View>

                            </View>
                        </View>                       


                    </View>                    
                  
                </Container>
            </Drawer> 
        )
    }
}

export default Home;