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

export default function RecordsScreen() {
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
    Alert.alert('삭제 확인', '이 기록을 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteRecord(id);
            await loadRecords();
            Alert.alert('완료', '기록이 삭제되었습니다.');
          } catch (error) {
            Alert.alert('오류', '삭제 중 오류가 발생했습니다.');
          }
        },
      },
    ]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
            아직 기록이 없습니다
          </Text>
          <Text
            className="text-[#F8F6F0]/60 text-center"
            style={{ fontFamily: 'Inter_400Regular' }}
          >
            포춘쿠키를 열어 첫 생각을 기록해보세요
          </Text>
        </View>
      ) : (
        <>
          <View className="px-4 pt-4 pb-2">
            <Text
              className="text-[#F8F6F0]/60 text-sm"
              style={{ fontFamily: 'Inter_400Regular' }}
            >
              총 {records.length}개의 생각 기록
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
