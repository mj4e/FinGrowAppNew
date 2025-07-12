// app/screens/Wallet/WalletScreen.js (Refactored)

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import AppCard from '../../components/AppCard';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getWalletData } from '../../api/wallet';

const WalletScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [walletInfo, setWalletInfo] = useState({ balance: '৳0.00', transactions: [] });

  // Data fetching logic
  const fetchWalletData = async () => {
    try {
      const response = await getWalletData();
      if (response.success) {
        setWalletInfo(response.data);
        setError(null); // Clear previous errors on success
      } else {
        setError('Could not load wallet information.');
      }
    } catch (e) {
      setError('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  // Pull-to-refresh handler
  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchWalletData();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>My Wallet</Text>
      <AppCard style={{ backgroundColor: COLORS.primary, width: '100%' }}>
        <Text style={[styles.balanceTitle, { color: COLORS.white }]}>Current Balance</Text>
        <Text style={[styles.balanceAmount, { color: COLORS.white }]}>
          {walletInfo.balance}
        </Text>
        <TouchableOpacity 
          style={styles.manageCardsButton} 
          onPress={() => navigation.navigate('Cards')}
        >
          <Text style={styles.manageCardsText}>Manage Cards</Text>
          <Feather name="chevron-right" size={16} color={COLORS.white} />
        </TouchableOpacity>
      </AppCard>
      <Text style={[styles.listHeader, { color: colors.text }]}>Recent Transactions</Text>
    </View>
  );

  const renderTransactionItem = ({ item }) => (
    <AppCard style={styles.transactionItem}>
      <View style={[styles.transactionIcon, { backgroundColor: `${item.type === 'income' ? COLORS.success : COLORS.danger}1A` }]}>
        <Feather name={item.icon} size={24} color={item.type === 'income' ? COLORS.success : COLORS.danger} />
      </View>
      <View style={styles.transactionDetails}>
        <Text style={[styles.transactionDescription, { color: colors.text }]} numberOfLines={1}>{item.description}</Text>
        <Text style={[styles.transactionDate, { color: COLORS.gray }]}>{item.date}</Text>
      </View>
      <Text style={[styles.transactionAmount, { color: item.type === 'income' ? COLORS.success : colors.text }]}>
        {item.amount}
      </Text>
    </AppCard>
  );

  if (isLoading) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  
  if (error && walletInfo.transactions.length === 0) {
     return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text, ...FONTS.h3 }}>Oops!</Text>
        <Text style={{ color: COLORS.gray, textAlign: 'center', marginTop: SIZES.base }}>{error}</Text>
        <TouchableOpacity onPress={onRefresh} style={styles.retryButton}>
            <Text style={{color: COLORS.primary}}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      <FlatList
        data={walletInfo.transactions}
        renderItem={renderTransactionItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={COLORS.primary} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: SIZES.padding },
  headerContainer: { paddingTop: SIZES.padding * 2, alignItems: 'center' },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold', marginBottom: SIZES.padding },
  balanceTitle: { ...FONTS.h3, textAlign: 'center', color: COLORS.white, opacity: 0.8 },
  balanceAmount: { ...FONTS.h1, fontWeight: 'bold', textAlign: 'center', marginTop: SIZES.base, color: COLORS.white },
  manageCardsButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: SIZES.padding, marginTop: SIZES.base },
  manageCardsText: { ...FONTS.body4, color: COLORS.white, fontWeight: '600', marginRight: 4 },
  listHeader: { ...FONTS.h3, fontWeight: 'bold', alignSelf: 'flex-start', marginTop: SIZES.padding * 2, marginBottom: SIZES.padding, },
  transactionItem: { flexDirection: 'row', alignItems: 'center', padding: SIZES.padding, },
  transactionIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: SIZES.padding, },
  transactionDetails: { flex: 1, marginRight: SIZES.base },
  transactionDescription: { ...FONTS.h4, fontWeight: '600', },
  transactionDate: { ...FONTS.body5, color: COLORS.gray, marginTop: 2 },
  transactionAmount: { ...FONTS.h4, fontWeight: 'bold', },
  retryButton: { marginTop: SIZES.padding, padding: SIZES.base, }
});

export default WalletScreen;