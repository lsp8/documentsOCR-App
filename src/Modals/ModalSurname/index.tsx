import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface ModalProps {
  visible: boolean;
  handleModalVisibility: () => void;
  handleSurnameConfirmation: () => void;
}

export function ModalSurname({
  visible,
  handleModalVisibility,
  handleSurnameConfirmation,
}: ModalProps) {
  const handleCloseModal = () => {
    handleModalVisibility();
  };

  const handleConfirmation = () => {
    handleSurnameConfirmation();
    handleModalVisibility();
  };

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.surnameModal}>
        <View>
          <Text style={styles.surnameHeader}>
            O sobrenome está em outro campo?
          </Text>
        </View>
        <View style={styles.surnameButtonsView}>
          <TouchableOpacity
            style={styles.surnameButtons}
            onPress={() => {
              handleConfirmation();
            }}>
            <Text style={styles.buttonText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.surnameButtons}
            onPress={() => {
              handleCloseModal();
            }}>
            <Text style={styles.buttonText}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  surnameModal: {
    backgroundColor: 'white',
    height: '20%',
    marginTop: '20%',
    marginHorizontal: '5%',
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
  },
  surnameHeader: {
    marginTop: '5%',
    textAlign: 'center',
    fontSize: 20,
    color: '#09035c',
  },
  surnameButtonsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: '10%',
  },
  surnameButtons: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#09035c',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#09035c',
    fontSize: 18,
  },
});
