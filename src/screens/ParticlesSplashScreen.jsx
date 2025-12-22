import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import { styles } from "../style/global";

const { width, height } = Dimensions.get("window");
const NUM_PARTICLES = 20;

export default function ParticlesSplashScreen({ onFinish }) {
  // Crée un tableau de sharedValues pour chaque particule
  const particles = Array.from({ length: NUM_PARTICLES }, () => ({
    scale: useSharedValue(0),
    opacity: useSharedValue(0),
    x: Math.random() * width,
    y: Math.random() * height * 0.5, // haut de l'écran
  }));

  useEffect(() => {
    // Anime chaque particule
    particles.forEach((p, i) => {
      const delay = Math.random() * 1000; // retard aléatoire
      p.opacity.value = withDelay(
        delay,
        withTiming(1, { duration: 400, easing: Easing.inOut(Easing.ease) }, () => {
          p.opacity.value = withTiming(0, { duration: 400 });
        })
      );
      p.scale.value = withDelay(
        delay,
        withTiming(1, { duration: 400 }, () => {
          p.scale.value = withTiming(0, { duration: 400 });
        })
      );
    });

    // Termine le splash après 2s
    const timeout = setTimeout(onFinish, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      {particles.map((p, index) => {
        const style = useAnimatedStyle(() => ({
          position: "absolute",
          width: 15,
          height: 15,
          borderRadius: 7.5,
          backgroundColor: "#4CAF50",
          transform: [{ scale: p.scale.value }],
          opacity: p.opacity.value,
          left: p.x,
          top: p.y,
        }));
        return <Animated.View key={index} style={style} />;
      })}
    </View>
  );
}
