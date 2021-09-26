import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Button as ButtonNative, Image as ImageNative, Modal, Alert, Pressable, TouchableOpacity, RefreshControl } from 'react-native';
import { ScrollView, Box, Button, Image, Flex, FlatList } from 'native-base';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { fetchCosplayAPI } from '../helpers/index'
import { ImageDataState } from '../typings';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [imageData, setImageData] = useState<ImageDataState[]>([] as ImageDataState[]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(
    async () => {
    setRefreshing(true);
    await fetchCosplay()
    setRefreshing(false)
  }, []);

  /**
   * fetch cosplay
   */
  const fetchCosplay = useCallback(
    async () => {
      const data = await fetchCosplayAPI()
      if (data) {
        const list = data.map(i => ({ url: i }))
        setImageData(list)
      }
  }, [imageData])

  useEffect(() => {
    fetchCosplay()
    return () => {
      setImageData([])
    }
  }, [])

  /**
   * 处理图片点击预览
   */
  const handleImageShow = useCallback((idx: number) => {
    setModalImageIndex(idx)
    setModalVisible(true)
  }, [ modalVisible, modalImageIndex])

  return (
    <View style={styles.container}>
      <ScrollView
        _contentContainerStyle={{
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
      >
        <Flex
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {
            imageData.map((i, idx) => (
              <Pressable
                key={`key${idx}-${i.url}`}
                style={styles.item}
                onPress={() => handleImageShow(idx)}
              >
                <Image
                  source={{
                    uri: i.url,
                  }}
                  alt="Alternate Text"
                  width="100%"
                  height="300px"
                />
              </Pressable>
            ))
          }
        </Flex>
      </ScrollView>
      <Modal visible={modalVisible} transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}>
        <ImageViewer imageUrls={imageData} onClick={() => setModalVisible(false)} index={modalImageIndex} />
      </Modal>
    </View>
  );
}

{/* <Text style={styles.title}>Hello 123 312 111</Text>
        <Box>Hello world</Box>
        <Button onPress={() => console.log("hello world")}>Primary</Button>
        <ButtonNative onPress={() => console.log("hello world")} title="Primary ButtonNative"></ButtonNative>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    width: '49%',
    height: 300,
    marginBottom: 8,
    backgroundColor: "#DDDDDD"
  }
});
