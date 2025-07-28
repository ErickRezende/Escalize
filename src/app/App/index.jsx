import { View, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createNavigationContainerRef } from '@react-navigation/native';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Musics from '../Musics';
import Home from '../Home';
import Signup from '../Signup';
import Login from '../Login';

const Stack = createNativeStackNavigator();
const navigationRef = createNavigationContainerRef();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={styles.safeArea}>
        <MainNavigator />
      </SafeAreaView>
    </AuthProvider>
  );
}

function MainNavigator() {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#005231" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={token ? 'Home' : 'Login'}>
            {token ? (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Musics" component={Musics} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      <Footer navigation={navigationRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8ff'
  },
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
