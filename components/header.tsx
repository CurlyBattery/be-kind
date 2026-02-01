import React from 'react';
import {View, Text, StyleSheet, Pressable} from "react-native";
import {Link, useRouter} from 'expo-router';
import {useAuth} from "@/components/auth-context";
import {SafeAreaView} from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Header = () => {
    const {user, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/');
    };

    return (
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.container}>
                <Link href={'/'} asChild>
                    <Pressable style={styles.logoContainer}>
                        <MaterialCommunityIcons name="hand-heart" size={28} color="#c3425a" />
                        <Text style={styles.logo}>BeKind</Text>
                    </Pressable>
                </Link>

                <View style={styles.actionsContainer}>
                    {user ? (
                        <View style={styles.userSection}>
                            <View style={styles.userInfo}>
                                <MaterialIcons name="account-circle" size={32} color="#c3425a" />
                                <View>
                                    <Text style={styles.userName}>{user.name}</Text>
                                    <Text style={styles.userRole}>
                                        {user.role === 'HELPER' ? '❤️ Помогающий' : '🙏 Нуждающийся'}
                                    </Text>
                                </View>
                            </View>

                            <Pressable
                                style={styles.logoutButton}
                                onPress={handleLogout}
                            >
                                <Ionicons name="log-out-outline" size={20} color="white" />
                                <Text style={styles.logoutButtonText}>Выход</Text>
                            </Pressable>
                        </View>
                    ) : (
                        <View style={styles.authButtons}>
                            <Link href={'/sign-in'} asChild>
                                <Pressable style={styles.signInButton}>
                                    <Text style={styles.signInButtonText}>Вход</Text>
                                </Pressable>
                            </Link>
                            <Link href={'/sign-up'} asChild>
                                <Pressable style={styles.signUpButton}>
                                    <Text style={styles.signUpButtonText}>Регистрация</Text>
                                </Pressable>
                            </Link>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#c3425a',
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    userRole: {
        fontSize: 11,
        color: '#666',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#c3425a',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    authButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    signInButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c3425a',
    },
    signInButtonText: {
        color: '#c3425a',
        fontSize: 14,
        fontWeight: '600',
    },
    signUpButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: '#c3425a',
    },
    signUpButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default Header;