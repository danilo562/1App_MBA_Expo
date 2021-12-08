import React from 'react';
import { Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import storage from '../../repositories/storage';
import MyTextInput from '../../components/MyTextInput';
import { snService } from '../../services/sn.service';
import { TypeRoutes } from '../../routes';

import styles from './styles';

export default function Login() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [marginLeft, setMarginLeft] = React.useState(20);

    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add-circle-outline" size={28} color="blue" onPress={goNewUser}
                />
            )
        });

        ScreenOrientation.addOrientationChangeListener(changeOrientation);
    }, []);

    function goNewUser() {
        navigation.navigate('SignUp');
    }

    async function login() {
        const token = await snService.login(email, password);
        if (token) {
            const user = await snService.getUser(token);
            await storage.save({ token, user });
            navigation.navigate('Home');
        } else {
            alert('Login inválido!');
        }
    }

    function changeOrientation(event: ScreenOrientation.OrientationChangeEvent) {
        if (event.orientationInfo.orientation === 4) {
            setMarginLeft(40);
        } else {
            setMarginLeft(20);
        }
    }

    return (
        <View style={{ ...styles.container, marginLeft }}>
            <MyTextInput title="E-mail:" value={email} onChangeText={setEmail} />
            
            <MyTextInput
                title="Senha:"
                value={password}
                secureTextEntry={true}
                onChangeText={setPassword}
            />

            <Button title="Entrar" onPress={login} />
        </View>
    );
}