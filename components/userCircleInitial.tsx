import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CircleProps {
    text: string;
    size: number;
}

const UserCircleInitial: React.FC<CircleProps> = ({ text, size }) => {
    const circleStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
    };
    const textStyle = {
        fontSize: size * 0.62,
    };

    return (
        <View style={[styles.circle, circleStyle]}>
            <Text style={[styles.text, textStyle]}>{text.charAt(0)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
});

export default UserCircleInitial;