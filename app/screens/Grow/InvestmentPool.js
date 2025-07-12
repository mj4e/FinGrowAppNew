import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  Image,
  Animated
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const InvestmentPoolScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isJoining, setIsJoining] = useState(false);

  const poolData = {
    totalInvested: 2500000, // ৳25,00,000
    lastReturn: 5.2,
    lifetimeInvested: 2500000,
    totalInvestors: 1247,
    minimumInvestment: 5000,
    expectedReturn: "5-8%",
    investmentType: "Mudarabah",
    riskLevel: "Medium",
    maturityPeriod: "12 months"
  };

  const handleJoinPool = () => {
    setIsJoining(true);
    setTimeout(() => {
      setIsJoining(false);
      Toast.show({
        type: 'success',
        text1: 'Pool Joined Successfully!',
        text2: 'Welcome to the Halal Investment Pool'
      });
    }, 2000);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Investment Pool</Text>
      <TouchableOpacity style={styles.infoButton}>
        <Feather name="info" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  const renderPoolOverview = () => (
    <AppCard style={styles.overviewCard}>
      <View style={styles.amountContainer}>
        <Text style={[styles.currencySymbol, { color: COLORS.primary }]}>৳</Text>
        <Text style={[styles.mainAmount, { color: colors.text }]}>
          {(poolData.totalInvested / 100000).toFixed(1)}L
        </Text>
      </View>
      <Text style={[styles.lifeTimeLabel, { color: COLORS.gray }]}>Total Pool Value</Text>
      
      {/* Illustration */}
      <View style={styles.illustrationContainer}>
        <MaterialCommunityIcons 
          name="chart-line" 
          size={80} 
          color={COLORS.secondary} 
        />
        <View style={styles.trendIndicator}>
          <Feather name="trending-up" size={20} color={COLORS.success} />
          <Text style={[styles.returnText, { color: COLORS.success }]}>
            {poolData.lastReturn}%
          </Text>
        </View>
      </View>
      
      <Text style={[styles.returnLabel, { color: COLORS.gray }]}>Last Return</Text>
    </AppCard>
  );

  const renderPoolDetails = () => (
    <AppCard>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Pool Details</Text>
      
      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="account-group" size={24} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {poolData.totalInvestors.toLocaleString()}
            </Text>
            <Text style={[styles.detailLabel, { color: COLORS.gray }]}>Investors</Text>
          </View>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="cash" size={24} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              ৳{(poolData.minimumInvestment / 1000).toFixed(0)}k
            </Text>
            <Text style={[styles.detailLabel, { color: COLORS.gray }]}>Min. Investment</Text>
          </View>
        </View>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="percent" size={24} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {poolData.expectedReturn}
            </Text>
            <Text style={[styles.detailLabel, { color: COLORS.gray }]}>Expected Return</Text>
          </View>
        </View>
        
        <View style={styles.detailItem}>
          <MaterialCommunityIcons name="calendar" size={24} color={COLORS.primary} />
          <View style={styles.detailText}>
            <Text style={[styles.detailValue, { color: colors.text }]}>
              {poolData.maturityPeriod}
            </Text>
            <Text style={[styles.detailLabel, { color: COLORS.gray }]}>Maturity</Text>
          </View>
        </View>
      </View>
    </AppCard>
  );

  const renderContractSummary = () => (
    <AppCard>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Contract Summary</Text>
      
      <View style={styles.contractItem}>
        <MaterialCommunityIcons name="handshake" size={20} color={COLORS.secondary} />
        <Text style={[styles.contractText, { color: colors.text }]}>
          Invest in halal projects and share profits according to a profit-sharing agreement.
        </Text>
      </View>

      <View style={styles.complianceContainer}>
        <MaterialCommunityIcons name="check-circle" size={20} color={COLORS.success} />
        <Text style={[styles.complianceText, { color: COLORS.success }]}>
          Shariah-Compliant
        </Text>
      </View>
      
      <TouchableOpacity style={styles.learnMoreButton}>
        <Text style={[styles.learnMoreText, { color: COLORS.primary }]}>
          About Mudarabah Investment
        </Text>
        <Feather name="chevron-right" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </AppCard>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}
        {renderPoolOverview()}
        {renderPoolDetails()}
        {renderContractSummary()}
        
        <View style={styles.buttonContainer}>
          <AppButton
            title={isJoining ? "Joining Pool..." : "Join Pool"}
            onPress={handleJoinPool}
            disabled={isJoining}
            style={styles.joinButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.padding * 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    ...FONTS.h2,
    fontWeight: 'bold',
  },
  infoButton: {
    padding: 5,
  },
  overviewCard: {
    alignItems: 'center',
    padding: SIZES.padding * 1.5,
    backgroundColor: COLORS.lightGray,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SIZES.base,
  },
  currencySymbol: {
    ...FONTS.h2,
    fontWeight: 'bold',
    marginRight: 4,
  },
  mainAmount: {
    ...FONTS.h1,
    fontWeight: 'bold',
    fontSize: 42,
  },
  lifeTimeLabel: {
    ...FONTS.body4,
    marginBottom: SIZES.padding,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginVertical: SIZES.padding,
  },
  trendIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.base,
    backgroundColor: 'rgba(76, 217, 100, 0.1)',
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius,
  },
  returnText: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  returnLabel: {
    ...FONTS.body4,
  },
  sectionTitle: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.padding,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    marginLeft: SIZES.base,
  },
  detailValue: {
    ...FONTS.h4,
    fontWeight: 'bold',
  },
  detailLabel: {
    ...FONTS.body5,
    marginTop: 2,
  },
  contractItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.padding,
  },
  contractText: {
    ...FONTS.body4,
    flex: 1,
    marginLeft: SIZES.base,
    lineHeight: 22,
  },
  complianceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  complianceText: {
    ...FONTS.body4,
    fontWeight: 'bold',
    marginLeft: SIZES.base,
  },
  learnMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SIZES.base,
  },
  learnMoreText: {
    ...FONTS.body4,
    fontWeight: '600',
  },
  buttonContainer: {
    marginTop: SIZES.padding,
  },
  joinButton: {
    backgroundColor: COLORS.secondary,
  },
});

export default InvestmentPoolScreen;