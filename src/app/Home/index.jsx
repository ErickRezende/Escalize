import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './style';
import AdminOnly from '@/components/wrappers/AdminOnly/AdminOnly';

import LineUp from '@/components/LineUp';
import getLineUp from '@/actions/lineup/get';

export default function Home({ navigation }) {
  const [lineups, setLineups] = useState([]);

  useEffect(() => {
    async function fetchLineups() {
      try {
        const response = await getLineUp();
        setLineups(response);
      } catch (error) {
        console.error('Erro ao buscar lineups:', error);
        setLineups([]);
      }
    }

    fetchLineups();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={lineups}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16 }}>
            <LineUp data={item} />
          </View>
        )}
        ListFooterComponent={
          <AdminOnly>
            <View style={{ alignItems: 'center', marginTop: 16, marginBottom: 32 }}>
              <TouchableOpacity style={styles.fabButton} onPress={() => { console.log(lineups) }} >
                <Text style={styles.fabText}>+</Text>
              </TouchableOpacity>
            </View>
          </AdminOnly>
        }
      />
    </View>

  );
}
