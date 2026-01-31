import React from 'react';
import {View, Text, StyleSheet, Pressable} from "react-native";
import {Link, useRouter} from 'expo-router';
import {useAuth} from "@/components/auth-context";

const Header = () => {
    const {user, logout} = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Link href={'/'}>
                <Text>Домой</Text>
            </Link>

            <View style={styles.listContainer}>
                {user ? (
                    <>
                        <Pressable
                            onPress={handleLogout}
                        >
                            <Text>Выход</Text>
                        </Pressable>
                    </>
                ) : (
                    <>
                        <Link href={'/sign-in'}>
                            <Text>Вход</Text>
                        </Link>
                        <Link href={'/sign-up'}>
                            <Text>Регистрация</Text>
                        </Link>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 30,
        borderBottomWidth: 1,
    },
    listContainer: {
        flexDirection: 'row',
        gap: 20,
    }
})

export default Header;