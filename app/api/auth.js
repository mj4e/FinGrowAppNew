// // app/api/auth.js
// /**
//  * Authentication API service
//  * This file handles all authentication-related API calls
//  */

// // Mock API base URL - replace with your actual backend URL
// const API_BASE_URL = 'https://api.fingrow.com'; // Replace with actual URL

// // Simulated network delay for development
// const MOCK_DELAY = 1000;

// /**
//  * Simulate API delay for development
//  */
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// /**
//  * Mock user database for development
//  */
// const MOCK_USERS = [
//   {
//     id: 1,
//     email: 'admin@fingrow.com',
//     password: 'password123',
//     name: 'Ahmed Hassan',
//     token: 'mock_token_12345',
//     profile: {
//       avatar: null,
//       phone: '+88-01711-123456',
//       joinDate: '2024-01-15',
//       verified: true,
//     }
//   },
//   {
//     id: 2,
//     email: 'user@example.com',
//     password: 'demo123',
//     name: 'Fatima Rahman',
//     token: 'mock_token_67890',
//     profile: {
//       avatar: null,
//       phone: '+88-01812-987654',
//       joinDate: '2024-03-20',
//       verified: false,
//     }
//   }
// ];

// /**
//  * Login user with email and password
//  * @param {string} email - User email
//  * @param {string} password - User password
//  * @returns {Promise<Object>} Response object with success status and data
//  */
// export const loginUser = async (email, password) => {
//   try {
//     // Simulate network delay
//     await delay(MOCK_DELAY);
    
//     // Input validation
//     if (!email || !password) {
//       return {
//         success: false,
//         error: 'Email and password are required'
//       };
//     }
    
//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return {
//         success: false,
//         error: 'Please enter a valid email address'
//       };
//     }
    
//     // Mock authentication (replace with actual API call)
//     const user = MOCK_USERS.find(u => 
//       u.email.toLowerCase() === email.toLowerCase() && 
//       u.password === password
//     );
    
//     if (!user) {
//       return {
//         success: false,
//         error: 'Invalid email or password'
//       };
//     }
    
//     // Return successful login response
//     return {
//       success: true,
//       token: user.token,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         profile: user.profile
//       }
//     };
    
//     /* 
//     // Actual API call would look like this:
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//     });
    
//     const data = await response.json();
    
//     if (!response.ok) {
//       return {
//         success: false,
//         error: data.message || 'Login failed'
//       };
//     }
    
//     return {
//       success: true,
//       token: data.token,
//       user: data.user
//     };
//     */
    
//   } catch (error) {
//     console.error('Login error:', error);
//     return {
//       success: false,
//       error: 'Network error. Please check your connection and try again.'
//     };
//   }
// };

// /**
//  * Register new user
//  * @param {Object} userData - User registration data
//  * @returns {Promise<Object>} Response object with success status and data
//  */
// export const registerUser = async (userData) => {
//   try {
//     await delay(MOCK_DELAY);
    
//     const { name, email, password, confirmPassword } = userData;
    
//     // Validation
//     if (!name || !email || !password || !confirmPassword) {
//       return {
//         success: false,
//         error: 'All fields are required'
//       };
//     }
    
//     if (password !== confirmPassword) {
//       return {
//         success: false,
//         error: 'Passwords do not match'
//       };
//     }
    
//     if (password.length < 6) {
//       return {
//         success: false,
//         error: 'Password must be at least 6 characters long'
//       };
//     }
    
//     // Check if user already exists
//     const existingUser = MOCK_USERS.find(u => 
//       u.email.toLowerCase() === email.toLowerCase()
//     );
    
//     if (existingUser) {
//       return {
//         success: false,
//         error: 'An account with this email already exists'
//       };
//     }
    
//     // Mock user creation
//     const newUser = {
//       id: MOCK_USERS.length + 1,
//       email,
//       password,
//       name,
//       token: `mock_token_${Date.now()}`,
//       profile: {
//         avatar: null,
//         phone: null,
//         joinDate: new Date().toISOString().split('T')[0],
//         verified: false,
//       }
//     };
    
