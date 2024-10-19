import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
    text: string;
    disabled?: boolean;
    onPress: () => void;
}

const Button = ({onPress, text, disabled}: Props) => {
    return (
        <TouchableOpacity style={[styles.container, disabled && styles.containerDisabled]} onPress={onPress}>
            <Text style={[styles.text, disabled && styles.textDisabled]}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 18,
        backgroundColor: Colors.darkPurple50,
        borderRadius: 16,
    },
    containerDisabled: {
        backgroundColor: Colors.grey70,
    },
    text: {
        color: Colors.white100,
        textAlign: 'center',
    },
    textDisabled: {
        color: Colors.grey50,
    }
})

export default Button;