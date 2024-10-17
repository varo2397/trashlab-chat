import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import UserCircleInitial from '../userCircleInitial';
import { Colors } from '@/constants/Colors';

type Props = {
    message: string;
    otherUsername?: string;
    time: Date;
}
const MessageBubble = ({message, otherUsername, time}: Props) => {
    return (
        <View style={[styles.container, !otherUsername && styles.containerRight]}>
            {otherUsername && <UserCircleInitial text={otherUsername} size={24} />
            }
            <View style={[styles.dateAndMessageContainer, !otherUsername && styles.dateAndMessageContainerRight ]}>
                <View style={[styles.messageContainer, !otherUsername && styles.messageContainerRight]}>
                    <Text style={[styles.message, !otherUsername && styles.messageRight]}>{message}</Text>
                </View>
                <Text style={styles.time}>{format(time, 'h:mm a')}</Text>
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
    containerRight: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    messageContainer: {
        padding: 12,
        backgroundColor: Colors.darkPurple90,
        borderRadius: 12,
        width: '100%',
        marginBottom: 4,
    },
    messageContainerRight: {
        backgroundColor: Colors.darkPurple40
    },
    message: {
        color: Colors.darkBlue20,
        textAlign: 'left',
        fontSize: 16,
    },
    messageRight: {
        color: Colors.white100,
    },
    dateAndMessageContainer: {
        flexGrow: 1,
    },
    dateAndMessageContainerRight: {
        alignItems: 'flex-end',
    },
    time: {
        fontSize: 14,
        color: Colors.grey30,
    }
})

export default MessageBubble;