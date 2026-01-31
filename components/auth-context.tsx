import {IUser} from "@/types/user";
import React, {createContext, FC, ReactNode, useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {userRepository} from "@/database/user-repository";
import {useSQLiteContext} from "expo-sqlite";

type AuthContextType = {
    user: IUser | null;
    login: (userId: number) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode;
}


const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<IUser | null>(null);
    const db = useSQLiteContext();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            if(userId) {
                const userData = await userRepository.getUserById(db, parseInt(userId));
                if(userData) {
                    setUser(userData);
                }
            }
        } catch (e) {
            console.error('Error saving user, ', e);
            throw e;
        }
    };

    const login = async (userId: number) => {
        try {
            await AsyncStorage.setItem('userId', userId.toString());
            const userData = await userRepository.getUserById(db, userId);
            if(userData) {
                setUser(userData);
            }
        } catch(e) {
            console.error('Error saving user, ', e);
            throw e;
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userId');
            setUser(null);
        } catch(e) {
            console.error('Error logout, ', e);
            throw e;
        }
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used as useAuth');
    }
    return context;
}

export default AuthProvider;