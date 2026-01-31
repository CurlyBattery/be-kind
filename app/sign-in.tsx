import React, {useState} from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Alert,
    Pressable,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback, ScrollView, Platform
} from "react-native";
import {useAuth} from "@/components/auth-context";
import {useRouter} from "expo-router";
import {userRepository} from "@/database/user-repository";
import {useSQLiteContext} from "expo-sqlite";

const SignInScreen = () => {
    const {login} = useAuth();
    const router = useRouter();
    const db = useSQLiteContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if(!email.trim() || !password.trim()) {
            // Alert.alert('Ошибка', 'Заполни все поля');
            alert('Заполни все поля');
            return;
        }

        try {
            const user = await userRepository.getUserByEmail(db, email);
            if(user && user?.password === password) {
                await login(user.id);
                router.replace('/(tabs)');
            } else {
                // Alert.alert('Ошибка', 'Неверный пароль или майл');
                alert('Неверный пароль или майл');
                return;
            }
        } catch(e) {
            // Alert.alert('Ошибка', 'Что-то пошло не так');
            alert('Что-то пошло не так');
            return;
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                keyboardShouldPersistTaps={'handled'}
                style={styles.scrollContainer}
            >
                <View>
                    <Text>Вход</Text>

                    <View>
                        <Text>Майл</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder={'Введите майл...'}
                        />
                    </View>

                    <View>
                        <Text>Пароль</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder={'Введите пароль...'}
                            secureTextEntry
                        />
                    </View>

                    <Pressable
                        onPress={handleLogin}
                    >
                        <Text>Войти</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = {
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    }
}

export default SignInScreen;