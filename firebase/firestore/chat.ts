import { Chat, Message } from '@/types/chat';
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

export const watchIndividualChat = async (chatId: string, onSetChat: (chat: Message[]) => void) => {
    firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('sentAt', 'asc') // Order by timestamp (ascending order)
      .onSnapshot(
        (snapshot) => {
          const chatMessages: Message[] = [];
          snapshot.forEach((doc) => {
            chatMessages.push({
                ...doc.data() as Message,
                messageId: doc.id,
            });
          });
          onSetChat(chatMessages);
        },
        (error) => {
          console.error('Error fetching messages:', error);
        }
      );
}

