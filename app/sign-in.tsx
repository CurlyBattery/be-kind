import React, {useState} from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Pressable,
    TextInput,
    ScrollView,
    Platform,
    StyleSheet
} from "react-native";
import {useAuth} from "@/components/auth-context";
import {useRouter, Link} from "expo-router";
import {userRepository} from "@/database/user-repository";
import {useSQLiteContext} from "expo-sqlite";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const SignInScreen = () => {
    const {login} = useAuth();
    const router = useRouter();
    const db = useSQLiteContext();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if(!email.trim() || !password.trim()) {
            alert('Заполни все поля');
            return;
        }

        try {
            const user = await userRepository.getUserByEmail(db, email);
            if(user && user?.password === password) {
                await login(user.id);
                router.replace('/(tabs)');
            } else {
                alert('Неверный пароль или майл');
            }
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
                        <MaterialIcons name="login" size={48} color="#c3425a" />
                        <Text style={styles.title}>Вход в BeKind</Text>
                        <Text style={styles.subtitle}>Добро пожаловать обратно!</Text>
                    </View>

                    <View style={styles.inputsContainer}>
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
                                    placeholder={'Введите пароль...'}
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

                        <Pressable
                            style={styles.button}
                            onPress={handleLogin}
                        >
                            <Text style={styles.buttonText}>Войти</Text>
                        </Pressable>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Нет аккаунта? </Text>
                            <Link href="/sign-up" asChild>
                                <Pressable>
                                    <Text style={styles.link}>Зарегистрироваться</Text>
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
        fontSize: 28,
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
        gap: 20,
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
        fontSize: 16,
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

export default SignInScreen;