// app/screens/Home/DashboardScreen.js (Refactored)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';

// API Service
import { getDashboardData } from '../../api/dashboard'; // We will create this file next

// Components
import AppCard from '../../components/AppCard';
import IncomeExpenseChart from '../../components/IncomeExpenseChart';

// Constants
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const DashboardScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    userProfile: null,
    walletData: null,
    spendingCategories: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const response = await getDashboardData();
        if (response.success) {
          setDashboardData(response.data);
        } else {
          setError(response.error || 'Failed to fetch data.');
        }
      } catch (e) {
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View>
        <Text style={[styles.welcomeMessage, { color: colors.text }]}>Welcome back,</Text>
        <Text style={[styles.userName, { color: colors.text }]}>
          {dashboardData.userProfile?.name || 'User'}
        </Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.navigate('Rewards')} style={styles.iconButton}>
          <FontAwesome5 name="gift" size={24} color={colors.text} />
        </TouchableOpacity>
        {/* CORRECTED NAVIGATION: This now correctly navigates to the "More" tab first, then to the Profile screen within that tab. */}
        <TouchableOpacity onPress={() => navigation.navigate('MoreTab', { screen: 'ProfileMain' })} style={styles.iconButton}>
          <FontAwesome5 name="user-circle" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBalanceCard = () => (
    <AppCard style={{ backgroundColor: COLORS.primary }}>
      <Text style={[styles.balanceTitle, { color: COLORS.white }]}>Total Balance</Text>
      <Text style={[styles.balanceAmount, { color: COLORS.white }]}>
        {dashboardData.walletData?.balance || '৳0.00'}
      </Text>
    </AppCard>
  );

  const renderSpendingCategories = () => (
    <AppCard>
      <Text style={[styles.cardTitle, { color: colors.text }]}>Spending Categories</Text>
      {dashboardData.spendingCategories.map((category) => (
        <View key={category.id} style={styles.categoryContainer}>
          <View style={styles.categoryInfo}>
            <Text style={[styles.categoryName, { color: colors.text }]}>{category.name}</Text>
            <Text style={[styles.categorySpent, { color: colors.text }]}>
              ৳{category.spent.toLocaleString()} / ৳{category.budget.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.progressBarBackground, { backgroundColor: colors.border }]}>
            <View style={[styles.progressBar, {
              width: `${(category.spent / category.budget) * 100}%`,
              backgroundColor: category.color,
            }]} />
          </View>
        </View>
      ))}
    </AppCard>
  );
  
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (error) {
     return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.padding }}>
        <Text style={{ color: colors.text, ...FONTS.h3 }}>Oops!</Text>
        <Text style={{ color: COLORS.gray, textAlign: 'center', marginTop: SIZES.base }}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {renderBalanceCard()}
      <AppCard>
        <Text style={[styles.cardTitle, { color: colors.text }]}>Income vs. Expense</Text>
        <IncomeExpenseChart data={dashboardData.walletData?.chartData} />
      </AppCard>
      {renderSpendingCategories()}
    </ScrollView>
  );
};

// Styles remain the same...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.padding * 2,
  },
  welcomeMessage: {
    ...FONTS.body3,
    color: COLORS.gray,
  },
  userName: {
    ...FONTS.h2,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: SIZES.padding,
  },
  balanceTitle: {
    ...FONTS.h3,
    textAlign: 'center',
  },
  balanceAmount: {
    ...FONTS.h1,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: SIZES.base,
  },
  cardTitle: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  categoryContainer: {
    marginBottom: SIZES.padding,
  },
  categoryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.base,
  },
  categoryName: {
    ...FONTS.body4,
  },
  categorySpent: {
    ...FONTS.body4,
    fontWeight: 'bold',
  },
  progressBarBackground: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
});

export default DashboardScreen;