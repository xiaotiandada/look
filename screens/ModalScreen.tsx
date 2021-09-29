import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Link, Center } from "native-base"

import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>welcome</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View>
        <Text>
          <FontAwesome size={20} name="heart" />
          {' '}欢迎体验，欢迎 Star，欢迎 PR。{' '}
          <FontAwesome size={20} name="heart" />
        </Text>
        <Center mt={4}>
          <Link href="https://github.com/xiaotiandada/look">
            Click here to open repo.
          </Link>
        </Center>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
