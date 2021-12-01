import React from 'react';
import { Text, View } from 'react-native';

import { Post } from '../../entities';
import styles from './styles';

type Props = { post: Post }

export default function PostItem({ post }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{post.description}</Text>
            <Text style={styles.owner}>{post.owner.name}</Text>
        </View>
    );
}