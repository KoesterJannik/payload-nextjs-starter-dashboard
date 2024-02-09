import { create } from "zustand";

interface UserState {
  user: {
    email: string;
    role: string;
    profileImage: {
      url: string;
    };
  };
  setUser: (user: {
    email: string;
    role: string;
    profileImage: {
      url: string;
    };
  }) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: { email: "", role: "", profileImage: { url: "" } },
  setUser: (user) => set({ user }),
}));
