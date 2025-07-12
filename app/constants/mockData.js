// File: app/constants/mockData.js
// Complete mock data for the FinGrow app

// User Profile Data
export const userProfile = {
  name: 'Sadia Rahman',
  email: 'sadia.rahman@example.com',
  memberSince: '2022-08-15',
  profileImage: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

// Wallet Data
export const walletData = {
  balance: '৳150,780.50',
  recentTransactions: [
    { id: '1', type: 'expense', description: 'Daraz Shopping', amount: '-৳3,500.00', date: '2024-07-20', icon: 'shopping-cart' },
    { id: '2', type: 'income', description: 'Monthly Salary', amount: '+৳95,000.00', date: '2024-07-19', icon: 'briefcase' },
    { id: '3', type: 'expense', description: 'Utilities Bill', amount: '-৳2,200.00', date: '2024-07-18', icon: 'file-text' },
    { id: '4', type: 'expense', description: 'Restaurant Dinner', amount: '-৳1,800.00', date: '2024-07-17', icon: 'coffee' },
    { id: '5', type: 'income', description: 'Freelance Project', amount: '+৳15,000.00', date: '2024-07-15', icon: 'code' },
  ],
};

// Cards Data
export const cardsData = [
  { id: 'card-1', type: 'VISA', last4: '4242', expiry: '12/26', cardHolder: 'Sadia Rahman', cardColor: '#4A90E2' },
  { id: 'card-2', type: 'Mastercard', last4: '5588', expiry: '08/25', cardHolder: 'Sadia Rahman', cardColor: '#D0021B' },
];

// Metals Investment Data
export const metalsData = {
  gold: {
    name: 'Gold',
    holdings: '1.5 oz',
    currentValue: '৳285,000.00',
    change: '+1.2%',
    color: '#FFD700',
  },
  silver: {
    name: 'Silver',
    holdings: '25 oz',
    currentValue: '৳70,500.00',
    change: '-0.8%',
    color: '#C0C0C0',
  },
  platinum: {
    name: 'Platinum',
    holdings: '0.5 oz',
    currentValue: '৳98,000.00',
    change: '+2.5%',
    color: '#E5E4E2',
  },
};

// Grow Screen - Savings Goals
export const savingsGoals = [
  { id: 'goal-1', name: 'New Laptop', targetAmount: 120000, currentAmount: 75000, icon: 'laptop' },
  { id: 'goal-2', name: 'Vacation to Cox\'s Bazar', targetAmount: 50000, currentAmount: 45000, icon: 'sun' },
  { id: 'goal-3', name: 'Emergency Fund', targetAmount: 200000, currentAmount: 110000, icon: 'shield' },
];

// Rewards Program Data
export const rewardsData = {
  tier: 'Gold',
  points: 4850,
  pointsToNextTier: 5000,
  nextTier: 'Platinum',
  benefits: [
    '5% cashback on all purchases',
    'Priority customer support',
    'Exclusive access to partner deals',
  ],
};

// Dashboard - Income vs Expense Data for Chart
export const incomeExpenseData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      data: [70000, 75000, 85000, 80000, 95000, 98000], // Income
      color: (opacity = 1) => `rgba(74, 144, 226, ${opacity})`, // Primary color
      strokeWidth: 2,
    },
    {
      data: [50000, 55000, 60000, 58000, 65000, 72000], // Expense
      color: (opacity = 1) => `rgba(208, 2, 27, ${opacity})`, // Danger color
      strokeWidth: 2,
    },
  ],
  legend: ['Income', 'Expense'],
};

// Dashboard - Budget & Spending Categories
export const spendingCategories = [
    { id: 'cat-1', name: 'Groceries', spent: 4500, budget: 10000, color: '#50E3C2' },
    { id: 'cat-2', name: 'Shopping', spent: 8500, budget: 15000, color: '#F5A623' },
    { id: 'cat-3', name: 'Transport', spent: 3000, budget: 5000, color: '#4A90E2' },
    { id: 'cat-4', name: 'Entertainment', spent: 6000, budget: 7000, color: '#BD10E0' },
];

