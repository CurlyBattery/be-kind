import { Stack } from "expo-router";
import Header from "@/components/header";
import {StyleSheet, View} from "react-native";
import {Suspense} from "react";

import Fallback from "@/components/fallback";
import {SQLiteProvider} from "expo-sqlite";
import {migrateDbIfNeeded} from "@/database";
import AuthProvider from "@/components/auth-context";
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function RootLayout() {
  return (
      <View style={styles.container}>
          <Suspense fallback={<Fallback/>}>
              <SQLiteProvider
                databaseName={'drugstore.db'}
                onInit={migrateDbIfNeeded}
                useSuspense
              >
                  <SafeAreaProvider>
                      <AuthProvider>
                          <Stack
                              screenOptions={{
                                  headerShown: true,
                                  header: () => <Header />,
                              }}
                          >
                              <Stack.Screen name={'(tabs)'} options={{ headerShown: false }}/>
                          </Stack>
                      </AuthProvider>
                  </SafeAreaProvider>
              </SQLiteProvider>
          </Suspense>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DCDAD7",
    }
})
