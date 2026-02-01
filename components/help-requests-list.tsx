import React, {useState} from 'react';
import {FlatList, Pressable, Text, View, StyleSheet, RefreshControl} from "react-native";
import {useSQLiteContext} from "expo-sqlite";
import {useFocusEffect} from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

import {IHelpRequest} from "@/types/help-request";
import {helpRequestRepository} from "@/database/help-requests-repository";
import {useAuth} from "@/components/auth-context";
import HelpRequestItem from "@/components/help-request-item";
import {UserRole} from "@/types/user";
import CreateHelpRequestModal from "@/components/create-help-request-modal";

const HelpRequestsList = () => {
    const {user} = useAuth();
    const db = useSQLiteContext();

    const [helpRequests, setHelpRequests] = useState<IHelpRequest[]>([]);
    const [visible, setVisible] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(() => {
        loadHelpRequests();
    });

    const loadHelpRequests = async () => {
        try {
            const helpRequestsResult = user?.role === UserRole.SEEKER
                ? await helpRequestRepository.getAllHelpRequestsByUserId(db, user.id)
                : await helpRequestRepository.getAllHelpRequests(db);

            setHelpRequests(helpRequestsResult);
        } catch (error) {
            console.error('Ошибка загрузки заявок:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadHelpRequests();
        setRefreshing(false);
    };

    const isSeeker = user?.role === UserRole.SEEKER;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <MaterialIcons
                        name={isSeeker ? "volunteer-activism" : "list"}
                        size={28}
                        color="#c3425a"
                    />
                    <Text style={styles.headerTitle}>
                        {isSeeker ? 'Мои заявки' : 'Активные заявки'}
                    </Text>
                </View>
                <Text style={styles.headerSubtitle}>
                    {isSeeker
                        ? 'Созданные вами заявки на помощь'
                        : 'Люди, которым нужна помощь'}
                </Text>
            </View>

            <FlatList
                data={helpRequests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <HelpRequestItem helpRequest={item} onUpdate={loadHelpRequests} />}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={64} color="#ccc" />
                        <Text style={styles.emptyText}>
                            {isSeeker ? 'Нет созданных заявок' : 'Пока нет активных заявок'}
                        </Text>
                        {isSeeker && (
                            <Text style={styles.emptyHint}>
                                Нажмите кнопку ниже, чтобы создать заявку
                            </Text>
                        )}
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

            {isSeeker && (
                <>
                    <Pressable
                        style={styles.fab}
                        onPress={() => setVisible(true)}
                    >
                        <MaterialIcons name="add" size={32} color="white" />
                    </Pressable>

                    <CreateHelpRequestModal
                        visible={visible}
                        setVisible={setVisible}
                        onSave={loadHelpRequests}
                    />
                </>
            )}
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
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#c3425a',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#c3425a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 8,
    },
});

export default HelpRequestsList;