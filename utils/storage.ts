import AsyncStorage from '@react-native-async-storage/async-storage';
import { JournalRecord, StorageData } from '../types';

const STORAGE_KEY = '@terradice:records';

export const getRecords = async (): Promise<JournalRecord[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (jsonValue === null) {
      return [];
    }
    const data: StorageData = JSON.parse(jsonValue);
    return data.records || [];
  } catch (error) {
    console.error('Error loading records:', error);
    return [];
  }
};

export const saveRecord = async (record: JournalRecord): Promise<void> => {
  try {
    const existingRecords = await getRecords();
    const newRecords = [record, ...existingRecords];
    const data: StorageData = { records: newRecords };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving record:', error);
    throw error;
  }
};

export const deleteRecord = async (id: string): Promise<void> => {
  try {
    const existingRecords = await getRecords();
    const filteredRecords = existingRecords.filter(
      (record) => record.id !== id
    );
    const data: StorageData = { records: filteredRecords };
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error deleting record:', error);
    throw error;
  }
};

export const clearAllRecords = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing records:', error);
    throw error;
  }
};
