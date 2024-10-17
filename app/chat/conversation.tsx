import React, {useState, useEffect, useContext} from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TextInput from '@/components/textInput';
import { Message } from '@/types/chat';
import { watchIndividualChat } from '@/firebase/firestore/chat';
import { AuthContext } from '@/context/authContext';
import { sendMessage } from '@/firebase/firestore/message';
import MessageBubble from '@/components/conversation/messageBubble';
import IconButton from '@/components/iconButton';
import { Colors } from '@/constants/Colors';

const Conversation = () => {
    const {user} = useContext(AuthContext);
    const {chatId} = useLocalSearchParams<{chatId: string}>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const onPressSend = () => {
        if(chatId && user && newMessage) {
            sendMessage(chatId, user.username, newMessage);
            setNewMessage('');
        }
    }
    useEffect(() => {
        let unsubscribe: any;
        if(chatId) {
            unsubscribe = watchIndividualChat(chatId, (messages) => setMessages(messages));
        }
    }, []);
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <FlatList 
                    contentContainerStyle={styles.listContainer}
                    data={messages} 
                    renderItem={({item}) => 
                        <MessageBubble 
                            otherUsername={item.senderName !== user?.username ? item.senderName : undefined} 
                            message={item.text || ''} 
                            time={item.sentAt.toDate()}
                        />
                    }
                    ListHeaderComponent={() => <View style={styles.listheader} />}
                />
                <View style={styles.bottomContainer}>
                    <TextInput 
                        onPressIcon={onPressSend} 
                        textInputProps={{
                            value: newMessage, 
                            onChangeText: (text) => setNewMessage(text)
                        }}
                    />
                    <IconButton name='camera' color={Colors.darkPurple50}/>
                    <IconButton name='arrow-right' color={Colors.darkPurple50} />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purple70,
    },
    content: {
        flex: 1,
        paddingBottom: 28,
        paddingHorizontal: 24,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        backgroundColor: Colors.white100,
    },
    listContainer: {
        flexGrow: 1,
    },
    listheader: {
        
        paddingVertical: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    }
});

export default Conversation;