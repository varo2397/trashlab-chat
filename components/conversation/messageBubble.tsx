import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import UserCircleInitial from '../userCircleInitial';
import { Colors } from '@/constants/Colors';
import { TapGestureHandler, State, HandlerStateChangeEvent, TapGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { Message } from '@/types/chat';
import IconButton from '../iconButton';

type Props = {
    message: string;
    otherUsername?: string;
    time: Date;
    onDoubleTap: () => void;
    likes: Message['likes'];
}
const MessageBubble = ({message, otherUsername, time, onDoubleTap, likes}: Props) => {

    const onPressDoubleTap = (event: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            onDoubleTap();
        }
    }

    return (
        <View style={[styles.container, !otherUsername && styles.containerRight]}>
            {otherUsername && <UserCircleInitial text={otherUsername} size={24} />
            }
            <View style={[styles.dateAndMessageContainer, !otherUsername && styles.dateAndMessageContainerRight ]}>
                <TapGestureHandler
                    onHandlerStateChange={onPressDoubleTap}
                    numberOfTaps={2}
                >
                        <View style={[styles.messageContainer, !otherUsername && styles.messageContainerRight]}>
                            <Text style={[styles.message, !otherUsername && styles.messageRight]}>{message}</Text>
                            {likes.length > 0 && <View style={styles.likesContainer}>
                                <IconButton name="heart" size={18} color={Colors.red50} isSolid/>
                                {likes.length > 1 && <Text style={styles.likeText}>{likes.length}</Text>}
                            </View>}
                        </View>
                </TapGestureHandler>
                
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
    },
    likesContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: Colors.porcelain95,
        borderRadius: 100,
        position: 'absolute',
        bottom: -15,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    likesContainerRight: {
        right: 0,
        left: 12,
    },
    likeText: {
        fontSize: 14,
        color: Colors.black100,
        fontWeight: '400',
        marginLeft: 4,
    }

})

export default MessageBubble;