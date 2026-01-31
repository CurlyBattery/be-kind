import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, ScrollView, Text} from "react-native";

import {IHelpRequest} from "@/types/help-request";
import {helpRequestRepository} from "@/database/help-requests-repository";
import {useAuth} from "@/components/auth-context";
import {useSQLiteContext} from "expo-sqlite";
import HelpRequestItem from "@/components/help-request-item";
import {UserRole} from "@/types/user";
import CreateHelpRequestModal from "@/components/create-help-request-modal";

const HelpRequestsList = () => {
    const {user} = useAuth();
    const db = useSQLiteContext();

     const [helpRequests, setHelpRequests] = useState<IHelpRequest[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        loadHelpRequests();
    }, []);

    const showCreateHelpRequestModal = () => {
        setVisible(true);
    };

    const loadHelpRequests = async () => {
        const helpRequestsResult =
            user?.role === UserRole.SEEKER ? await helpRequestRepository.getAllHelpRequestsByUserId(db, user.id)
                : await helpRequestRepository.getAllHelpRequests(db);

        setHelpRequests(helpRequestsResult);
    }

    return (
        <ScrollView>
            <Text>{user?.role === UserRole.SEEKER ? 'Тобой создано' : 'Пожертвования'}</Text>

            <FlatList
                data={helpRequests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <HelpRequestItem helpRequest={item} />}
            />

            {user?.role === UserRole.SEEKER && (
                <>
                    <Pressable
                        onPress={showCreateHelpRequestModal}
                    >
                        <Text>Создать</Text>
                    </Pressable>

                    (visible && <CreateHelpRequestModal visible={visible} setVisible={setVisible} onSave={loadHelpRequests} />)
                </>
            )}
        </ScrollView>
    )
};


export default HelpRequestsList;