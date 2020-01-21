import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { List, ListItem, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

import * as loadImage from 'utils/loadImages';

import styles from 'styles/drawer';

/* Services */
import authService from 'services/authService';

import UtilService from 'utils/util';
import Cache from 'utils/cache';
import * as config from '../../config';

class SidebarDrawer extends Component {

  state = { 
    user: Cache.currentUser.user, 
    avatar: Cache.currentUser.user.avatar == '' ? loadImage.user_empty : { uri: config.SERVICE_FILE_URL + Cache.currentUser.user.avatar }
  }

  handleNavigation = navigation => {
      Actions[navigation]();
      this.props.navigator(); 
  }

  signOut = () => {
    authService.logout()
    Actions.Welcome()
  }

  render() {
    const { navigator } = this.props;
    const { user, avatar } = this.state;
    return (
      <View style={styles.drawer}>

        <View style={styles.header}>
          <View style={styles.content_header}>
              <View style={styles.content_logo}>
                <Image source={avatar} style={styles.img_profile} />
              </View>
              <View style={styles.content_user}>
                  <Text style={styles.content_user_txt}>{ UtilService.getFullname(user) }</Text>
                  <Text style={[styles.content_user_txt, { marginTop: 3}]}>{ user.rating } <Ionicons name="md-star" size={15} color="#000" /> </Text>
              </View>
          </View>{/* content_header */}
        </View>

        <View style={styles.content_menu}>
          <List>
            <ListItem onPress={() => this.handleNavigation('Records') } iconLeft noIndent style={styles.item}>
              <Ionicons name="md-person" size={20} color="#000" />
              <Text style={styles.item_txt}>Historial</Text>
            </ListItem>
            <ListItem onPress={() => this.handleNavigation('Promotion') } iconLeft noIndent style={styles.item}>
              <Ionicons name="md-gift" size={20} color="#000" />
              <Text style={styles.item_txt}>Promociones</Text>
            </ListItem>
            <ListItem onPress={() => this.handleNavigation('Problems') } iconLeft noIndent style={styles.item}>
              <Ionicons name="md-help-buoy" size={20} color="#000" />
              <Text style={styles.item_txt}>Soporte</Text>
            </ListItem>
            <ListItem onPress={() => this.handleNavigation('Account') } iconLeft noIndent style={styles.item}>
              <Ionicons name="md-settings" size={20} color="#000" />
              <Text style={styles.item_txt}>Cuenta</Text>
            </ListItem>
            <ListItem onPress={this.signOut} iconLeft noIndent style={styles.item}>
              <Ionicons name="md-log-out" size={20} color="#000" />
              <Text style={styles.item_txt}>Cerrar Sesión</Text>
            </ListItem>
          </List>
        </View>

      </View>
    );
  }
}

export default SidebarDrawer;