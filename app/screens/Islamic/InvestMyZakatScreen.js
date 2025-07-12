// app/screens/Islamic/InvestMyZakatScreen.js (Refactored)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import Slider from '@react-native-community/slider';
import { useTheme, useNavigation } from '@react-navigation/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import AppCard from '../../components/AppCard';
import AppButton from '../../components/AppButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getInvestZakatScreenData, submitZakatInvestment } from '../../api/islamic';

const InvestMyZakatScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({ zakatProjects: [], zakatHistory: [] });
  const [zakatAmount, setZakatAmount] = useState(500);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getInvestZakatScreenData();
      if (response.success) {
        setData(response.data);
        setSelectedProject(response.data.zakatProjects[0]?.id); // Default to first project
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleInvestZakat = async () => {
    if (!selectedProject) {
      Toast.show({ type: 'error', text1: 'Please select a project.' });
      return;
    }
    setIsSubmitting(true);
    const response = await submitZakatInvestment(zakatAmount, selectedProject);
    if (response.success) {
      Toast.show({
        type: 'success',
        text1: 'Zakat Investment Successful!',
        text2: `৳${Math.round(zakatAmount)} invested successfully.`,
      });
      // Optionally navigate away or refresh data
    } else {
      Toast.show({ type: 'error', text1: 'Submission Failed' });
    }
    setIsSubmitting(false);
  };
  
  const estimatedFamilies = Math.floor(zakatAmount / 100);

  // --- Render Functions ---
  
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Feather name="chevron-left" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, { color: colors.text }]}>Invest My Zakat</Text>
      <TouchableOpacity style={styles.calculatorButton}>
        <MaterialCommunityIcons name="calculator" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );

  const renderZakatAmount = () => (
    <AppCard style={styles.zakatCard}>
      <View style={styles.zakatHeader}>
        <MaterialCommunityIcons name="charity" size={32} color={COLORS.secondary} />
        <Text style={[styles.zakatTitle, { color: colors.text }]}>Zakat Amount</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.currencySymbol, { color: COLORS.primary }]}>৳</Text>
        <Text style={[styles.zakatAmountText, { color: colors.text }]}>{Math.round(zakatAmount)}</Text>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={2000}
        value={zakatAmount}
        onValueChange={setZakatAmount}
        minimumTrackTintColor={COLORS.secondary}
        maximumTrackTintColor={colors.border}
      />
    </AppCard>
  );

  const renderImpactPreview = () => (
    <AppCard style={styles.impactCard}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Impact Preview</Text>
       <Text style={[styles.impactTitle, { color: colors.text }]}>
          Helps ~{estimatedFamilies} families start a business
       </Text>
    </AppCard>
  );

  const renderZakatProjects = () => (
    <AppCard>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Choose Your Impact</Text>
      {data.zakatProjects.map((project) => (
        <TouchableOpacity 
          key={project.id} 
          style={[styles.projectItem, selectedProject === project.id && styles.projectItemSelected]}
          onPress={() => setSelectedProject(project.id)}
        >
          <View style={[styles.projectIcon, { backgroundColor: `${project.color}20` }]}>
            <MaterialCommunityIcons name={project.icon} size={24} color={project.color} />
          </View>
          <View style={styles.projectDetails}>
            <Text style={[styles.projectTitle, { color: colors.text }]}>{project.title}</Text>
          </View>
          <View style={[styles.radioOuter, {borderColor: selectedProject === project.id ? COLORS.primary : colors.border}]}>
            {selectedProject === project.id && <View style={[styles.radioInner, {backgroundColor: COLORS.primary}]} />}
          </View>
        </TouchableOpacity>
      ))}
    </AppCard>
  );

  if (isLoading) {
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><ActivityIndicator color={COLORS.islamicPrimary} /></View>
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {renderHeader()}
        {renderZakatAmount()}
        {renderImpactPreview()}
        {renderZakatProjects()}
        <AppButton
          title={isSubmitting ? "Processing..." : "Invest Zakat"}
          onPress={handleInvestZakat}
          disabled={isSubmitting}
          style={{backgroundColor: COLORS.islamicPrimary}}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding * 2, },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: SIZES.padding, paddingBottom: SIZES.padding, },
  backButton: { padding: 5, },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold', },
  calculatorButton: { padding: 5, },
  zakatCard: { padding: SIZES.padding * 1.5, },
  zakatHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: SIZES.base, },
  zakatTitle: { ...FONTS.h3, fontWeight: 'bold', marginLeft: SIZES.base, },
  amountContainer: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center', marginBottom: SIZES.base, },
  currencySymbol: { ...FONTS.h2, fontWeight: 'bold', marginRight: 4, },
  zakatAmountText: { ...FONTS.h1, fontWeight: 'bold', fontSize: 48, },
  slider: { width: '100%', height: 40, },
  sectionTitle: { ...FONTS.h3, fontWeight: 'bold', marginBottom: SIZES.padding, },
  impactCard: { backgroundColor: 'rgba(80, 227, 194, 0.05)', borderLeftWidth: 4, borderLeftColor: COLORS.secondary, alignItems: 'center', },
  impactTitle: { ...FONTS.h4, fontWeight: 'bold', },
  projectItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SIZES.padding, borderBottomWidth: 1, borderBottomColor: 'rgba(138, 138, 142, 0.1)', },
  projectItemSelected: { backgroundColor: `${COLORS.primary}10` },
  projectIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: SIZES.padding, },
  projectDetails: { flex: 1, },
  projectTitle: { ...FONTS.h4, fontWeight: 'bold' },
  radioOuter: { height: 24, width: 24, borderRadius: 12, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  radioInner: { height: 12, width: 12, borderRadius: 6, }
});

export default InvestMyZakatScreen;