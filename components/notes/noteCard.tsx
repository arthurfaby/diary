import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { noteInterface } from "~/firebase/types/note.interface";
import { Text } from "~/components/ui/text";
import { View } from "react-native";
import { Feeling } from "~/components/notes/feeling";
import { router } from "expo-router";

export type NoteProps = {
  note: noteInterface;
};

export function NoteCard({ note }: NoteProps) {
  return (
    <Card
      className="mb-4"
      onTouchEnd={(event) => {
        router.push(`/(tabs)/notes/${note.id}`);
      }}
    >
      <CardHeader className="flex-row justify-between">
        <View>
          <Text>{note.date.toLocaleDateString("fr")}</Text>
          <CardTitle>
            <Text className="text-xl">{note.title}</Text>
          </CardTitle>
        </View>
        <Feeling feeling={note.feeling} />
      </CardHeader>
      <CardContent>
        <Text className=" line-clamp-2">{note.content}</Text>
      </CardContent>
    </Card>
  );
}
