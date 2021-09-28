import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  StyleSheet, Button as ButtonNative, Image as ImageNative,
  Modal, Alert, Pressable, TouchableOpacity,
  RefreshControl, ActivityIndicator, NativeSyntheticEvent,
  NativeScrollEvent, ActionSheetIOS, TouchableWithoutFeedback,
  Dimensions, Platform
} from 'react-native';
import { ScrollView, Box, Button, Image, Flex, FlatList, Fab, useToast } from 'native-base';
import styled from 'styled-components';
import { FontAwesome } from "@expo/vector-icons";
import { useThrottleFn } from 'ahooks';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps, RootStackScreenProps } from '../types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { fetchCosplayAPI, fetchRandomAPI } from '../helpers/index'
import { ImageDataState } from '../typings';
import { storeSet, storeGet, storeRemove } from '../utils/storage'
import { isEmpty, uniqBy } from 'lodash';
import useSaveImage from '../hooks/useSaveImage'
import ViewImageFooter from '../components/ViewImageFooter'
import { KEY_LOCK_BOOKMARKS, FailImageUrl } from '../config/index'
import { sleep } from '../utils/index'

const { width, height, scale } = Dimensions.get('window');
import { TypeList } from '../config/index'

export default function DetailScreen({ navigation, route }: RootStackScreenProps<'Detail'>) {
  // TDDO:
  const { mode }: any = route.params;

  useEffect(() => {
    // TDDO:
    const list = TypeList[0].item.filter(i => i.mode === mode)
    console.log('list', list)

    if (!isEmpty(list)) {
      navigation.setOptions({
        title: list[0].name
      })
    }

  }, [mode])


  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [imageData, setImageData] = useState<ImageDataState[]>([] as ImageDataState[]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // TODO: type fix
  const refFlatList = useRef<any>(null);
  const [visibleBackTop, setVisibleBackTop] = useState<boolean>(false)
  const toast = useToast();

  // refresh
  const onRefresh = useCallback(
    async () => {
      setRefreshing(true);
      setImageData([])
      await fetchRandom()
      setRefreshing(false)
    }, []);

  /**
   * fetch cosplay
   */
  const fetchRandom = useCallback(
    async () => {
      let list = []
      for (let i = 0; i < 6; i++) {
        await sleep(300)
        const data = await fetchRandomAPI({ mode })
        if (data) {
          list.push({ url: data })
        }
      }
      setImageData(list)
    }, [imageData, mode])

  const fetchRandomMore = useCallback(
    async () => {
      let list = []
      for (let i = 0; i < 6; i++) {
        await sleep(300)
        const data = await fetchRandomAPI({ mode })
        if (data) {
          list.push({ url: data })
        }
      }
      setImageData(imageData.concat(list))
    }, [imageData])

  useEffect(() => {
    fetchRandom()
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
  }, [modalVisible, modalImageIndex])

  // more load components
  const RenderLoadMoreView = () => {
    return <View style={styles.loadMore}>
      <ActivityIndicator
        style={styles.indicator}
        size={"small"}
        animating={true}
      />
      <Text>Loading...</Text>
    </View>
  }


  /**
   * throttle set visible backTop
   */
  const { run: handleVisibleBackTop } = useThrottleFn(
    (value: boolean) => {
      setVisibleBackTop(value);
    },
    { wait: 300 },
  );

  /**
   * 处理滚垱显示返回顶部功能
   */
  const handleScroll = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = e.nativeEvent.contentOffset
    if (y >= 100) {
      handleVisibleBackTop(true)
    } else {
      handleVisibleBackTop(false)
    }
  }, [])

  // go top
  const goToTop = useCallback(() => {
    refFlatList.current.scrollToOffset({ offset: 0 });
  }, [refFlatList])


  return (
    <View style={styles.container}>
      <FlatList
        ref={refFlatList}
        numColumns={2}
        data={imageData}
        keyExtractor={(item, index) => `key${index}-${item.url}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={() => RenderLoadMoreView()}
        onEndReached={() => fetchRandomMore()}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <StyledPressable
            style={{
              marginRight: index % 2 === 0 ? 5 : 0,
              marginLeft: index % 2 !== 0 ? 5 : 0,
              marginBottom: 10
            }}
            onPress={() => handleImageShow(index)}
          >
            <Image
              source={{
                uri: item.url,
              }}
              alt="Alternate Text"
              width="100%"
              height="300px"
              fallbackSource={{
                uri: FailImageUrl
              }}
            />
          </StyledPressable>
        )} />

      <Modal visible={modalVisible} transparent={true}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(false);
        }}>
        <ImageViewer
          imageUrls={imageData}
          onClick={() => setModalVisible(false)}
          index={modalImageIndex}
          failImageSource={{ url: FailImageUrl }}
          onSave={(url) => { console.log('rul', url) }}
          onChange={(index?: number): void => { index && handleImageShow(index) }}
          renderFooter={() => <ViewImageFooter imageData={imageData} currentIndex={modalImageIndex} />}
        />
      </Modal>

      {
        visibleBackTop
          ? <Fab
            position="absolute"
            size="sm"
            right={'20px'}
            bottom={'100px'}
            onPress={goToTop}
            colorScheme="indigo"
            icon={
              <FontAwesome size={24} name="arrow-up" color={'#fff'} />
            }
          />
          : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%'
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
  loadMore: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
  },
  indicator: {
    color: "#f1f1f1",
    margin: 10
  }
});

const StyledPressable = styled(Pressable)`
  width: 50%;
  height: 300px;
  background-color: #7a7a7a;
`;

const StyledViewFooterWrapper = styled(Flex)`
  background-color: rgba(255, 255, 255, .1);
  margin-bottom: 40px;
`;
const StyledViewFooterItem = styled(Flex)`
  width: 60px;
  height: 60px;
  margin: 0 20px;
  padding: 10px 0;
`;
