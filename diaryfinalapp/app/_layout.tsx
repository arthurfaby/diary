import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { router, SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "~/components/primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import { useAuth } from "~/lib/auth/useAuth";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { auth } from "~/firebase/config";
import Toast from "react-native-toast-message";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <ThemeProvider value={LIGHT_THEME}>
      <StatusBar style={"dark"} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "My profile",
            headerLeft: () => (
              <Button
                variant="ghost"
                onPress={() => {
                  auth.signOut();
                  router.replace("/");
                  router.push("/signin");
                }}
              >
                <Text>Logout</Text>
              </Button>
            ),
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            title: "Diary App",
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            title: "Sign In",
          }}
        />
      </Stack>
      <PortalHost />
      <Toast />
    </ThemeProvider>
  );
}
