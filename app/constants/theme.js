// app/constants/theme.js - Enhanced Production Version
import { Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

// Enhanced Color palette for the FinGrow app
export const COLORS = {
  // Base colors
  primary: '#4A90E2',
  secondary: '#50E3C2',

  // Grayscale
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#F5F5F7',
  darkGray: '#2C2C2E',
  gray: '#8A8A8E',

  // Status colors
  success: '#4CD964',
  warning: '#FF9500',
  danger: '#FF3B30',
  info: '#007AFF',

  // Islamic Finance Theme (Enhanced)
  islamicPrimary: '#2E8B57',      // Sea Green
  islamicSecondary: '#50E3C2',    // Turquoise
  islamicAccent: '#3CB371',       // Medium Sea Green
  islamicLight: '#90EE90',        // Light Green
  islamicDark: '#006400',         // Dark Green
  islamicBackground: '#F0FFF0',   // Honeydew
  islamicGold: '#DAA520',         // Goldenrod for premium features

  // Metal colors (Enhanced)
  gold: '#FFD700',
  silver: '#C0C0C0',
  platinum: '#E5E4E2',
  copper: '#B87333',

  // Additional UI colors
  background: '#FAFAFA',
  cardBackground: '#FFFFFF',
  border: '#E1E1E1',
  placeholder: '#999999',
  disabled: '#CCCCCC',

  // Gradient colors
  gradientStart: '#2E8B57',
  gradientEnd: '#50E3C2',

  // Shadow colors
  shadowIOS: 'rgba(0, 0, 0, 0.12)',
  shadowAndroid: '#000000',
};

// Enhanced Font sizes and typography
export const SIZES = {
  // Global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,
  margin: 20,

  // Font sizes (Enhanced hierarchy)
  h1: 32,
  h2: 24,
  h3: 20,
  h4: 16,
  h5: 14,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,
  caption: 8,

  // Component sizes
  buttonHeight: 48,
  inputHeight: 52,
  headerHeight: 60,
  tabBarHeight: 65,

  // App dimensions
  width,
  height,
  
  // Device-specific adjustments
  isSmallDevice: width < 375,
  isTablet: width >= 768,
  
  // Safe area adjustments
  statusBarHeight: Platform.OS === 'ios' ? 44 : 24,
  bottomTabHeight: Platform.OS === 'ios' ? 83 : 65,
};

// Enhanced Font families with Islamic typography support
export const FONTS = {
  // Headlines
  h1: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.h1, 
    lineHeight: SIZES.h1 * 1.2,
    fontWeight: '700'
  },
  h2: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.h2, 
    lineHeight: SIZES.h2 * 1.2,
    fontWeight: '600'
  },
  h3: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.h3, 
    lineHeight: SIZES.h3 * 1.3,
    fontWeight: '600'
  },
  h4: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.h4, 
    lineHeight: SIZES.h4 * 1.4,
    fontWeight: '500'
  },
  h5: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.h5, 
    lineHeight: SIZES.h5 * 1.4,
    fontWeight: '500'
  },

  // Body text
  body1: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.body1, 
    lineHeight: SIZES.body1 * 1.5,
    fontWeight: '400'
  },
  body2: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.body2, 
    lineHeight: SIZES.body2 * 1.5,
    fontWeight: '400'
  },
  body3: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.body3, 
    lineHeight: SIZES.body3 * 1.5,
    fontWeight: '400'
  },
  body4: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.body4, 
    lineHeight: SIZES.body4 * 1.5,
    fontWeight: '400'
  },
  caption: { 
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto', 
    fontSize: SIZES.caption, 
    lineHeight: SIZES.caption * 1.4,
    fontWeight: '400'
  },

  // Special fonts for Islamic content
  arabic: {
    fontFamily: Platform.OS === 'ios' ? 'Geeza Pro' : 'Noto Sans Arabic',
    fontSize: SIZES.body1,
    lineHeight: SIZES.body1 * 1.6,
    fontWeight: '400'
  },
};

// Enhanced Spacing system
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Semantic spacing
  screenHorizontal: 20,
  screenVertical: 16,
  cardPadding: 16,
  sectionSpacing: 24,
};

// Enhanced Shadow styles
export const SHADOWS = {
  light: {
    shadowColor: COLORS.shadowIOS,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  medium: {
    shadowColor: COLORS.shadowIOS,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heavy: {
    shadowColor: COLORS.shadowIOS,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  islamic: {
    shadowColor: COLORS.islamicPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.0,
    elevation: 4,
  },
};

// Animation configurations
export const ANIMATIONS = {
  easeInOut: {
    duration: 300,
    useNativeDriver: true,
  },
  spring: {
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  },
  fade: {
    duration: 200,
    useNativeDriver: true,
  },
};

// Islamic Finance specific constants
export const ISLAMIC_CONSTANTS = {
  NISAB_THRESHOLD: 87000, // Current nisab value in BDT
  ZAKAT_RATE: 0.025, // 2.5%
  CURRENCIES: {
    BDT: '৳',
    USD: '$',
    SAR: '﷼',
    AED: 'د.إ',
  },
  PRAYER_TIMES_API: 'http://api.aladhan.com/v1/timings',
  HALAL_CERTIFICATION_AUTHORITY: 'Bangladesh Standards and Testing Institution',
};

// App configuration
export const APP_CONFIG = {
  version: '1.0.0',
  buildNumber: 1,
  apiBaseUrl: 'https://api.fingrow.com',
  supportEmail: 'support@fingrow.com',
  supportPhone: '+880-1700-000000',
  privacyPolicyUrl: 'https://fingrow.com/privacy',
  termsOfServiceUrl: 'https://fingrow.com/terms',
  
  // Feature flags
  features: {
    darkMode: true,
    biometricAuth: true,
    pushNotifications: true,
    analyticsTracking: true,
    crashReporting: true,
  },
  
  // Islamic features
  islamicFeatures: {
    prayerTimeNotifications: true,
    qiblaDirection: true,
    islamicCalendar: true,
    halalCertificationCheck: true,
    zakatCalculator: true,
  },
};

const appTheme = { 
  COLORS, 
  SIZES, 
  FONTS, 
  SPACING, 
  SHADOWS, 
  ANIMATIONS,
  ISLAMIC_CONSTANTS,
  APP_CONFIG
};

export default appTheme;