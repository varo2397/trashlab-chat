import { AuthProvider } from "@/context/authContext";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const RootLayout = () => {
  return (
    <GestureHandlerRootView>
      <AuthProvider>
        <Slot />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default RootLayout;