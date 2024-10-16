import { createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { User } from '@/types/user';
import { loginOrCreateUser } from '@/firebase/firestore/user';
import { router } from 'expo-router';

export const AuthContext = createContext<{
  signIn: (username: string) => Promise<void>;
  signOut: () => void;
  user: User | null;
  isLoading: boolean;
}>({
  signIn: async (username: string) => {},
  signOut: () => null,
  isLoading: false,
  user: null,
});



export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (username: string) => {
    setIsLoading(true);
    const loggedInUser = await loginOrCreateUser(username);
    setIsLoading(false);
    if(loggedInUser) {
      setUser(loggedInUser);
      router.replace('/chat');
    }
  }

  const signOut = () => {
    setUser(null);
    router.replace('/sign-in');
  }

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
