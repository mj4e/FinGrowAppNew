// app/screens/Islamic/ZakatDashboard.js (Refactored)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import AppCard from '../../components/AppCard';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getZakatDashboardData } from '../../api/islamic';

const ZakatDashboard = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getZakatDashboardData();
      if (response.success) {
        setData(response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="chevron-left" size={28} color={COLORS.islamicPrimary} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <MaterialCommunityIcons name="star-crescent" size={32} color={COLORS.islamicPrimary} />
        <Text style={styles.headerTitle}>Islamic Finance</Text>
        <Text style={styles.headerSubtitle}>Halal Investment Solutions</Text>
      </View>
      <TouchableOpacity style={styles.helpButton}>
        <Feather name="help-circle" size={24} color={COLORS.islamicPrimary} />
      </TouchableOpacity>
    </View>
  );
  
  const renderPortfolioSummary = () => (
    <AppCard style={[styles.portfolioCard, { backgroundColor: COLORS.islamicPrimary }]}>
      <Text style={styles.portfolioTitle}>Your Islamic Portfolio</Text>
      <View style={styles.portfolioStats}>
        <View style={styles.portfolioStat}>
          <Text style={styles.portfolioValue}>৳{data?.portfolio?.totalInvested.toLocaleString()}</Text>
          <Text style={styles.portfolioLabel}>Total Invested</Text>
        </View>
        <View style={styles.portfolioStat}>
          <Text style={styles.portfolioValue}>+{data?.portfolio?.totalReturn}%</Text>
          <Text style={styles.portfolioLabel}>Halal Returns</Text>
        </View>
        <View style={styles.portfolioStat}>
          <Text style={styles.portfolioValue}>৳{data?.portfolio?.zakatPaid.toLocaleString()}</Text>
          <Text style={styles.portfolioLabel}>Zakat Paid</Text>
        </View>
      </View>
    </AppCard>
  );

  const renderFeatureCard = (feature) => (
    <TouchableOpacity
      key={feature.id}
      style={[styles.featureCard, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate(feature.screen)}
    >
      {feature.badge && (
        <View style={[styles.featureBadge, { backgroundColor: feature.color }]}>
          <Text style={styles.featureBadgeText}>{feature.badge}</Text>
        </View>
      )}
      <View style={styles.featureHeader}>
        <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
          <Feather name={feature.icon} size={24} color={feature.color} />
        </View>
        <Feather name="chevron-right" size={18} color={COLORS.gray} />
      </View>
      <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
      <Text style={[styles.featureSubtitle, { color: COLORS.gray }]}>{feature.subtitle}</Text>
      <View style={styles.featureFooter}>
        <Text style={[styles.featureAmount, { color: feature.color }]}>{feature.amount}</Text>
      </View>
    </TouchableOpacity>
  );
  
  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color={COLORS.islamicPrimary} /></View>
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.islamicBackground }]}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.islamicBackground} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        {renderPortfolioSummary()}
        <View style={styles.featuresGrid}>
            {data?.features?.map(feature => renderFeatureCard(feature))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding * 2 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: SIZES.padding },
  backButton: { padding: SIZES.base },
  headerContent: { alignItems: 'center', flex: 1 },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold', color: COLORS.islamicPrimary, marginTop: SIZES.base / 2 },
  headerSubtitle: { ...FONTS.body5, color: COLORS.islamicAccent, marginTop: 2 },
  helpButton: { padding: SIZES.base },
  portfolioCard: { marginBottom: SIZES.padding * 1.5 },
  portfolioTitle: { ...FONTS.h3, fontWeight: 'bold', color: COLORS.white, textAlign: 'center', marginBottom: SIZES.padding },
  portfolioStats: { flexDirection: 'row', justifyContent: 'space-around' },
  portfolioStat: { alignItems: 'center' },
  portfolioValue: { ...FONTS.h3, fontWeight: 'bold', color: COLORS.white },
  portfolioLabel: { ...FONTS.body5, color: COLORS.white, opacity: 0.9, marginTop: 2 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: SIZES.padding },
  featureCard: { width: (SIZES.width - SIZES.padding * 3) / 2, borderRadius: SIZES.radius * 1.5, padding: SIZES.padding, marginBottom: SIZES.padding, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 5, elevation: 3, position: 'relative' },
  featureBadge: { position: 'absolute', top: SIZES.padding, right: SIZES.padding, backgroundColor: COLORS.danger, paddingHorizontal: SIZES.base, paddingVertical: 4, borderRadius: SIZES.radius, zIndex: 1 },
  featureBadgeText: { ...FONTS.body5, color: COLORS.white, fontWeight: 'bold', fontSize: 10 },
  featureHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.padding },
  featureIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  featureTitle: { ...FONTS.h4, fontWeight: 'bold', marginBottom: SIZES.base / 2 },
  featureSubtitle: { ...FONTS.body5, color: COLORS.gray },
  featureFooter: { marginTop: SIZES.padding },
  featureAmount: { ...FONTS.h4, fontWeight: 'bold' }
});

export default ZakatDashboard;