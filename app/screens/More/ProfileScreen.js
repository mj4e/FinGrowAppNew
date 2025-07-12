// app/screens/More/ProfileScreen.js (Refactored)

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, Image, Switch, ActivityIndicator } from 'react-native';
import { useTheme, useNavigation, useFocusEffect } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

import AppButton from '../../components/AppButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useAuth } from '../../../App';
import { getUserProfile } from '../../api/user';

const ProfileScreen = () => {
  const { colors, dark } = useTheme();
  const navigation = useNavigation();
  const { logout } = useAuth();
  
  // State Management
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isDark, setIsDark] = useState(dark);

  // Data fetching logic
  const fetchProfile = useCallback(async () => {
    try {
      const response = await getUserProfile();
      if (response.success) {
        setProfile(response.data);
        setError(null);
      } else {
        setError('Could not load profile.');
      }
    } catch (e) {
      setError('An unexpected network error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, [fetchProfile])
  );

  // NOTE: A full theme-switching implementation would require a global ThemeContext
  // to persist the choice and update the entire app theme.
  const toggleTheme = () => {
      setIsDark(previousState => !previousState);
      Toast.show({
          type: 'info',
          text1: 'Theme switching requires a global context.',
          text2: 'This toggle is currently for UI demonstration only.'
      })
  }

  const handleLogout = () => {
    // A simple Toast confirmation is often cleaner than a blocking Alert.
    Toast.show({
      type: 'error',
      text1: 'Confirm Logout',
      text2: 'Press here to confirm you want to logout.',
      visibilityTime: 4000,
      onPress: () => logout(),
      position: 'bottom',
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerTitle, { color: colors.text }]}>My Profile</Text>
    </View>
  );

  const renderProfileInfo = () => (
    <View style={styles.profileInfoContainer}>
      <Image source={{ uri: profile?.profileImage }} style={styles.profileImage} />
      <Text style={[styles.profileName, { color: colors.text }]}>{profile?.name}</Text>
      <Text style={[styles.profileEmail, { color: COLORS.gray }]}>{profile?.email}</Text>
    </View>
  );

  const renderMenuItem = (icon, text, onPress) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Feather name={icon} size={22} color={colors.text} />
      <Text style={[styles.menuItemText, { color: colors.text }]}>{text}</Text>
      <Feather name="chevron-right" size={22} color={COLORS.gray} />
    </TouchableOpacity>
  );

  const renderThemeToggle = () => (
      <View style={styles.menuItem}>
          <Feather name={isDark ? "moon" : "sun"} size={22} color={colors.text} />
          <Text style={[styles.menuItemText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
              trackColor={{ false: colors.border, true: COLORS.secondary }}
              thumbColor={isDark ? COLORS.white : colors.card}
              onValueChange={toggleTheme}
              value={isDark}
          />
      </View>
  );
  
  if (isLoading) {
    return (
      <View style={[styles.centeredContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      {renderHeader()}
      {renderProfileInfo()}
      
      <View style={styles.menuContainer}>
        {renderMenuItem("user", "Edit Profile", () => Toast.show({ type: 'info', text1: 'Feature Coming Soon!' }))}
        {renderMenuItem("settings", "Account Settings", () => Toast.show({ type: 'info', text1: 'Feature Coming Soon!' }))}
        {renderMenuItem("bell", "Notifications", () => Toast.show({ type: 'info', text1: 'Feature Coming Soon!' }))}
        {renderThemeToggle()}
        {renderMenuItem("help-circle", "Help & Support", () => Toast.show({ type: 'info', text1: 'Feature Coming Soon!' }))}
      </View>

      <View style={styles.buttonContainer}>
          <AppButton title="Logout" onPress={handleLogout} style={{backgroundColor: COLORS.danger}} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: SIZES.padding, },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { paddingTop: SIZES.padding * 2, alignItems: 'center', marginBottom: SIZES.padding, },
  headerTitle: { ...FONTS.h2, fontWeight: 'bold', },
  profileInfoContainer: { alignItems: 'center', marginVertical: SIZES.padding, },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: SIZES.padding, backgroundColor: COLORS.lightGray },
  profileName: { ...FONTS.h2, fontWeight: 'bold', },
  profileEmail: { ...FONTS.body4, marginTop: SIZES.base / 2, },
  menuContainer: { marginTop: SIZES.padding, backgroundColor: colors.card, borderRadius: SIZES.radius },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: SIZES.padding, paddingHorizontal: SIZES.padding, borderBottomWidth: 1, borderBottomColor: 'rgba(138, 138, 142, 0.1)', },
  menuItemText: { ...FONTS.h4, flex: 1, marginLeft: SIZES.padding, },
  buttonContainer: { marginVertical: SIZES.padding * 2, }
});

export default ProfileScreen;
