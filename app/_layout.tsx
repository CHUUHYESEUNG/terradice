import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useTranslation } from 'react-i18next';
import '../global.css';
import '../i18n';

type MobileAdsModule = typeof import('react-native-google-mobile-ads');

const googleMobileAdsModule: MobileAdsModule | null = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-google-mobile-ads');
  } catch (error) {
    if (__DEV__) {
      console.warn(
        'AdMob native module is unavailable. Install react-native-google-mobile-ads and run a dev client or prebuild to test ads.',
        error
      );
    }
    return null;
  }
})();

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { t } = useTranslation();
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

  useEffect(() => {
    if (!googleMobileAdsModule) {
      return;
    }

    const { default: mobileAds, MaxAdContentRating } = googleMobileAdsModule;

    mobileAds()
      .setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.T,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
        testDeviceIdentifiers: __DEV__ ? ['EMULATOR'] : [],
      })
      .then(() => mobileAds().initialize())
      .catch((error) => {
        if (__DEV__) {
          console.warn('Failed to initialize AdMob SDK', error);
        }
      });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
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
            title: t('layout.homeTitle'),
            headerShown: true,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name="journal"
          options={{
            title: t('layout.journalTitle'),
            headerShown: true,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="records"
          options={{
            title: t('layout.recordsTitle'),
            headerShown: true,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
