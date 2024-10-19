import React from 'react';
import StackHeader from '../stackHeader';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

const CreateChatStack = () => {
    return (
        <StackHeader>
            <View style={styles.container}>
                <Text style={styles.titleText}>New chat</Text>
            </View>
        </StackHeader>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 32,
        fontWeight: '900',
        color: Colors.white100,
    },
    iconsContainer: {
        flexDirection: 'row',
    }
 });

export default CreateChatStack;