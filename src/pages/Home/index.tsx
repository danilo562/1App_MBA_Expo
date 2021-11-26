import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

import styles from './styles';

export default function Home() {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            <Text style={styles.title}>Vamos começar a Aula</Text>
        </View>
    );
}