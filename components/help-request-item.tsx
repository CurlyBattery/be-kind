import React, {FC} from 'react';
import {Pressable, Text, View} from "react-native";

import {HelpRequestStatus, IHelpRequest} from "@/types/help-request";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";
import {donationRepository} from "@/database/donation-repository";
import {useSQLiteContext} from "expo-sqlite";
import {useRouter} from "expo-router";

type HelpRequestItemProps = {
    helpRequest: IHelpRequest;
}

const HelpRequestItem: FC<HelpRequestItemProps> = ({helpRequest}) => {
    const {user} = useAuth();
    const db = useSQLiteContext();
    const router = useRouter();

    const handleUpdate = async () => {
        await donationRepository.createDonation(db, helpRequest.id, helpRequest.user_id, user?.id!);
        router.replace('/donations');
    };

    return (
        <View>
            <View>
                <Text>{helpRequest.title}</Text>
                <Text>{helpRequest.status === HelpRequestStatus.HELPED ? 'Пожертвовано' : 'Активно'}</Text>
            </View>

            <View>
                <Text>{helpRequest.created_at.toString()}</Text>
                {(user?.role === UserRole.HELPER && helpRequest.status !== HelpRequestStatus.HELPED) && (
                    <Pressable
                        onPress={handleUpdate}
                    >
                        <Text>Пожертвовать</Text>
                    </Pressable>
                )}
            </View>

        </View>
    );
};

export default HelpRequestItem;