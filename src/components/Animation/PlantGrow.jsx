import React, { useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import LottieView from "lottie-react-native";
import { createStyles } from "../../style/profilStyle";

export default function PlantGrow({ onAnimationFinish }) {
  const animation = useRef(null);
  const { theme } = useTheme();
  const style = createStyles(theme);

  useEffect(() => {
    animation.current.play();
    const timer = setTimeout(() => {
      onAnimationFinish();
    }, 3500); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={style.overlay}>
      <LottieView
        ref={animation}
        source={require("../../../assets/animation/EnergySharesPlant.json")}
        loop={false}
        style={style.lottie}
      />
    </View>
  );
}
