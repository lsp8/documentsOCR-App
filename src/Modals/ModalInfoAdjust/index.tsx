import React, {useState} from 'react';
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
  //   const [nameState, setNameState] = useState<string>('');
  //   const [CPFState, setCPFState] = useState<string>('');

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
  container: {
    backgroundColor: '#09035c',
    flex: 1,
    padding: 10,
  },
  innerContainer: {
    justifyContent: 'space-around',
    flex: 1,
  },
  dataContainer: {
    backgroundColor: '#0b0470',
    margin: 5,
    borderColor: 'white',
    borderWidth: 1,
    elevation: 5,
  },
  data: {
    color: 'white',
    fontSize: 18,
    padding: 10,
  },
  clear: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    textDecorationLine: 'underline',
  },
  camButton: {
    borderRadius: 15,
    backgroundColor: '#36c0f7',
    width: '60%',
    height: '10%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {fontSize: 20, fontWeight: 'bold'},
  header: {
    fontSize: 20,
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: 'white',
  },
  blockCard: {
    padding: 15,
    elevation: 1,
    borderBottomWidth: 1,
  },
  modalBlocks: {
    elevation: 1,
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: 20,
    padding: 5,
    width: '95%',
  },
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
  activityIndicator: {
    position: 'absolute',
    marginTop: '70%',
    zIndex: 1,
    alignSelf: 'center',
  },
});
