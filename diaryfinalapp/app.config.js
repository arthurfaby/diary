export default {
  expo: {
    name: "Diary app",
    slug: "diary-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "diaryapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      googleServicesFile: "./firebase/GoogleService-Info.plist",
      supportsTablet: true,
      bundleIdentifier: "com.arthurfaby.diary-app",
      entitlements: {
        "com.apple.developer.networking.wifi-info": true,
      },
    },
    android: {
      googleServicesFile: "./firebase/google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.arthurfaby.diaryapp",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router", "@react-native-google-signin/google-signin"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "c0d68982-a5db-4ce5-b639-d9d33f4557bc",
      },
    },
  },
};
