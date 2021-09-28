import React, { useCallback, useEffect, useState, useMemo, Fragment } from 'react';
import { Pressable } from 'react-native';
import { ScrollView, Box, Button, Image, Flex, FlatList, Fab, useToast } from 'native-base';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps, DetailProps } from '../types';
import { fetchCosplayAPI } from '../helpers/index'
import * as WebBrowser from 'expo-web-browser';
import { TypeList } from '../config/index'

export default function Bookmark({ navigation }: RootTabScreenProps<'Type'>) {

  const handleTitlePressable = (url: string) => {
    WebBrowser.openBrowserAsync(url)
  }

  const handleNavigation = ( params: DetailProps ) => {
    navigation.navigate('Detail', params)
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
          TypeList.map((i, idx) => (
            <Fragment key={idx}>
              <StyledTitle>
                <Pressable onPress={() => handleTitlePressable(i.url)}>
                  <StyledTitleText>{i.title}</StyledTitleText>
                </Pressable>
              </StyledTitle>
              {
                i.item.map((j, idxJ) => (
                  <StyledItem onPress={() => handleNavigation( {
                    key: i.key,
                    title: j?.name || 'Detail',
                    mode: j?.mode,
                    url: j?.url
                  } )} key={idxJ}>
                    <StyledItemContent colors={j.color}>
                      <StyledItemText>{j.name}</StyledItemText>
                    </StyledItemContent>
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

const StyledItem = styled(Pressable)`
  width: 23%;
  height: 80px;
  margin: 0 1% 10px 1%;
`
const StyledItemContent = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
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
