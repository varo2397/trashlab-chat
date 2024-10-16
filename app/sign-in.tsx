import { AuthContext } from '@/context/authContext';
import React, {useContext, useState} from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';

const HelloWorld: React.FC = () => {
    const [username, setUsername] = useState('');
    const {signIn, isLoading} = useContext(AuthContext);
    const onLoginOrSignUp = () => {
        signIn(username);
    }
    return (
        <View style={styles.container}>
            <TextInput placeholder="Enter your user" value={username} onChangeText={(text) => setUsername(text)} />
            <Button title="Sign In" onPress={onLoginOrSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HelloWorld;