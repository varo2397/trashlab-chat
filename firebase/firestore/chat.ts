import { Chat, Message } from '@/types/chat';
import firestore from '@react-native-firebase/firestore';

export const watchUserChats = async (username: string, onSetChats: (chats: Chat[]) => void) => {
    return firestore()
      .collection('chats')
      .where('participants', 'array-contains', username)
      .onSnapshot(
        (snapshot) => {
          const userChats: Chat[] = [];
          snapshot.forEach((doc) => {
            userChats.push({
                ...doc.data() as Chat,
                chatId: doc.id,
            });
          });
          const sortedMessages = userChats.sort((a, b) => {
            if (a.lastMessageTimeStamp && b.lastMessageTimeStamp) {
              const aDate = a.lastMessageTimeStamp.toDate();
              const bDate = b.lastMessageTimeStamp.toDate();
              return bDate.getTime() - aDate.getTime();  // Ascending order
            }
            return 0; // In case the timestamps are undefined or missing
          });
          console.log(sortedMessages);
          onSetChats(sortedMessages);
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
      .orderBy('sentAt', 'desc') // Order by timestamp (ascending order)
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

export const fetchChatsForUser = async (username: string): Promise<Chat[]> => {
  const chatsSnapshot = await firestore()
    .collection('chats')
    .where('participants', 'array-contains', username)
    .get();

  const chats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data() as Chat,
    chatId: doc.id,
  }));

  return chats;
};

export const createChatBetweenUsers = async (username1: string, username2: string): Promise<Chat> => {
  try {
    const chatRef = firestore().collection('chats');

    // Step 1: Create a new chat with the two users
    const newChatData = {
      participants: [username1, username2],          // Participants in the chat
      lastMessage: '',                           // No message initially
      lastMessageTimeStamp: firestore.FieldValue.serverTimestamp(),                // To make it appear at the top
      createdAt: firestore.FieldValue.serverTimestamp(), // Time of creation
      lastMessageSender: ''
    };

    // Step 2: Add the new chat document to the 'chats' collection
    const newChatRef = await chatRef.add(newChatData);

    // @ts-ignore
    return { chatId: newChatRef.id, ...newChatData };

  } catch (error) {
    throw error;
  }
};