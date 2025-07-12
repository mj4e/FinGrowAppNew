// // File: app/screens/IslamicFinanceHomeScreen.js
// // This is the hub for all Islamic Finance features

// import React from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   ScrollView, 
//   StatusBar, 
//   TouchableOpacity 
// } from 'react-native';
// import { useTheme, useNavigation } from '@react-navigation/native';
// import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

// import AppCard from '../components/AppCard';
// import { COLORS, SIZES, FONTS } from '../constants/theme';
// import { islamicFinanceData } from '../constants/mockData';

// const IslamicFinanceHomeScreen = () => {
//   const { colors } = useTheme();
//   const navigation = useNavigation();

//   // Islamic Finance Features
//   const islamicFeatures = [
//     {
//       id: 1,
//       title: 'Investment Pool',
//       subtitle: 'Mudarabah-based investing',
//       amount: '৳25,000',
//       returnRate: '5.2%',
//       icon: 'trending-up',
//       color: COLORS.primary,
//       screen: 'InvestmentPool',
//       description: 'Join profit-sharing pools'
//     },
//     {
//       id: 2,
//       title: 'Gold & Silver Hub',
//       subtitle: 'Physical metal investments',
//       amount: '৳1,285.30',
//       returnRate: '+1.2%',
//       icon: 'award',
//       color: COLORS.gold,
//       screen: 'GoldSilverHub',
//       description: 'Live precious metal prices'
//     },
//     {
//       id: 3,
//       title: 'Micro-Mudarabah',
//       subtitle: 'Auto-invest daily',
//       amount: '৳10',
//       returnRate: 'Daily',
//       icon: 'refresh-cw',
//       color: COLORS.secondary,
//       screen: 'MicroMudarabah',
//       description: 'Automated small investments'
//     },
//     {
//       id: 4,
//       title: 'Business Sukuk',
//       subtitle: 'Shariah-compliant bonds',
//       amount: '৳10',
//       returnRate: '5-7%',
//       icon: 'file-text',
//       color: COLORS.primary,
//       screen: 'BusinessSukuk',
//       description: 'Asset-backed securities'
//     },
//     {
//       id: 5,
//       title: 'Invest My Zakat',
//       subtitle: 'Social impact investing',
//       amount: '৳500',
//       returnRate: '5 families',
//       icon: 'heart',
//       color: COLORS.success,
//       screen: 'InvestMyZakat',
//       description: 'Help families start businesses'
//     }
//   ];

//   const renderHeader = () => (
//     <View style={styles.headerContainer}>
//       <Text style={[styles.headerTitle, { color: colors.text }]}>
//         Islamic Finance
//       </Text>
//       <Text style={[styles.headerSubtitle, { color: COLORS.gray }]}>
//         Shariah-compliant investment solutions
//       </Text>
//     </View>
//   );

//   const renderComplianceBadge = () => (
//     <AppCard style={styles.complianceBadge}>
//       <View style={styles.complianceContent}>
//         <MaterialCommunityIcons name="check-decagram" size={24} color={COLORS.success} />
//         <Text style={[styles.complianceText, { color: COLORS.success }]}>
//           100% Shariah Compliant
//         </Text>
//       </View>
//       <Text style={[styles.complianceSubtext, { color: COLORS.gray }]}>
//         Verified by Islamic scholars
//       </Text>
//     </AppCard>
//   );

//   const renderFeatureCard = (feature) => (
//     <TouchableOpacity
//       key={feature.id}
//       style={[styles.featureCard, { backgroundColor: colors.card }]}
//       onPress={() => navigation.navigate(feature.screen)}
//     >
//       <View style={styles.featureHeader}>
//         <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
//           <Feather name={feature.icon} size={20} color={feature.color} />
//         </View>
//         <Feather name="chevron-right" size={16} color={COLORS.gray} />
//       </View>
      
//       <Text style={[styles.featureTitle, { color: colors.text }]}>
//         {feature.title}
//       </Text>
//       <Text style={[styles.featureSubtitle, { color: COLORS.gray }]}>
//         {feature.subtitle}
//       </Text>
      
//       <View style={styles.featureStats}>
//         <Text style={[styles.featureAmount, { color: feature.color }]}>
//           {feature.amount}
//         </Text>
//         <Text style={[styles.featureReturn, { color: COLORS.gray }]}>
//           {feature.returnRate}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   const renderPortfolioSummary = () => (
//     <AppCard style={styles.portfolioCard}>
//       <Text style={[styles.portfolioTitle, { color: colors.text }]}>
//         Your Islamic Portfolio
//       </Text>
      
//       <View style={styles.portfolioStats}>
//         <View style={styles.portfolioStat}>
//           <Text style={[styles.portfolioValue, { color: COLORS.primary }]}>
//             ৳{(islamicFinanceData.islamicPortfolio.totalInvested / 1000).toFixed(0)}k
//           </Text>
//           <Text style={[styles.portfolioLabel, { color: COLORS.gray }]}>
//             Total Invested
//           </Text>
//         </View>
        
//         <View style={styles.portfolioStat}>
//           <Text style={[styles.portfolioValue, { color: COLORS.success }]}>
//             +{islamicFinanceData.islamicPortfolio.totalReturn}%
//           </Text>
//           <Text style={[styles.portfolioLabel, { color: COLORS.gray }]}>
//             Returns
//           </Text>
//         </View>
        
//         <View style={styles.portfolioStat}>
//           <Text style={[styles.portfolioValue, { color: COLORS.secondary }]}>
//             {islamicFinanceData.islamicPortfolio.activeInvestments}
//           </Text>
//           <Text style={[styles.portfolioLabel, { color: COLORS.gray }]}>
//             Investments
//           </Text>
//         </View>
//       </View>
//     </AppCard>
//   );

