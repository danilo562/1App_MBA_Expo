import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View } from 'react-native';
import MyInputText from '../../components/MyTextInput';
import { Post, User } from '../../entities';

import storage from '../../repositories/storage';
import { TypeRoutes } from '../../routes';
import { snService } from '../../services/sn.service';
import styles from './styles';

export default function PostPage() {

    const [token, setToken] = React.useState('');
    const [owner, setOwner] = React.useState<User>();
    const [description, setDescription] = React.useState('');

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    React.useEffect(() => {
        storage.get().then(({ token, user }) => {
            if (token) setToken(token);
            if (user) setOwner(user);
        });
    }, [token]);

    async function save() {
        if (!owner) {
            alert('Sua sessão expirou!');
            navigation.navigate('Login');
        }
        if (description.trim() === '') {
            alert('O texto é obrigatório!');
            navigation.navigate('Login');
        }

        const post: Post = {
            description,
            owner: owner!,
            location: 'Salvador',
            image: '1'
        };
        await snService.createPost(token, post);
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <MyInputText title="Texto" onChangeText={setDescription} />
            <Button title="Postar" onPress={save} />
        </View>
    );
}