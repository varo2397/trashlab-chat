import ContactItem from '@/components/contact';
import IconButton from '@/components/iconButton';
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/context/authContext';
import { createChatBetweenUsers } from '@/firebase/firestore/chat';
import { fetchAvailableUsers } from '@/firebase/firestore/user';
import { User } from '@/types/user';
import { router } from 'expo-router';
import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const CreateChat = () => {
    const [users, setUsers] = useState<User[]>([]);
    const {user} = useContext(AuthContext);

    const onGetUsers = async () => {
        const contactsAvailable = await fetchAvailableUsers(user?.username || '');
        setUsers(contactsAvailable);
    }

    const onCreateNewChat = async (otherUser: string) => {
        const newChat = await createChatBetweenUsers(user?.username || '', otherUser);
        router.replace({pathname: '/chat/conversation', params: {otherUser, chatId: newChat.chatId}});
    }
    
    useEffect(() => {
        if(user) {
            onGetUsers();
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.cancel}>
                <IconButton size={32} name='close' fontSource='Ionicons' color={Colors.white100} onPress={() => router.back()} />
            </View>
            <FlatList
                ListHeaderComponent={() => <Text style={styles.listHeader} >All Contacts</Text>}
                style={styles.list}
                data={users}
                renderItem={({item}) => <ContactItem onPress={() =>  onCreateNewChat(item.username)} username={item.username} />}
                keyExtractor={(item) => item.userId}
                ListEmptyComponent={() => <View><Text>No contacts available</Text></View>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purple70,
    },
    list: {
        backgroundColor: 'white',
        paddingHorizontal: 24,
        paddingVertical: 32,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flexGrow: 1,
    },
    cancel: {
        right: 24,
        bottom: 56,
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: Colors.darkPurple50,
        zIndex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeader: {
        marginBottom: 16,
        color: Colors.darkPurple20,
        fontSize: 22,
        fontWeight: '900',
    }
    
});

export default CreateChat;