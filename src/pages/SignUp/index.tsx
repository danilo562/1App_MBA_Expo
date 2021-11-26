import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button, Text, View } from "react-native";

import MyTextInput from '../../components/MyTextInput';
import { snService } from '../../services/sn.service';
import { TypeRoutes } from '../../routes';

import styles from './styles';
import { User } from '../../entities';

export default function SignUp() {

    const navigation = useNavigation<NavigationProp<TypeRoutes>>();

    React.useEffect(() => {
        navigation.setOptions({ title: 'Novo Usuário' });
    }, []);

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmar, setConfirmar] = React.useState('');

    async function save() {
        if (!name || !email || !password) {
            alert('Todos os campos são obrigatórios!');
            return;
        }
        if (password !== confirmar) {
            alert('A senha não confere!');
            return;
        }
        
        const user: User = {
            email: email.toLowerCase(),
            name, password
        };
        
        const savedUser = await snService.create(user);
        try {
            if (savedUser && savedUser.id) {
                navigation.goBack();
            }
        } catch (error) {
            console.error('Erro ao criar um novo usuário: ', error);
            alert('Ocorreu um erro não esperado!');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Informe os dados do Usuário</Text>

            <MyTextInput title="Nome:" value={name} onChangeText={setName} />
            
            <MyTextInput title="Email:" value={email} onChangeText={setEmail} />

            <MyTextInput title="Senha:" value={password} onChangeText={setPassword} secureTextEntry />
            <MyTextInput title="Confirmar senha:" value={confirmar} onChangeText={setConfirmar} secureTextEntry />

            <Button title="Cadastrar" onPress={save} />

        </View>
    );
}