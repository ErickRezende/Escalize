import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '@/lib/api';

const rolesOptions = [
  'vocal', 'guitar', 'electricGuitar', 'bass', 'drum', 'booth'/*, 'keyboard'*/
]

const rolesNames = {
  vocal: "Vocal",
  guitar: "Violão",
  electricGuitar: "Guitarra",
  bass: "Baixo",
  drum: "Bateria", 
  keyboard: "Teclado",
  booth: "Cabine"
}

export default function Signup({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [admin, setAdmin] = useState(false);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  function toggleRole(role) {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  }

  async function handleSignup() {
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('/auth/signup', {
        name,
        email,
        password,
        admin,
        roles,
      });

      await AsyncStorage.setItem('token', response.data.token);
      navigation.replace('Home');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao cadastrar.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Ionicons name="person-circle-outline" size={80} color="#005231" style={{ marginBottom: 16 }} />
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
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
        <TextInput
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <View style={styles.checkboxContainer}>
          <Checkbox value={admin} onValueChange={setAdmin} color={admin ? '#005231' : undefined} />
          <Text style={styles.checkboxLabel}>Sou da liderança da equipe</Text>
        </View>

        <Text style={styles.label}>Funções:</Text>
        <View style={styles.rolesContainer}>
          {rolesOptions.map(role => (
            <TouchableOpacity
              key={role}
              style={[styles.roleOption, roles.includes(role) && styles.roleSelected]}
              onPress={() => toggleRole(role)}
            >
              <Text style={{ color: roles.includes(role) ? '#fff' : '#005231' }}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tenho conta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
