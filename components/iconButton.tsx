import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Colors } from '@/constants/Colors';

type Props = {
    size?: number;
    onPress?: () => void;
    color?: Colors;
    name: string;
}
const DEFAULT_ICON_SIZE = 24;

const IconButton = ({onPress, size = DEFAULT_ICON_SIZE, color = Colors.black, name}: Props) => {
    return (
        <TouchableOpacity onPress={onPress} style={{width: size, height: size}}>
            <FontAwesome5 name={name} color={color} size={size} />
        </TouchableOpacity>
    );
};

export default IconButton;