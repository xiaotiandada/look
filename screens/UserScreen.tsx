import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  StyleSheet, Button as ButtonNative, Image as ImageNative,
  Modal, Alert, Pressable, TouchableOpacity,
  RefreshControl, ActivityIndicator, NativeSyntheticEvent,
  NativeScrollEvent, ActionSheetIOS, TouchableWithoutFeedback,
  Dimensions, Platform
} from 'react-native';
import { Avatar, Box, Spacer, Image, Flex, FlatList, Center, useToast } from 'native-base';
import styled from 'styled-components';
import { FontAwesome } from "@expo/vector-icons";
import { useThrottleFn } from 'ahooks';
import { LinearGradient } from 'expo-linear-gradient';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ImageViewer from 'react-native-image-zoom-viewer';
import { fetchCosplayAPI } from '../helpers/index'
import { ImageDataState } from '../typings';
import { storeSet, storeGet, storeRemove } from '../utils/storage'
import { isEmpty, uniqBy } from 'lodash';
import useSaveImage from '../hooks/useSaveImage'
import ViewImageFooter from '../components/ViewImageFooter'

const FailImageUrl = "http://whhlyt.hunan.gov.cn/whhlyt/xhtml/img/pc-icon_none.png"
const { width, height, scale } = Dimensions.get('window');
const KEY_LOCK_BOOKMARKS = 'LOCK_BOOKMARKS'

export default function Bookmark({ navigation }: RootTabScreenProps<'Home'>) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [imageData, setImageData] = useState<ImageDataState[]>([] as ImageDataState[]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  // TODO: type fix
  const refFlatList = useRef<any>(null);
  const [visibleBackTop, setVisibleBackTop] = useState<boolean>(false)
  const toast = useToast();

  return (
    <StyledWrapper>
      <StyledUser alignItems="center" justifyContent="flex-start" direction="row">
        <Avatar
          bg="cyan.500"
          source={{
            uri: "https://avatars.githubusercontent.com/u/24250627?v=4",
          }}
        />
        <StyledUserText>Xiaotian</StyledUserText>
      </StyledUser>
      {
        [1, 1, 1, 1].map((i, idx) => (
          <StyledItem direction="row" alignItems="center" justifyContent="space-between" key={idx} borderRadius={10} >
            <Center flex="1">
              <FontAwesome size={20} name="github" color={'#3cd8cc'} />
              <StyledItemText>Github</StyledItemText>
            </Center>
            <Center flex="1">
              <FontAwesome size={20} name="question" color={'#3cd8cc'} />
              <StyledItemText>问题反馈</StyledItemText>
            </Center>
            <Center flex="1">
              <FontAwesome size={20} name="cloud" color={'#3cd8cc'} />
              <StyledItemText>同步数据</StyledItemText>
            </Center>
            <Center flex="1">
              <FontAwesome size={20} name="heart" color={'#3cd8cc'} />
              <StyledItemText>喜欢项目</StyledItemText>
            </Center>
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
  background-color: #f0ecf3;
  position: relative;
`;

const StyledUser = styled(Flex)`
  padding: 20px 0;
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
  height: 160px;
  z-index: -1;
`;