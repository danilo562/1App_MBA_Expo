import React from 'react';
import * as Location from 'expo-location';
import { Button, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { TypeRoutes } from '../../routes';
import { Post, User } from '../../entities';
import storage from '../../repositories/storage';
import { snService } from '../../services/sn.service';
import MyInputText from '../../components/MyTextInput';

import styles from './styles';

export default function PostPage() {

    const [token, setToken] = React.useState('');
    const [owner, setOwner] = React.useState<User>();
    const [description, setDescription] = React.useState('');
    const [location, setLocation] = React.useState<Location.LocationObject | null>(null);

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    React.useEffect(() => {
        Location.requestForegroundPermissionsAsync().then(({ status }) => {
            if (status === 'granted') {
                Location.getCurrentPositionAsync({}).then(
                    location => setLocation(location)
                );
            }
        });
      }, []);

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

        let city = 'Salvador';

        if (location) {
            const addresses = await Location.reverseGeocodeAsync(location.coords);
            if (addresses[0].city) {
                city = addresses[0].city;
                
                if (addresses[0].isoCountryCode) {
                    city = city +', '+ addresses[0].isoCountryCode
                }
            }
        }
        console.log('Cidade: ', city);

        const post: Post = {
            description,
            owner: owner!,
            location: city,
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