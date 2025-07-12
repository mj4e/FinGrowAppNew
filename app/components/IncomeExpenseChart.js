// app/components/IncomeExpenseChart.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - (SIZES.padding * 4);

const IncomeExpenseChart = ({ data }) => {
  // Default data if none provided
  const defaultData = {
    income: 15000,
    expense: 12000,
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  };

  const chartData = data || defaultData;
  const maxValue = Math.max(chartData.income, chartData.expense);
  
  // Calculate bar heights (percentage of container)
  const incomeHeight = (chartData.income / maxValue) * 120;
  const expenseHeight = (chartData.expense / maxValue) * 120;

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {/* Income Bar */}
        <View style={styles.barContainer}>
          <View style={[styles.bar, { 
            height: incomeHeight, 
            backgroundColor: COLORS.success 
          }]} />
          <Text style={styles.barLabel}>Income</Text>
          <Text style={styles.barValue}>৳{chartData.expense.toLocaleString()}</Text>
        </View>
      </View>
      
      {/* Chart Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: COLORS.success }]} />
          <Text style={styles.legendText}>Income</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: COLORS.danger }]} />
          <Text style={styles.legendText}>Expenses</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: SIZES.padding,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width: CHART_WIDTH,
    height: 150,
    marginBottom: SIZES.padding,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 40,
    borderRadius: 8,
    marginBottom: SIZES.base,
  },
  barLabel: {
    ...FONTS.body5,
    color: COLORS.gray,
    marginBottom: 4,
  },
  barValue: {
    ...FONTS.body4,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SIZES.base / 2,
  },
  legendText: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
});

export default IncomeExpenseChart;

// ====================================
// app/components/GoalProgressPie.js
// ====================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES, FONTS } from '../constants/theme';

const GoalProgressPie = ({ progress = 0, icon = 'target', size = 80 }) => {
  // Ensure progress is between 0 and 1
  const normalizedProgress = Math.max(0, Math.min(1, progress));
  
  // Calculate stroke dash array for circular progress
  const radius = (size - 8) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (normalizedProgress * circumference);
  
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Background Circle */}
      <View style={[styles.circle, { 
        width: size, 
        height: size,
        borderRadius: size / 2,
      }]}>
        {/* Progress Indicator */}
        <View style={[styles.progressRing, { 
          width: size - 8, 
          height: size - 8,
          borderRadius: (size - 8) / 2,
          borderWidth: 4,
          borderColor: COLORS.lightGray,
        }]}>
          {/* Simulated progress arc using border */}
          <View style={[styles.progressArc, {
            width: size - 16,
            height: size - 16,
            borderRadius: (size - 16) / 2,
            borderWidth: 4,
            borderTopColor: COLORS.primary,
            borderRightColor: normalizedProgress > 0.25 ? COLORS.primary : 'transparent',
            borderBottomColor: normalizedProgress > 0.5 ? COLORS.primary : 'transparent',
            borderLeftColor: normalizedProgress > 0.75 ? COLORS.primary : 'transparent',
            transform: [{ rotate: '-90deg' }],
          }]} />
        </View>
        
        {/* Center Content */}
        <View style={styles.centerContent}>
          <MaterialCommunityIcons name={icon} size={size * 0.3} color={COLORS.primary} />
          <Text style={[styles.progressText, { fontSize: size * 0.15 }]}>
            {Math.round(normalizedProgress * 100)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressRing: {
    position: 'absolute',
  },
  progressArc: {
    position: 'absolute',
    borderColor: 'transparent',
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    ...FONTS.body5,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 2,
  },
});

export { GoalProgressPie };
export default GoalProgressPie;}>৳{chartData.income.toLocaleString()}</Text>
        </View>
        
        {/* Expense Bar */}
        <View style={styles.barContainer}>
          <View style={[styles.bar, { 
            height: expenseHeight, 
            backgroundColor: COLORS.danger 
          }]} />
          <Text style={styles.barLabel}>Expense</Text>
          <Text style={styles.barValue