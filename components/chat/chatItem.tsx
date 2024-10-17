import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Chat } from '@/types/chat';
import { AuthContext } from '@/context/authContext';
import { Colors } from '@/constants/Colors';
import {format, differenceInHours, differenceInDays} from 'date-fns';
import { router } from 'expo-router';
import UserCircleInitial from '../userCircleInitial';

type Props = {
    chat: Chat;
}

const LESS_THAN_A_DAY = 24;
const LESS_THAN_A_WEEK = 7

const ChatItem = ({chat}: Props) => {
    const {user} = useContext(AuthContext);
    const otherUser = chat.participants.find((username) => username !== user?.username)
    const lastMesageTime = useMemo(() => {
        const now = new Date();
        const date = chat.lastMessageTimeStamp.toDate();
        const hoursDifference = differenceInHours(now, date)
        const daysDifference = differenceInDays(now, date)
        if(hoursDifference < LESS_THAN_A_DAY) {
            return format(date, 'h:mm a');
        } else if(daysDifference < LESS_THAN_A_WEEK) {
            return format(date, 'EEEE');
        } else {
            return format(date, 'd/MM/yy');
        }
    }, [chat.lastMessageTimeStamp]);
    return (
        <TouchableOpacity style={styles.container} onPress={() => router.push({ pathname: '/chat/conversation', params: {chatId: chat.chatId, otherUser}})}>
            <UserCircleInitial text={otherUser || ''} size={64}/>
            <View style={styles.nameAndLastMessageContainer}>
                <Text style={styles.nameText}>{otherUser}</Text>
                <Text style={styles.lastMessageText}>{chat.lastMessage}</Text>
            </View>
            <View style={styles.lastmessageTimeContainer}>
                <Text>{lastMesageTime}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 12,
        borderBottomColor: Colors.grey90,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    bubbleContainer: {
        width: 64,
        height: 64,
        backgroundColor: 'blue',
        opacity: 0.5,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    bubble: {
        fontSize: 24,
        color: 'white',
    },
    nameAndLastMessageContainer: {
        flexGrow: 1,
        justifyContent: 'space-evenly',
        marginLeft: 12,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '900',
    },
    lastMessageText: {
        fontSize: 14,
        fontWeight: '400',
    },
    lastmessageTimeContainer: {
        justifyContent: 'flex-end'
    }
})

export default ChatItem;