//     // In a real app, don't store the user in memory like this
//     MOCK_USERS.push(newUser);
    
//     return {
//       success: true,
//       token: newUser.token,
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         name: newUser.name,
//         profile: newUser.profile
//       }
//     };
    
//   } catch (error) {
//     console.error('Registration error:', error);
//     return {
//       success: false,
//       error: 'Network error. Please check your connection and try again.'
//     };
//   }
// };

// /**
//  * Logout user (clear session)
//  * @param {string} token - User token
//  * @returns {Promise<Object>} Response object
//  */
// export const logoutUser = async (token) => {
//   try {
//     await delay(500);
    
//     // In a real app, you would invalidate the token on the server
//     // For now, we'll just return success
    
//     return {
//       success: true,
//       message: 'Logged out successfully'
//     };
    
//   } catch (error) {
//     console.error('Logout error:', error);
//     return {
//       success: false,
//       error: 'Logout failed'
//     };
//   }
// };

// /**
//  * Verify user token
//  * @param {string} token - User token to verify
//  * @returns {Promise<Object>} Response object with user data
//  */
// export const verifyToken = async (token) => {
//   try {
//     await delay(500);
    
//     // Find user by token
//     const user = MOCK_USERS.find(u => u.token === token);
    
//     if (!user) {
//       return {
//         success: false,
//         error: 'Invalid or expired token'
//       };
//     }
    
//     return {
//       success: true,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         profile: user.profile
//       }
//     };
    
//   } catch (error) {
//     console.error('Token verification error:', error);
//     return {
//       success: false,
//       error: 'Token verification failed'
//     };
//   }
// };

// /**
//  * Request password reset
//  * @param {string} email - User email
//  * @returns {Promise<Object>} Response object
//  */
// export const requestPasswordReset = async (email) => {
//   try {
//     await delay(MOCK_DELAY);
    
//     if (!email) {
//       return {
//         success: false,
//         error: 'Email is required'
//       };
//     }
    
//     // Check if user exists
//     const user = MOCK_USERS.find(u => 
//       u.email.toLowerCase() === email.toLowerCase()
//     );
    
//     // Always return success for security (don't reveal if email exists)
//     return {
//       success: true,
//       message: 'If an account with this email exists, you will receive a password reset link.'
//     };
    
//   } catch (error) {
//     console.error('Password reset error:', error);
//     return {
//       success: false,
//       error: 'Password reset request failed'
//     };
//   }
// };







// app/api/auth.js - Enhanced Production Version
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_CONFIG } from '../constants/theme';

const API_BASE_URL = APP_CONFIG.apiBaseUrl;
const MOCK_DELAY = 800;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced mock user database
const MOCK_USERS = [
  {
    id: 1,
    email: 'admin@fingrow.com',
    password: 'password123',
    name: 'Ahmed Hassan',
    token: 'mock_token_ahmed_12345',
    profile: {
      avatar: null,
      phone: '+880-1711-123456',
      joinDate: '2024-01-15',
      verified: true,
      tier: 'Gold',
      totalInvested: 125000,
      zakatPaid: 8500,
      preferences: {
        notifications: true,
        darkMode: false,
        language: 'en',
        prayerNotifications: true,
      }
    }
  },
  {
    id: 2,
    email: 'user@example.com',
    password: 'demo123',
    name: 'Fatima Rahman',
    token: 'mock_token_fatima_67890',
    profile: {
      avatar: null,
      phone: '+880-1812-987654',
      joinDate: '2024-03-20',
      verified: false,
      tier: 'Silver',
      totalInvested: 45000,
      zakatPaid: 2500,
      preferences: {
        notifications: true,
        darkMode: true,
        language: 'bn',
        prayerNotifications: true,
      }
    }
  }
];

