import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { ExpoRouter } from "~/.expo/types/router";

export default function NoteScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Notes : {id}</Text>
    </View>
  );
}
