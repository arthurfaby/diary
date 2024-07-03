import { Redirect } from "expo-router";
import { Calendar, User } from "lucide-react-native";
import { useAuth } from "~/lib/auth/useAuth";
import { useTheme } from "@react-navigation/native";
import { Platform, useWindowDimensions } from "react-native";
import { ProfileScreen } from "~/app/(tabs)/profile";
import { AgendaScreen } from "~/app/(tabs)/agenda";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="signin" />;
  }

  return (
    <Tab.Navigator
      initialRouteName="profile"
      tabBarPosition={"bottom"}
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          shadowOpacity: 0,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          bottom: Platform.OS === "ios" ? 25 : 10,
        },
        tabBarIndicatorStyle: {
          display: "none",
        },
        tabBarScrollEnabled: true,
        tabBarItemStyle: {
          width: width / 2,
        },
      }}
    >
      <Tab.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <User
              size={24}
              color={colors.primary}
              style={{
                opacity: focused ? 1 : 0.6,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="road"
        component={AgendaScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Calendar
              size={24}
              color={colors.primary}
              style={{
                opacity: focused ? 1 : 0.6,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
