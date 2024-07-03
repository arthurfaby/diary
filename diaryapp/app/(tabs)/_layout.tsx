import { Redirect, Tabs } from "expo-router";
import { PersonStanding, User } from "lucide-react-native";
import { useAuth } from "~/lib/auth/useAuth";

export default function TabsLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="signin" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: () => <User size={24} />,
        }}
      />
    </Tabs>
  );
}
