import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function logout(navigation) {
    await AsyncStorage.removeItem('token');
    navigation.replace('Login');
}