//   return (
//     <View style={[styles.container, { backgroundColor: colors.background }]}>
//       <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      
//       <ScrollView 
//         style={styles.scrollView}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={styles.scrollContent}
//       >
//         {renderHeader()}
//         {renderComplianceBadge()}
//         {renderPortfolioSummary()}
        
//         <View style={styles.featuresContainer}>
//           <Text style={[styles.featuresTitle, { color: colors.text }]}>
//             Investment Options
//           </Text>
          
//           <View style={styles.featuresGrid}>
//             {islamicFeatures.map(feature => renderFeatureCard(feature))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollContent: {
//     paddingHorizontal: SIZES.padding,
//     paddingTop: SIZES.padding * 2,
//     paddingBottom: SIZES.padding * 2,
//   },
//   headerContainer: {
//     alignItems: 'center',
//     marginBottom: SIZES.padding * 2,
//   },
//   headerTitle: {
//     ...FONTS.h1,
//     fontWeight: 'bold',
//     marginBottom: SIZES.base,
//   },
//   headerSubtitle: {
//     ...FONTS.body4,
//     textAlign: 'center',
//   },
//   complianceBadge: {
//     backgroundColor: 'rgba(76, 217, 100, 0.05)',
//     borderLeftWidth: 4,
//     borderLeftColor: COLORS.success,
//     marginBottom: SIZES.padding,
//   },
//   complianceContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: SIZES.base / 2,
//   },
//   complianceText: {
//     ...FONTS.h4,
//     fontWeight: 'bold',
//     marginLeft: SIZES.base,
//   },
//   complianceSubtext: {
//     ...FONTS.body5,
//   },
//   portfolioCard: {
//     backgroundColor: 'rgba(74, 144, 226, 0.05)',
//     borderLeftWidth: 4,
//     borderLeftColor: COLORS.primary,
//     marginBottom: SIZES.padding * 2,
//   },
//   portfolioTitle: {
//     ...FONTS.h4,
//     fontWeight: 'bold',
//     marginBottom: SIZES.padding,
//   },
//   portfolioStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   portfolioStat: {
//     alignItems: 'center',
//   },
//   portfolioValue: {
//     ...FONTS.h3,
//     fontWeight: 'bold',
//   },
//   portfolioLabel: {
//     ...FONTS.body5,
//     marginTop: 2,
//   },
//   featuresContainer: {
//     // Container for features
//   },
//   featuresTitle: {
//     ...FONTS.h3,
//     fontWeight: 'bold',
//     marginBottom: SIZES.padding,
//   },
//   featuresGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   featureCard: {
//     width: (SIZES.width - SIZES.padding * 3) / 2,
//     borderRadius: SIZES.radius,
//     padding: SIZES.padding,
//     marginBottom: SIZES.padding,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   featureHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: SIZES.base,
//   },
//   featureIcon: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   featureTitle: {
//     ...FONTS.h4,
//     fontWeight: 'bold',
//     marginBottom: SIZES.base / 2,
//   },
//   featureSubtitle: {
//     ...FONTS.body5,
//     marginBottom: SIZES.base,
//   },
//   featureStats: {
//     borderTopWidth: 1,
//     borderTopColor: 'rgba(138, 138, 142, 0.2)',
//     paddingTop: SIZES.base,
//   },
//   featureAmount: {
//     ...FONTS.h4,
//     fontWeight: 'bold',
//   },
//   featureReturn: {
//     ...FONTS.body5,
//     marginTop: 2,
//   },
// });

// export default IslamicFinanceHomeScreen;






// app/screens/IslamicFinanceHomeScreen.js - Final Enhanced Version
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import AppCard from '../components/AppCard';
import { COLORS, SIZES, FONTS, SHADOWS } from '../constants/theme';
import { getZakatDashboardData } from '../api/islamic';
import { formatCurrency } from '../utils/format';

const IslamicFinanceHomeScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);

      const response = await getZakatDashboardData();
      if (response.success) {
        setData(response.data);
        setError(null);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Failed to load Islamic finance data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const onRefresh = () => fetchData(true);

  // Enhanced Islamic Finance Features with real data
  const islamicFeatures = [
    {
      id: 1,
      title: 'Investment Pool',
      subtitle: 'Mudarabah-based investing',
      amount: '৳25,000',
      returnRate: '5.2%',
      icon: 'trending-up',
      color: COLORS.islamicPrimary,
      screen: 'InvestmentPool',
      description: 'Join profit-sharing pools',
      badge: null
    },
    {
      id: 2,
      title: 'Gold & Silver Hub',
      subtitle: 'Physical metal investments',
      amount: '৳1,285.30',
      returnRate: '+1.2%',
      icon: 'gold',
      color: COLORS.gold,
      screen: 'GoldSilverHub',
      description: 'Live precious metal prices',
      badge: 'Hot'
    },
    {
      id: 3,
      title: 'Micro-Mudarabah',
      subtitle: 'Auto-invest daily',
      amount: '৳10',
      returnRate: 'Daily',
      icon: 'refresh-cw',
      color: COLORS.islamicSecondary,
      screen: 'MicroMudarabah',
      description: 'Automated small investments',
      badge: 'New'
    },
    {
      id: 4,
      title: 'Business Sukuk',
      subtitle: 'Shariah-compliant bonds',
      amount: '৳50,000',
      returnRate: '5-7%',
      icon: 'certificate',
      color: COLORS.islamicAccent,
      screen: 'BusinessSukuk',
      description: 'Asset-backed securities',
      badge: null
    },
    {
      id: 5,
      title: 'Invest My Zakat',
      subtitle: 'Social impact investing',
      amount: '৳2,500',
      returnRate: '5 families',
      icon: 'heart',
      color: COLORS.success,