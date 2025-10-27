import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRouter } from 'expo-router';
import ConfettiCannon from 'react-native-confetti-cannon';
import ShootingStar from '../components/ShootingStar';
import { getRandomQuestion } from '../data/questions';

export default function HomeScreen() {
  const router = useRouter();
  const [isRolling, setIsRolling] = useState(false);
  const spinValue = new Animated.Value(0);
  const confettiRef = useRef<any>(null);
  const scaleValue = useRef(new Animated.Value(1)).current;

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

        // 저널 화면으로 이동
        router.push({
          pathname: '/journal',
          params: {
            questionId: randomQuestion.id.toString(),
            question: randomQuestion.question,
            category: randomQuestion.category,
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
    <View className="flex-1 bg-[#0B1E38] px-6 justify-center items-center">
      {/* 별똥별 배경 */}
      <ShootingStar delay={0} />
      <ShootingStar delay={2000} />
      <ShootingStar delay={4000} />
      <ShootingStar delay={6000} />

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
      <View className="mb-12">
        <Text
          className="text-4xl font-bold text-[#F8F6F0] text-center mb-3"
          style={{ fontFamily: 'Inter_700Bold' }}
        >
          🌍 TerraDice
        </Text>
        <Text
          className="text-base text-[#F8F6F0]/70 text-center"
          style={{ fontFamily: 'Inter_400Regular' }}
        >
          지구 어딘가에서 온, 오늘의 질문
        </Text>
      </View>

      {/* 포춘쿠키 버튼 */}
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <TouchableOpacity
          onPress={handleRollDice}
          disabled={isRolling}
          className="bg-[#4CAEFF] rounded-full w-40 h-40 justify-center items-center shadow-lg mb-8"
          style={{
            shadowColor: '#4CAEFF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.5,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          <Animated.Text
            style={{ transform: [{ rotate: spin }] }}
            className="text-7xl"
          >
            🥠
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>

      <Text
        className="text-lg text-[#F8F6F0] font-semibold mb-2"
        style={{ fontFamily: 'Inter_600SemiBold' }}
      >
        {isRolling ? '질문을 불러오는 중...' : '포춘쿠키를 열어보세요'}
      </Text>
      <Text
        className="text-sm text-[#F8F6F0]/60 text-center px-8"
        style={{ fontFamily: 'Inter_400Regular' }}
      >
        지구 어딘가에서 온 질문이 당신을 기다립니다{'\n'}오늘의 생각을 기록해보세요
      </Text>

      {/* 기록 보기 버튼 */}
      <TouchableOpacity
        onPress={() => router.push('/records')}
        className="absolute bottom-12 bg-[#F8F6F0]/10 px-8 py-4 rounded-full border border-[#F8F6F0]/20"
      >
        <Text
          className="text-[#F8F6F0] font-semibold"
          style={{ fontFamily: 'Inter_600SemiBold' }}
        >
          📔 내 생각 모아보기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
