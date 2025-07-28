import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

export default function Footer({ navigation }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.navigate('Home') }}>
        <Ionicons name="home" size={32} color={"#f2f6ff"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton} onPress={() => { navigation.navigate('Musics') }}>
        <Ionicons name="musical-notes" size={32} color={"#f2f6ff"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="settings" size={32} color={"#f2f6ff"} />
      </TouchableOpacity>
    </View>
  )
}