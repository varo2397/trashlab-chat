import { User } from '@/types/user';
import firestore from '@react-native-firebase/firestore';
import { fetchChatsForUser } from './chat';

export const loginOrCreateUser = async (username: string): Promise<User | undefined> => {
    try {
        const userQuery = await firestore()
        .collection('users')
        .where('username', '==', username)
        .get();

        if (!userQuery.empty) {
            return {username: userQuery.docs[0].data().username, userId: userQuery.docs[0].id} as User;
        }
        const newUser = await firestore().collection('users').add({
            username,
        });
        return {username, userId: newUser.id} as User;
    }
    catch (error) {
        console.log(error);
    }
    
}

export const fetchUsersExceptCurrentUser = async (username: string): Promise<User[]> => {
    const usersSnapshot = await firestore()
      .collection('users')
      .where('username', '!=', username)
      .get();
  
    const users = usersSnapshot.docs.map((doc) => ({
        ...doc.data() as User,
        userId: doc.id,
    }));
  
    return users;
  };
  

  export const fetchAvailableUsers = async (currentUsername: string) => {
    const allUsers = await fetchUsersExceptCurrentUser(currentUsername);
    const userChats = await fetchChatsForUser(currentUsername);
  
    // Get the list of participants the current user already has chats with
    const usersInChat = new Set();
    userChats.forEach((chat) => {
      chat.participants.forEach((participantName) => {
        if (participantName !== currentUsername) {
          usersInChat.add(participantName);
        }
      });
    });
  
    // Filter out users that the current user already has a chat with
    const availableUsers = allUsers.filter((user) => !usersInChat.has(user.username));
  
    return availableUsers;
  };