import React, {useMemo} from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
    text: string;
    size: number;
}

const UserCircleInitial = ({ text, size }: Props) => {
    const circleStyle = useMemo(() => ({
        width: size,
        height: size,
        borderRadius: size / 2,
    }), [size]);
    const textStyle = useMemo(() => ({
        fontSize: size * 0.62,
    }), [size]); ;

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