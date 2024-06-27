import * as React from "react";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router, usePathname } from "expo-router";
import { useAuth } from "~/lib/auth/useAuth";
import { auth } from "~/firebase/config";

export default function Screen() {
  const { user } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      useAuth.setState({ user, isAuthenticated: !!user });
      console.log("user", user?.email, pathname);
      if (user && pathname !== "/") {
        if (router.canGoBack()) {
          router.back();
        }
        router.replace("profile");
      }
    });
  }, [pathname]);

  const handleRedirectSignin = () => {
    if (user) {
      router.replace("profile");
    } else {
      router.push("signin");
    }
  };

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 gap-4">
      <Text className="text-3xl font-bold">Welcome to diaryapp !</Text>
      <Button className="w-full" onPress={handleRedirectSignin}>
        <Text>Sign in</Text>
      </Button>
    </ScrollView>
  );
}
