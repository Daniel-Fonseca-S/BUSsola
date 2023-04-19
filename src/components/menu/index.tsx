import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Menu() {
    return (
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={{fontSize: 30}}>teste</Text>
            </View>
            <Text>Menu</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    navbar: {
        flex: 1,
        backgroundColor: '#fff600',
        alignItems: 'center',
        justifyContent: 'flex-end',
        maxHeight: 1500,
        width: 1500,
        padding: 20,
        borderRadius: 750,
        marginTop: -1400,
    },
});