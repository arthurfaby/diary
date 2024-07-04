import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { router, useLocalSearchParams } from "expo-router";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";
import { useNotes } from "~/lib/api/notes/store";
import { useEffect, useState } from "react";
import { iNote } from "~/firebase/types/iNote";
import { Feeling } from "~/components/notes/feeling";
import { deleteDoc, doc } from "@firebase/firestore";
import { db } from "~/firebase/config";

export default function NoteScreen() {
  const { id } = useLocalSearchParams();
  const { colors } = useTheme();
  const { getNote, removeNote } = useNotes();
  const [note, setNote] = useState<iNote | null>(null);

  const goBack = () => {
    router.back();
  };

  const handleDeleteNote = () => {
    if (typeof id !== "string" || note == null) {
      goBack();
      return;
    }

    const docRef = doc(db, "notes", id);
    deleteDoc(docRef).then(() => {
      removeNote(note);
      goBack();
    });
  };

  useEffect(() => {
    if (typeof id !== "string") {
      goBack();
      return;
    }
    const note = getNote(id);
    if (note == null) {
      goBack();
      return;
    }
    setNote(note);
  }, []);

  return (
    <>
      <View className="flex-row items-center">
        <Button className="flex-row" variant="ghost" onPress={goBack}>
          <ChevronLeft color={colors.primary} />
          <Text>Back</Text>
        </Button>
      </View>
      {note && (
        <View className="p-6 pb-40 gap-8 h-full">
          <View>
            <View className="flex-row justify-between gap-4 w-full">
              <Text>{note.date.toLocaleDateString("fr")}</Text>
              <Feeling feeling={note.feeling} />
            </View>
            <ScrollView className="max-h-28">
            <Text className="text-2xl font-bold">{note.title}</Text>
            </ScrollView>
          </View>
          <ScrollView>
            <Text>{note.content}</Text>
          </ScrollView>
          <Button
            className="absolute bottom-12 m-6 w-full"
            variant="destructive"
            onPress={handleDeleteNote}
          >
            <Text>Delete</Text>
          </Button>
        </View>
      )}
    </>
  );
}
