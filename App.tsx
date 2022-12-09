import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {SafeAreaView, Text, View, FlatList, ScrollView} from 'react-native';
import TextRecognition from 'react-native-text-recognition';
import ImageCropPicker from 'react-native-image-crop-picker';

import {ModalInfoAdjust} from './src/Modals/ModalInfoAdjust';
import {ModalSurname} from './src/Modals/ModalSurname';

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
  const [OCRLoading, setOCRLoading] = useState<boolean>(false);

  const takePhotoFromCamera = () => {
    setModalSurname(false);
    setName('');
    setSurname('');
    setIsThereSurname(false);
    setCPF('');
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(async image => {
      setOCRLoading(true);
      const result = await TextRecognition.recognize(image.path);
      setOCRLoading(false);
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

  const closeAdjustsModal = () => {
    setModalInfoAdjust(false);
    setNameAdjust(false);
    setCPFAdjust(false);
  };

  const handleAddSurname = () => {
    setModalBlocksVis(true);
    setIsThereSurname(true);
  };

  const handleCloseSurnameModal = () => {
    setModalSurname(false);
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
    let cleanName = name.replace(/NOME|cNOME|c-NOME|c NOME|CNOM/g, '');
    setName(cleanName);
  }, [name]);

  useEffect(() => {
    setName(name.concat(' ', surname));
  }, [surname]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <TouchableOpacity
          style={styles.camButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.header}>OCRCamera</Text>
        </TouchableOpacity>
        <View>
          {name.length > 1 && (
            <View style={styles.dataContainer}>
              <Text
                style={styles.data}
                onPress={() => {
                  handleAdjustName();
                }}>
                Nome selecionado: {name}
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
      {modalBlocksVis && (
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
      )}
      <ModalInfoAdjust
        visible={modalInfoAdjust}
        handleModalVisibility={closeAdjustsModal}
        setCPF={setCPF}
        setName={setName}
        nameAdjust={nameAdjust}
        CPFAdjust={CPFAdjust}
        name={name}
        CPF={CPF}
      />
      <ModalSurname
        visible={modalSurname && !surname}
        handleModalVisibility={handleCloseSurnameModal}
        handleSurnameConfirmation={handleAddSurname}
      />
      {OCRLoading && (
        <ActivityIndicator
          size="large"
          color="#36c0f7"
          style={styles.activityIndicator}></ActivityIndicator>
      )}
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
    display: 'flex',
    height: '100%',
  },
  activityIndicator: {
    position: 'absolute',
    marginTop: '70%',
    zIndex: 1,
    alignSelf: 'center',
  },
});

export default App;
