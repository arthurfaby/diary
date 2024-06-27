import { Image, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/auth/useAuth";
import { Redirect } from "expo-router";

export default function Screen() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/"} />;
  }

  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 gap-4">
      <Text>Profile Page</Text>
      <Image
        src={
          user.photoURL ??
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw2vXISypiflnXlZm-GjMDX0&ust=1719587889560000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIjF2amK_IYDFQAAAAAdAAAAABAE"
        }
      />
      <Text>Welcome {user.name} !</Text>
    </ScrollView>
  );
}
