import { ScrollView, View } from "react-native";
import { Text } from "~/components/ui/text";
import { useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs, { Dayjs } from "dayjs";
import { iNote } from "~/firebase/types/iNote";
import { NoteCard } from "~/components/notes/noteCard";
import { useAuth } from "~/lib/auth/useAuth";
import { Redirect, usePathname } from "expo-router";
import { useNotes } from "~/lib/api/notes/store";

export function AgendaScreen() {
  const { colors } = useTheme();
  const [date, setDate] = useState(dayjs());
  const [dayNotes, setDayNotes] = useState<iNote[]>([]);
  const { user } = useAuth();
  const { notes } = useNotes();
  const pathname = usePathname();

  if (!user) {
    return <Redirect href="/" />;
  }

  useEffect(() => {
    setDate(dayjs());
  }, [pathname]);

  useEffect(() => {
    const newNotes: iNote[] = [];
    notes.forEach((note) => {
      if (note.date.toDateString() === date.toDate().toDateString()) {
        newNotes.push(note);
      }
    });
    setDayNotes(newNotes);
  }, [date, notes]);

  return (
    <View className="p-6 gap-4">
      <DateTimePicker
        date={date}
        mode="single"
        displayFullDays={true}
        selectedItemColor={colors.primary}
        onChange={(params) => {
          setDate(params.date as Dayjs);
        }}
      />
      <ScrollView className="h-[280px]" showsVerticalScrollIndicator={false}>
        {dayNotes.length === 0 && (
          <Text className="text-center">
            No notes for the {date.toDate().toLocaleDateString()}
          </Text>
        )}
        {dayNotes.map((note) => {
          return <NoteCard note={note} key={note.id} small={true} />;
        })}
      </ScrollView>
    </View>
  );
}
