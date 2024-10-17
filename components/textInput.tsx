import React from 'react';
import { View, Text, TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import IconButton from './iconButton';

type Props = {
    textInputProps?: TextInputProps;
    icon?: string;
    label?: string;
    hintLabel?: string;
    color?: Colors;
    onPressIcon?: () => void
}

const TextInput = ({textInputProps, color = Colors.black100, hintLabel, icon, label, onPressIcon}: Props) => {
    return (
        <>
            {label && <Text style={styles.labelText}>{label}</Text>}
            <View style={[styles.textInputContainer, {borderColor: color}]}>
                <RNTextInput style={styles.textInput} {...textInputProps} />
                {icon && <IconButton name={icon} size={24} color={color} onPress={onPressIcon} />}
            </View>
            {hintLabel && <Text style={styles.hintLabelText}>{hintLabel}</Text>}
            
        </>
    );
};

const styles = StyleSheet.create({
    textInputContainer: {
        flexGrow: 1,
        padding: 10,
        flexDirection: 'row',
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        paddingRight: 10,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
    },
    hintLabelText: {
        fontSize: 12,
        fontWeight: '300',
    }
})

export default TextInput;