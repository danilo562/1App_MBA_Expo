import React from 'react';
import { Text, View } from 'react-native';

import { Post } from '../../entities';
import storage from '../../repositories/storage';
import styles from './styles';

type Props = { post: Post }

export default function PostItem({ post }: Props) {

    const [isOwner, setIsOwner] = React.useState(false);

    storage.get().then(({ user }) => {
        setIsOwner(post.owner.id === user.id);
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{post.description}</Text>
            <View style={styles.info}>
                <Text style={styles.city}>{post.location}</Text>
                { !isOwner && (<Text style={styles.owner}>{post.owner.name}</Text>) }
            </View>
        </View>
    );
}