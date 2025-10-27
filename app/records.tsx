import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { getRecords, deleteRecord } from '../utils/storage';
import { JournalRecord } from '../types';
import { useTranslation } from 'react-i18next';

export default function RecordsScreen() {
  const { t, i18n } = useTranslation();
  const [records, setRecords] = useState<JournalRecord[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadRecords = async () => {
    try {
      const data = await getRecords();
      setRecords(data);
    } catch (error) {
      console.error('Error loading records:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecords();
    setRefreshing(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert(t('records.deleteTitle'), t('records.deleteMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('common.delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteRecord(id);
            await loadRecords();
            Alert.alert(t('common.done'), t('records.deleteSuccessMessage'));
          } catch (error) {
            Alert.alert(t('common.error'), t('records.deleteErrorMessage'));
          }
        },
      },
    ]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const locale = (() => {
      if (!i18n.language) {
        return 'en-US';
      }
      if (i18n.language.includes('-')) {
        return i18n.language;
      }
      if (i18n.language.startsWith('ko')) {
        return 'ko-KR';
      }
      return 'en-US';
    })();

    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const renderRecord = ({ item }: { item: JournalRecord }) => (
    <View
      className="rounded-3xl p-5 mb-4 mx-4"
      style={{
        backgroundColor: item.color || '#4CAEFF',
      }}
    >
      <View className="flex-row justify-between items-start mb-3">
        <View className="flex-1">
          <Text
            className="text-white text-xs mb-2 opacity-80"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            {formatDate(item.date)}
          </Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-white text-2xl mr-2">{item.emoji}</Text>
            <View className="bg-white/20 rounded-full px-2 py-1">
              <Text
                className="text-white text-xs"
                style={{ fontFamily: 'Inter_600SemiBold' }}
              >
                {item.category}
              </Text>
            </View>
          </View>
          <Text
            className="text-white text-base font-bold mb-3 leading-6"
            style={{ fontFamily: 'Inter_700Bold' }}
          >
            {item.question}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="bg-white/20 rounded-full w-8 h-8 items-center justify-center ml-2"
        >
          <Text className="text-white text-lg">×</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white/10 rounded-2xl p-4">
        {item.imageUri && (
          <Image
            source={{ uri: item.imageUri }}
            className="w-full h-48 rounded-xl mb-3"
            resizeMode="cover"
          />
        )}
        <Text
          className="text-white text-sm leading-6"
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          {item.note}
        </Text>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-[#0B1E38]">
      {records.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-6xl mb-4">📔</Text>
          <Text
            className="text-[#F8F6F0] text-xl font-semibold mb-2 text-center"
            style={{ fontFamily: 'Inter_700Bold' }}
          >
            {t('records.emptyTitle')}
          </Text>
          <Text
            className="text-[#F8F6F0]/60 text-center"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            {t('records.emptySubtitle')}
          </Text>
        </View>
      ) : (
        <>
          <View className="px-4 pt-4 pb-2">
            <Text
              className="text-[#F8F6F0]/60 text-sm"
              style={{ fontFamily: 'Inter_400Regular' }}
            >
              {t('records.totalCount', { count: records.length })}
            </Text>
          </View>
          <FlatList
            data={records}
            renderItem={renderRecord}
            keyExtractor={(item) => item.id}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#F8F6F0"
              />
            }
            contentContainerStyle={{ paddingBottom: 20, paddingTop: 10 }}
          />
        </>
      )}
    </View>
  );
}
