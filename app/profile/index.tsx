import { ScrollView } from "react-native";
import { Text } from "~/components/ui/text";

export default function Screen() {
  return (
    <ScrollView contentContainerClassName="flex-1 justify-center items-center p-6 gap-4">
      <Text>Profile Page</Text>
    </ScrollView>
  );
}
