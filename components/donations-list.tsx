import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, RefreshControl} from "react-native";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";
import {useSQLiteContext} from "expo-sqlite";
import {IDonation} from "@/types/donation";
import {donationRepository} from "@/database/donation-repository";
import DonationItem from "@/components/donation-item";
import {useFocusEffect} from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const DonationsList = () => {
    const {user} = useAuth();
    const db = useSQLiteContext();

    const [donations, setDonations] = useState<IDonation[]>([]);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(() => {
        loadDonations();
    });

    const loadDonations = async () => {
        try {
            const donationsResult = user?.role === UserRole.SEEKER
                ? await donationRepository.getAllDonationBySeekerId(db, user.id)
                : await donationRepository.getAllDonationByHelperId(db, user?.id!);

            setDonations(donationsResult);
        } catch (error) {
            console.error('Ошибка загрузки донатов:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadDonations();
        setRefreshing(false);
    };

    const isSeeker = user?.role === UserRole.SEEKER;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <MaterialCommunityIcons
                        name="hand-heart"
                        size={28}
                        color="#c3425a"
                    />
                    <Text style={styles.headerTitle}>
                        {isSeeker ? 'Полученная помощь' : 'Оказанная помощь'}
                    </Text>
                </View>
                <Text style={styles.headerSubtitle}>
                    {isSeeker
                        ? 'Люди, которые вам помогли'
                        : 'Ваш вклад в помощь нуждающимся'}
                </Text>
            </View>

            <FlatList
                data={donations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <DonationItem donation={item} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="heart-dislike-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>
                            {isSeeker ? 'Пока нет пожертвований' : 'Вы еще не помогали'}
                        </Text>
                        <Text style={styles.emptyHint}>
                            {isSeeker
                                ? 'Создайте заявку и получите помощь'
                                : 'Перейдите в "Пожертвования" чтобы помочь'}
                        </Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#c3425a"
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: 'white',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 8,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        marginLeft: 40,
    },
    listContent: {
        padding: 16,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 18,
        color: '#999',
        marginTop: 16,
        fontWeight: '600',
    },
    emptyHint: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default DonationsList;