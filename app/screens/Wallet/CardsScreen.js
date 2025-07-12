// app/screens/Wallet/CardsScreen.js (Refactored)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, StatusBar, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import AppButton from '../../components/AppButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { getCardsData } from '../../api/wallet'; // Using our new API function

const CardsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getCardsData();
        if (response.success) {
          setCards(response.data);
        } else {
          setError('Could not load your cards.');
        }
      } catch (e) {
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCards();
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="chevron-left" size={28} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>My Cards</Text>
        <View style={{width: 28}} />{/* Spacer */}
    </View>
  );

  const renderCardItem = ({ item }) => (
    <View style={[styles.cardContainer, { backgroundColor: item.cardColor }]}>
      <View style={styles.cardHeader}>
        <FontAwesome5 
          name={item.type.toLowerCase() === 'visa' ? 'cc-visa' : 'cc-mastercard'} 
          size={40} 
          color={COLORS.white} 
        />
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardNumber}>**** **** **** {item.last4}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>Card Holder</Text>
          <Text style={styles.cardValue}>{item.cardHolder}</Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.cardLabel}>Expires</Text>
          <Text style={styles.cardValue}>{item.expiry}</Text>
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator style={{marginTop: SIZES.padding * 2}} size="large" color={COLORS.primary} />;
    }

    if (error) {
      return <Text style={[styles.errorText, {color: colors.text}]}>{error}</Text>
    }

    return (
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{ paddingHorizontal: SIZES.padding / 2, paddingBottom: SIZES.padding }}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {renderContent()}
      <View style={styles.buttonContainer}>
        <AppButton 
          title="Add New Card" 
          onPress={() => Toast.show({ type: 'info', text1: 'Feature Coming Soon!' })} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: SIZES.padding * 2, paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding },
  backButton: { padding: 5 },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', flex: 1 },
  cardContainer: { width: SIZES.width - SIZES.padding * 2, height: 200, borderRadius: SIZES.radius * 1.5, marginHorizontal: SIZES.padding / 2, padding: SIZES.padding, justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 10, },
  cardHeader: { alignItems: 'flex-end' },
  cardBody: { alignItems: 'center' },
  cardNumber: { ...FONTS.h2, color: COLORS.white, letterSpacing: 3 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardLabel: { ...FONTS.body5, color: COLORS.white, opacity: 0.8 },
  cardValue: { ...FONTS.body4, color: COLORS.white, fontWeight: 'bold' },
  buttonContainer: { padding: SIZES.padding, paddingBottom: SIZES.padding * 2 },
  errorText: { textAlign: 'center', marginTop: SIZES.padding * 2, ...FONTS.body3, color: COLORS.gray }
});

export default CardsScreen;
