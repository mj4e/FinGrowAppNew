// app/components/GoalProgressPie.js (Refactored)

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Svg, G, Circle } from 'react-native-svg';
import { Feather } from '@expo/vector-icons';
import { SIZES, FONTS } from '../constants/theme';

const GoalProgressPie = ({ progress = 0, size = 80, strokeWidth = 10, icon }) => {
  const { colors } = useTheme(); // Use theme colors
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - circumference * progress;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Background Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.border} // Use theme color
            fill="transparent"
            strokeWidth={strokeWidth}
          />
          {/* Progress Circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.primary} // Use theme color
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.iconContainer}>
        {icon ? (
            <Feather name={icon} size={size / 3} color={colors.primary} /> // Use theme color
        ) : (
            <Text style={[styles.progressText, { color: colors.text }]}>{`${Math.round(progress * 100)}%`}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
      ...FONTS.h4,
      fontWeight: 'bold',
  }
});

export default GoalProgressPie;
