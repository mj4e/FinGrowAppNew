// app/api/wallet.js
/**
 * Wallet API service
 * Handles wallet-related data and transactions
 */

const MOCK_DELAY = 700;
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Mock wallet data
 */
const MOCK_WALLET_DATA = {
  balance: '৳45,250.00',
  availableBalance: '৳42,100.00',
  pendingAmount: '৳3,150.00',
  cards: [
    {
      id: 1,
      type: 'debit',
      bank: 'Dutch Bangla Bank',
      lastFour: '4523',
      isDefault: true,
      expiryDate: '12/26'
    },
    {
      id: 2,
      type: 'credit',
      bank: 'BRAC Bank',
      lastFour: '8901',
      isDefault: false,
      expiryDate: '08/27'
    }
  ],
  transactions: [
    {
      id: 1,
      type: 'expense',
      description: 'Grocery Shopping - Shwapno',
      amount: '-৳2,450',
      date: 'Jul 11, 2024',
      time: '2:30 PM',
      icon: 'shopping',
      category: 'Food & Dining',
      status: 'completed'
    },
    {
      id: 2,
      type: 'income',
      description: 'Salary Credit',
      amount: '+৳35,000',
      date: 'Jul 10, 2024',
      time: '9:00 AM',
      icon: 'bank-transfer-in',
      category: 'Income',
      status: 'completed'
    },
    {
      id: 3,
      type: 'expense',
      description: 'Uber Ride',
      amount: '-৳350',
      date: 'Jul 10, 2024',
      time: '6:45 PM',
      icon: 'car',
      category: 'Transportation',
      status: 'completed'
    },
    {
      id: 4,
      type: 'income',
      description: 'Sukuk Returns',
      amount: '+৳1,250',
      date: 'Jul 9, 2024',
      time: '11:30 AM',
      icon: 'chart-line',
      category: 'Investment',
      status: 'completed'
    },
    {
      id: 5,
      type: 'expense',
      description: 'Online Shopping - Daraz',
      amount: '-৳1,890',
      date: 'Jul 8, 2024',
      time: '4:15 PM',
      icon: 'shopping-online',
      category: 'Shopping',
      status: 'completed'
    },
    {
      id: 6,
      type: 'expense',
      description: 'Zakat Payment',
      amount: '-৳2,500',
      date: 'Jul 7, 2024',
      time: '10:00 AM',
      icon: 'hand-heart',
      category: 'Charity',
      status: 'completed'
    }
  ]
};

/**
 * Get wallet data including balance and recent transactions
 * @returns {Promise<Object>} Wallet data response
 */
export const getWalletData = async () => {
  try {
    await delay(MOCK_DELAY);
    
    // Simulate occasional network errors
    if (Math.random() < 0.08) { // 8% chance of error
      throw new Error('Network timeout');
    }
    
    return {
      success: true,
      data: MOCK_WALLET_DATA
    };
    
  } catch (error) {
    console.error('Wallet API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to load wallet data'
    };
  }
};

/**
 * Get detailed transaction history
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of transactions per page
 * @returns {Promise<Object>} Transaction history response
 */
export const getTransactionHistory = async (page = 1, limit = 20) => {
  try {
    await delay(500);
    
    // Simulate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const transactions = MOCK_WALLET_DATA.transactions.slice(startIndex, endIndex);
    
    return {
      success: true,
      data: {
        transactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(MOCK_WALLET_DATA.transactions.length / limit),
          totalItems: MOCK_WALLET_DATA.transactions.length,
          hasNextPage: endIndex < MOCK_WALLET_DATA.transactions.length
        }
      }
    };
    
  } catch (error) {
    console.error('Transaction history error:', error);
    return {
      success: false,
      error: 'Failed to load transaction history'
    };
  }
};

// ====================================
// app/api/grow.js
// Savings goals and investment tracking
// ====================================

/**
 * Mock savings goals data
 */
