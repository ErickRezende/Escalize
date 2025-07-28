import { createContext, useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function loadToken() {
            const savedToken = await AsyncStorage.getItem('token');
            if (savedToken) {
                api.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
                setToken(savedToken);

                try {
                    const response = await api.get('/auth/me'); // rota que retorna o usuário logado
                    setUser(response.data); // { name, email, admin, roles }
                } catch (e) {
                    console.error("Erro ao buscar usuário", e);
                    await AsyncStorage.removeItem('token');
                    setToken(null);
                }
            }

            setLoading(false);
        }
        loadToken();
    }, []);

    const login = async (newToken) => {
        await AsyncStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        setToken(newToken);

        const response = await axios.get('/auth/me');
        setUser(response.data);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading, user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
