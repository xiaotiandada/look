import React, { useCallback, useMemo, useState, useRef, Fragment } from 'react';
import {
  StyleSheet, Button as ButtonNative, Image as ImageNative,
  Modal, Alert, Pressable, TouchableOpacity,
} from 'react-native';
import { Avatar, Box, Spacer, Image, Flex, FlatList, useToast } from 'native-base';
import styled from 'styled-components';
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { storeSet, storeClear, storeRemove } from '../utils/storage'

import { KEY_LOCK_BOOKMARKS } from '../config/index'

interface ItemProps {
  key: string,
  icon: 'github' | 'question' | 'cloud' | 'heart' | 'book' | 'star' | 'info' | 'refresh' | 'heart-o' | 'remove',
  text: string,
  url: string
}

export default function Bookmark({ navigation }: RootTabScreenProps<'User'>) {
  const toast = useToast();

  const ItemData = useMemo((): ItemProps[][] => {
    return [
      [
        {
          key: 'github',
          icon: 'github',
          text: 'Github',
          url: 'https://github.com/xiaotiandada/look',
        },
        {
          key: 'question',
          icon: 'question',
          text: '问题反馈',
          url: 'https://github.com/xiaotiandada/look/issues',
        },
        {
          key: 'info',
          icon: 'info',
          text: '信息',
          url: 'https://github.com/xiaotiandada/xiaotiandada/blob/master/README.md',
        },
        {
          key: 'star',
          icon: 'star',
          text: 'Star',
          url: 'https://github.com/xiaotiandada/look',
        }
      ],
      [
        {
          key: 'book',
          icon: 'book',
          text: 'Blog',
          url: 'https://github.com/xiaotiandada/blog/issues',
        },
        {
          key: 'github',
          icon: 'github',
          text: 'Moyu',
          url: 'https://github.com/xiaotiandada/moyu',
        },
        {
          key: 'github',
          icon: 'github',
          text: 'Issues',
          url: 'https://github.com/xiaotiandada/issues',
        },
        {
          key: 'github',
          icon: 'github',
          text: 'Cui',
          url: 'https://github.com/xiaotiandada/cui',
        },
      ],
      [
        {
          key: 'cloud',
          icon: 'cloud',
          text: '同步数据',
          url: '',
        },
        {
          key: 'remove',
          icon: 'remove',
          text: '清除缓存',
          url: '',
        },
        {
          key: 'heart-o',
          icon: 'heart-o',
          text: '清空关注',
          url: '清空关注',
        },
        {
          key: 'refresh',
          icon: 'refresh',
          text: 'Other',
          url: '',
        }
      ]
    ]
  }, [])

  /**
   * Handle Item Pressable
   * @param item
   */
  const handleItemPressable = (item: ItemProps) => {
    if (item.key === 'cloud') {
      Alert.alert('development')
    } else if (item.key === 'remove') {
      storeClear()
      toast.show({
        description: "success",
        placement: 'top',
        duration: 300
      })
    } else if (item.key === 'heart-o') {
      storeRemove(KEY_LOCK_BOOKMARKS)
      toast.show({
        description: "success",
        placement: 'top',
        duration: 300
      })
    } else if (item.key === 'refresh') {
      Alert.alert('development')
    } else if (item.url) {
      WebBrowser.openBrowserAsync(
        item.url
      )
    }
  }

  return (
    <StyledWrapper>
      <StyledUser alignItems="center" justifyContent="flex-start" direction="row">
        <Avatar
          bg="cyan.500"
          size="md"
          source={{
            uri: "https://avatars.githubusercontent.com/u/24250627?v=4",
          }}
        />
        <StyledUserText>Xiaotian</StyledUserText>
      </StyledUser>
      {
        ItemData.map((i, idx) => (
          <StyledItem
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            borderRadius={10}
            key={idx}>
            {
              i.map((j, idxJ) => (
                <StyledItemPressable onPress={() => handleItemPressable(j)} key={idxJ}>
                  <FontAwesome size={20} name={j.icon} color={'#3cd8cc'} />
                  <StyledItemText>{j.text}</StyledItemText>
                </StyledItemPressable>
              ))
            }
          </StyledItem>
        ))
      }
      <StyledBackground colors={['#3cd8cc', '#46dfbc']} end={{ x: 0, y: 1 }}></StyledBackground>
    </StyledWrapper>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});


const StyledWrapper = styled(View)`
  flex: 1;
  padding: 20px;
  background-color: #fafafa;
  position: relative;
`;

const StyledUser = styled(Flex)`
  padding: 80px 0 20px;
`;
const StyledUserText = styled(Text)`
  color: #fff;
  margin-left: 10px;
  font-size: 20px;
  font-weight: bold;
`;
const StyledItem = styled(Flex)`
  background-color: #fff;
  margin: 20px 0 0 0;
  padding: 20px 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, .04);
`;
const StyledItemPressable = styled(Pressable)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`

const StyledItemText = styled(Text)`
  color: #7a7a7a;
  margin-top: 4px;
  font-size: 14px;
`;

const StyledBackground = styled(LinearGradient)`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: transparent;
  height: 220px;
  z-index: -1;
`;