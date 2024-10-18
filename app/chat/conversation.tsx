import React, {useState, useEffect, useContext, useRef} from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TextInput from '@/components/textInput';
import { Message } from '@/types/chat';
import { watchIndividualChat } from '@/firebase/firestore/chat';
import { AuthContext } from '@/context/authContext';
import { likeMessage, sendImageMessage, sendMessage, unlikeMessage } from '@/firebase/firestore/message';
import MessageBubble from '@/components/conversation/messageBubble';
import IconButton from '@/components/iconButton';
import { Colors } from '@/constants/Colors';
import { pickImage, takePhoto } from '@/services/image-picker';

const Conversation = () => {
    const {user} = useContext(AuthContext);
    const {chatId} = useLocalSearchParams<{chatId: string}>();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);
    
    const onPressSend = () => {
        if(chatId && user && newMessage) {
            sendMessage(chatId, user.username, newMessage);
            setNewMessage('');
        }
    }

    const onDoubleTapMessage = async(messageId: string, likes: string[]) => {
        const hasLiked = likes.includes(user?.username || '');
        if(hasLiked) {
            await unlikeMessage(chatId, messageId, user?.username || '');
        } else {
            await likeMessage(chatId, messageId, user?.username || '');
        }
    }

    const onSelectGallery = async () => {
        const data = await pickImage();
        if(data) {
            await sendImageMessage(chatId, user?.username || '', data.uri);
        }
    }
    const onSelectCamera = async () => {
        const data = await takePhoto();
        if(data) {
            await sendImageMessage(chatId, user?.username || '', data.uri);
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
                    inverted
                    ref={flatListRef}
                    contentContainerStyle={styles.listContainer}
                    data={messages}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd({animated: true})}
                    renderItem={({item}) => {
                        return  (
                            <MessageBubble 
                                otherUsername={item.senderName !== user?.username ? item.senderName : undefined} 
                                message={item.text ? item.text : item.imageUrl || ''} 
                                time={item?.sentAt?.toDate()}
                                onDoubleTap={() => onDoubleTapMessage(item.messageId, item.likes)}
                                likes={item.likes}
                                messageType={item.text ? 'text' : 'image'}
                            />
                        )
                    }
                       
                    }
                    ListHeaderComponent={() => <View style={styles.listheader} />}
                />
                <View style={styles.bottomContainer}>
                    <TextInput  
                        textInputProps={{
                            value: newMessage, 
                            onChangeText: (text) => setNewMessage(text)
                        }}
                    />
                    {newMessage ? <IconButton name='arrow-right' color={Colors.darkPurple50} onPress={onPressSend} /> :
                        <>
                            <IconButton name='image' color={Colors.darkPurple50} onPress={onSelectGallery}/>
                            <IconButton name='camera' color={Colors.darkPurple50} onPress={onSelectCamera}/>
                        </>
                    }
                    
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