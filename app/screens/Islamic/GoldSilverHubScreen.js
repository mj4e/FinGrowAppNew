import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  StatusBar, 
  TouchableOpacity,
  Switch,
  Dimensions
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Svg, G, Line, Path, Circle, Text as SvgText } from 'react-native-svg';
import Toast from 'react-native-toast-message';

import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const GoldSilverHubScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [selectedMetal, setSelectedMetal] = useState('gold');
  const [autoInvestEnabled, setAutoInvestEnabled] = useState(false);

  const metalData = {
    gold: {
      price: 128530, // ৳1,285.30 per gram
      change: +1.2,
      unit: 'per gram',
      holdings: 15, // grams
      value: 1928000, // ৳19,28,000
      color: COLORS.gold,
      icon: 'gold'
    },
    silver: {
      price: 1850, // ৳18.50 per gram
      change: -0.8,
      unit: 'per gram',
      holdings: 250, // grams
      value: 462500, // ৳4,62,500
      color: COLORS.silver,
      icon: 'silverware'
    }
  };

  // Mock chart data
  const chartData = [
    { time: '9:00', gold: 128000, silver: 1820 },
    { time: '10:00', gold: 128200, silver: 1835 },
    { time: '11:00', gold: 128100, silver: 1840 },
    { time: '12:00', gold: 128400, silver: 1850 },
    { time: '13:00', gold: 128530, silver: 1845 },
  ];

  const currentData = metalData[selectedMetal];

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        Gold & Silver Hub
      </Text>
      <TouchableOpacity style={styles.notificationButton}>
        <Feather name="bell" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  const renderMetalSelector = () => (
    <View style={styles.selectorContainer}>
      <TouchableOpacity
        style={[
          styles.selectorButton,
          selectedMetal === 'gold' && styles.selectorButtonActive,
          { backgroundColor: selectedMetal === 'gold' ? COLORS.gold : colors.card }
        ]}
        onPress={() => setSelectedMetal('gold')}
      >
        <MaterialCommunityIcons 
          name="gold" 
          size={24} 
          color={selectedMetal === 'gold' ? COLORS.white : colors.text} 
        />
        <Text style={[
          styles.selectorText,
          { color: selectedMetal === 'gold' ? COLORS.white : colors.text }
        ]}>
          Gold
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.selectorButton,
          selectedMetal === 'silver' && styles.selectorButtonActive,
          { backgroundColor: selectedMetal === 'silver' ? COLORS.silver : colors.card }
        ]}
        onPress={() => setSelectedMetal('silver')}
      >
        <MaterialCommunityIcons 
          name="silverware" 
          size={24} 
          color={selectedMetal === 'silver' ? COLORS.black : colors.text} 
        />
        <Text style={[
          styles.selectorText,
          { color: selectedMetal === 'silver' ? COLORS.black : colors.text }
        ]}>
          Silver
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderLivePrice = () => (
    <AppCard style={styles.priceCard}>
      <View style={styles.priceHeader}>
        <Text style={[styles.livePriceLabel, { color: COLORS.gray }]}>Live Prices</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveIcon} />
          <Text style={[styles.liveText, { color: COLORS.success }]}>LIVE</Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={[styles.priceValue, { color: colors.text }]}>
          ৳{currentData.price.toLocaleString()}
        </Text>
        <Text style={[styles.priceUnit, { color: COLORS.gray }]}>
          {currentData.unit}
        </Text>
      </View>

      <View style={styles.changeContainer}>
        <Feather 
          name={currentData.change > 0 ? "trending-up" : "trending-down"} 
          size={16} 
          color={currentData.change > 0 ? COLORS.success : COLORS.danger} 
        />
        <Text style={[
          styles.changeText,
          { color: currentData.change > 0 ? COLORS.success : COLORS.danger }
        ]}>
          {currentData.change > 0 ? '+' : ''}{currentData.change}%
        </Text>
      </View>

      {/* Simple Chart */}
      <View style={styles.chartContainer}>
        <Svg height={120} width={width - SIZES.padding * 4}>
          <G>
            {chartData.map((point, index) => {
              if (index === 0) return null;
              const prevPoint = chartData[index - 1];
              const x1 = ((index - 1) / (chartData.length - 1)) * (width - SIZES.padding * 4);
              const x2 = (index / (chartData.length - 1)) * (width - SIZES.padding * 4);
              const y1 = 100 - ((prevPoint[selectedMetal] - Math.min(...chartData.map(d => d[selectedMetal]))) / 
                (Math.max(...chartData.map(d => d[selectedMetal])) - Math.min(...chartData.map(d => d[selectedMetal])))) * 80;
              const y2 = 100 - ((point[selectedMetal] - Math.min(...chartData.map(d => d[selectedMetal]))) / 
                (Math.max(...chartData.map(d => d[selectedMetal])) - Math.min(...chartData.map(d => d[selectedMetal])))) * 80;
              
              return (
                <Line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={currentData.color}
                  strokeWidth={2}
                />
              );
            })}
          </G>
        </Svg>
      </View>
    </AppCard>
  );

  const renderHoldings = () => (
    <AppCard>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>My Holdings</Text>
      
      <View style={styles.holdingsContainer}>
        <View style={styles.holdingItem}>
          <MaterialCommunityIcons 
            name={currentData.icon} 
            size={32} 
            color={currentData.color} 
          />
          <View style={styles.holdingDetails}>
            <Text style={[styles.holdingAmount, { color: colors.text }]}>
              {currentData.holdings} grams
            </Text>
            <Text style={[styles.holdingValue, { color: COLORS.gray }]}>
              ৳{currentData.value.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
    </AppCard>
  );

  const renderVaultSavings = () => (
    <AppCard>
      <View style={styles.vaultHeader}>
        <View style={styles.vaultInfo}>
          <MaterialCommunityIcons name="safe" size={24} color={COLORS.primary} />
          <Text style={[styles.vaultTitle, { color: colors.text }]}>Vault Savings</Text>
        </View>
        <Text style={[styles.vaultAmount, { color: COLORS.gray }]}>
          77 to grams or saved
        </Text>
      </View>

      <TouchableOpacity style={styles.vaultOption}>
        <View style={styles.vaultOptionLeft}>
          <MaterialCommunityIcons name="repeat" size={20} color={COLORS.primary} />
          <View>
            <Text style={[styles.vaultOptionTitle, { color: colors.text }]}>Amount</Text>
            <Text style={[styles.vaultOptionValue, { color: COLORS.success }]}>৳10 everyday</Text>
          </View>
        </View>
        <Feather name="chevron-right" size={20} color={COLORS.gray} />
      </TouchableOpacity>
    </AppCard>
  );

  const renderAutoInvest = () => (
    <AppCard>
      <View style={styles.autoInvestHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Auto-Invest</Text>
        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.secondary }}
          thumbColor={autoInvestEnabled ? COLORS.white : COLORS.gray}
          onValueChange={setAutoInvestEnabled}
          value={autoInvestEnabled}
        />
      </View>
      
      {autoInvestEnabled && (
        <View style={styles.autoInvestSettings}>
          <Text style={[styles.autoInvestText, { color: COLORS.gray }]}>
            Automatically invest ৳500 every month in {selectedMetal}
          </Text>
        </View>
      )}
    </AppCard>
  );

  const renderAboutSection = () => (
    <AppCard>
      <TouchableOpacity style={styles.aboutHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          About Digital Metal Vault
        </Text>
        <Feather name="chevron-right" size={20} color={COLORS.gray} />
      </TouchableOpacity>
      
      <Text style={[styles.aboutText, { color: COLORS.gray }]}>
        Own real gold and silver with secure storage and insurance coverage.
      </Text>
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
        {renderMetalSelector()}
        {renderLivePrice()}
        {renderHoldings()}
        {renderVaultSavings()}
        {renderAutoInvest()}
        {renderAboutSection()}
        
        <View style={styles.buttonContainer}>
          <AppButton
            title="Start Auto-Invest"
            onPress={() => Toast.show({ type: 'info', text1: 'Auto-Invest Setup Coming Soon!' })}
            style={[styles.investButton, { backgroundColor: currentData.color }]}
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
  notificationButton: {
    padding: 5,
  },
  selectorContainer: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
    gap: SIZES.base,
  },
  selectorButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    gap: SIZES.base,
  },
  selectorButtonActive: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  selectorText: {
    ...FONTS.h4,
    fontWeight: 'bold',
  },
  priceCard: {
    padding: SIZES.padding,
  },
  priceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  livePriceLabel: {
    ...FONTS.body4,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  liveText: {
    ...FONTS.body5,
    fontWeight: 'bold',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SIZES.base,
  },
  priceValue: {
    ...FONTS.h1,
    fontWeight: 'bold',
    fontSize: 36,
  },
  priceUnit: {
    ...FONTS.body4,
    marginLeft: SIZES.base,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  changeText: {
    ...FONTS.body4,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  chartContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  sectionTitle: {
    ...FONTS.h3,
    fontWeight: 'bold',
    marginBottom: SIZES.padding,
  },
  holdingsContainer: {
    // Container styles
  },
  holdingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  holdingDetails: {
    marginLeft: SIZES.padding,
  },
  holdingAmount: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  holdingValue: {
    ...FONTS.body4,
    marginTop: 2,
  },
  vaultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.padding,
  },
  vaultInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaultTitle: {
    ...FONTS.h4,
    fontWeight: 'bold',
    marginLeft: SIZES.base,
  },
  vaultAmount: {
    ...FONTS.body5,
  },
  vaultOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.base,
  },
  vaultOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.base,
  },
  vaultOptionTitle: {
    ...FONTS.body4,
  },
  vaultOptionValue: {
    ...FONTS.body4,
    fontWeight: 'bold',
    marginTop: 2,
  },
  autoInvestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autoInvestSettings: {
    marginTop: SIZES.base,
    paddingTop: SIZES.base,
    borderTopWidth: 1,
    borderTopColor: 'rgba(138, 138, 142, 0.2)',
  },
  autoInvestText: {
    ...FONTS.body4,
  },
  aboutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.base,
  },
  aboutText: {
    ...FONTS.body4,
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: SIZES.padding,
  },
  investButton: {
    // Custom button styles
  },
});

export default GoldSilverHubScreen;