import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import dayjs, { Dayjs } from "dayjs";
import { iNote } from "~/firebase/types/iNote";
import { NoteCard } from "~/components/notes/noteCard";
import { getDocs, query, Timestamp, where } from "@firebase/firestore";
import { NotesCollection } from "~/firebase/config";
import { useAuth } from "~/lib/auth/useAuth";
import { Redirect } from "expo-router";
import { useNotes } from "~/lib/api/notes/store";

export function AgendaScreen() {
  const { colors } = useTheme();
  const [date, setDate] = useState(dayjs());
  const [dayNotes, setDayNotes] = useState<iNote[]>([]);
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/" />;
  }

  useEffect(() => {
    const getNotes = async () => {
      const q = query(NotesCollection, where("usermail", "==", user.email));
      const docs = await getDocs(q);
      console.log("docs", docs, docs.size);
      const newNotes: iNote[] = [];
      docs.forEach((doc) => {
        const dataDoc = doc.data();
        console.log(dataDoc);
        const note: iNote = {
          id: doc.id,
          usermail: dataDoc.usermail,
          title: dataDoc.title,
          content: dataDoc.content,
          feeling: dataDoc.feeling,
          date: new Date(dataDoc.date.seconds * 1000),
        };
        if (note.date.toDateString() === date.toDate().toDateString()) {
          newNotes.push(note);
        }
      });
      setDayNotes(newNotes);
    };

    getNotes();
  }, [date]);

  return (
    <View className="p-6 gap-4">
      <DateTimePicker
        date={date}
        mode="single"
        selectedItemColor={colors.primary}
        onChange={(params) => {
          setDate(params.date as Dayjs);
        }}
      />
      <ScrollView className="h-[280px]" showsVerticalScrollIndicator={false}>
        {dayNotes.length === 0 && (
          <Text className="text-center">No notes for this day</Text>
        )}
        {dayNotes.map((note) => {
          return <NoteCard note={note} key={note.id} small={true} />;
        })}
      </ScrollView>
    </View>
  );
}
