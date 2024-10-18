import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';

type Props = {
    size?: number;
    onPress?: () => void;
    color?: Colors;
    name: string;
    style?: StyleProp<ViewStyle>;
    isSolid?: boolean;
}
const DEFAULT_ICON_SIZE = 24;

const IconButton = ({onPress, size = DEFAULT_ICON_SIZE, color = Colors.black100, name, style, isSolid}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={{width: size, height: size}}>
            <FontAwesome5 name={name} color={color} size={size} style={style} solid={isSolid}/>
        </TouchableOpacity>
    );
};

export default IconButton;