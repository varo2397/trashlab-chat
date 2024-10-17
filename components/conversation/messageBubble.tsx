import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import UserCircleInitial from '../userCircleInitial';

type Props = {
    message: string;
    otherUsername?: string;
    time: Date;
}
const MessageBubble = ({message, otherUsername, time}: Props) => {
    return (
        <View style={[styles.container, !otherUsername ? styles.messageRight : {}]}>
            {otherUsername && <UserCircleInitial text={otherUsername} size={24} />
            }
            <View style={[styles.dateAndMessageContainer, !otherUsername ? styles.dateAndMessageContainerRight : {}]}>
                <Text style={styles.messageContainer}>{message}</Text>
                <Text>{format(time, 'h:mm a')}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '75%',
        alignItems: 'center',
        gap: 8,
    },
    messageRight: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    messageContainer: {
        padding: 12,
        borderRadius: 12,
        width: '100%',
        borderColor: 'red',
        borderWidth: 1,
        marginBottom: 4,
        textAlign: 'left',
    },
    dateAndMessageContainer: {
        flexGrow: 1,
    },
    dateAndMessageContainerRight: {
        alignItems: 'flex-end',
    },
})

export default MessageBubble;