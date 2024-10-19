import Button from '@/components/button';
import TextInput from '@/components/textInput';
import { Colors } from '@/constants/Colors';
import { AuthContext } from '@/context/authContext';
import React, {useContext, useState} from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HelloWorld: React.FC = () => {
    const [username, setUsername] = useState('');
    const insets = useSafeAreaInsets();
    const {signIn} = useContext(AuthContext);
    const onLoginOrSignUp = () => {
        signIn(username.trim());
    }
    return (
        <View style={[styles.container, {paddingTop: insets.top}]}>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcomeText}>Welcome <Text style={styles.toText}>to</Text></Text>
                <Image source={require('@/assets/images/login.png')} />
            </View>
            <View style={styles.content}>
                <Text style={styles.loginText}>Log in</Text>
                <Text style={styles.descriptionText}>Log in to dive into your conversations, share moments, and keep your connections active anytime</Text>
                <View style={styles.textInputContainer}>
                    <TextInput textInputProps={{value:username, onChangeText:(text) => setUsername(text)}} label='User' icon='user-alt' color={Colors.darkPurple50} />
                </View>
                <View style={styles.loginButtonContainer}>
                    <Button text="Continue" onPress={onLoginOrSignUp} disabled={!username}/>
                </View>
                
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.purple70,
    },
    welcomeContainer: {
        height: '42%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
    },
    welcomeText: {
        fontSize: 32,
        color: Colors.darkPurple20,
        fontWeight: '900',
    },
    toText: {
        color: Colors.white100,
    },
    content: {
        flex: 1,
        backgroundColor: Colors.white100,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingVertical: 32,
        paddingHorizontal: 24,
    },
    loginText: {
        fontSize: 26,
        fontWeight: '900',
        marginBottom: 16,
        color: Colors.darkPurple20,
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: '300',
        color: Colors.grey30,
        marginBottom: 32,
    },
    textInputContainer: {
        height: 72,
    },
    loginButtonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }
});

export default HelloWorld;