import React, {FC} from 'react';
import {Pressable, Text, View} from "react-native";

import {HelpRequestStatus, IHelpRequest} from "@/types/help-request";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";

type HelpRequestItemProps = {
    helpRequest: IHelpRequest;
}

const HelpRequestItem: FC<HelpRequestItemProps> = ({helpRequest}) => {
    const {user} = useAuth();

    return (
        <View>
            <View>
                <Text>{helpRequest.title}</Text>
                <Text>{helpRequest.status === HelpRequestStatus.HELPED ? 'Пожертвовано' : 'Активно'}</Text>
            </View>

            <View>
                <Text>{helpRequest.created_at.toString()}</Text>
                {user?.role === UserRole.HELPER && (
                    <Pressable
                        // UPDATE STATUS
                    >
                        <Text>Пожертвовать</Text>
                    </Pressable>
                )}
            </View>

        </View>
    );
};

export default HelpRequestItem;