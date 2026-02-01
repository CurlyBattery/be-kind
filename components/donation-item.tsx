import React, {FC} from 'react';
import {View, Text, StyleSheet} from "react-native";
import {IDonation} from "@/types/donation";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type DonationItemProps = {
    donation: IDonation;
}

const DonationItem: FC<DonationItemProps> = ({donation}) => {
    const {user} = useAuth();
    const isSeeker = user?.role === UserRole.SEEKER;

    return (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <MaterialCommunityIcons
                    name="hand-heart"
                    size={32}
                    color="#c3425a"
                />
            </View>

            <View style={styles.content}>
                {isSeeker ? (
                    <>
                        <Text style={styles.mainText}>
                            <Text style={styles.highlight}>{donation?.helper_name}</Text>
                            {' '}помог вам
                        </Text>
                        <Text style={styles.requestTitle}>"{donation?.request_title}"</Text>
                    </>
                ) : (
                    <>
                        <Text style={styles.mainText}>
                            Вы помогли пользователю{' '}
                            <Text style={styles.highlight}>{donation?.seeker_name}</Text>
                        </Text>
                        <Text style={styles.requestTitle}>"{donation?.request_title}"</Text>
                    </>
                )}

                <View style={styles.footer}>
                    <MaterialIcons name="access-time" size={14} color="#999" />
                    <Text style={styles.date}>
                        {new Date(donation?.created_at!)?.toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </Text>
                </View>
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
        flexDirection: 'row',
        gap: 16,
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
    content: {
        flex: 1,
        gap: 6,
    },
    mainText: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
    },
    highlight: {
        fontWeight: 'bold',
        color: '#c3425a',
    },
    requestTitle: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    date: {
        fontSize: 12,
        color: '#999',
    },
});

export default DonationItem;