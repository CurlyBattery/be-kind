import React from 'react';
import {Text, View} from "react-native";
import {useAuth} from "@/components/auth-context";
import {UserRole} from "@/types/user";

const HomeScreen = () => {
    const {user} = useAuth();

    return (
       <View>
           <Text>Привет {user?.name}</Text>

           <Text>Твоя роль - {user?.role === UserRole.HELPER ? 'Помогающий' : 'Нуждающийся'}</Text>
       </View>
    );
};

export default HomeScreen;