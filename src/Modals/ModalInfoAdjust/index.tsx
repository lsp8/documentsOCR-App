import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

interface ModalProps {
  visible: boolean;
  handleModalVisibility: () => void;
  setCPF: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  nameAdjust: boolean;
  CPFAdjust: boolean;
  name: string;
  CPF: string;
}
export function ModalInfoAdjust({
  visible,
  handleModalVisibility,
  setCPF,
  setName,
  nameAdjust,
  CPFAdjust,
  name,
  CPF,
}: ModalProps) {
  const handleCloseModal = () => {
    handleModalVisibility();
  };

  const handleConfirmation = () => {
    handleModalVisibility();
  };
  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent
      onRequestClose={handleCloseModal}>
      <View style={styles.infoAdjustContainer}>
        <View
          style={{
            marginRight: '4%',
            alignItems: 'flex-end',
            marginTop: '2%',
          }}>
          <Text
            style={{fontSize: 20, color: '#09035c'}}
            onPress={() => {
              handleCloseModal();
            }}>
            X
          </Text>
        </View>
        <Text style={styles.infoAdjHeader}>
          {' '}
          Ajuste o {nameAdjust ? <Text>nome</Text> : <Text>CPF</Text>} conforme
          o documento:
        </Text>

        {nameAdjust && (
          <TextInput
            style={styles.adjustInput}
            value={name}
            onChangeText={(text: React.SetStateAction<string>) => {
              setName(text);
            }}></TextInput>
        )}
        {CPFAdjust && (
          <TextInput
            style={styles.adjustInput}
            value={CPF}
            onChangeText={(text: React.SetStateAction<string>) => {
              setCPF(text);
            }}></TextInput>
        )}
        <View>
          <TouchableOpacity
            style={styles.adjustButton}
            onPress={() => {
              handleConfirmation();
            }}>
            <Text style={styles.adjustButtonText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  infoAdjustContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: 50,

    width: '80%',
    borderRadius: 10,
  },
  infoAdjHeader: {
    position: 'absolute',
    marginTop: '8%',
    fontSize: 16,
    marginHorizontal: '4%',
    color: '#09035c',
    marginBottom: '4%',
  },
  adjustInput: {
    marginTop: '8%',
    marginBottom: '4%',
    fontSize: 18,
    color: '#09035c',
    alignSelf: 'center',
    backgroundColor: '#aeaeb1',
    paddingHorizontal: '5%',
    borderWidth: 1,
    borderColor: '#09035c',
    borderStyle: 'dashed',
  },
  adjustButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#09035c',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: '2%',
  },
  adjustButtonText: {
    fontSize: 16,
    color: '#09035c',
  },
});
