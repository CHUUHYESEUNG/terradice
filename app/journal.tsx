import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { saveRecord } from '../utils/storage';
import { JournalRecord } from '../types';

const CARD_COLORS = [
  '#4CAEFF',
  '#FF6B9D',
  '#FFB84D',
  '#6C5CE7',
  '#00D2D3',
  '#FD79A8',
];

export default function JournalScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const questionId = parseInt(params.questionId as string);
  const question = params.question as string;
  const category = params.category as string;
  const emoji = params.emoji as string;

  const [note, setNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [imageUri, setImageUri] = useState<string | null>(null);

  // 색상을 한 번만 결정하고 고정 (questionId 기반)
  const cardColor = useMemo(() => {
    return CARD_COLORS[questionId % CARD_COLORS.length];
  }, [questionId]);

  const pickImage = async () => {
    // 권한 요청
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(t('common.permission'), t('journal.permissionMessage'));
      return;
    }

    // 이미지 선택
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const handleSave = async () => {
    if (!note.trim()) {
      Alert.alert(t('common.notice'), t('journal.emptyInput'));
      return;
    }

    setIsSaving(true);

    try {
      const record: JournalRecord = {
        id: new Date().toISOString(),
        questionId,
        question,
        category,
        emoji,
        note: note.trim(),
        date: new Date().toISOString().split('T')[0],
        color: cardColor,
        imageUri: imageUri || undefined,
      };

      await saveRecord(record);
      Alert.alert(t('common.saveComplete'), t('journal.saveSuccessMessage'), [
        {
          text: t('common.ok'),
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      Alert.alert(t('common.error'), t('journal.errorMessage'));
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#0B1E38]"
    >
      <ScrollView className="flex-1 px-6 pt-6">
        {/* 질문 카드 */}
        <View
          className="rounded-3xl p-6 mb-6"
          style={{ backgroundColor: cardColor }}
        >
          <Text className="text-white text-5xl mb-4 text-center">{emoji}</Text>
          <View className="bg-white/20 rounded-full px-3 py-1 self-start mb-3">
            <Text
              className="text-white text-xs font-semibold"
              style={{ fontFamily: 'Inter_600SemiBold' }}
            >
              {category}
            </Text>
          </View>
          <Text
            className="text-white text-lg font-bold leading-7"
            style={{ fontFamily: 'Inter_700Bold' }}
          >
            {question}
          </Text>
        </View>

        {/* 안내 텍스트 */}
        <Text
          className="text-[#F8F6F0] text-lg font-semibold mb-3"
          style={{ fontFamily: 'Inter_600SemiBold' }}
        >
          {t('journal.promptTitle')}
        </Text>
        <Text
          className="text-[#F8F6F0]/60 text-sm mb-4"
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          {t('journal.promptSubtitle')}
        </Text>

        {/* 답변 입력 */}
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder={t('journal.placeholder')}
          placeholderTextColor="rgba(248, 246, 240, 0.4)"
          multiline
          className="bg-[#F8F6F0]/10 border border-[#F8F6F0]/20 rounded-2xl p-4 text-[#F8F6F0] min-h-[200px] text-base"
          style={{
            textAlignVertical: 'top',
            fontFamily: 'Inter_400Regular',
          }}
        />

        {/* 사진 추가 버튼 */}
        <TouchableOpacity
          onPress={pickImage}
          className="bg-[#F8F6F0]/10 border border-[#F8F6F0]/20 rounded-2xl p-4 mt-4 flex-row items-center justify-center"
        >
          <Text
            className="text-[#F8F6F0] text-base"
            style={{ fontFamily: 'Inter_600SemiBold' }}
          >
            {t('journal.addPhoto')}
          </Text>
        </TouchableOpacity>

        {/* 선택한 사진 미리보기 */}
        {imageUri && (
          <View className="mt-4 relative">
            <Image
              source={{ uri: imageUri }}
              className="w-full h-64 rounded-2xl"
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={removeImage}
              className="absolute top-2 right-2 bg-black/50 rounded-full w-8 h-8 items-center justify-center"
            >
              <Text className="text-white text-lg">×</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* 저장 버튼 */}
        <TouchableOpacity
          onPress={handleSave}
          disabled={isSaving}
          className="bg-[#4CAEFF] rounded-full py-4 mt-6 mb-8"
          style={{
            opacity: isSaving ? 0.5 : 1,
          }}
        >
          <Text
            className="text-white text-center font-bold text-lg"
            style={{ fontFamily: 'Inter_700Bold' }}
          >
            {isSaving ? t('journal.saving') : t('journal.save')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
