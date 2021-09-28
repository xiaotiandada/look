import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {} from 'react-native';
import { ScrollView, Box, Button, Image, Flex, FlatList, Fab, useToast } from 'native-base';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { fetchCosplayAPI } from '../helpers/index'

export default function Bookmark({ navigation }: RootTabScreenProps<'Home'>) {

  const typeList = useMemo(() => {
    return [
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
  }, [])

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
          <StyledItem key={idx} colors={i.color}>
            <StyledItemText>{ i.name }</StyledItemText>
          </StyledItem>
        ))
      }
      </ScrollView>
    </StyledWrapper>
  );
}


const StyledWrapper= styled(View)`
  flex: 1;
`;

const StyledItem= styled(LinearGradient)`
  width: 23%;
  height: 80px;
  border-radius: 10px;
  margin: 0 1% 10px 1%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledItemText= styled(Text)`
  color: #fff;
  font-size: 16px;
`