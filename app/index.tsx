import {StyleSheet, Text, View, Image} from "react-native";
import Fontisto from '@expo/vector-icons/Fontisto';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const author = require('../assets/images/author.jpg');

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Российский BeKind помогает жителям приграничных регионов:</Text>

        <View style={styles.listContainer}>
            <View style={styles.listItem}>
                <View>
                    <Fontisto name="ambulance" size={24} color="black" />
                </View>
                <View style={styles.listTextContainer}>
                    <Text style={styles.listTextTitle}>Выдаем гумантирную помощь</Text>
                    <Text style={styles.listTextDescription}>(продукты, постельное белье, гигиенические наборы), а также помощь по индивидуальным запросам (детское питание, медикаменты )</Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <View>
                    <FontAwesome5 name="user-friends" size={24} color="black" />
                </View>
                <View style={styles.listTextContainer}>
                    <Text style={styles.listTextTitle}>Оказываем психологическую помощь и поддержку</Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <View>
                    <MaterialCommunityIcons name="account-search-outline" size={24} color="black" />
                </View>
                <View style={styles.listTextContainer}>
                    <Text style={styles.listTextTitle}>Помогаем в поиске пропавших родственников</Text>
                </View>
            </View>
        </View>

        <View style={styles.authorContainer}>
            <View>
                <Image style={styles.image}  source={author} alt={'author'}/>
            </View>
            <View>
                <Text style={styles.authorTitle}>Косырев Артем</Text>
                <Text style={styles.authorDescription}>Председатель BeKind / программист</Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        backgroundColor: '#c3425a',
        gap: 20,
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    listContainer: {
        gap: 10,
    },
    listTextContainer: {
        flex: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        boxShadow: '5px 5px 5px 0px rgba(0, 0, 0, 0.4)',
    },
    listTextTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    listTextDescription: {
        fontSize: 14,
        color: 'gray',
    },
    authorContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 15,
    },
    authorTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    authorDescription: {
        fontSize: 14,
        color: 'white',
    },


})
