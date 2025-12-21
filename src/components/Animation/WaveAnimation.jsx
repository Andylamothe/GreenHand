import React from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

export function WaveLayer({ progress, offset }) {
  const animatedProps = useAnimatedProps(() => {
    const height = 200;
    const width = 400;

  
    const y = height - progress.value * height;

    const amplitude = 12;
    const wavelength = 80;

    let path = `M 0 ${y}`;

    for (let x = 0; x <= width; x += 10) {
      const waveY =
        y +
        Math.sin((x + offset.value) / wavelength) * amplitude;
      path += ` L ${x} ${waveY}`;
    }

    path += ` L ${width} ${height} L 0 ${height} Z`;

    return { d: path };
  });

  return (
    <Svg
      width={400}
      height={200}
      style={{ position: "absolute", bottom: 0 }}
    >
      <AnimatedPath
        animatedProps={animatedProps}
        fill="rgba(100, 180, 255, 0.35)"
      />
    </Svg>
  );
}