export const loginUser = async (email, password) => {
  try {
    await delay(MOCK_DELAY);
    
    if (!email || !password) {
      return {
        success: false,
        error: 'Email and password are required'
      };
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: 'Please enter a valid email address'
      };
    }
    
    const user = MOCK_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
    
    // Store last login
    await AsyncStorage.setItem('lastLoginDate', new Date().toISOString());
    
    return {
      success: true,
      token: user.token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile: user.profile
      }
    };
    
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.'
    };
  }
};

export const registerUser = async (userData) => {
  try {
    await delay(MOCK_DELAY);
    
    const { name, email, password, confirmPassword } = userData;
    
    if (!name || !email || !password || !confirmPassword) {
      return {
        success: false,
        error: 'All fields are required'
      };
    }
    
    if (password !== confirmPassword) {
      return {
        success: false,
        error: 'Passwords do not match'
      };
    }
    
    if (password.length < 8) {
      return {
        success: false,
        error: 'Password must be at least 8 characters long'
      };
    }
    
    const existingUser = MOCK_USERS.find(u => 
      u.email.toLowerCase() === email.toLowerCase()
    );
    
    if (existingUser) {
      return {
        success: false,
        error: 'An account with this email already exists'
      };
    }
    
    const newUser = {
      id: MOCK_USERS.length + 1,
      email,
      password,
      name,
      token: `mock_token_${Date.now()}`,
      profile: {
        avatar: null,
        phone: null,
        joinDate: new Date().toISOString().split('T')[0],
        verified: false,
        tier: 'Bronze',
        totalInvested: 0,
        zakatPaid: 0,
        preferences: {
          notifications: true,
          darkMode: false,
          language: 'en',
          prayerNotifications: true,
        }
      }
    };
    
    MOCK_USERS.push(newUser);
    
    return {
      success: true,
      token: newUser.token,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        profile: newUser.profile
      }
    };
    
  } catch (error) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: 'Network error. Please check your connection and try again.'
    };
  }
};

export const logoutUser = async (token) => {
  try {
    await delay(300);
    await AsyncStorage.removeItem('lastLoginDate');
    
    return {
      success: true,
      message: 'Logged out successfully'
    };
    
  } catch (error) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: 'Logout failed'
    };
  }
};

export const verifyToken = async (token) => {
  try {
    await delay(400);
    
    const user = MOCK_USERS.find(u => u.token === token);
    
    if (!user) {
      return {
        success: false,
        error: 'Invalid or expired token'
      };
    }
    
    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        profile: user.profile
      }
    };
    
  } catch (error) {
    console.error('Token verification error:', error);
    return {
      success: false,
      error: 'Token verification failed'
    };
  }
};

export const requestPasswordReset = async (email) => {
  try {
    await delay(MOCK_DELAY);
    
    if (!email) {
      return {
        success: false,
        error: 'Email is required'
      };
    }
    
    return {
      success: true,
      message: 'If an account with this email exists, you will receive a password reset link.'
    };
    
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: 'Password reset request failed'
    };
  }
};

// ====================================
// app/api/islamic.js - Complete Enhanced Version
// ====================================

import { ISLAMIC_CONSTANTS } from '../constants/theme';

const ISLAMIC_MOCK_DATA = {
  portfolio: {
    totalInvested: 125000,
    totalReturn: 12.5,
    zakatPaid: 8500,
    halalCertification: true,
    lastUpdated: '2024-07-11'
  },
  features: [
    {
      id: 1,
      title: 'Invest My Zakat',
      subtitle: 'Impact-based Zakat allocation',
      amount: '৳2,500 due',
      icon: 'heart',
      color: COLORS.islamicPrimary,
      screen: 'InvestMyZakat',
      badge: 'Due'
    },
    {
      id: 2,
      title: 'Gold & Silver Hub',
      subtitle: 'Precious metals investment',
      amount: '৳25,000 invested',
      icon: 'gold',
      color: COLORS.gold,
      screen: 'GoldSilverHub',
      badge: null
    },
    {
      id: 3,
      title: 'Business Sukuk',
      subtitle: 'Shariah-compliant bonds',
      amount: '৳50,000 active',
      icon: 'certificate',
      color: COLORS.islamicAccent,
      screen: 'BusinessSukuk',
      badge: null
    },
    {
      id: 4,
      title: 'Micro-Mudarabah',
      subtitle: 'Small business partnerships',
      amount: '৳15,000 invested',
      icon: 'handshake',
      color: COLORS.islamicSecondary,
      screen: 'MicroMudarabah',
      badge: 'New'
    }
  ]
};

