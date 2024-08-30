import type { LoggedInUser } from '@/types/user';
import { create } from 'zustand';

interface LoggedInUserStoreState {
  loggedInUser?: LoggedInUser | undefined;
  setLoggedInUser?: (loggedInUser: LoggedInUser) => void;
}

export const useLoggedInUser = create<LoggedInUserStoreState>((set) => ({
  loggedInUser: undefined,
  setLoggedInUser: (loggedInUser: LoggedInUser) => set({ loggedInUser }),
}));
