'use strict';

import React, { PureComponent } from 'react';
import { Alert } from 'react-native';
import { Permissions } from 'expo';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import EditAccountComponent from 'components/account/editAccount';

/* Services */
import baseService from 'services/baseService';
import authService from 'services/authService';

/* Utils */
import Cache from 'utils/cache';
import * as loadImages from 'utils/loadImages';
import * as config from '../../config';

class EditAccount extends PureComponent {
    constructor(props) {
        super(props);

        this.driver = authService.getActiveUser();

        this.state = {
            loading: false,
            driverId: Cache.currentUser.user.id,
            avatar: Cache.currentUser.user.avatar == '' ? loadImages.user_empty : { uri: config.SERVICE_FILE_URL + Cache.currentUser.user.avatar },
            firstname: this.driver.firstname,
            lastname:  this.driver.lastname,
            phone:     this.driver.phone,
            driver: this.driver,
            profilePhoto: loadImages.user_empty,
            profilePhotoFile: null,
            activityStatus: false,
            isUploadingFile: false,
            hasCameraPermission: null,
            hasCameraRollPermission: null
        };

        this.mounted = false;
    }

    async componentDidMount() {
        this.mounted = true;
        const { status }       = await Permissions.askAsync(Permissions.CAMERA);
        const { statusRoll  }  = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        this.setState({ 
            hasCameraPermission: status === 'granted',
            hasCameraRollPermission: statusRoll === 'granted'
        });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleChange = (key, e) => {
        this.setState({ [key]: e });
    }

    handleBack = () => {
        if (this.props.update)
            this.props.update()
        Actions.pop();
    }

    handleSubmit = () => {
        
        const { firstname, lastname, phone } = this.state;

        this.driver.firstname = firstname;
        this.driver.lastname  = lastname;
        this.driver.phone     = phone;
        
        this.setState({ loading: true });

        authService.updateUser(this.driver, (error, result) => {
            if (error) {
                Alert.alert('Error', error);
                return;
            }
            this.setState({ loading: false });
            Cache.currentUser.user = this.driver
            setTimeout(() => {
                Alert.alert("Perfil Actualizado", "Actualizado correctamente.");
            }, 500);
        });

    }

    handleUpload = url => {
        baseService.uploadFile(url, (error, file) => {    
            console.log('result uploadFile ', file);  
            console.log('result uploadFile ', error);    
            if(error == null) {
                this.driver.avatar = file.path
                authService.updateUser(this.driver, (error, result) => {
                    console.log('Error update account ', error);
                    console.log('update account ', result);
                    if(error == null) {
                        Cache.currentUser.user = this.driver
                        setTimeout(() => Alert.alert("Imagen Actualizada", "Su imagen se ha actualizado correctamente."), 500)
                    }else {
                        setTimeout(() => Alert.alert("Error", "Hemos tenido un problema al actualizar la cuenta"), 500)
                    }
                    this.setState({ loading: false})
                });
            }else {
                setTimeout(() => {
                    Alert.alert("Error","Hemos tenido un problema al cargar esta imagen. Por favor intentelo luego");
                }, 500);
            }
            this.setState({ loading: false})
        });
    }

    render() {
        const { loading, firstname, lastname, phone, avatar } = this.state;
        return(
            <EditAccountComponent 
                handleBack={this.handleBack}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                handleUpload={this.handleUpload}
                avatar={avatar}
                firstname={firstname}
                lastname={lastname}
                phone={phone}
                loading={loading}
            />
        )
    }
}

export default EditAccount;