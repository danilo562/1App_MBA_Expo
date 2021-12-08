import React from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Dimensions, Text, TextInput, TextInputProps, View } from 'react-native';

import styles from './styles';

const WIDTH = Dimensions.get('window').width - 40;
const HEIGHT = Dimensions.get('window').height - 60;

interface Props extends TextInputProps {
    title: string;
}

export default function MyInputText(props: Props) {

    const [width, setWidth] = React.useState(WIDTH);

    React.useEffect(() => {
        ScreenOrientation.addOrientationChangeListener(changeOrientation);
    });

    function changeOrientation({ orientationInfo }: ScreenOrientation.OrientationChangeEvent) {
        if (orientationInfo.orientation === 3 || orientationInfo.orientation === 4) {
            setWidth(HEIGHT);
        } else {
            setWidth(WIDTH);
        }
    }

    return (
        <View>
            <Text style={styles.label}>{props.title}</Text>
            <TextInput style={{ ...styles.input, width }} {...props} />
        </View>
    );
}