import { Stack } from "expo-router";
import Header from "@/components/header";
import {View} from "react-native";
import {Suspense} from "react";

import Fallback from "@/components/fallback";
import {SQLiteProvider} from "expo-sqlite";
import {migrateDbIfNeeded} from "@/database";
import AuthProvider from "@/components/auth-context";

export default function RootLayout() {
  return (
      <View>
          <Suspense fallback={<Fallback/>}>
              <SQLiteProvider
                databaseName={'drugstore.db'}
                onInit={migrateDbIfNeeded}
                useSuspense
              >
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

              </SQLiteProvider>
          </Suspense>
      </View>

  );
}
