import { createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { loginOrCreateUser } from '@/firebase/firestore/user';
import { router } from 'expo-router';
import { getItemAsyncStorage, setItemAsyncStorage, removeItemAsyncStorage } from '@/services/async-storage';

const USER_ASYNC_STORAGE_KEY = 'user';

export const AuthContext = createContext<{
  signIn: (username: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
  isLoading: boolean;
}>({
  signIn: async (username: string) => {},
  signOut: async () => {},
  isLoading: false,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (username: string) => {
    setIsLoading(true);
    const loggedInUser = await loginOrCreateUser(username);
    await setItemAsyncStorage(USER_ASYNC_STORAGE_KEY, loggedInUser);
    setIsLoading(false);
    if(loggedInUser) {
      setUser(loggedInUser);
      router.replace('/chat');
    }
  }

  const signOut = async () => {
    setUser(null);
    await removeItemAsyncStorage(USER_ASYNC_STORAGE_KEY)
    router.replace('/sign-in');
  }

  const getUserFromStorage = async () => {
    const user = await getItemAsyncStorage<User>(USER_ASYNC_STORAGE_KEY);
    if(user) {
      setUser(user);
      router.replace('/chat');
    }
  }

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if(!user) {
      router.replace('/sign-in');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
        signIn,
        signOut,
        user,
        isLoading, 
    }}>
        {children}
    </AuthContext.Provider>
  );
}
