import React from 'react';
import {View, Text, StyleSheet, Pressable, Linking, ScrollView} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const ContactsScreen = () => {
    const handlePhonePress = () => {
        Linking.openURL('tel:+79083229683');
    };

    const handleEmailPress = () => {
        Linking.openURL('mailto:cosinusgradusov90@gmail.com');
    };

    const handleTelegramPress = () => {
        Linking.openURL('https://t.me/BeKindHelp'); // Замените на ваш канал
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <MaterialIcons name="contact-support" size={60} color="#c3425a" />
                <Text style={styles.title}>Свяжитесь с нами</Text>
                <Text style={styles.subtitle}>Мы всегда рады помочь!</Text>
            </View>

            <View style={styles.contactsContainer}>
                <Pressable style={styles.contactCard} onPress={handlePhonePress}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="phone" size={28} color="#c3425a" />
                    </View>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Телефон</Text>
                        <Text style={styles.contactValue}>+7 (908) 322-96-83</Text>
                        <Text style={styles.contactHint}>Нажмите для звонка</Text>
                    </View>
                </Pressable>

                <Pressable style={styles.contactCard} onPress={handleEmailPress}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="email" size={28} color="#c3425a" />
                    </View>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Email</Text>
                        <Text style={styles.contactValue}>cosinusgradusov90@gmail.com</Text>
                        <Text style={styles.contactHint}>Нажмите для письма</Text>
                    </View>
                </Pressable>

                <Pressable style={styles.contactCard} onPress={handleTelegramPress}>
                    <View style={styles.iconContainer}>
                        <FontAwesome name="telegram" size={28} color="#c3425a" />
                    </View>
                    <View style={styles.contactInfo}>
                        <Text style={styles.contactLabel}>Telegram</Text>
                        <Text style={styles.contactValue}>@BeKindHelp</Text>
                        <Text style={styles.contactHint}>Нажмите для перехода</Text>
                    </View>
                </Pressable>
            </View>

            <View style={styles.infoCard}>
                <Entypo name="info-with-circle" size={24} color="#c3425a" />
                <Text style={styles.infoText}>
                    Наша организация работает для помощи жителям приграничных регионов.
                    Мы всегда открыты для диалога и сотрудничества.
                </Text>
            </View>

            <View style={styles.scheduleCard}>
                <MaterialIcons name="schedule" size={24} color="#c3425a" />
                <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleTitle}>Время работы</Text>
                    <Text style={styles.scheduleText}>Пн-Пт: 9:00 - 18:00</Text>
                    <Text style={styles.scheduleText}>Сб-Вс: 10:00 - 16:00</Text>
                </View>
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
    header: {
        alignItems: 'center',
        marginBottom: 30,
        paddingVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#c3425a',
        marginTop: 15,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    contactsContainer: {
        gap: 15,
        marginBottom: 20,
    },
    contactCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        alignItems: 'center',
        gap: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fef0f3',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contactInfo: {
        flex: 1,
    },
    contactLabel: {
        fontSize: 14,
        color: '#999',
        marginBottom: 4,
    },
    contactValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    contactHint: {
        fontSize: 12,
        color: '#c3425a',
        fontStyle: 'italic',
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: '#fef0f3',
        padding: 15,
        borderRadius: 12,
        gap: 12,
        marginBottom: 15,
        borderLeftWidth: 4,
        borderLeftColor: '#c3425a',
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    scheduleCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        gap: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    scheduleInfo: {
        flex: 1,
    },
    scheduleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    scheduleText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 2,
    },
});

export default ContactsScreen;