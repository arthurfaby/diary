import { iNote } from "~/firebase/types/iNote";
import { create } from "zustand";

interface NoteStoreType {
  notes: iNote[];
  addNote: (note: iNote) => void;
  removeNote: (note: iNote) => void;
  resetNotes: () => void;
  getNote(id: string): iNote | undefined;
}

const useNotes = create<NoteStoreType>((set) => ({
  notes: [],
  addNote: (note: iNote) =>
    set((state) => {
      if (state.notes.find((n) => n.id === note.id)) {
        return { notes: state.notes };
      }
      const newNotes = state.notes.concat(note);
      return {
        notes: newNotes.sort((a, b) => b.date.getTime() - a.date.getTime()),
      };
    }),
  removeNote: (note: iNote) =>
    set((state) => {
      return {
        notes: state.notes.filter((n) => n.id !== note.id),
      };
    }),
  resetNotes: () => set({ notes: [] }),
  getNote: (id: string) => {
    const state: NoteStoreType = useNotes.getState();
    return state.notes.find((note) => note.id === id);
  },
}));

export { useNotes };
