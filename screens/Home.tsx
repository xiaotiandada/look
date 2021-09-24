import * as React from 'react';
import { StyleSheet, Button as ButtonNative, Image as ImageNative } from 'react-native';
import { ScrollView, Box, Button, Image, Flex } from 'native-base';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const data = [
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  },
  {
    url: "https://www.lamaying.com/uploads/allimg/20210225/LMY064101281.jpg"
  }
]

export default function TabOneScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <ScrollView
        _contentContainerStyle={{
        }}
      >
        <Flex
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
        >
          {
            data.map((i, idx) => (
              <Image
                key={idx}
                source={{
                  uri: i.url,
                }}
                alt="Alternate Text"
                width="49%"
                height="300"
                marginBottom="8px"
              />
            ))
          }
        </Flex>
        {/* <Text style={styles.title}>Hello 123 312 111</Text>
        <Box>Hello world</Box>
        <Button onPress={() => console.log("hello world")}>Primary</Button>
        <ButtonNative onPress={() => console.log("hello world")} title="Primary ButtonNative"></ButtonNative>
        <Text style={styles.title}>Tab One</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
