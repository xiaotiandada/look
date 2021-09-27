import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Platform, Alert
} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';

export default function useSaveImage() {

  /**
   * Handle View Image Download
   */
  const handleDownload = useCallback(
    async (url: string): Promise<void> => {
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

  return {
    handleDownload
  };
}
