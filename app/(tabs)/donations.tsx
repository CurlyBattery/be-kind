import React from 'react';
import {View, Text} from "react-native";
import {UserRole} from "@/types/user";
import {useAuth} from "@/components/auth-context";
import DonationsList from "@/components/donations-list";

const DonationsScreen = () => {
    return (
        <View>
            <DonationsList />
        </View>
    );
};

export default DonationsScreen;