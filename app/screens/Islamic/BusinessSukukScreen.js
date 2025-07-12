// app/screens/Islamic/BusinessSukukScreen.js (Refactored)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Switch, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getSukukData, submitSukukInvestment } from '../../api/islamic';


const BusinessSukukScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ sukukOptions: [] });
  const [selectedSukuk, setSelectedSukuk] = useState(null);
  const [amount, setAmount] = useState(1000);
  const [autoInvestEnabled, setAutoInvestEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getSukukData();
      if (response.success) {
        setData(response.data);
        // Set the default selected sukuk to the first one in the list
        if (response.data.sukukOptions.length > 0) {
            setSelectedSukuk(response.data.sukukOptions[0]);
            setAmount(response.data.sukukOptions[0].minInvestment);
        }
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleSelectSukuk = (sukuk) => {
    setSelectedSukuk(sukuk);
    setAmount(sukuk.minInvestment); // Reset amount to the minimum for the selected sukuk
  }

  const handleStartInvesting = async () => {
    if (!selectedSukuk) {
        Toast.show({ type: 'error', text1: 'Please select a Sukuk to invest in.' });
        return;
    }
    setIsSubmitting(true);
    const investmentDetails = {
        sukukId: selectedSukuk.id,
        sukukName: selectedSukuk.name,
        amount,
        autoInvest: autoInvestEnabled,
    };
    const response = await submitSukukInvestment(investmentDetails);
    if (response.success) {
        Toast.show({
            type: 'success',
            text1: 'Sukuk Investment Submitted!',
            text2: `Your ৳${amount} investment in ${selectedSukuk.name} is being processed.`,
        });
    } else {
        Toast.show({ type: 'error', text1: 'Investment Failed', text2: 'Please try again later.' });
    }
    setIsSubmitting(false);
  };
  
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>
        Business Sukuk
      </Text>
      <TouchableOpacity style={styles.infoButton}>
        <Feather name="info" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  const renderAmountSelector = () => (
    <AppCard>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Investment Amount</Text>
      <View style={styles.amountContainer}>
        <Text style={[styles.amountValue, { color: colors.text }]}>
          ৳{Math.round(amount).toLocaleString()}
        </Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={selectedSukuk?.minInvestment || 500}
        maximumValue={(selectedSukuk?.minInvestment || 500) * 10} // Example max
        step={100}
        value={amount}
        onValueChange={setAmount}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={colors.border}
      />
    </AppCard>
  );

  const renderSukukOptions = () => (
    <AppCard>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Investment Opportunities</Text>
      {data.sukukOptions.map((sukuk) => (
        <TouchableOpacity 
            key={sukuk.id} 
            style={[
                styles.sukukItem, 
                selectedSukuk?.id === sukuk.id && styles.sukukItemSelected
            ]}
            onPress={() => handleSelectSukuk(sukuk)}
        >
          {/* Content remains the same, just using `sukuk` from map */}
          <View style={styles.sukukHeader}>
              <View style={styles.sukukLeft}>
                <View style={styles.sukukIcon}><MaterialCommunityIcons name={sukuk.icon} size={24} color={COLORS.primary} /></View>
                <View style={styles.sukukInfo}>
                    <Text style={[styles.sukukName, { color: colors.text }]}>{sukuk.name}</Text>
                    <Text style={[styles.sukukSector, { color: COLORS.gray }]}>{sukuk.sector}</Text>
                </View>
              </View>
              <View style={styles.sukukMeta}>
                  <View style={[styles.ratingBadge, { backgroundColor: 'rgba(76, 217, 100, 0.1)' }]}>
                      <Text style={[styles.ratingText, { color: COLORS.success }]}>{sukuk.rating}</Text>
                  </View>
              </View>
          </View>
          {/* ... other details */}
          <View style={[styles.riskBadge, { backgroundColor: `${sukuk.riskColor}20` }]}>
              <Text style={[styles.riskText, { color: sukuk.riskColor }]}>{sukuk.riskLevel}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </AppCard>
  );

  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size="large" color={COLORS.islamicPrimary} /></View>
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        {renderSukukOptions()}
        {selectedSukuk && renderAmountSelector()}
        <AppButton
          title={isSubmitting ? "Processing..." : "Confirm Investment"}
          onPress={handleStartInvesting}
          disabled={isSubmitting || !selectedSukuk}
          style={styles.investButton}
        />
      </ScrollView>
    </View>
  );
};

// Styles remain the same...
const styles = StyleSheet.create({
  container: { flex: 1, },
  scrollView: { flex: 1, },
  scrollContent: { paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding * 2, },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: SIZES.padding, paddingBottom: SIZES.padding, },
  backButton: { padding: 5, },
  headerTitle: { ...FONTS.h3, fontWeight: 'bold', textAlign: 'center', flex: 1, marginHorizontal: SIZES.base },
  infoButton: { padding: 5, },
  sectionTitle: { ...FONTS.h3, fontWeight: 'bold', marginBottom: SIZES.padding, },
  amountContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.padding, },
  amountValue: { ...FONTS.h1, fontWeight: 'bold', textAlign: 'center', },
  slider: { width: '100%', height: 40, },
  sukukItem: { paddingVertical: SIZES.padding, borderBottomWidth: 1, borderBottomColor: 'rgba(138, 138, 142, 0.1)', borderRadius: SIZES.radius, padding: SIZES.base, borderWidth: 2, borderColor: 'transparent' },
  sukukItemSelected: { borderColor: COLORS.primary, backgroundColor: `${COLORS.primary}10` },
  sukukHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SIZES.base, },
  sukukLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, },
  sukukIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(74, 144, 226, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: SIZES.padding, },
  sukukInfo: { flex: 1, },
  sukukName: { ...FONTS.h4, fontWeight: 'bold', },
  sukukSector: { ...FONTS.body5, marginTop: 2, },
  sukukMeta: { alignItems: 'flex-end', },
  ratingBadge: { paddingHorizontal: SIZES.base, paddingVertical: 4, borderRadius: SIZES.radius / 2, },
  ratingText: { ...FONTS.body5, fontWeight: 'bold', },
  riskBadge: { alignSelf: 'flex-start', paddingHorizontal: SIZES.base, paddingVertical: 2, borderRadius: SIZES.radius / 2, marginTop: SIZES.base },
  riskText: { ...FONTS.body5, fontWeight: 'bold', },
  investButton: { backgroundColor: COLORS.islamicPrimary, marginTop: SIZES.padding },
});

export default BusinessSukukScreen;