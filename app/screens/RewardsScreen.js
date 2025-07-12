// app/screens/RewardsScreen.js (Refactored)

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import AppCard from '../components/AppCard';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { getRewardsData } from '../api/rewards';

const RewardsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [rewards, setRewards] = useState(null);

  const fetchRewardsData = useCallback(async () => {
    try {
      const response = await getRewardsData();
      if (response.success) {
        setRewards(response.data);
        setError(null);
      } else {
        setError('Could not load your rewards information.');
      }
    } catch (e) {
      setError('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchRewardsData();
    }, [fetchRewardsData])
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchRewardsData();
  }, [fetchRewardsData]);

  const progress = rewards ? (rewards.points / rewards.pointsToNextTier) * 100 : 0;

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>My Rewards</Text>
      <View style={{ width: 28 }} />
    </View>
  );

  const renderTierCard = () => (
    <AppCard style={{ backgroundColor: COLORS.primary }}>
      <View style={styles.tierHeader}>
        <FontAwesome5 name="medal" size={30} color={COLORS.white} />
        <Text style={[styles.tierName, { color: COLORS.white }]}>{rewards?.tier} Tier</Text>
      </View>
      <Text style={[styles.pointsText, { color: COLORS.white }]}>{rewards?.points.toLocaleString()} Points</Text>
      <View style={[styles.progressBarBackground, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
        <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: COLORS.white }]} />
      </View>
      <Text style={[styles.nextTierText, { color: COLORS.white }]}>
        {rewards ? `${rewards.pointsToNextTier - rewards.points} points to ${rewards.nextTier}` : ''}
      </Text>
    </AppCard>
  );

  const renderBenefitsCard = () => (
    <AppCard>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Your Benefits</Text>
      {rewards?.benefits.map((benefit, index) => (
        <View key={index} style={styles.benefitItem}>
          <Feather name="check-circle" size={20} color={COLORS.success} />
          <Text style={[styles.benefitText, { color: colors.text }]}>{benefit}</Text>
        </View>
      ))}
    </AppCard>
  );

  if (isLoading) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
    return (
        <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
            <Text style={{ color: colors.text, ...FONTS.h3 }}>Oops!</Text>
            <Text style={{ color: COLORS.gray, textAlign: 'center', marginTop: SIZES.base }}>{error}</Text>
        </View>
    );
  }

  return (
    <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />}
    >
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {renderTierCard()}
      {renderBenefitsCard()}
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
  },
  headerContainer: {
    paddingTop: SIZES.padding * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    ...FONTS.h2,
    fontWeight: 'bold',
  },
  tierHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierName: {
    ...FONTS.h2,
    fontWeight: 'bold',
    marginLeft: SIZES.base,
  },
  pointsText: {
    ...FONTS.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: SIZES.base,
  },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    marginTop: SIZES.padding,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  nextTierText: {
    ...FONTS.body5,
    textAlign: 'center',
    marginTop: SIZES.base,
  },
  cardTitle: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  benefitText: {
    ...FONTS.body4,
    marginLeft: SIZES.padding,
    flex: 1,
  },
});

export default RewardsScreen;
