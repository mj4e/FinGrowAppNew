// app/api/dashboard.js
/**
 * Dashboard API service
 * Handles all dashboard-related data fetching
 */

const MOCK_DELAY = 800;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock dashboard data
 */
const MOCK_DASHBOARD_DATA = {
  userProfile: {
    id: 1,
    name: 'Ahmed Hassan',
    email: 'admin@fingrow.com',
    avatar: null,
    memberSince: '2024-01-15',
    verified: true,
  },
  walletData: {
    balance: '৳45,250.00',
    totalIncome: 15000,
    totalExpense: 12000,
    chartData: {
      income: 15000,
      expense: 12000,
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    }
  },
  spendingCategories: [
    {
      id: 1,
      name: 'Food & Dining',
      spent: 3500,
      budget: 5000,
      color: COLORS.primary,
    },
    {
      id: 2,
      name: 'Transportation',
      spent: 2200,
      budget: 3000,
      color: COLORS.secondary,
    },
    {
      id: 3,
      name: 'Shopping',
      spent: 4800,
      budget: 6000,
      color: COLORS.warning,
    },
    {
      id: 4,
      name: 'Entertainment',
      spent: 1500,
      budget: 2000,
      color: COLORS.success,
    },
  ],
  recentActivity: [
    {
      id: 1,
      type: 'zakat_payment',
      description: 'Zakat contribution to local mosque',
      amount: '৳2,500',
      date: '2024-07-10',
      status: 'completed'
    },
    {
      id: 2,
      type: 'investment',
      description: 'Gold investment purchase',
      amount: '৳5,000',
      date: '2024-07-09',
      status: 'completed'
    },
    {
      id: 3,
      type: 'sukuk_return',
      description: 'Sukuk dividend received',
      amount: '+৳850',
      date: '2024-07-08',
      status: 'completed'
    }
  ],
  islamicFinance: {
    totalZakatPaid: 12500,
    zakatDue: 3200,
    halalInvestments: 25000,
    sukukReturns: 1850,
  }
};

// Import colors - note: this might cause circular import, so we'll define locally
const COLORS = {
  primary: '#4A90E2',
  secondary: '#50E3C2',
  warning: '#FF9500',
  success: '#4CD964',
  danger: '#FF3B30',
};

// Update the mock data with colors
MOCK_DASHBOARD_DATA.spendingCategories = [
  {
    id: 1,
    name: 'Food & Dining',
    spent: 3500,
    budget: 5000,
    color: COLORS.primary,
  },
  {
    id: 2,
    name: 'Transportation',
    spent: 2200,
    budget: 3000,
    color: COLORS.secondary,
  },
  {
    id: 3,
    name: 'Shopping',
    spent: 4800,
    budget: 6000,
    color: COLORS.warning,
  },
  {
    id: 4,
    name: 'Entertainment',
    spent: 1500,
    budget: 2000,
    color: COLORS.success,
  },
];

/**
 * Get dashboard data for the main home screen
 * @returns {Promise<Object>} Dashboard data response
 */
export const getDashboardData = async () => {
  try {
    await delay(MOCK_DELAY);
    
    // In a real app, this would be an API call with user authentication
    /*
    const response = await fetch(`${API_BASE_URL}/dashboard`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    const data = await response.json();
    */
    
    // Simulate occasional network errors for testing
    if (Math.random() < 0.1) { // 10% chance of error
      throw new Error('Network error');
    }
    
    return {
      success: true,
      data: MOCK_DASHBOARD_DATA
    };
    
  } catch (error) {
    console.error('Dashboard API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to load dashboard data'
    };
  }
};

/**
 * Get user spending analytics
 * @param {string} period - Time period ('week', 'month', 'year')
 * @returns {Promise<Object>} Spending analytics response
 */
export const getSpendingAnalytics = async (period = 'month') => {
  try {
    await delay(600);
    
    const analyticsData = {
      period,
      totalSpent: 12000,
      totalBudget: 16000,
      categories: MOCK_DASHBOARD_DATA.spendingCategories,
      trends: {
        thisMonth: 12000,
        lastMonth: 10500,
        change: '+14.3%'
      },
      topCategories: [
        { name: 'Shopping', amount: 4800, percentage: 40 },
        { name: 'Food & Dining', amount: 3500, percentage: 29 },
        { name: 'Transportation', amount: 2200, percentage: 18 }
      ]
    };
    
    return {
      success: true,
      data: analyticsData
    };
    
  } catch (error) {
    console.error('Spending analytics error:', error);
    return {
      success: false,
      error: 'Failed to load spending analytics'
    };
  }
};

/**
 * Get Islamic finance summary for the user
 * @returns {Promise<Object>} Islamic finance data response
 */
export const getIslamicFinanceSummary = async () => {
  try {
    await delay(500);
    
    return {
      success: true,
      data: MOCK_DASHBOARD_DATA.islamicFinance
    };
    
  } catch (error) {
    console.error('Islamic finance summary error:', error);
    return {
      success: false,
      error: 'Failed to load Islamic finance data'
    };
  }
};

/**
 * Get recent activity/transactions for dashboard
 * @param {number} limit - Number of recent activities to fetch
 * @returns {Promise<Object>} Recent activity response
 */
export const getRecentActivity = async (limit = 5) => {
  try {
    await delay(400);
    
    const activities = MOCK_DASHBOARD_DATA.recentActivity.slice(0, limit);
    
    return {
      success: true,
      data: activities
    };
    
  } catch (error) {
    console.error('Recent activity error:', error);
    return {
      success: false,
      error: 'Failed to load recent activity'
    };
  }
};