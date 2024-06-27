import { create } from "zustand";

export type MyUser = {
  email: string;
  name: string;
  photoURL?: string;
};

type AuthStoreType = {
  user: MyUser | null;
  isAuthenticated: boolean;
  setUser: (user: MyUser | null) => void;
};

const useAuth = create<AuthStoreType>((set) => ({
  user: null,
  setUser: (newUser: MyUser | null) =>
    set(() => {
      return {
        user: newUser,
        isAuthenticated: !!newUser,
      };
    }),
  isAuthenticated: false,
}));

export { useAuth };
