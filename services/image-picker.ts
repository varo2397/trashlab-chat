import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export const requestPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission Required',
      'Sorry, we need camera roll permissions to make this work!'
    );
    return false;
  }
  return true;
};

export const pickImage = async (options: ImagePicker.ImagePickerOptions = {}) => {
  const hasPermission = await requestPermission();
  if (!hasPermission) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    ...options, // Additional options can be passed in here
  });

  if (!result.canceled) {
    return result.assets[0]; // Return the selected image
  }

  return null;
};

export const takePhoto = async (options: ImagePicker.ImagePickerOptions = {}) => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  if (cameraPermission.status !== 'granted') {
    Alert.alert(
      'Permission Required',
      'Sorry, we need camera permissions to make this work!'
    );
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    quality: 1,
    ...options, // Additional options can be passed in here
  });

  if (!result.canceled) {
    return result.assets[0]; // Return the taken photo
  }

  return null;
};
