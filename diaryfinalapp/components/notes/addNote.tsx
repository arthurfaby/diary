import { useTheme } from "@react-navigation/native";
import { Plus } from "lucide-react-native";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Text } from "~/components/ui/text";
import { useAuth } from "~/lib/auth/useAuth";
import { Redirect } from "expo-router";
import { Input } from "~/components/ui/input";
import { useEffect, useState } from "react";
import { eFeelings, iNote } from "~/firebase/types/iNote";
import { Textarea } from "~/components/ui/textarea";
import { addDoc } from "@firebase/firestore";
import { NotesCollection } from "~/firebase/config";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import { useNotes } from "~/lib/api/notes/store";

function createRandomId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function AddNote() {
  const { user } = useAuth();
  const { addNote } = useNotes();
  const { colors } = useTheme();

  const [feeling, setFeeling] = useState<eFeelings | "null">(eFeelings.NEUTRAL);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);

  if (!user) {
    return <Redirect href="/" />;
  }

  const handleNewNote = async () => {
    if (title === "" || content === "" || feeling === "null") {
      return;
    }

    const noteData: Omit<iNote, "id"> = {
      title,
      content,
      feeling,
      usermail: user.email,
      date: new Date(),
    };

    try {
      const docRef = await addDoc(NotesCollection, noteData);
      const newNote: iNote = {
        ...noteData,
        id: docRef.id,
      };
      addNote(newNote);
    } catch (e) {
      console.log("Error adding document: ", e);
    }
  };

  useEffect(() => {
    setFormValid(title.length > 0 && content.length > 0 && feeling != "null");
  }, [title, content, feeling]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus color={colors.background} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <Text className="text-xl">Create a note</Text>
        </DialogTitle>
        <Input placeholder="Title" onChangeText={setTitle} />
        <Textarea
          className="h-[100px]"
          placeholder="Content"
          multiline={true}
          numberOfLines={4}
          onChangeText={setContent}
        />
        <Text>How are you ?</Text>
        <RNPickerSelect
          value={feeling}
          onValueChange={(value) => setFeeling(value as eFeelings)}
          items={[
            { label: "Very Happy", value: eFeelings.VERY_HAPPY },
            { label: "Happy", value: eFeelings.HAPPY },
            { label: "Neutral", value: eFeelings.NEUTRAL },
            { label: "Sad", value: eFeelings.SAD },
            { label: "Angry", value: eFeelings.ANGRY },
          ]}
        />
        <DialogFooter className="flex-row">
          <DialogClose asChild>
            <Button variant="secondary">
              <Text>Annuler</Text>
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onPress={handleNewNote} disabled={!formValid}>
              <Text>Enregistrer</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
