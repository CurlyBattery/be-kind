import {Tabs} from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';


import Header from "@/components/header";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                header: () => <Header />,
                tabBarStyle: {
                    backgroundColor: 'rgba(220,218,215,0.5)',
                    borderTopWidth: 1,
                }
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    title: 'Главная',
                    tabBarIcon: () => <Feather name="home" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name={'donations'}
                options={{
                    title: 'Пожертвования',
                    tabBarIcon: () => <MaterialCommunityIcons name="food-apple-outline" size={24} color="black" />,
                }}
            />
            <Tabs.Screen
                name={'contacts'}
                options={{
                    title: 'Контакты',
                    tabBarIcon: () => <AntDesign name="contacts" size={24} color="black" />,
                }}
            />
        </Tabs>
    )
};

export default TabLayout;