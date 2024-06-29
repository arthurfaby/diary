import { noteInterface } from "~/firebase/types/note.interface";
import { create } from "zustand";

interface NoteStoreType {
  notes: noteInterface[];
  addNote: (note: noteInterface) => void;
  removeNote: (note: noteInterface) => void;
  resetNotes: () => void;
}

const useNotes = create<NoteStoreType>((set) => ({
  notes: [],
  addNote: (note: noteInterface) =>
    set((state) => {
      if (state.notes.find((n) => n.id === note.id)) {
        return { notes: state.notes };
      }
      const newNotes = state.notes.concat(note);
      return {
        notes: newNotes.sort((a, b) => b.date.getTime() - a.date.getTime()),
      };
    }),
  removeNote: (note: noteInterface) =>
    set((state) => {
      const index = state.notes.indexOf(note);
      return {
        notes: state.notes.splice(index, 1),
      };
    }),
  resetNotes: () => set({ notes: [] }),
}));

export { useNotes };
