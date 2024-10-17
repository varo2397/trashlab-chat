import React from 'react';
import StackHeader from '../stackHeader';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import IconButton from '../iconButton';
import { useRoute } from '@react-navigation/native';
import UserCircleInitial from '../userCircleInitial';
import { router } from 'expo-router';


type ConversationStackProps = {
    key: string;
    name: string;
    params: {
        otherUser: string;
    }
}
const ConversationStack = () => {
    const {params: {otherUser}} = useRoute<ConversationStackProps>();
    return (
        <StackHeader>
            <View style={styles.container}>
                <IconButton name='arrow-left' color={Colors.white100} onPress={() => router.back()}/>
                <UserCircleInitial text={otherUser} size={64} />
                <Text style={styles.titleText}>{otherUser}</Text>
            </View>
        </StackHeader>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: '900',
        color: Colors.white100,
    },
 });

export default ConversationStack;