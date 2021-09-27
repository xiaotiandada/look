import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  StyleSheet, Button as ButtonNative, Image as ImageNative,
  Modal, Alert, Pressable, ActionSheetIOS,
  Dimensions, Platform
} from 'react-native';
import useSaveImage from '../hooks/useSaveImage'
import { FontAwesome } from "@expo/vector-icons";
import { ScrollView, Box, Button, Image, Flex, FlatList, Fab, useToast } from 'native-base';
import { isEmpty, uniqBy } from 'lodash';

import { Text, View } from './Themed';
import { storeSet, storeGet, storeRemove } from '../utils/storage'
import { ImageDataState } from '../typings';

const { width, height, scale } = Dimensions.get('window');
const KEY_LOCK_BOOKMARKS = 'LOCK_BOOKMARKS'

interface Props {
  imageData: ImageDataState[],
  currentIndex: number
}

/**
 * View Image Footer Component
 * @param currentIndex
 * @returns
 */
const ViewImageFooter: React.FC<Props> = ({ imageData, currentIndex }) => {
  const { handleDownload } = useSaveImage();

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


  /**
   * Handle bookmark
   *
   */
  // TODO：upgrade
  const handleBookmark = useCallback(
    async (val: ImageDataState) => {
      const _value = { url: val.url }

      const res = await storeGet(KEY_LOCK_BOOKMARKS)
      let data = res ? JSON.parse(res) : []
      console.log('data', data)

      if (isEmpty(data)) {
        await storeSet(KEY_LOCK_BOOKMARKS, JSON.stringify([_value]))
        Alert.alert('Success')
      } else {
        // storeRemove(KEY_LOCK_BOOKMARKS)

        data.push(_value)
        await storeSet(KEY_LOCK_BOOKMARKS, JSON.stringify(data))
        Alert.alert('Success')
      }
    }, [])

  return (
    <StyledViewFooterWrapper style={{ width: width, height: 60 }} direction="row" alignItems="center" justifyContent="center">
      <Pressable onPress={() => handleDownload(imageData[currentIndex].url)}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="download" color={'#fff'} />
          <Text style={{ color: '#fff', marginTop: 4 }}>{currentIndex}下载</Text>
        </StyledViewFooterItem>
      </Pressable>
      <Pressable onPress={() => handleBookmark(imageData[currentIndex])}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="heart" color={'#fff'} />
          {/* <FontAwesome size={16} name="heart-o" color={'#fff'} /> */}
          <Text style={{ color: '#fff', marginTop: 4 }}>喜欢</Text>
        </StyledViewFooterItem>
      </Pressable>
      <Pressable onPress={handleShare}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="share" color={'#fff'} />
          <Text style={{ color: '#fff', marginTop: 4 }}>分享</Text>
        </StyledViewFooterItem>
      </Pressable>
    </StyledViewFooterWrapper>
  )
}

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


export default ViewImageFooter