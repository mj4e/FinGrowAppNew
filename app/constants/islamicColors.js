// File: app/constants/islamicColors.js
// Green theme colors for Islamic Finance screens

export const ISLAMIC_COLORS = {
  // Primary Islamic Green Palette
  primary: '#2E8B57',      // Sea Green - Main brand color
  secondary: '#50E3C2',    // Turquoise - Accent color
  accent: '#3CB371',       // Medium Sea Green - Secondary actions
  
  // Supporting Greens
  light: '#90EE90',        // Light Green - Success states
  dark: '#006400',         // Dark Green - Text/headings
  forest: '#228B22',       // Forest Green - Important actions
  
  // Background & Surface
  background: '#F0FFF0',   // Honeydew - Light background
  surface: '#F5FFFA',      // Mint Cream - Card backgrounds
  overlay: '#E6F3E6',      // Light green overlay
  
  // Status Colors (Green variants)
  success: '#32CD32',      // Lime Green - Success messages
  warning: '#9ACD32',      // Yellow Green - Warnings
  info: '#40E0D0',         // Turquoise - Info messages
  
  // Neutral Colors (for contrast)
  white: '#FFFFFF',
  gray: {
    50: '#F8F9FA',
    100: '#E9ECEF',
    200: '#DEE2E6',
    300: '#CED4DA',
    400: '#6C757D',
    500: '#495057',
  },
  
  // Semantic Colors
  zakat: '#2E8B57',        // Main Zakat color
  halal: '#3CB371',        // Halal certification
  shariah: '#228B22',      // Shariah compliance
  
  // Gold & Silver (for metal investments)
  gold: '#FFD700',
  silver: '#C0C0C0',
  
  // Gradients for special effects
  gradients: {
    primary: ['#2E8B57', '#3CB371'],
    secondary: ['#50E3C2', '#40E0D0'],
    success: ['#32CD32', '#90EE90'],
  }
};

// Helper function to get color with opacity
export const getIslamicColorWithOpacity = (color, opacity) => {
  return `${color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
};

// Theme variants for different contexts
export const ISLAMIC_THEMES = {
  zakat: {
    primary: ISLAMIC_COLORS.primary,
    background: ISLAMIC_COLORS.background,
    surface: ISLAMIC_COLORS.surface,
  },
  investment: {
    primary: ISLAMIC_COLORS.accent,
    background: ISLAMIC_COLORS.surface,
    surface: ISLAMIC_COLORS.white,
  },
  gold: {
    primary: ISLAMIC_COLORS.gold,
    background: '#FFFAF0', // Floral White
    surface: ISLAMIC_COLORS.white,
  }
};

export default ISLAMIC_COLORS;