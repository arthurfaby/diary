import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="notes/[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
