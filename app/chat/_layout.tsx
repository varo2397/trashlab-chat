import { Redirect, Stack } from 'expo-router';

import { AuthContext } from '@/context/authContext';
import { useContext } from 'react';
import Loader from '@/components/loader';
import ChatStack from '@/components/chat/chatStack';
import ConversationStack from '@/components/conversation/messageStack';
import CreateChatStack from '@/components/createChat/createChatStack';

const HomeLayout = () => {
  const { isLoading, user } = useContext(AuthContext);
  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return <Stack>
    <Stack.Screen name='index' options={{header: () => <ChatStack />}} />
    <Stack.Screen name='conversation' options={{header: () => <ConversationStack />}} />
    <Stack.Screen name='createChat' options={{header: () => <CreateChatStack />}} />
  </Stack>;
}

export default HomeLayout;
