import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

const Home: React.FC = () => {
    const data = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
        { id: '4', name: 'Item 4' },
        { id: '5', name: 'Item 5' },
    ];

    const renderItem = ({ item }: { item: { id: string; name: string } }) => (
        <View style={{ padding: 10 }}>
            <Text>{item.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',   
    }
});

export default Home;