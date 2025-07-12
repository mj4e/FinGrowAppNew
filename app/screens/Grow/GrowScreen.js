// app/screens/Grow/GrowScreen.js (Refactored)

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';

import AppCard from '../../components/AppCard';
import GoalProgressPie from '../../components/GoalProgressPie';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { formatCurrency } from '../../utils/format';
import { getSavingsGoalsData } from '../../api/grow';

const GrowScreen = () => {
  const { colors } = useTheme();

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [goals, setGoals] = useState([]);

  // Data fetching logic
  const fetchGoals = useCallback(async () => {
    try {
      const response = await getSavingsGoalsData();
      if (response.success) {
        setGoals(response.data);
        setError(null);
      } else {
        setError('Could not load savings goals.');
      }
    } catch (e) {
      setError('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // useFocusEffect refetches data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchGoals();
    }, [fetchGoals])
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchGoals();
  }, [fetchGoals]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Savings Goals</Text>
    </View>
  );

  const renderGoalCard = (goal) => {
    const progress = goal.currentAmount / goal.targetAmount;
    return (
      <AppCard key={goal.id} style={styles.goalCard}>
        <GoalProgressPie progress={progress} icon={goal.icon} />
        <View style={styles.goalDetails}>
          <Text style={[styles.goalName, { color: colors.text }]}>{goal.name}</Text>
          <Text style={[styles.goalProgressText, { color: COLORS.gray }]}>
            <Text style={{ fontWeight: 'bold', color: colors.text }}>{formatCurrency(goal.currentAmount)}</Text> / {formatCurrency(goal.targetAmount)}
          </Text>
          <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
            <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      </AppCard>
    );
  };
  
  const renderContent = () => {
    if (isLoading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={{ color: colors.text, ...FONTS.h3 }}>Oops!</Text>
                <Text style={{ color: COLORS.gray, textAlign: 'center', marginTop: SIZES.base }}>{error}</Text>
            </View>
        );
    }
    
    return goals.map(goal => renderGoalCard(goal));
  }

  return (
    <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {renderContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.height / 4,
  },
  headerContainer: {
    paddingTop: SIZES.padding * 2,
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  headerTitle: {
    ...FONTS.h2,
    fontWeight: 'bold',
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  goalDetails: {
    flex: 1,
    marginLeft: SIZES.padding,
  },
  goalName: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  goalProgressText: {
    ...FONTS.body4,
    marginVertical: SIZES.base,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

export default GrowScreen;
