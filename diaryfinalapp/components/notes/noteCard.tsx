import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { iNote } from "~/firebase/types/iNote";
import { Text } from "~/components/ui/text";
import { Pressable, Touchable, View } from "react-native";
import { Feeling } from "~/components/notes/feeling";
import { router } from "expo-router";

export type NoteProps = {
  note: iNote;
};

export function NoteCard({ note }: NoteProps) {
  const handleClick = () => {
    router.push(`/(tabs)/profile/notes/${note.id}`);
  };

  return (
    <Pressable onPress={handleClick}>
      <Card className="mb-4">
        <CardHeader className="flex-row justify-between">
          <View>
            <Text>{note.date.toLocaleDateString("fr")}</Text>
            <Text className="font-bold text-xl line-clamp-1">{note.title}</Text>
          </View>
          <Feeling feeling={note.feeling} />
        </CardHeader>
        <CardContent>
          <Text className="line-clamp-2">{note.content}</Text>
        </CardContent>
      </Card>
    </Pressable>
  );
}
