import React, {FC, useState} from 'react';
import {Modal, View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import {helpRequestRepository} from "@/database/help-requests-repository";
import {useSQLiteContext} from "expo-sqlite";
import {useAuth} from "@/components/auth-context";

type CreateHelpRequestModalProps = {
    visible: boolean;
    setVisible: (visible: boolean) => void;
    onSave: () => Promise<void>;
}

const CreateHelpRequestModal: FC<CreateHelpRequestModalProps> = ({visible, setVisible, onSave}) => {
    const db = useSQLiteContext();
    const {user} = useAuth();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

   const closeHelpRequestModal = () => {
       setVisible(false);
       setTitle('');
       setDescription('');
   };

   const handleCreateHelpRequest = async () => {
       await helpRequestRepository.createHelpRequest(db, title, description, user?.id!);
       await onSave();
       closeHelpRequestModal();
   };

    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent
            onRequestClose={closeHelpRequestModal}
        >
            <Pressable
                style={styles.container}
                onPress={closeHelpRequestModal}
            >
                <Pressable
                    style={styles.contentContainer}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Text>Создание пожертвования</Text>

                    <View>
                        <Text>Заголовок</Text>

                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder={'Введите заголовок...'}
                        />
                    </View>

                    <View>
                        <Text>Описание</Text>

                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder={'Введите описание...'}
                        />
                    </View>

                    <Pressable
                        onPress={handleCreateHelpRequest}
                    >
                        <Text>Создать</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        backgroundColor: '#DCDAD7',
        padding: 20,
        boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.2)'
    }
})

export default CreateHelpRequestModal;