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
import { useFocusEffect } from '@react-navigation/native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { fetchCosplayAPI } from '../helpers/index'
import { ImageDataState } from '../typings';
import { storeSet, storeGet, storeRemove } from '../utils/storage'
import { isEmpty, uniqBy } from 'lodash';
import ViewImageFooter from '../components/ViewImageFooter'
import { KEY_LOCK_BOOKMARKS, FailImageUrl } from '../config/index'

export default function Bookmark({ navigation }: RootTabScreenProps<'Bookmark'>) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [imageData, setImageData] = useState<ImageDataState[]>([] as ImageDataState[]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // TODO: type fix
  const refFlatList = useRef<any>(null);
  const [visibleBackTop, setVisibleBackTop] = useState<boolean>(false)
  const toast = useToast();

  useFocusEffect(
    useCallback(() => {
      const fetch = () => fetchBookmarks()
      fetch()
    }, [])
  );

  // refresh
  const onRefresh = useCallback(
    async () => {
      setRefreshing(true);
      await fetchBookmarks()
      setRefreshing(false)
    }, []);

  /**
   * fetch cosplay
   */
  const fetchBookmarks = useCallback(
    async () => {
      const res = await storeGet(KEY_LOCK_BOOKMARKS)
      const data: ImageDataState[] = res ? JSON.parse(res) : []
      setImageData(data.reverse())
    }, [imageData])

  useEffect(() => {
    fetchBookmarks()
    return () => {
      setImageData([])
    }
  }, [])

  /**
   * ????????????????????????
   */
  const handleImageShow = useCallback((idx: number) => {
    setModalImageIndex(idx)
    setModalVisible(true)
  }, [modalVisible, modalImageIndex])

  // more load components
  const RenderLoadMoreView = () => {
    return <View style={styles.loadMore}>
      <Text>Not</Text>
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
   * ????????????????????????????????????
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
