import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0B1E38',
          },
          headerTintColor: '#F8F6F0',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: 'Inter_700Bold',
          },
          contentStyle: {
            backgroundColor: '#0B1E38',
          },
          animation: 'fade',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: '🌍 TerraDice',
            headerShown: true,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="journal"
          options={{
            title: '✍️ 오늘의 질문',
            headerShown: true,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="records"
          options={{
            title: '📔 나의 생각들',
            headerShown: true,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </>
  );
}
