import { create } from "zustand";
import { User } from "firebase/auth";

type AuthStoreType = {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
};

const useAuth = create<AuthStoreType>((set) => ({
  user: null,
  setUser: (newUser: User | null) =>
    set(() => {
      return {
        user: newUser,
        isAuthenticated: !!newUser,
      };
    }),
  isAuthenticated: false,
}));

export { useAuth };
