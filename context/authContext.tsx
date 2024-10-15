import { createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { User } from '@/types/user';

export const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  user: User | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  isLoading: false,
  user: null,
});



export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const signIn = () => {}
  const signOut = () => {}

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
