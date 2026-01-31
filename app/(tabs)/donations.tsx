import React from 'react';
import {View, Text} from "react-native";
import {UserRole} from "@/types/user";
import {useAuth} from "@/components/auth-context";

const DonationsScreen = () => {
    const {user} = useAuth();

    return (
        <View>
            <Text>
                {user?.role === UserRole.SEEKER ? 'Тебе пожертвовали' : 'Кому ты пожертвовал'}
            </Text>
        </View>
    );
};

export default DonationsScreen;