import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from "react-native";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

const HomeScreen = () => {
    const {user} = useAuth();

    const isHelper = user?.role === UserRole.HELPER;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.welcomeCard}>
                <View style={styles.avatarContainer}>
                    <MaterialIcons
                        name={isHelper ? "volunteer-activism" : "person"}
                        size={50}
                        color="white"
                    />
                </View>
                <View style={styles.welcomeText}>
                    <Text style={styles.greeting}>Привет,</Text>
                    <Text style={styles.userName}>{user?.name}!</Text>
                </View>
            </View>

            <View style={styles.roleCard}>
                <View style={styles.roleIconContainer}>
                    {isHelper ? (
                        <FontAwesome5 name="hands-helping" size={32} color="#c3425a" />
                    ) : (
                        <MaterialIcons name="favorite" size={32} color="#c3425a" />
                    )}
                </View>
                <View style={styles.roleInfo}>
                    <Text style={styles.roleLabel}>Твоя роль</Text>
                    <Text style={styles.roleValue}>
                        {isHelper ? 'Помогающий' : 'Нуждающийся'}
                    </Text>
                    <Text style={styles.roleDescription}>
                        {isHelper
                            ? 'Спасибо за вашу доброту и помощь!'
                            : 'Мы здесь, чтобы помочь вам!'}
                    </Text>
                </View>
            </View>

            {/* Информационные карточки */}
            <View style={styles.infoContainer}>
                <View style={styles.infoCard}>
                    <Entypo name="heart" size={28} color="#c3425a" />
                    <Text style={styles.infoTitle}>Помощь рядом</Text>
                    <Text style={styles.infoText}>
                        {isHelper
                            ? 'Просматривайте заявки и помогайте тем, кто нуждается'
                            : 'Создавайте заявки и получайте необходимую помощь'}
                    </Text>
                </View>

                <View style={styles.infoCard}>
                    <MaterialIcons name="shield" size={28} color="#c3425a" />
                    <Text style={styles.infoTitle}>Безопасно</Text>
                    <Text style={styles.infoText}>
                        Все данные защищены и конфиденциальны
                    </Text>
                </View>
            </View>

            {/* Подсказка */}
            <View style={styles.tipCard}>
                <MaterialIcons name="lightbulb" size={24} color="#ff9800" />
                <Text style={styles.tipText}>
                    {isHelper
                        ? 'Перейдите в раздел "Пожертвования" чтобы помочь нуждающимся'
                        : 'Создайте заявку на помощь во вкладке "Пожертвования"'}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    welcomeCard: {
        backgroundColor: '#c3425a',
        borderRadius: 20,
        padding: 25,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 20,
        shadowColor: '#c3425a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        flex: 1,
    },
    greeting: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        fontWeight: '500',
    },
    userName: {
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 4,
    },
    roleCard: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    roleIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fef0f3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    roleInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    roleLabel: {
        fontSize: 14,
        color: '#999',
        marginBottom: 4,
    },
    roleValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c3425a',
        marginBottom: 6,
    },
    roleDescription: {
        fontSize: 13,
        color: '#666',
        fontStyle: 'italic',
    },
    infoContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 20,
    },
    infoCard: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
        marginBottom: 8,
    },
    infoText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 18,
    },
    tipCard: {
        flexDirection: 'row',
        backgroundColor: '#fff9e6',
        padding: 15,
        borderRadius: 12,
        gap: 12,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#ff9800',
    },
    tipText: {
        flex: 1,
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
});

export default HomeScreen;