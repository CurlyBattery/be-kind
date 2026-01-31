import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {Link} from 'expo-router';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text>Header</Text>

            <View style={styles.listContainer}>
                <Link href={'/sign-in'}>Вход</Link>
                <Link href={'/sign-up'}>Регистрация</Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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