import React from 'react';
import { Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

    React.useEffect(() => {

        navigation.setOptions({
            headerRight: () => (
                <Ionicons
                    name="add-circle-outline" size={28} color="blue" onPress={goNewUser}
                />
            )
        });

    }, []);

    function goNewUser() {
        navigation.navigate('SignUp');
    }

    async function login() {
        const token = await snService.login(email, password);
        if (token) {
            await storage.save(token);
            navigation.navigate('Home');
        } else {
            alert('Login inválido!');
        }
    }

    return (
        <View style={styles.container}>
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