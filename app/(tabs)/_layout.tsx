import {Tabs} from "expo-router";
import Header from "@/components/header";

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                header: () => <Header />
            }}
        >
            <Tabs.Screen
                name={'index'}
                options={{
                    title: 'Главная'
                }}
            />
            <Tabs.Screen
                name={'donations'}
                options={{
                    title: 'Пожертования'
                }}
            />
            <Tabs.Screen
                name={'contacts'}
                options={{
                    title: 'Контакты'
                }}
            />
        </Tabs>
    )
}