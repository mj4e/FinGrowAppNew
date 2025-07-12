// app/screens/Grow/MetalsScreen.js (Refactored)

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, ActivityIndicator, RefreshControl } from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AppCard from '../../components/AppCard';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getMetalsData } from '../../api/grow';

const MetalsScreen = () => {
  const { colors } = useTheme();

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [metals, setMetals] = useState({});

  // Data fetching logic
  const fetchMetals = useCallback(async () => {
    try {
      const response = await getMetalsData();
      if (response.success) {
        setMetals(response.data);
        setError(null);
      } else {
        setError('Could not load metal investment data.');
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
      fetchMetals();
    }, [fetchMetals])
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchMetals();
  }, [fetchMetals]);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Metal Investments</Text>
    </View>
  );

  const renderMetalCard = (metal) => {
    const isPositiveChange = metal.change.startsWith('+');
    return (
      <AppCard key={metal.name} style={styles.metalCard}>
        <View style={styles.metalHeader}>
          <MaterialCommunityIcons name="gold" size={30} color={metal.color} />
          <Text style={[styles.metalName, { color: colors.text }]}>{metal.name}</Text>
        </View>
        <View style={styles.metalBody}>
          <View>
            <Text style={[styles.metalLabel, { color: COLORS.gray }]}>Holdings</Text>
            <Text style={[styles.metalValue, { color: colors.text }]}>{metal.holdings}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.metalLabel, { color: COLORS.gray }]}>Current Value</Text>
            <Text style={[styles.metalValue, { color: colors.text }]}>{metal.currentValue}</Text>
          </View>
        </View>
        <View style={styles.metalFooter}>
          <Text style={[styles.metalChange, { color: isPositiveChange ? COLORS.success : COLORS.danger }]}>
            {metal.change}
          </Text>
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

    return Object.values(metals).map(metal => renderMetalCard(metal));
  };

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
  container: { flex: 1, paddingHorizontal: SIZES.padding },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: SIZES.height / 4 },
  headerContainer: { paddingTop: SIZES.padding * 2, alignItems: 'center', marginBottom: SIZES.padding },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold' },
  metalCard: { padding: SIZES.padding },
  metalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: SIZES.padding * 1.5 },
  metalName: { ...FONTS.h3, fontWeight: 'bold', marginLeft: SIZES.base },
  metalBody: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SIZES.padding },
  metalLabel: { ...FONTS.body4 },
  metalValue: { ...FONTS.h3, fontWeight: '600', marginTop: SIZES.base / 2 },
  metalFooter: { alignItems: 'flex-end' },
  metalChange: { ...FONTS.body4, fontWeight: 'bold' },
});

export default MetalsScreen;
