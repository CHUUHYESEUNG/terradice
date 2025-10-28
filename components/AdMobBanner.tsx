import React, { useMemo, useRef } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type MobileAdsModule = typeof import('react-native-google-mobile-ads');

const googleMobileAdsModule: MobileAdsModule | null = (() => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('react-native-google-mobile-ads');
  } catch (error) {
    if (__DEV__) {
      console.warn(
        'AdMob banner component is disabled because the native module is unavailable. Use a dev client or production build to test ads.',
        error
      );
    }
    return null;
  }
})();

type AdMobBannerProps = {
  style?: StyleProp<ViewStyle>;
};

// Google's official test ad unit IDs
const TEST_AD_UNIT_IDS = {
  BANNER_IOS: 'ca-app-pub-3940256099942544/2934735716',
  BANNER_ANDROID: 'ca-app-pub-3940256099942544/6300978111',
};

const resolveAdUnitId = () => {
  if (__DEV__) {
    // Use Google's official test ad unit IDs in development
    return Platform.OS === 'ios' ? TEST_AD_UNIT_IDS.BANNER_IOS : TEST_AD_UNIT_IDS.BANNER_ANDROID;
  }

  if (Platform.OS === 'ios') {
    return process.env.EXPO_PUBLIC_ADMOB_IOS_BANNER_ID ?? null;
  }

  if (Platform.OS === 'android') {
    return process.env.EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID ?? null;
  }

  return null;
};

const AdMobBanner: React.FC<AdMobBannerProps> = ({ style }) => {
  if (!googleMobileAdsModule) {
    return null;
  }

  const { BannerAd, BannerAdSize, TestIds, useForeground } = googleMobileAdsModule;
  const bannerRef = useRef<BannerAd | null>(null);
  const unitId = useMemo(resolveAdUnitId, []);

  useForeground(() => {
    if (Platform.OS === 'ios') {
      bannerRef.current?.load();
    }
  });

  if (!unitId) {
    if (__DEV__) {
      console.warn('AdMob banner unit ID is not configured for this platform.');
    }
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        ref={bannerRef}
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdFailedToLoad={(error) => {
          if (__DEV__) {
            console.warn('AdMob banner failed to load:', error);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default AdMobBanner;
