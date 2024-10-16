import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItemAsyncStorage = async <T>(key: string, value: T) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data to AsyncStorage: ${error}`);
  }
}

export const getItemAsyncStorage = async <T>(key: string): Promise<Awaited<T> | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error fetching data from AsyncStorage: ${error}`);
    return null;
  }
}

export const removeItemAsyncStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data from AsyncStorage: ${error}`);
  }
}

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(`Error clearing AsyncStorage: ${error}`);
  }
}
