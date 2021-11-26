import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {

    private readonly KEY = "SN_TOKEN";

    public async get() {
        return await AsyncStorage.getItem(this.KEY);
    }

    public async save(token: string) {
        await AsyncStorage.setItem(this.KEY, token);
    }

}

export default new Storage();