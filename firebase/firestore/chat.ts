import { Chat } from '@/types/chat';
import firestore from '@react-native-firebase/firestore';

export const watchUserChats = async (username: string, onSetChats: (chats: Chat[]) => void) => {
    return firestore()
      .collection('chats')
      .where('participants', 'array-contains', username)
      .onSnapshot(
        (snapshot) => {
          const userChats: Chat[] = [];
          console.log(snapshot.docs, 'snapshot');
          snapshot.forEach((doc) => {
            userChats.push({
                ...doc.data() as Chat,
                chatId: doc.id,
            });
          });
            onSetChats(userChats);
        },
        (error) => {
          console.error('Error fetching user chats:', error);
        }
      );
}