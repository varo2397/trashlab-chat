import React, { useContext } from 'react';
import StackHeader from '../stackHeader';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import IconButton from '../iconButton';
import { AuthContext } from '@/context/authContext';

const ChatStack = () => {
    const {signOut} = useContext(AuthContext);
    return (
        <StackHeader>
            <View style={styles.container}>
                <Text style={styles.titleText}>Messages</Text>
                <View style={styles.iconsContainer}>
                    <IconButton name='sign-out-alt' color={Colors.white100} onPress={signOut} />
                </View>
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

export default ChatStack;