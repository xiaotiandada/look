import React, { useCallback, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  StyleSheet, Button as ButtonNative, Image as ImageNative,
  Modal, Alert, Pressable, ActionSheetIOS,
  Dimensions, Platform, Share
} from 'react-native';
import useSaveImage from '../hooks/useSaveImage'
import { FontAwesome } from "@expo/vector-icons";
import { Flex } from 'native-base';
import { isEmpty, cloneDeep } from 'lodash';

import { Text, View } from './Themed';
import { storeSet, storeGet, storeRemove } from '../utils/storage'
import { ImageDataState, BookmarkState } from '../typings';
import { KEY_LOCK_BOOKMARKS, FailImageUrl } from '../config/index'

const { width, height, scale } = Dimensions.get('window');
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
  const [isBookmark, setIsBookmark] = useState<boolean>(false)

  useEffect(() => {
    fetchIsbookmark()
    // watching currentIndex, imageData
  }, [currentIndex, imageData])

  /**
   * fetch bookmark state
   */
  const fetchIsbookmark = useCallback(async () => {
    const res = await storeGet(KEY_LOCK_BOOKMARKS)
    const data: ImageDataState[] = res ? JSON.parse(res) : []

    if (isEmpty(data)) {
      setIsBookmark(false)
    } else {
      const result = data.find(i => i.url === imageData[currentIndex].url)
      setIsBookmark(!!result)
    }
  }, [ imageData, currentIndex ])

  /**
 * handle view image share
 */
  const handleMore = useCallback(() => {
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
  // TODO???upgrade
  const handleBookmark = useCallback(
    async (val: ImageDataState) => {
      const _value = {
        url: val.url,
        lastTime: Date.now()
      }

      const res = await storeGet(KEY_LOCK_BOOKMARKS)
      let data: BookmarkState[] = res ? JSON.parse(res) : []
      console.log('data', data)

      if (isEmpty(data)) {
        await storeSet(KEY_LOCK_BOOKMARKS, JSON.stringify([_value]))
        Alert.alert('Success')
      } else {
        const idx = data.findIndex(i => i.url === _value.url)
        if (~idx) {
          data.splice(idx, 1)
        } else {
          data.push(_value)
        }

        await storeSet(KEY_LOCK_BOOKMARKS, JSON.stringify(data))
        Alert.alert('Success')
      }

      await fetchIsbookmark()
    }, [])

    /**
     * share
     */
    const handleShare = useCallback(async (url: string) => {
      try {
        const result = await Share.share({
          message: 'Share Image URL',
          url: url
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (e: any) {
        alert(e.message);
      }
    }, [])
  return (
    <StyledViewFooterWrapper style={{ width: width, height: 60 }} direction="row" alignItems="center" justifyContent="center">
      <StyledItemPressable onPress={() => handleDownload(imageData[currentIndex].url)}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="download" color={'#fff'} />
          <Text style={{ color: '#fff', marginTop: 4 }}>??????</Text>
        </StyledViewFooterItem>
      </StyledItemPressable>
      <StyledItemPressable onPress={() => handleBookmark(imageData[currentIndex])}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          {
            isBookmark
            ? <FontAwesome size={16} name="heart-o" color={'#fff'} />
            : <FontAwesome size={16} name="heart" color={'#fff'} />
          }
          <Text style={{ color: '#fff', marginTop: 4 }}>{isBookmark ? '??????' : '??????'} </Text>
        </StyledViewFooterItem>
      </StyledItemPressable>
      <StyledItemPressable onPress={handleMore}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="ellipsis-h" color={'#fff'} />
          <Text style={{ color: '#fff', marginTop: 4 }}>??????</Text>
        </StyledViewFooterItem>
      </StyledItemPressable>
      <StyledItemPressable onPress={() => handleShare(imageData[currentIndex].url)}>
        <StyledViewFooterItem alignItems="center" justifyContent="center">
          <FontAwesome size={16} name="share" color={'#fff'} />
          <Text style={{ color: '#fff', marginTop: 4 }}>??????</Text>
        </StyledViewFooterItem>
      </StyledItemPressable>
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

const StyledItemPressable = styled(Pressable)`
  flex: 1;
`

export default ViewImageFooter