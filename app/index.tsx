import * as React from "react";
import { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { router, usePathname } from "expo-router";
import { MyUser, useAuth } from "~/lib/auth/useAuth";
import { auth } from "~/firebase/config";
import { useNotes } from "~/lib/api/notes/store";

export default function Screen() {
  const { user, setUser } = useAuth();
  const { resetNotes } = useNotes();
  const pathname = usePathname();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      const myUser: MyUser | null = user
        ? ({
            email: user.email ?? "Unknown email",
            name: user.displayName ?? "Unknown name",
            photoURL: user.photoURL,
          } as MyUser)
        : null;
      setUser(myUser);
      if (user) {
        resetNotes();
        if (pathname !== "/") {
          if (router.canGoBack()) {
            router.back();
          }
          router.replace("profile");
        }
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
