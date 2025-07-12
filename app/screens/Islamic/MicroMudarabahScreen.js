// app/screens/Islamic/MicroMudarabahScreen.js (Refactored)

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
import { getMudarabahData, setAutoInvestConfig } from '../../api/islamic';

const MicroMudarabahScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ investmentOptions: [] });
  const [frequency, setFrequency] = useState('Daily');
  const [amount, setAmount] = useState(10);
  const [autoInvestEnabled, setAutoInvestEnabled] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getMudarabahData();
      if (response.success) {
        setData(response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleStartInvesting = async () => {
    if (!autoInvestEnabled) {
      Toast.show({
        type: 'error',
        text1: 'Enable Auto-Invest',
        text2: 'Please enable auto-invest to continue',
      });
      return;
    }
    setIsSubmitting(true);
    const config = { frequency, amount };
    const response = await setAutoInvestConfig(config);

    if (response.success) {
      Toast.show({
        type: 'success',
        text1: 'Auto-Invest Started!',
        text2: `Investing ৳${amount} ${frequency.toLowerCase()}`,
      });
    } else {
       Toast.show({ type: 'error', text1: 'Setup Failed', text2: 'Please try again.' });
    }
    setIsSubmitting(false);
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Micro-Mudarabah</Text>
      <TouchableOpacity style={styles.helpButton}>
        <Feather name="help-circle" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  const renderInvestmentOptions = () => (
    <AppCard>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Investment Opportunities</Text>
        {data.investmentOptions.map((investment) => (
             <View key={investment.id} style={styles.investmentItem}>
                <View style={styles.investmentIcon}>
                    <MaterialCommunityIcons name={investment.icon} size={24} color={COLORS.primary} />
                </View>
                <View style={styles.investmentDetails}>
                    <Text style={[styles.investmentName, { color: colors.text }]}>{investment.name}</Text>
                    <Text style={[styles.investmentSector, { color: COLORS.gray }]}>{investment.sector}</Text>
                </View>
             </View>
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
        <AppCard>
            <View style={styles.autoInvestContainer}>
                <View style={styles.autoInvestLeft}>
                    <Text style={[styles.autoInvestTitle, { color: colors.text }]}>Enable Auto-Invest</Text>
                </View>
                <Switch
                    trackColor={{ false: COLORS.lightGray, true: COLORS.islamicAccent }}
                    thumbColor={autoInvestEnabled ? COLORS.white : COLORS.gray}
                    onValueChange={setAutoInvestEnabled}
                    value={autoInvestEnabled}
                />
            </View>
        </AppCard>
        {autoInvestEnabled && (
            <>
                <AppCard>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Frequency</Text>
                    <View style={[styles.pickerContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Picker selectedValue={frequency} style={[styles.picker, { color: colors.text }]} onValueChange={setFrequency}>
                            <Picker.Item label="Daily" value="Daily" />
                            <Picker.Item label="Weekly" value="Weekly" />
                            <Picker.Item label="Monthly" value="Monthly" />
                        </Picker>
                    </View>
                </AppCard>
                <AppCard>
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>Amount ({frequency})</Text>
                    <View style={styles.amountContainer}>
                        <Text style={[styles.amountValue, { color: colors.text }]}>৳{Math.round(amount)}</Text>
                    </View>
                    <Slider style={styles.slider} minimumValue={10} maximumValue={1000} step={10} value={amount} onValueChange={setAmount} minimumTrackTintColor={COLORS.islamicPrimary} maximumTrackTintColor={colors.border} />
                </AppCard>
            </>
        )}
        {renderInvestmentOptions()}
        <AppButton title="Save Auto-Invest Settings" onPress={handleStartInvesting} disabled={isSubmitting || !autoInvestEnabled} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, },
  scrollContent: { paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding * 4, },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: SIZES.padding, paddingBottom: SIZES.padding, },
  backButton: { padding: 5, },
  headerTitle: { ...FONTS.h3, fontWeight: 'bold', textAlign: 'center', flex: 1, },
  helpButton: { padding: 5, },
  sectionTitle: { ...FONTS.h4, fontWeight: 'bold', marginBottom: SIZES.padding, },
  pickerContainer: { borderRadius: SIZES.radius, borderWidth: 1, overflow: 'hidden', },
  picker: { height: 50 },
  amountContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.padding, },
  amountValue: { ...FONTS.h1, fontWeight: 'bold', },
  slider: { width: '100%', height: 40, },
  autoInvestContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
  autoInvestLeft: { flex: 1, },
  autoInvestTitle: { ...FONTS.h4, fontWeight: 'bold', },
  investmentItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SIZES.base, borderBottomWidth: 1, borderBottomColor: 'rgba(138, 138, 142, 0.1)', },
  investmentIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(74, 144, 226, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: SIZES.base, },
  investmentDetails: { flex: 1, },
  investmentName: { ...FONTS.h4, fontWeight: 'bold', },
  investmentSector: { ...FONTS.body5, marginTop: 2, },
});

export default MicroMudarabahScreen;