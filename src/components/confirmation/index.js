import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Left, Right, Body, Button, Title, Footer, FooterTab } from 'native-base';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { DangerZone } from 'expo';
const { Lottie } = DangerZone;

import styles from 'styles/confirmation';

import * as commonColors from 'styles/commonColors';
import * as loadImages from 'utils/loadImages';

import Loader from 'components/utils/loader';

import UtilService from 'utils/util';

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: null
        }
    }

    renderRequesting() {
        const { leftTime } = this.props;
        return(
            <View style={styles.blur_request}>
                <View style={styles.pulse_animation}>
                    <Lottie
                        style={{
                            width: 170,
                            height: 170,
                            backgroundColor: '#fff',
                        }}
                        loop
                        source={loadImages.inLoader}
                        ref={animation => {
                            if (animation) animation.play()
                        }}
                    />
                </View>
                <Text style={styles.searching_drivers}>{'Buscando conductores cercanos'.toUpperCase()}</Text>
                <Text style={styles.searching_drivers_waiting}>{'Por favor espere...'.toUpperCase()}</Text>
                <Text>{leftTime}</Text>
                <View style={styles.request_cancel}>
                    <Button full style={styles.btn_cancel_request}>
                        <Text style={styles.btn_cancel_request_txt}>{ 'Cancelar'.toUpperCase() }</Text>
                    </Button>
                </View>
            </View>
        )
    }

    render(){
        const { 
            handleBack, 
            handleFromLocation, 
            handleToLocation, 
            fromLocation, 
            toLocation, 
            handleRequestTrip,
            requestingTrip,
            loading,
            vehicleList,
            handleVehicleSelection,
            selectedIndex,
            total,
            kms,
            mins,
            showDetails,
            driversAvailables } = this.props;

        const getMins = mins > 1 ? 'Minutos' : 'Minuto';
        return(
            <Container>
                <Loader loading={loading} />
                <Header iosBarStyle={"light-content"} style={styles.header}>
                    <Left style={styles.c_left}>
                        <Button 
                            transparent
                            onPress={handleBack}>
                            <Ionicons name="ios-arrow-back" size={25} color="#fff" />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.titleScreen}>CONFIRMAR</Title>
                    </Body>
                    <Right/>
                </Header>
                
                <View style={{ flex: 1 }}>

                    <View style={{ backgroundColor: '#8DC63F', paddingVertical: 10, paddingHorizontal: 10, flexDirection:"row", alignItems: 'center', justifyContent: 'center', }}>
                        <View>
                            <Text style={{ textAlign: 'center', fontFamily: 'AvenirBook', color: '#fff' }}>{`Hay ${driversAvailables} conductores cercanos a ti`}</Text>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <Image source={loadImages.happy} resizeMode={'contain'} style={{ width: 20, height: 20 }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 20, marginHorizontal: 15 }}>
                        <View style={styles.contentDirections}>
                            <TouchableOpacity onPress={handleFromLocation} style={styles.directionsItem}>
                                <View style={[styles.directionsItemCircle, { backgroundColor: 'green' }]} />
                                    <Text style={{ color: '#000' }}>{ fromLocation ? fromLocation.title : 'Actualizando ubicación...' }</Text>
                                <View style={{ backgroundColor: '#dadada', width: '95%', height: 0.5, position:'absolute', bottom: 0, right: 0 }}/>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleToLocation} style={styles.directionsItem}>
                                <View style={styles.linerDirections}/>
                                    <View style={[styles.directionsItemCircle, { backgroundColor: 'red' }]} />
                                <Text style={styles.blackColor}>{ toLocation ? toLocation.title : 'Destino' }</Text>
                            </TouchableOpacity> 
                        </View>{/* contentDirections */}
                    </View>

                    <View style={styles.vehicleList}>
                        <Text style={styles.vehicleTitle}>Seleccionar tipo de vehiculo</Text>
                        <ScrollView 
                            style={styles.contentVehicleList}
                            horizontal={true} 
                            showsHorizontalScrollIndicator={false}>
                            {
                                vehicleList && vehicleList.items.map((item, i) => {
                                    return(
                                        <TouchableOpacity key={i} style={[styles.vehicleItem, { borderColor: selectedIndex == i ? '#8DC63F' : '#dadada' }]} onPress={() => handleVehicleSelection(i) }>
                                            <View>
                                                {
                                                    selectedIndex == i ?
                                                    <Image style={styles.vehicleImage} source={loadImages.moto_active} /> :
                                                    <Image style={styles.vehicleImage} source={loadImages.moto_normal} />
                                                }
                                                <Text style={styles.vehicleName}>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>

                    {
                        showDetails && 
                        <View style={styles.tripDetail}>
                            <Text style={styles.tripTitle}>Detalles del viaje</Text>
                            <View style={styles.tripDetailItem}>
                                <View style={styles.tripDetailFlex}><Text>Kilometros: </Text></View>
                                <View style={styles.tripDetailValue}><Text>{kms}</Text></View>
                            </View>
                            <View style={styles.tripDetailItem}>
                                <View style={styles.tripDetailFlex}><Text>Tiempo de llegada: </Text></View>
                                <View style={styles.tripDetailValue}><Text>{`${UtilService.calculateTripMoto(mins)} ${getMins}`}</Text></View>
                            </View>
                            <View style={styles.tripDetailItem}>
                                <View style={styles.tripDetailFlex}><Text>Total: </Text></View>
                                <View style={styles.tripDetailValue}><Text>₡ { UtilService.formatNumber(total) }</Text></View>
                            </View>
                        </View>
                    }

                </View>

                <Footer>
                    <FooterTab>
                        <Button disabled={selectedIndex ? true : false } style={[styles.confirm, {
                            backgroundColor: selectedIndex ? '#bfbfbf' : '#8DC63F'
                        }]} onPress={handleRequestTrip}>
                            <Text style={styles.confirm_txt}>{ 'Confirmar Viaje'.toUpperCase() }</Text>
                        </Button>
                    </FooterTab>
                </Footer>

                { requestingTrip && this.renderRequesting() }
            </Container>
        )
    }
}

Confirmation.propTypes = {
    handleBack: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default Confirmation;