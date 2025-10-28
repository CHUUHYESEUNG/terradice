declare global {
  namespace NodeJS {
    interface ProcessEnv {
      EXPO_PUBLIC_ADMOB_IOS_BANNER_ID?: string;
      EXPO_PUBLIC_ADMOB_ANDROID_BANNER_ID?: string;
    }
  }
}

export {};