// NEW: Islamic Finance Data
export const islamicFinanceData = {
  // Investment Pool Data
  investmentPools: [
    {
      id: 'pool-1',
      name: 'Halal Business Growth Pool',
      type: 'Mudarabah',
      totalValue: 2500000, // ৳25,00,000
      investorCount: 1247,
      minimumInvestment: 5000,
      expectedReturn: '5-8%',
      riskLevel: 'Medium',
      maturityPeriod: '12 months',
      currentReturn: 5.2,
      compliance: 'Shariah-Compliant'
    }
  ],

  // Metal Investment Data for Islamic Finance
  metalPrices: {
    gold: {
      currentPrice: 128530, // ৳1,285.30 per gram
      change: +1.2,
      holdings: 15, // grams
      value: 1928000 // ৳19,28,000
    },
    silver: {
      currentPrice: 1850, // ৳18.50 per gram
      change: -0.8,
      holdings: 250, // grams
      value: 462500 // ৳4,62,500
    }
  },

  // Micro-Mudarabah Projects
  microMudarabahProjects: [
    {
      id: 'micro-1',
      name: 'Green Energy Co.',
      sector: 'Renewable Energy',
      expectedReturn: '8-12%',
      duration: '5 years',
      riskLevel: 'Low Risk',
      riskColor: '#4CD964',
      icon: 'leaf'
    },
    {
      id: 'micro-2',
      name: 'Retail Group PLC',
      sector: 'Retail & Commerce',
      expectedReturn: '6-10%',
      duration: '3 years',
      riskLevel: 'Low Risk',
      riskColor: '#4CD964',
      icon: 'shopping-bag'
    },
    {
      id: 'micro-3',
      name: 'Logistics Holdings',
      sector: 'Transportation',
      expectedReturn: '7-11%',
      duration: '4 years',
      riskLevel: 'Medium Risk',
      riskColor: '#FF9500',
      icon: 'truck'
    }
  ],

  // Sukuk Investment Options
  sukukInvestments: [
    {
      id: 'sukuk-1',
      name: 'Green Energy Co.',
      sector: 'Renewable Energy',
      expectedReturn: '7-9%',
      duration: '5 years',
      riskLevel: 'Low Risk',
      riskColor: '#4CD964',
      minInvestment: 1000,
      rating: 'AAA',
      icon: 'leaf'
    },
    {
      id: 'sukuk-2',
      name: 'Retail Group PLC',
      sector: 'Retail',
      expectedReturn: '6-8%',
      duration: '3 years',
      riskLevel: 'Low Risk',
      riskColor: '#4CD964',
      minInvestment: 500,
      rating: 'AA+',
      icon: 'store'
    },
    {
      id: 'sukuk-3',
      name: 'Logistics Holdings',
      sector: 'Transportation',
      expectedReturn: '8-10%',
      duration: '4 years',
      riskLevel: 'Medium Risk',
      riskColor: '#FF9500',
      minInvestment: 2000,
      rating: 'AA',
      icon: 'truck'
    }
  ],

  // Zakat Projects
  zakatProjects: [
    {
      id: 'zakat-1',
      title: 'Increase Livelihood',
      description: 'Helps 5 families start a business',
      impact: 'Provides support to halal micro-enterprises',
      type: 'Business Support',
      icon: 'briefcase',
      color: '#4A90E2'
    },
    {
      id: 'zakat-2',
      title: 'Education Support',
      description: 'Sponsors 10 students for education',
      impact: 'Provides scholarship and learning materials',
      type: 'Education',
      icon: 'book-open',
      color: '#50E3C2'
    },
    {
      id: 'zakat-3',
      title: 'Healthcare Aid',
      description: 'Medical support for 20 families',
      impact: 'Essential healthcare and medicine access',
      type: 'Healthcare',
      icon: 'heart',
      color: '#4CD964'
    }
  ],

  // Previous Zakat Donations
  zakatHistory: [
    {
      id: 'zakat-hist-1',
      date: '2024-06-15',
      amount: 450,
      project: 'Livelihood Support',
      families: 4,
      status: 'Completed'
    },
    {
      id: 'zakat-hist-2',
      date: '2024-05-20',
      amount: 600,
      project: 'Education Support',
      families: 6,
      status: 'In Progress'
    },
    {
      id: 'zakat-hist-3',
      date: '2024-04-10',
      amount: 350,
      project: 'Healthcare Aid',
      families: 3,
      status: 'Completed'
    }
  ],

  // Islamic Finance Portfolio Summary
  islamicPortfolio: {
    totalInvested: 150000, // ৳1,50,000
    currentValue: 162300, // ৳1,62,300
    totalReturn: 8.2, // 8.2%
    activeInvestments: 5,
    zakatPaid: 2500 // ৳2,500 this year
  }
};