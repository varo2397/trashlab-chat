import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

export const uploadImageToStorage = async (uri: string) => {
  try {
    const fileName = `${uuid.v4()}.jpg`; // Generate a unique file name
    const storageRef = storage().ref(`images/${fileName}`);

    // Convert the URI to a blob
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload the file
    await storageRef.put(blob);

    // Get the download URL
    const downloadURL = await storageRef.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image to storage:', error);
    return null;
  }
};
