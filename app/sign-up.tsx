import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet
} from "react-native";
import {useSQLiteContext} from "expo-sqlite";
import {useRouter, Link} from "expo-router";
import {Picker} from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

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
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if(!name.trim() || !email.trim() || !email.includes('@') || !password.trim()) {
            alert('Заполни все поля корректно');
            return;
        }

        if(password.length < 6) {
            alert('Пароль должен быть не менее 6 символов');
            return;
        }

        try {
            const existsUser = await userRepository.getUserByEmail(db, email);
            if (existsUser) {
                alert('Пользователь с таким email уже существует');
                return;
            }
            const userId = await userRepository.createUser(db, name, email, password, selectedRole);
            await login(userId);
            router.replace('/(tabs)');
        } catch(e) {
            alert('Что-то пошло не так');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps={'handled'}
            >
                <View style={styles.formContainer}>
                    <View style={styles.header}>
                        <MaterialIcons name="person-add" size={48} color="#c3425a" />
                        <Text style={styles.title}>Регистрация в BeKind</Text>
                        <Text style={styles.subtitle}>Создайте аккаунт для помощи</Text>
                    </View>

                    <View style={styles.inputsContainer}>
                        <View style={styles.inputWrapper}>
                            <View style={styles.inputLabelContainer}>
                                <FontAwesome5 name="user" size={18} color="#c3425a" />
                                <Text style={styles.label}>Имя пользователя</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder={'Введите имя...'}
                                autoCapitalize="words"
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputLabelContainer}>
                                <MaterialIcons name="email" size={20} color="#c3425a" />
                                <Text style={styles.label}>Email</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder={'Введите email...'}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputLabelContainer}>
                                <MaterialIcons name="lock" size={20} color="#c3425a" />
                                <Text style={styles.label}>Пароль</Text>
                            </View>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={[styles.input, styles.passwordInput]}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder={'Минимум 6 символов...'}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <Pressable
                                    style={styles.eyeButton}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-off" : "eye"}
                                        size={24}
                                        color="#666"
                                    />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.inputWrapper}>
                            <View style={styles.inputLabelContainer}>
                                <FontAwesome5 name="user-tag" size={18} color="#c3425a" />
                                <Text style={styles.label}>Роль</Text>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={selectedRole}
                                    onValueChange={setSelectedRole}
                                    style={styles.picker}
                                >
                                    <Picker.Item label={'Нуждающийся'} value={UserRole.SEEKER}/>
                                    <Picker.Item label={'Помогающий'} value={UserRole.HELPER}/>
                                </Picker>
                            </View>
                        </View>

                        <Pressable
                            style={styles.button}
                            onPress={handleRegister}
                        >
                            <Text style={styles.buttonText}>Зарегистрироваться</Text>
                        </Pressable>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Уже есть аккаунт? </Text>
                            <Link href="/sign-in" asChild>
                                <Pressable>
                                    <Text style={styles.link}>Войти</Text>
                                </Pressable>
                            </Link>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3425a',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#c3425a',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    inputsContainer: {
        gap: 18,
    },
    inputWrapper: {
        gap: 8,
    },
    inputLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
    },
    input: {
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    passwordContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeButton: {
        position: 'absolute',
        right: 14,
        top: 14,
    },
    pickerContainer: {
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    button: {
        backgroundColor: '#c3425a',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#c3425a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    footerText: {
        fontSize: 14,
        color: '#666',
    },
    link: {
        fontSize: 14,
        color: '#c3425a',
        fontWeight: 'bold',
    },
});

export default SignUpScreen;