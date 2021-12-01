import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import PostItem from '../../components/PostItem';
import storage from '../../repositories/storage';
import { snService } from '../../services/sn.service';
import { TypeRoutes } from '../../routes';
import { Post } from '../../entities';
import styles from './styles';

export default function Home() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const [posts, setPosts] = React.useState<Post[]>();
    const [ refreshing, setRefreshing ] = React.useState(false);

    React.useEffect(() => {

        fetchPosts();

        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add-circle" size={28} color="blue" onPress={createPost}
                />
            )
        });

    }, []);

    function fetchPosts() {
        setRefreshing(true);

        storage.get().then(userInfo => {
            const token = userInfo.token as string;
            if (token) {
                snService.getPosts(token).then(posts => {
                    setRefreshing(false);
                    if (posts) setPosts(posts);
                    else alert('Ocorreu um erro ao recuperar as postagens!');
                });
            } else {
                setRefreshing(false);
                alert('Sessão expirada!');
                navigation.goBack();
            }
        });
    }

    function createPost() {
        navigation.navigate('Post');
    }

    if (!posts) return <Text>Carregando...</Text>

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            
            <FlatList
                data={posts}
                onRefresh={fetchPosts}
                refreshing={refreshing}
                renderItem={({ item }) => <PostItem post={item} />}
                keyExtractor={item => item.id ? item.id.toString() : ''}
            />

        </View>
    );
}