const MOCK_SAVINGS_GOALS = [
  {
    id: 1,
    name: 'Emergency Fund',
    targetAmount: 100000,
    currentAmount: 65000,
    deadline: '2024-12-31',
    icon: 'shield-check',
    color: '#4CD964',
    priority: 'high',
    monthlyTarget: 8750
  },
  {
    id: 2,
    name: 'Hajj Fund',
    targetAmount: 500000,
    currentAmount: 125000,
    deadline: '2026-06-30',
    icon: 'kaaba',
    color: '#2E8B57',
    priority: 'high',
    monthlyTarget: 15625
  },
  {
    id: 3,
    name: 'New Car',
    targetAmount: 1500000,
    currentAmount: 450000,
    deadline: '2025-08-15',
    icon: 'car',
    color: '#4A90E2',
    priority: 'medium',
    monthlyTarget: 65625
  },
  {
    id: 4,
    name: 'Home Down Payment',
    targetAmount: 2000000,
    currentAmount: 320000,
    deadline: '2027-01-01',
    icon: 'home',
    color: '#FF9500',
    priority: 'medium',
    monthlyTarget: 56000
  }
];

/**
 * Get user's savings goals data
 * @returns {Promise<Object>} Savings goals response
 */
export const getSavingsGoalsData = async () => {
  try {
    await delay(600);
    
    // Simulate occasional errors
    if (Math.random() < 0.05) { // 5% chance of error
      throw new Error('Server temporarily unavailable');
    }
    
    return {
      success: true,
      data: MOCK_SAVINGS_GOALS
    };
    
  } catch (error) {
    console.error('Savings goals API error:', error);
    return {
      success: false,
      error: error.message || 'Failed to load savings goals'
    };
  }
};

/**
 * Create a new savings goal
 * @param {Object} goalData - New goal data
 * @returns {Promise<Object>} Create goal response
 */
export const createSavingsGoal = async (goalData) => {
  try {
    await delay(800);
    
    const newGoal = {
      id: MOCK_SAVINGS_GOALS.length + 1,
      currentAmount: 0,
      ...goalData,
      createdAt: new Date().toISOString()
    };
    
    // In a real app, this would save to the database
    MOCK_SAVINGS_GOALS.push(newGoal);
    
    return {
      success: true,
      data: newGoal
    };
    
  } catch (error) {
    console.error('Create savings goal error:', error);
    return {
      success: false,
      error: 'Failed to create savings goal'
    };
  }
};

/**
 * Add money to a savings goal
 * @param {number} goalId - Goal ID
 * @param {number} amount - Amount to add
 * @returns {Promise<Object>} Add money response
 */
export const addToSavingsGoal = async (goalId, amount) => {
  try {
    await delay(500);
    
    const goal = MOCK_SAVINGS_GOALS.find(g => g.id === goalId);
    
    if (!goal) {
      return {
        success: false,
        error: 'Savings goal not found'
      };
    }
    
    if (amount <= 0) {
      return {
        success: false,
        error: 'Amount must be greater than 0'
      };
    }
    
    // Update the goal amount
    goal.currentAmount += amount;
    
    return {
      success: true,
      data: {
        goalId,
        newAmount: goal.currentAmount,
        addedAmount: amount,
        message: `Successfully added ৳${amount.toLocaleString()} to ${goal.name}`
      }
    };
    
  } catch (error) {
    console.error('Add to savings goal error:', error);
    return {
      success: false,
      error: 'Failed to add money to savings goal'
    };
  }
};

/**
 * Get investment opportunities (for Grow screen)
 * @returns {Promise<Object>} Investment opportunities response
 */
export const getInvestmentOpportunities = async () => {
  try {
    await delay(700);
    
    const opportunities = [
      {
        id: 1,
        name: 'Government Sukuk Bond',
        type: 'sukuk',
        expectedReturn: '8.5%',
        minInvestment: 50000,
        riskLevel: 'low',
        duration: '2 years',
        halalCertified: true
      },
      {
        id: 2,
        name: 'Gold Investment Plan',
        type: 'commodities',
        expectedReturn: '12.3%',
        minInvestment: 10000,
        riskLevel: 'medium',
        duration: 'flexible',
        halalCertified: true
      },
      {
        id: 3,
        name: 'SME Mudarabah Fund',
        type: 'mudarabah',
        expectedReturn: '15.7%',
        minInvestment: 25000,
        riskLevel: 'medium-high',
        duration: '3 years',
        halalCertified: true
      }
    ];
    
    return {
      success: true,
      data: opportunities
    };
    
  } catch (error) {
    console.error('Investment opportunities error:', error);
    return {
      success: false,
      error: 'Failed to load investment opportunities'
    };
  }
};