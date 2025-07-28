import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';

import { useAuth } from '@/contexts/AuthContext';

export default function Login({ navigation }) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  async function handleLogin() {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      login(response.data.token);

      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Ionicons name="person-circle-outline" size={80} color="#005231" style={{ marginBottom: 16 }} />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.link}>Ainda não tenho conta</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f1e9',
    padding: 16,
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    maxWidth: 380,
    alignItems: 'center',
    elevation: 5,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: '#f4f4f4',
  },
  button: {
    marginTop: 16,
    backgroundColor: '#005231',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    marginTop: 12,
    color: '#005231',
    textDecorationLine: 'underline'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 10
  },
  checkboxLabel: {
    marginLeft: 8,
    color: '#005231'
  },
  label: {
    alignSelf: 'flex-start',
    marginTop: 10,
    fontWeight: 'bold',
    color: '#005231'
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
    justifyContent: 'flex-start'
  },
  roleOption: {
    borderColor: '#005231',
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    margin: 4,
  },
  roleSelected: {
    backgroundColor: '#005231',
  },
  error: {
    marginTop: 10,
    color: 'red'
  }
};
