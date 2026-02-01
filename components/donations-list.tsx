import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, FlatList} from "react-native";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";
import {useSQLiteContext} from "expo-sqlite";
import {IDonation} from "@/types/donation";
import {donationRepository} from "@/database/donation-repository";
import {helpRequestRepository} from "@/database/help-requests-repository";
import DonationItem from "@/components/donation-item";
import HelpRequestItem from "@/components/help-request-item";
import {useFocusEffect} from "expo-router";

const DonationsList = () => {
    const {user} = useAuth();
    const db = useSQLiteContext();

    const [donations, setDonations] = useState<IDonation[]>([]);

    useFocusEffect(() => {
        loadDonations();
    });

    const loadDonations = async () => {
        const donationsResult =
            user?.role === UserRole.SEEKER ? await donationRepository.getAllDonationBySeekerId(db, user.id)
                : await donationRepository.getAllDonationByHelperId(db, user?.id!);

        setDonations(donationsResult);
    };

    return (
        <View>
            <Text>
                {user?.role === UserRole.SEEKER ? 'Тебе пожертвовали' : 'Кому ты пожертвовал'}
            </Text>

            <FlatList
                data={donations}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <DonationItem donation={item} />}
            />
        </View>
    );
};

export default DonationsList;