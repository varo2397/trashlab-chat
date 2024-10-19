import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import UserCircleInitial from './userCircleInitial';

type Props = {
    username: string;
    onPress: () => void;
    lastMessage?: string;
    lastMesageTime?: string;

}

const LESS_THAN_A_DAY = 24;
const LESS_THAN_A_WEEK = 7

const ContactItem = ({onPress, username, lastMesageTime, lastMessage}: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <UserCircleInitial text={username} size={64}/>
            <View style={styles.nameAndLastMessageContainer}>
                <Text style={styles.nameText}>{username}</Text>
                {lastMessage && <Text style={styles.lastMessageText}>{lastMessage}</Text>}
            </View>
            { lastMesageTime &&<View style={styles.lastmessageTimeContainer}>
                <Text>{lastMesageTime}</Text>
            </View>}
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

export default ContactItem;