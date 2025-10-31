import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import { getRandomQuestion } from '../data/questions';
import { useTranslation } from 'react-i18next';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const [isRolling, setIsRolling] = useState(false);
  const spinValue = new Animated.Value(0);
  const confettiRef = useRef<any>(null);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const insets = useSafeAreaInsets();

  const handleRollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // 버튼 누르는 애니메이션
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Confetti 발사!
    if (confettiRef.current) {
      confettiRef.current.start();
    }

    // 주사위 굴리기 애니메이션
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      const randomQuestion = getRandomQuestion();

      setTimeout(() => {
        setIsRolling(false);
        spinValue.setValue(0);

        // 저널 화면으로 이동 (번역된 값 전달)
        router.push({
          pathname: '/journal',
          params: {
            questionId: randomQuestion.id.toString(),
            question: t(randomQuestion.question),
            category: t(randomQuestion.category),
            emoji: randomQuestion.emoji,
          },
        });
      }, 300);
    });
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  return (
    <View className="flex-1 bg-[#0B1E38] px-6 pt-12 items-center">
      {/* Confetti */}
      <ConfettiCannon
        ref={confettiRef}
        count={100}
        origin={{ x: 0, y: 0 }}
        autoStart={false}
        fadeOut={true}
        colors={['#4CAEFF', '#FF6B9D', '#FFB84D', '#6C5CE7', '#00D2D3']}
      />

      {/* 타이틀 */}
      <View className="mb-12 items-center">
        <LottieView
          source={require('../assets/lottie/earth.json')}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
        <Text
          className="text-lg text-[#F8F6F0]/70 text-center z-999"
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          {t('home.tagline')}
        </Text>
      </View>

      {/* 포춘쿠키 버튼 */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          onPress={handleRollDice}
          disabled={isRolling}
          className="bg-[#4CAEFF] rounded-full w-44 h-44 justify-center items-center shadow-lg mb-8"
          style={{
            shadowColor: '#4CAEFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            elevation: 10,
          }}
        >
          <Animated.Text
            style={{ transform: [{ rotate: spin }] }}
            className="text-8xl mt-6"
          >
            🥠
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>

      <Text
        className="text-lg text-[#F8F6F0] font-semibold mb-2"
        style={{ fontFamily: 'Inter_600SemiBold' }}
      >
        {isRolling ? t('home.loading') : t('home.openFortune')}
      </Text>
      <Text
        className="text-sm text-[#F8F6F0]/60 text-center px-8"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        {t('home.description')}
      </Text>

      {/* 기록 보기 버튼 */}
      <TouchableOpacity
        onPress={() => router.push('/records')}
        className="absolute bg-[#F8F6F0]/10 px-8 py-4 rounded-full border border-[#F8F6F0]/20"
        style={{ bottom: insets.bottom + 64 }}
      >
        <Text
          className="text-[#F8F6F0] font-semibold"
          style={{ fontFamily: 'Inter_600SemiBold' }}
        >
          {t('home.viewThoughts')}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
