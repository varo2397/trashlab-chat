import ChatItem from '@/components/chat/chatItem';
import IconButton from '@/components/iconButton';
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/context/authContext';
import { watchUserChats } from '@/firebase/firestore/chat';
import { Chat } from '@/types/chat';
import { router } from 'expo-router';
import React, {useContext, useEffect, useState} from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';

const Home: React.FC = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const {user} = useContext(AuthContext);
    
    useEffect(() => {
        let unsubscribe: any;
        if(user?.userId) {
            unsubscribe = watchUserChats(user.username, (chats) => setChats(chats));
        }
    }, [user, setChats]);
    

    return (
        <View style={styles.container}>
            <View style={styles.createChat}>
                <IconButton size={32} name='message' fontSource='MaterialIcons' color={Colors.white100} onPress={() => router.navigate('/chat/createChat')} />
            </View>
            <FlatList
                style={styles.list}
                data={chats}
                renderItem={({item}) => <ChatItem chat={item} />}
                keyExtractor={(item) => item.chatId}
                ListEmptyComponent={() => <View><Text>No chats</Text></View>}
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
    createChat: {
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
    }
    
});

export default Home;