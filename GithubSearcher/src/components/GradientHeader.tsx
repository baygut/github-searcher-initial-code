import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import Colors from '../utils/colors';
import Padding from '../utils/padding';

const MovingGradientBackground: React.FC = () => {
  const animatedColors = useRef(new Animated.Value(0)).current;

  const interpolateColors = animatedColors.interpolate({
    inputRange: [0, 1, 2, 3, 4],
    outputRange: ['#5E1C9F', '#EC37DB', '#3e1f21', '#EC37DB', "#5E1C9F"],
  });

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedColors, {
          toValue: 1,
          duration: 2000,
          easing: Easing.sin,
          useNativeDriver: false,
        }),
        Animated.timing(animatedColors, {
          toValue: 2,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]),
      { iterations: -1 }
    );

    animation.start();

    return () => animation.stop();
  }, []);

  return (
    <Animated.View style={[styles.header, { backgroundColor: interpolateColors }]}>
        <View>
            <Text style={styles.headerText} >Github Searcher</Text>
        </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: Padding.high ,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor : Colors.Primary,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#cccccc",

  },
});

export default MovingGradientBackground;
