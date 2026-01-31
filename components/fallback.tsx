import React from 'react';
import {View, Text} from "react-native";

const Fallback = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Загрузка базы данных...</Text>
        </View>
    );
};

export default Fallback;