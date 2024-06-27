import { ScrollView } from "react-native";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "@firebase/auth";
import { auth } from "~/firebase/config";
import { useEffect } from "react";
import { MyUser, useAuth } from "~/lib/auth/useAuth";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

export default function Screen() {
  const { setUser } = useAuth();

  const githubDiscovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`,
  };

  const [githubRequest, githubReponse, promptAsyncGithub] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      scopes: ["identity", "user:email", "user:follow"],
      redirectUri: makeRedirectUri(),
    },
    githubDiscovery
  );

  async function createGithubTokenWithCode(code: string) {
    const url =
      `https://github.com/login/oauth/access_token` +
      `?client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}` +
      `&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}` +
      `&code=${code}`; // 👈 we are passing the code here

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // The response should come with: { token_type, scope, access_token }
    return res.json();
  }

  async function handleGithubResponse() {
    try {
      // Verify that everything went well
      if (githubReponse?.type === "success") {
        // Here we grab the code from the response
        const { code } = githubReponse.params;

        const { token_type, scope, access_token } =
          await createGithubTokenWithCode(code);

        if (!access_token) return;
        const credential = GithubAuthProvider.credential(access_token);
        const data = await signInWithCredential(auth, credential);
        setUser({
          name: data.user.displayName ?? "Unknown",
          email: data.user.email ?? "Unknown",
          photoURL: data.user.photoURL ?? undefined,
        } as MyUser);
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(idToken);
      const data = await signInWithCredential(auth, googleCredential);
      setUser({
        name: data.user.displayName ?? "Unknown",
        email: data.user.email ?? "Unknown",
        photoURL: data.user.photoURL ?? undefined,
      } as MyUser);
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    handleGithubResponse();
  }, [githubReponse]);

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 gap-4">
      <Button onPress={signInWithGoogle}>
        <Text>Login with Google</Text>
      </Button>
      <Button
        onPress={() => {
          promptAsyncGithub({ windowName: "Github sign in" });
        }}
      >
        <Text>Login with Github</Text>
      </Button>
    </ScrollView>
  );
}
