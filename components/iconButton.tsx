import React, {useMemo} from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '@/constants/Colors';

type Props = {
    size?: number;
    onPress?: () => void;
    color?: Colors;
    name: string;
    style?: StyleProp<ViewStyle>;
    isSolid?: boolean;
    fontSource?: 'FontAwesome5' | 'MaterialIcons' | 'Ionicons';
}
const DEFAULT_ICON_SIZE = 24;

const IconButton = ({onPress, size = DEFAULT_ICON_SIZE, color = Colors.black100, name, style, isSolid, fontSource = 'FontAwesome5'}: Props) => {

    const Icon = useMemo(() => {
        switch (fontSource) {
            case 'MaterialIcons': 
                return <MaterialIcons name={name as keyof typeof MaterialIcons.glyphMap} color={color} size={size} style={style} solid={isSolid}/>
            case 'Ionicons':
                return <Ionicons name={name as keyof typeof Ionicons.glyphMap} color={color} size={size} style={style} solid={isSolid}/>
            default:
                return <FontAwesome5 name={name} color={color} size={size} style={style} solid={isSolid}/>
        }
    }, [fontSource, name, color, size, style, isSolid]);
    return (
        <TouchableOpacity onPress={onPress} style={{width: size, height: size}}>
            {Icon}
        </TouchableOpacity>
    );
};

export default IconButton;