export const getZakatDashboardData = async () => {
  try {
    await delay(600);
    
    if (Math.random() < 0.03) {
      throw new Error('Failed to connect to Islamic finance service');
    }
    
    return {
      success: true,
      data: ISLAMIC_MOCK_DATA
    };
    
  } catch (error) {
    console.error('Islamic finance API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to load Islamic finance data'
    };
  }
};

export const calculateZakat = async (wealthData) => {
  try {
    await delay(800);
    
    const { cash, gold, silver, investments, debts } = wealthData;
    
    const totalWealth = (cash || 0) + (gold || 0) + (silver || 0) + (investments || 0) - (debts || 0);
    const nisabValue = ISLAMIC_CONSTANTS.NISAB_THRESHOLD;
    
    let zakatDue = 0;
    if (totalWealth >= nisabValue) {
      zakatDue = totalWealth * ISLAMIC_CONSTANTS.ZAKAT_RATE;
    }
    
    return {
      success: true,
      data: {
        totalWealth,
        nisabValue,
        zakatDue,
        isZakatApplicable: totalWealth >= nisabValue,
        breakdown: {
          cash,
          gold,
          silver,
          investments,
          debts,
          netWealth: totalWealth
        },
        calculation: {
          rate: ISLAMIC_CONSTANTS.ZAKAT_RATE,
          currency: ISLAMIC_CONSTANTS.CURRENCIES.BDT
        }
      }
    };
    
  } catch (error) {
    console.error('Zakat calculation error:', error);
    return {
      success: false,
      error: 'Failed to calculate Zakat'
    };
  }
};

export const getGoldSilverData = async () => {
  try {
    await delay(500);
    
    const goldSilverData = {
      currentPrices: {
        gold: {
          pricePerGram: 7250 + Math.floor(Math.random() * 100) - 50,
          change24h: Math.random() > 0.5 ? '+2.3%' : '-1.2%',
          trend: Math.random() > 0.5 ? 'up' : 'down'
        },
        silver: {
          pricePerGram: 95 + Math.floor(Math.random() * 5) - 2,
          change24h: Math.random() > 0.5 ? '+1.1%' : '-0.8%',
          trend: Math.random() > 0.5 ? 'up' : 'down'
        }
      },
      userHoldings: {
        gold: {
          grams: 35,
          value: 253750,
          purchasePrice: 240000
        },
        silver: {
          grams: 500,
          value: 47500,
          purchasePrice: 45000
        }
      },
      marketAnalysis: {
        goldTrend: 'bullish',
        silverTrend: 'neutral',
        recommendations: [
          'Gold showing strong momentum',
          'Consider gradual silver accumulation'
        ]
      }
    };
    
    return {
      success: true,
      data: goldSilverData
    };
    
  } catch (error) {
    console.error('Gold/Silver data error:', error);
    return {
      success: false,
      error: 'Failed to load precious metals data'
    };
  }
};

export const getSukukInvestments = async () => {
  try {
    await delay(700);
    
    const sukukData = {
      available: [
        {
          id: 1,
          name: 'Bangladesh Government Sukuk 2024',
          type: 'Government',
          expectedReturn: '8.5%',
          minInvestment: 50000,
          maturity: '2 years',
          riskLevel: 'Low',
          halalRating: 'AAA',
          issuer: 'Government of Bangladesh',
          sector: 'Government',
          rating: 'AAA',
          riskColor: '#4CD964',
          icon: 'bank'
        },
        {
          id: 2,
          name: 'BRAC Bank Corporate Sukuk',
          type: 'Corporate',
          expectedReturn: '10.2%',
          minInvestment: 100000,
          maturity: '3 years',
          riskLevel: 'Medium',
          halalRating: 'AA+',
          issuer: 'BRAC Bank',
          sector: 'Banking',
          rating: 'AA+',
          riskColor: '#FF9500',
          icon: 'office-building'
        }
      ],
      userInvestments: [
        {
          id: 1,
          name: 'Government Sukuk 2023',
          invested: 50000,
          currentValue: 54250,
          return: '+8.5%',
          maturityDate: '2025-12-31'
        }
      ]
    };
    
    return {
      success: true,
      data: sukukData
    };
    
  } catch (error) {
    console.error('Sukuk investments error:', error);
    return {
      success: false,
      error: 'Failed to load Sukuk investment data'
    };
  }
};

