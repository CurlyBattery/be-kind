import React, {FC} from 'react';
import {Pressable, Text, View, StyleSheet} from "react-native";
import {HelpRequestStatus, IHelpRequest} from "@/types/help-request";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";
import {donationRepository} from "@/database/donation-repository";
import {useSQLiteContext} from "expo-sqlite";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type HelpRequestItemProps = {
    helpRequest: IHelpRequest;
    onUpdate?: () => void;
}

const HelpRequestItem: FC<HelpRequestItemProps> = ({helpRequest, onUpdate}) => {
    const {user} = useAuth();
    const db = useSQLiteContext();

    const handleDonate = async () => {
        try {
            await donationRepository.createDonation(
                db,
                helpRequest.id,
                helpRequest.user_id,
                user?.id!
            );
            onUpdate?.();
            alert('Спасибо за вашу доброту! 💖');
        } catch (error) {
            console.error('Ошибка при пожертвовании:', error);
            alert('Произошла ошибка');
        }
    };

    const isHelped = helpRequest.status === HelpRequestStatus.HELPED;
    const canDonate = user?.role === UserRole.HELPER && !isHelped;

    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <View style={styles.statusBadge}>
                    <MaterialCommunityIcons
                        name={isHelped ? "check-circle" : "clock-outline"}
                        size={16}
                        color={isHelped ? "#4CAF50" : "#FF9800"}
                    />
                    <Text style={[styles.statusText, isHelped ? styles.helpedStatus : styles.activeStatus]}>
                        {isHelped ? 'Помощь оказана' : 'Требуется помощь'}
                    </Text>
                </View>
            </View>

            <Text style={styles.title}>{helpRequest.title}</Text>
            <Text style={styles.description} numberOfLines={3}>
                {helpRequest.description}
            </Text>

            <View style={styles.footer}>
                <View style={styles.dateContainer}>
                    <MaterialIcons name="access-time" size={16} color="#999" />
                    <Text style={styles.date}>
                        {new Date(helpRequest.created_at).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'short',
                        })}
                    </Text>
                </View>

                {canDonate && (
                    <Pressable style={styles.donateButton} onPress={handleDonate}>
                        <MaterialCommunityIcons name="hand-heart" size={20} color="white" />
                        <Text style={styles.donateButtonText}>Помочь</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        marginBottom: 12,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    activeStatus: {
        color: '#FF9800',
    },
    helpedStatus: {
        color: '#4CAF50',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    date: {
        fontSize: 13,
        color: '#999',
    },
    donateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#c3425a',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
        shadowColor: '#c3425a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    donateButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HelpRequestItem;