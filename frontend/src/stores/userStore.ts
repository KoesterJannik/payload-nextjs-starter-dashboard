import { create } from "zustand";

interface UserState {
  user: {
    id: string;
    email: string;
    role: string;
    profileImage: {
      url: string;
    };
  };
  setUser: (user: {
    email: string;
    id: string;
    role: string;
    profileImage: {
      url: string;
    };
  }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { id: "", email: "", role: "", profileImage: { url: "" } },
  setUser: (user) => set({ user }),
}));
