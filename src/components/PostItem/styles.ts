import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({

    container: {
        marginTop: 20,
        width: Dimensions.get('window').width - 40,
    },

    text: {
        fontSize: 22
    },

    owner: {
        textAlign: 'right'
    }

});