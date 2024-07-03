import { Image, ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/auth/useAuth";
import { Redirect } from "expo-router";
import { AddNote } from "~/components/notes/addNote";
import { useNotes } from "~/lib/api/notes/store";
import { useEffect } from "react";
import { collection, getDocs, where, query } from "@firebase/firestore";
import { db, NotesCollection } from "~/firebase/config";
import { iNote } from "~/firebase/types/iNote";
import { NoteCard } from "~/components/notes/noteCard";

export default function Screen() {
  const { user } = useAuth();
  const { notes, addNote, removeNote } = useNotes();

  if (!user) {
    return <Redirect href={"/"} />;
  }

  useEffect(() => {
    const getNotes = async () => {
      // Get docs where usermail is equal to user.email

      const q = query(NotesCollection, where("usermail", "==", user.email));
      const docs = await getDocs(q);
      docs.forEach((doc) => {
        const dataDoc = doc.data();
        const note: iNote = {
          id: doc.id,
          usermail: dataDoc.usermail,
          title: dataDoc.title,
          content: dataDoc.content,
          feeling: dataDoc.feeling,
          date: new Date(dataDoc.date.seconds * 1000),
        };
        addNote(note);
      });
    };

    getNotes();
  }, []);

  return (
    <View className="p-6 gap-4 relative pb-32">
      <View className="w-full flex-row justify-around items-center">
        <Image
          source={{ uri: user.photoURL }}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text className="text-3xl font-bold">{user.name}</Text>
      </View>

      <ScrollView
        className="h-full flex-col gap-4 overflow-auto"
        showsVerticalScrollIndicator={false}
      >
        {notes.length === 0 && (
          <Text className="text-center">
            No notes yet. Add one with the button in the bottom right corner.
          </Text>
        )}
        {notes.map((note) => {
          return <NoteCard key={note.id} note={note} />;
        })}
      </ScrollView>
      <AddNote />
    </View>
  );
}
