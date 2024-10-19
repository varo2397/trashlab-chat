import { Colors } from '@/constants/Colors';
import React, { PropsWithChildren, useMemo } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    screenPercentage?: number;
}

const {height} = Dimensions.get('window');

const StackHeader = ({ screenPercentage = 0.25, children }: PropsWithChildren<Props>) => {
    const insets = useSafeAreaInsets();
    const headerStyle = useMemo(() => ({height: height * screenPercentage, paddingTop: insets.top}), [insets, height]);
    return (
        <View style={[styles.container, headerStyle]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.purple70,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
});

export default StackHeader;