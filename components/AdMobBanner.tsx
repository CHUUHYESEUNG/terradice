import React, { useMemo, useRef } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { BannerAd, BannerAdSize, TestIds, useForeground } from 'react-native-google-mobile-ads';

type AdMobBannerProps = {
  style?: StyleProp<ViewStyle>;
};

const resolveAdUnitId = () => {
  if (__DEV__) {
    return TestIds.BANNER;
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
