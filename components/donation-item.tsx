import React, {FC} from 'react';
import {View, Text} from "react-native";
import {IDonation} from "@/types/donation";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";

type DonationItemProps = {
    donation: IDonation;
}

const DonationItem: FC<DonationItemProps> = ({donation}) => {
    const {user} = useAuth();

    return (
        <View>
            {user?.role === UserRole.SEEKER ? (
                <>
                    <Text>Пользователь {donation?.helper_name}</Text>
                    <Text>Задонатил на {donation?.request_title}</Text>
                </>

            ) : (
               <>
                   <Text>Вы задонатил на {donation?.request_title}</Text>
                   <Text>Пользователю {donation?.seeker_name}</Text>
               </>
            )}
        </View>
    );
};

export default DonationItem;