export const getMudarabahInvestments = async () => {
  try {
    await delay(600);
    
    const mudarabahData = {
      available: [
        {
          id: 1,
          businessName: 'Green Tech Solutions',
          businessType: 'Technology',
          fundingGoal: 500000,
          raised: 325000,
          minInvestment: 10000,
          expectedReturn: '15-20%',
          duration: '18 months',
          riskLevel: 'Medium',
          description: 'Developing eco-friendly software solutions'
        },
        {
          id: 2,
          businessName: 'Halal Food Processing',
          businessType: 'Food & Beverage',
          fundingGoal: 750000,
          raised: 180000,
          minInvestment: 25000,
          expectedReturn: '12-18%',
          duration: '2 years',
          riskLevel: 'Low-Medium',
          description: 'Expanding halal food production facility'
        }
      ],
      userInvestments: [
        {
          id: 1,
          businessName: 'Textile Export Co.',
          invested: 15000,
          currentReturn: '+12.5%',
          status: 'Active'
        }
      ],
      investmentOptions: [
        {
          id: 1,
          name: 'Green Tech Solutions',
          sector: 'Technology',
          icon: 'leaf'
        },
        {
          id: 2,
          name: 'Halal Food Processing',
          sector: 'Food & Beverage',
          icon: 'food'
        }
      ]
    };
    
    return {
      success: true,
      data: mudarabahData
    };
    
  } catch (error) {
    console.error('Mudarabah investments error:', error);
    return {
      success: false,
      error: 'Failed to load Mudarabah investment data'
    };
  }
};

export const processZakatPayment = async (paymentData) => {
  try {
    await delay(1000);
    
    const { amount, recipient, paymentMethod } = paymentData;
    
    if (!amount || amount <= 0) {
      return {
        success: false,
        error: 'Invalid payment amount'
      };
    }
    
    if (!recipient) {
      return {
        success: false,
        error: 'Recipient is required'
      };
    }
    
    const transactionId = `ZKT_${Date.now()}`;
    
    return {
      success: true,
      data: {
        transactionId,
        amount,
        recipient,
        status: 'completed',
        date: new Date().toISOString(),
        message: 'Zakat payment processed successfully',
        impactEstimate: `Will help approximately ${Math.floor(amount / 500)} families`
      }
    };
    
  } catch (error) {
    console.error('Zakat payment error:', error);
    return {
      success: false,
      error: 'Failed to process Zakat payment'
    };
  }
};

// Additional enhanced API functions for your screens
export const getSukukData = async () => {
  return await getSukukInvestments();
};

export const submitSukukInvestment = async (investmentDetails) => {
  try {
    await delay(1500);
    
    return {
      success: true,
      data: {
        transactionId: `SUK_${Date.now()}`,
        investmentDetails,
        status: 'processing',
        estimatedCompletion: '2-3 business days'
      }
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to submit investment'
    };
  }
};

export const getInvestZakatScreenData = async () => {
  try {
    await delay(600);
    
    return {
      success: true,
      data: {
        zakatProjects: [
          {
            id: 1,
            title: 'Help Families Start Small Businesses',
            description: 'Provide microloans to families in rural areas',
            color: '#4CD964',
            icon: 'store'
          },
          {
            id: 2,
            title: 'Support Orphan Education',
            description: 'Fund education for orphaned children',
            color: '#FF9500',