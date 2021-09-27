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
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { fetchCosplayAPI } from '../helpers/index'
import { ImageDataState } from '../typings';

const FailImageUrl = "http://whhlyt.hunan.gov.cn/whhlyt/xhtml/img/pc-icon_none.png"
const {width, height, scale} = Dimensions.get('window');

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
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

  const fetchCosplayMore = useCallback(
    async () => {
      const data = await fetchCosplayAPI()
      if (data) {
        const list = data.map(i => ({ url: i }))
        setImageData(imageData.concat(list))
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
   * View Image Footer Component
   * @param currentIndex
   * @returns
   */
  const ViewImageFooter = (currentIndex: number) => {
    return (
      <StyledViewFooterWrapper style={{ width: width, height: 60 }} direction="row" alignItems="center" justifyContent="center">
        <Pressable onPress={() => handleDownload(imageData[currentIndex].url)}>
          <StyledViewFooterItem alignItems="center" justifyContent="center">
            <FontAwesome size={16} name="download" color={'#fff'} />
            <Text style={{ color: '#fff', marginTop: 4 }}>{currentIndex}下载</Text>
          </StyledViewFooterItem>
        </Pressable>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="heart" color={'#fff'} />
          {/* <FontAwesome size={16} name="heart-o" color={'#fff'} /> */}
          <Text style={{ color: '#fff', marginTop: 4 }}>喜欢</Text>
        </StyledViewFooterItem>
        <Pressable onPress={handleShare}>
          <StyledViewFooterItem alignItems="center" justifyContent="center">
            <FontAwesome size={16} name="share" color={'#fff'} />
            <Text style={{ color: '#fff', marginTop: 4 }}>分享</Text>
          </StyledViewFooterItem>
        </Pressable>
      </StyledViewFooterWrapper>
    )
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

  /**
   * handle view image share
   */
  const handleShare = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Generate", "Reset"],
        destructiveButtonIndex: 2,
        cancelButtonIndex: 0,
        // userInterfaceStyle: 'dark'
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // cancel action
        } else if (buttonIndex === 1) {
          Alert.alert('Generate')
        } else if (buttonIndex === 2) {
          Alert.alert('Reset')
        }
      }
    );
  }, [])

  // go top
  const goToTop = useCallback(() => {
    refFlatList.current.scrollToOffset({ offset: 0 });
  }, [refFlatList])

  /**
   * Handle View Image Download
   */
  const handleDownload = useCallback(
    async (url: string) => {
      // permissionsResult Object {
      //   "accessPrivileges": "none",
      //   "canAskAgain": true,
      //   "expires": "never",
      //   "granted": false,
      //   "status": "undetermined",
      // }
      // permissionsResult Object {
      //   "accessPrivileges": "all",
      //   "canAskAgain": true,
      //   "expires": "never",
      //   "granted": true,
      //   "status": "granted",
      // }
      // permissionsResult Object {
      //   "accessPrivileges": "none",
      //   "canAskAgain": false,
      //   "expires": "never",
      //   "granted": false,
      //   "status": "denied",
      // }

      // TODO: need Test
      // const permissionsResult = await MediaLibrary.getPermissionsAsync()
      // console.log('permissionsResult', permissionsResult)

      // Get permission
      // if (permissionsResult.accessPrivileges === 'none' && !permissionsResult.granted) {

      //   if (permissionsResult.canAskAgain) {
      //     await MediaLibrary.requestPermissionsAsync()
      //   } else {
      //     await MediaLibrary.presentPermissionsPickerAsync()
      //   }

      //   const _permissionsResult = await MediaLibrary.getPermissionsAsync()
      //   if (_permissionsResult.accessPrivileges === 'none' && !permissionsResult.granted) {
      //     return
      //   }
      // }

      // libraryPermissionResult Object {
      //   "accessPrivileges": "none",
      //   "canAskAgain": false,
      //   "expires": "never",
      //   "granted": false,
      //   "status": "denied",
      // }

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          // Alert.alert('Sorry, we need media library permissions to make this work!');
          // return
        }
      } else {
        console.log('no support web')
        return
      }

      const libraryPermissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()
      console.log('libraryPermissionResult', libraryPermissionResult)
      // ImagePicker.requestMediaLibraryPermissionsAsync(writeOnly)

      // Get permission
      if (libraryPermissionResult.accessPrivileges === 'none' && libraryPermissionResult.status !== 'granted') {
        await ImagePicker.requestMediaLibraryPermissionsAsync(true)

        const _libraryPermissionResult = await ImagePicker.getMediaLibraryPermissionsAsync()
        console.log('_libraryPermissionResult', _libraryPermissionResult)

        if (_libraryPermissionResult.accessPrivileges === 'none' && _libraryPermissionResult.status !== 'granted') {
          return
        }
      }

      // Save
      try {
        await MediaLibrary.saveToLibraryAsync(encodeURI(url))
        // TODO: no show （maybe is z-index ???)
        // toast.show({
        //   description: "Saved successfully",
        //   placement: "top",
        //   status: 'success'
        // })
        Alert.alert('Saved successfully')

      } catch (error) {
        console.log('error', error)
        Alert.alert('Save failed')
      }
    }, [])

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
        onEndReached={() => fetchCosplayMore()}
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
          renderFooter={ViewImageFooter}
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
  background-color: #f1f1f1;
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
