import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    TouchableWithoutFeedback, Keyboard
} from "react-native";
import {useSQLiteContext} from "expo-sqlite";
import {useRouter} from "expo-router";
import {Picker} from '@react-native-picker/picker';

import {useAuth} from "@/components/auth-context";
import {userRepository} from "@/database/user-repository";
import {UserRole} from "@/types/user";

const SignUpScreen = () => {
    const {login} = useAuth();
    const router = useRouter();
    const db = useSQLiteContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.SEEKER);

    const handleRegister = async () => {
        if(!name.trim() || !email.trim() || !email.includes('@') || !password.trim()) {
            // Alert.alert('Ошибка', 'Заполни все поля');
            alert('Заполни все поля');
            return;
        }

        try {
            const existsUser = await userRepository.getUserByEmail(db, email);
            if (existsUser) {
                // Alert.alert('Ошибка', 'Пользователь уже существует');
                alert( 'Пользователь уже существует');
                return;
            }
            const userId = await userRepository.createUser(db, name, email, password, selectedRole)
            await login(userId);
            router.replace('/(tabs)');
        } catch(e) {
            // Alert.alert('Ошибка', 'Что-то пошло не так');
            alert('Что-то пошло не так');
            return;
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View>
                <Text>Регистрация</Text>

                <View>
                    <View>
                        <Text>Имя пользователя</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            placeholder={'Введите имя...'}
                        />
                    </View>

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

                    <View>
                        <Text>Роль</Text>
                        <Picker
                            selectedValue={selectedRole}
                            onValueChange={setSelectedRole}
                        >
                            <Picker.Item label={'Нуждающий'} value={UserRole.SEEKER}/>
                            <Picker.Item label={'Помогайющий'} value={UserRole.HELPER}/>
                        </Picker>
                    </View>

                    <Pressable
                        onPress={handleRegister}
                    >
                        <Text>Зарегистрироваться</Text>
                    </Pressable>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default SignUpScreen;