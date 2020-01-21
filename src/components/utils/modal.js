import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Modal from "react-native-modal";

const ModalMessage = props => {
  const {
    isVisible,
    title,
    msg,
    handleModal,
    footer,
    ...attributes
  } = props;

  return (
    <Modal isVisible={isVisible} animationIn={'fadeIn'}>
        <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalHeaderText}>{title}</Text>
            </View>

            <View style={styles.modalContent}>
                <Text style={styles.modalContentText}>{msg}</Text>
            </View>
            
            <TouchableOpacity style={styles.modalFooter} onPress={handleModal}>
                <Text style={styles.modalFooterText}>{footer}</Text>
            </TouchableOpacity>
        </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  modalBox:{
    backgroundColor: 'white', 
    borderRadius: 4
  },
  modalHeader: {
    width: '100%', 
    height: 48, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalHeaderText:{
    color: '#3a3a48', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  modalContent:{
    alignContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10
  },
  modalContentText:{
    paddingHorizontal: 15, 
    marginVertical: 10, 
    color: '#6b6b76', 
    textAlign: 'center'
  },
  modalFooter:{
    width: '100%', 
    height: 48, 
    justifyContent: 'center',
    alignItems: 'center', 
    borderTopColor: '#cdcdd3', 
    borderTopWidth: 0.5
  },
  modalFooterText:{
    fontSize: 16, 
    color: '#6b6b76'
  }
});

export default ModalMessage;