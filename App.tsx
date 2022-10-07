import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Modal,
  SafeAreaView,
  Text,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import TextRecognition from 'react-native-text-recognition';
import ImageCropPicker from 'react-native-image-crop-picker';

const App = () => {
  const [name, setName] = useState<string>('');
  const [CPF, setCPF] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [nameAdjust, setNameAdjust] = useState<boolean>(false);
  const [CPFAdjust, setCPFAdjust] = useState<boolean>(false);
  const [blocks, setBlocks] = useState<string[]>([]);
  const [modalBlocksVis, setModalBlocksVis] = useState<boolean>(false);
  const [modalInfoAdjust, setModalInfoAdjust] = useState<boolean>(false);
  const [isThereSurname, setIsThereSurname] = useState<boolean>(false);
  const [modalSurname, setModalSurname] = useState<boolean>(false);
  const [blocksAmount, setBlocksAmount] = useState<number>(0);

  const takePhotoFromCamera = () => {
    setModalSurname(false);
    setName('');
    setSurname('');
    setCPF('');
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      //console.log(image);
      const result = await TextRecognition.recognize(image.path);
      console.log('IMAGEM=', image);
      console.log('RESULT=', result);
      setBlocks(result);
      setModalBlocksVis(true);
      countBlocks(result);
    });
  };

  const countBlocks = (o: string[]) => {
    setBlocksAmount(o.length);
  };

  const renderBloco = (block: string) => (
    <View style={styles.blockCard}>
      {isThereSurname ? (
        <Text
          onPress={() => {
            setSurname(block);
            setModalBlocksVis(false);
            setModalSurname(true);
          }}>
          {block}
        </Text>
      ) : (
        <Text
          onPress={() => {
            setName(block);
            setModalBlocksVis(false);
            setModalSurname(true);
          }}>
          {block}
        </Text>
      )}
    </View>
  );

  const wipeData = () => {
    setName('');
    setCPF('');
    setIsThereSurname(false);
  };

  const handleAdjustName = () => {
    setModalInfoAdjust(true);
    setNameAdjust(true);
  };

  const handleAdjustCPF = () => {
    setModalInfoAdjust(true);
    setCPFAdjust(true);
  };

  useEffect(() => {
    for (let i = 0; i <= blocks.length; i++) {
      if (
        blocks[i]?.includes('.') &&
        blocks[i]?.includes('-') &&
        blocks[i].length >= 13
      ) {
        setCPF(blocks[i]);
        console.log('índice do bloco cpf= ', i);
      }
    }
  }, [blocks]);

  useEffect(() => {
    let rawDoc = CPF;
    if (rawDoc.includes('/')) {
      let slicedDoc = rawDoc.slice(0, rawDoc.length - 10);
      let matchedDoc = slicedDoc.match(/[--9]/g)!.join();
      let docFinal = matchedDoc.replace(/,/g, '');

      if (docFinal.length > 14) {
        let trimmedDoc = docFinal.slice(0, 14);
        setCPF(trimmedDoc);
      } else {
        setCPF(docFinal);
      }
    } else {
      if (CPF) {
        const docClean = rawDoc.match(
          /(?<=\D|^)([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})(?=\D|$)/g,
        );
        console.log('DocClean= ', docClean);
        if (docClean) {
          let finalDoc = docClean.toString();
          setCPF(finalDoc);
        }
      }
    }
  }, [CPF]);

  useEffect(() => {
    console.log('Name antes:', name);
    let cleanName = name.replace('NOME', '');
    setName(cleanName);
    console.log('Name depois:', cleanName);
  }, [name]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.camButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.header}>OCRCamera</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.camButton}
          onPress={() => {
            setCPF('034.567.132-0709/54/2022333');
          }}>
          <Text style={styles.header}>TESTECPF</Text>
        </TouchableOpacity> */}
        <View>
          {name.length > 1 && (
            <View style={styles.dataContainer}>
              <Text
                style={styles.data}
                onPress={() => {
                  handleAdjustName();
                }}>
                Nome selecionado: {name} {surname}
              </Text>
            </View>
          )}
          {CPF.length > 1 && (
            <View style={styles.dataContainer}>
              <Text
                style={styles.data}
                onPress={() => {
                  handleAdjustCPF();
                }}>
                CPF selecionado: {CPF}
              </Text>
            </View>
          )}
        </View>
        {(name.length > 1 || CPF.length > 1) && (
          <TouchableOpacity
            onPress={() => {
              wipeData();
            }}>
            <Text style={styles.clear}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>
      <Modal visible={modalBlocksVis} transparent={true}>
        <View style={styles.modalBlocks}>
          <View style={{marginRight: '5%', alignItems: 'flex-end'}}>
            <Text
              style={{fontSize: 20}}
              onPress={() => {
                setModalBlocksVis(false);
              }}>
              X
            </Text>
          </View>

          {/* {objeto.map((item, index) => {
            return (
              <Text style={styles.label} key={index}>
                Bloco{index}={item}
              </Text>
            );
          })} */}
          <Text style={styles.label}> Número de blocos= {blocksAmount}</Text>

          <Text style={styles.label}>
            Selecione o campo que contém o{' '}
            {isThereSurname ? <Text> sobrenome</Text> : <Text> nome</Text>}{' '}
            desejado:
          </Text>

          {/* <ScrollView style={{height: 550}}> */}
          <FlatList
            renderItem={({item}) => renderBloco(item)}
            data={blocks}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={true}
          />
          {/* </ScrollView> */}
        </View>
      </Modal>
      <Modal visible={modalInfoAdjust} transparent={true}>
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
                setModalInfoAdjust(false);
                setNameAdjust(false);
                setCPFAdjust(false);
              }}>
              X
            </Text>
          </View>
          <Text style={styles.infoAdjHeader}>
            {' '}
            Ajuste o {nameAdjust ? <Text>nome</Text> : <Text>CPF</Text>}{' '}
            conforme o documento:
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
                setModalInfoAdjust(false);
                setNameAdjust(false);
                setCPFAdjust(false);
              }}>
              <Text style={styles.adjustButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={modalSurname && !surname} transparent={true}>
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
                setModalSurname(false);
                setModalBlocksVis(true);
                setIsThereSurname(true);
              }}>
              <Text style={styles.buttonText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.surnameButtons}
              onPress={() => {
                setModalSurname(false);
              }}>
              <Text style={styles.buttonText}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

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
});

export default App;
