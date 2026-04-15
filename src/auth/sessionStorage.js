import AsyncStorage from "@react-native-community/async-storage";

export const storage = {
  getString: async (key) => AsyncStorage.getItem(key),
  getJSON: async (key) => {
    const value = await AsyncStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      return null;
    }
  },
  setString: async (key, value) => AsyncStorage.setItem(key, String(value)),
  setJSON: async (key, value) =>
    AsyncStorage.setItem(key, JSON.stringify(value)),
  multiSet: async (entries) => AsyncStorage.multiSet(entries),
  multiRemove: async (keys) => AsyncStorage.multiRemove(keys),
  remove: async (key) => AsyncStorage.removeItem(key),
};

export default storage;
