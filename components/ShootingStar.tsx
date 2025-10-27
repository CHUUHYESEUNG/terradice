import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ShootingStarProps {
  delay?: number;
}

export default function ShootingStar({ delay = 0 }: ShootingStarProps) {
  const translateX = useRef(new Animated.Value(-100)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      translateX.setValue(-100);
      translateY.setValue(Math.random() * height * 0.3);
      opacity.setValue(0);

      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(translateX, {
            toValue: width + 100,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: Math.random() * height * 0.3 + height * 0.3,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1800,
              useNativeDriver: true,
            }),
          ]),
        ]),
        Animated.delay(Math.random() * 5000 + 3000),
      ]).start(() => animate());
    };

    animate();
  }, [delay, translateX, translateY, opacity]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: '#fff',
        borderRadius: 1,
        transform: [{ translateX }, { translateY }],
        opacity,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 10,
      }}
    >
      <View
        style={{
          width: 40,
          height: 1,
          backgroundColor: '#fff',
          opacity: 0.5,
        }}
      />
    </Animated.View>
  );
}
