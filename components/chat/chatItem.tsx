import React, { useContext, useMemo } from 'react';
import { Chat } from '@/types/chat';
import { AuthContext } from '@/context/authContext';
import {format, differenceInHours, differenceInDays} from 'date-fns';
import { router } from 'expo-router';
import ContactItem from '../contact';

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
        const date = chat.lastMessageTimeStamp?.toDate() ?? new Date();
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
        <ContactItem onPress={() => router.push({ pathname: '/chat/conversation', params: {chatId: chat.chatId, otherUser}})} username={otherUser || ''} lastMesageTime={lastMesageTime} lastMessage={chat.lastMessage} />
    );
};


export default ChatItem;