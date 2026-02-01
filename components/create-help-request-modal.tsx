import React, {FC, useState} from 'react';
import {Modal, View, Text, TextInput, Pressable, StyleSheet} from "react-native";
import {helpRequestRepository} from "@/database/help-requests-repository";
import {useSQLiteContext} from "expo-sqlite";
import {useAuth} from "@/components/auth-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

    const closeModal = () => {
        setVisible(false);
        setTitle('');
        setDescription('');
    };

    const handleCreate = async () => {
        if (!title.trim() || !description.trim()) {
            alert('Заполните все поля');
            return;
        }

        try {
            await helpRequestRepository.createHelpRequest(db, title, description, user?.id!);
            await onSave();
            closeModal();
            alert('Заявка успешно создана!');
        } catch (error) {
            console.error('Ошибка создания заявки:', error);
            alert('Ошибка при создании заявки');
        }
    };

    return (
        <Modal
            visible={visible}
            animationType={'slide'}
            transparent
            onRequestClose={closeModal}
        >
            <Pressable
                style={styles.overlay}
                onPress={closeModal}
            >
                <Pressable
                    style={styles.modalContent}
                    onPress={(e) => e.stopPropagation()}
                >
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <MaterialIcons name="add-circle" size={32} color="#c3425a" />
                            <Text style={styles.title}>Новая заявка на помощь</Text>
                        </View>
                        <Pressable onPress={closeModal} style={styles.closeButton}>
                            <MaterialIcons name="close" size={28} color="#666" />
                        </Pressable>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Заголовок</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                            placeholder={'Кратко опишите вашу проблему...'}
                            maxLength={100}
                        />
                        <Text style={styles.charCounter}>{title.length}/100</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Описание</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            placeholder={'Подробно опишите что вам нужно...'}
                            multiline
                            numberOfLines={6}
                            textAlignVertical="top"
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.cancelButton]}
                            onPress={closeModal}
                        >
                            <Text style={styles.cancelButtonText}>Отмена</Text>
                        </Pressable>

                        <Pressable
                            style={[styles.button, styles.createButton]}
                            onPress={handleCreate}
                        >
                            <MaterialIcons name="check" size={20} color="white" />
                            <Text style={styles.createButtonText}>Создать</Text>
                        </Pressable>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 500,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    charCounter: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    createButton: {
        backgroundColor: '#c3425a',
        shadowColor: '#c3425a',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    createButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default CreateHelpRequestModal;