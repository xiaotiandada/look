import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react';
import { Pressable } from 'react-native';
import { ScrollView, Box, Button, Image, Flex, FlatList, Fab, useToast } from 'native-base';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { fetchCosplayAPI } from '../helpers/index'
import * as WebBrowser from 'expo-web-browser';

export default function Bookmark({ navigation }: RootTabScreenProps<'Home'>) {

  const typeList = useMemo(() => {
    return [
      {
        title: '3650000随机API',
        url: 'https://3650000.xyz',
        item: [
          {
            name: '微博',
            mode: 1,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: 'Instagram',
            mode: 2,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: 'COS',
            mode: 3,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: 'Mtcos',
            mode: 5,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: '美腿',
            mode: 7,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: 'Coser',
            mode: 8,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: '兔玩映画',
            mode: 9,
            color: ['#3cd8cc', '#46dfbc']
          },
          {
            name: '随机',
            mode: 66,
            color: ['#3cd8cc', '#46dfbc']
          }
        ]
      }
    ]
  }, [])

  const handleTitlePressable = (url: string) => {
    WebBrowser.openBrowserAsync(url)
  }

  return (
    <StyledWrapper>
      <ScrollView
        _contentContainerStyle={{
          px: "0",
          mb: "10px",
          mt: "10px",
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {
          typeList.map((i, idx) => (
            <Fragment key={idx}>
              <StyledTitle>
                <Pressable onPress={() => handleTitlePressable(i.url)}>
                  <StyledTitleText>{i.title}</StyledTitleText>
                </Pressable>
              </StyledTitle>
              {
                i.item.map((j, idxJ) => (
                  <StyledItem key={idxJ} colors={j.color}>
                    <StyledItemText>{j.name}</StyledItemText>
                  </StyledItem>
                ))
              }
            </Fragment>
          ))
        }
      </ScrollView>
    </StyledWrapper>
  );
}


const StyledWrapper = styled(View)`
  flex: 1;
`;

const StyledItem = styled(LinearGradient)`
  width: 23%;
  height: 80px;
  border-radius: 10px;
  margin: 0 1% 10px 1%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledItemText = styled(Text)`
  color: #fff;
  font-size: 16px;
`

const StyledTitle = styled(View)`
  width: 100%;
  margin: 10px 1% 10px;
`
const StyledTitleText = styled(Text)`
  font-size: 16px;
  font-weight: 500;
`
