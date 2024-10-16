import { User } from '@/types/user';
import firestore from '@react-native-firebase/firestore';

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