import React from 'react';
import {View, Text, ScrollView} from "react-native";
import {UserRole} from "@/types/user";
import {useAuth} from "@/components/auth-context";
import DonationsList from "@/components/donations-list";

const DonationsScreen = () => {
    return (
        <ScrollView>
            <DonationsList />
        </ScrollView>
    );
};

export default DonationsScreen;