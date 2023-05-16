import AsyncStorage from '@react-native-async-storage/async-storage';


export const storeUserToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log(error);
  }
};

export const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log(error);
  }
}

export const storeUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.log(error);
  }
}

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.log(error);
  }
}