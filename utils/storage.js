import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@taskmate_tasks';

export const storeTasks = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    } catch (e) {
        console.error('Error storing tasks:', e);
    }
};

export const getTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error reading tasks:', e);
        return [];
    }
};
