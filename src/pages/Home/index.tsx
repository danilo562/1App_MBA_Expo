import React from 'react';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import storage from '../../repositories/storage';
import { snService } from '../../services/sn.service';
import { TypeRoutes } from '../../routes';
import styles from './styles';

export default function Home() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const [posts, setPosts] = React.useState<any[]>();

    React.useEffect(() => {

        storage.get().then(token => {
            if (token) {
                snService.getPosts(token).then(posts => setPosts(posts));
            } else {
                alert('Sessão expirada!');
                navigation.goBack();
            }
        });

    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.title}>Temos atualmente {posts?.length} postagens.</Text>
        </View>
    );
}