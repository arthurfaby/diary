import { Image, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/auth/useAuth";
import { Redirect, usePathname } from "expo-router";
import { AddNote } from "~/components/notes/addNote";
import { useNotes } from "~/lib/api/notes/store";
import { useEffect } from "react";
import { getDocs, where, query } from "@firebase/firestore";
import { NotesCollection } from "~/firebase/config";
import { eFeelings, iNote } from "~/firebase/types/iNote";
import { NoteCard } from "~/components/notes/noteCard";
import { Feeling } from "~/components/notes/feeling";

export function ProfileScreen() {
  const { user } = useAuth();
  const { notes, addNote, removeNote } = useNotes();

  if (!user) {
    return <Redirect href={"/"} />;
  }

  const getFeelingPercentage = (feeling: eFeelings) => {
    if (notes.length === 0) {
      return 0;
    }
    return Math.round(
      (notes.filter((note) => note.feeling === feeling).length / notes.length) *
        100
    );
  };

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

      <View className=" flex-col gap-4">
        {notes.length === 0 && (
          <Text className="text-center">
            No notes yet. Add one with the button below.
          </Text>
        )}
        {notes.length === 1 && (
          <Text className="font-bold text-lg">Your last note :</Text>
        )}
        {notes.length > 1 && (
          <Text className="font-bold text-lg">Your 2 last notes :</Text>
        )}
        <View>
          {notes.length > 0 &&
            notes.slice(0, 2).map((note) => {
              return <NoteCard key={note.id} note={note} small={true} />;
            })}
        </View>
        {notes.length > 0 && (
          <Text className="font-bold text-lg">
            Feelings of your {notes.length} note{notes.length > 1 && "s"}
          </Text>
        )}
      </View>
      {notes.length > 0 && (
        <View className="flex flex-row gap-2 w-[100%]">
          <View className="flex gap-2 flex-col justify-center items-center flex-grow bg-secondary rounded-md p-2">
            <Feeling feeling={eFeelings.VERY_HAPPY} />
            <Text className="font-bold">
              {getFeelingPercentage(eFeelings.VERY_HAPPY)} %
            </Text>
          </View>
          <View className="flex gap-2 flex-col justify-center items-center flex-grow bg-secondary rounded-md p-2">
            <Feeling feeling={eFeelings.HAPPY} />
            <Text className="font-bold">
              {getFeelingPercentage(eFeelings.HAPPY)} %
            </Text>
          </View>
          <View className="flex gap-2 flex-col justify-center items-center flex-grow bg-secondary rounded-md p-2">
            <Feeling feeling={eFeelings.NEUTRAL} />
            <Text className="font-bold">
              {getFeelingPercentage(eFeelings.NEUTRAL)} %
            </Text>
          </View>
          <View className="flex gap-2 flex-col justify-center items-center flex-grow bg-secondary rounded-md p-2">
            <Feeling feeling={eFeelings.SAD} />
            <Text className="font-bold">
              {getFeelingPercentage(eFeelings.SAD)} %
            </Text>
          </View>
          <View className="flex gap-2 flex-col justify-center items-center flex-grow bg-secondary rounded-md p-2">
            <Feeling feeling={eFeelings.ANGRY} />
            <Text className="font-bold">
              {getFeelingPercentage(eFeelings.ANGRY)} %
            </Text>
          </View>
        </View>
      )}
      <AddNote />
    </View>
  );
}
