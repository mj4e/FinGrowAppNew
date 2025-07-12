// app/api/islamic.js
import { islamicFinanceData } from '../constants/mockData';
import { COLORS } from '../constants/theme'; // Import COLORS for use

// --- Zakat Dashboard ---
export const getZakatDashboardData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          portfolio: islamicFinanceData.islamicPortfolio,
          features: [
            { id: 1, title: 'Invest My Zakat', subtitle: 'Fulfill your Islamic obligation', amount: '৳500', description: 'Help families start businesses', icon: 'heart', color: COLORS.islamicPrimary, screen: 'InvestMyZakat', badge: 'Most Popular' },
            { id: 2, title: 'Gold & Silver Hub', subtitle: 'Shariah-compliant precious metals', amount: '৳1,28,530', description: 'Physical asset investment', icon: 'award', color: COLORS.gold, screen: 'GoldHub', badge: 'Live Prices' },
          ]
        },
      });
    }, 500);
  });
};

// --- Invest My Zakat Screen ---
export const getInvestZakatScreenData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          zakatProjects: islamicFinanceData.zakatProjects,
          zakatHistory: islamicFinanceData.zakatHistory,
        },
      });
    }, 800);
  });
};

export const submitZakatInvestment = (amount, projectId) => {
  console.log(`Submitting Zakat: ৳${amount} to Project ID: ${projectId}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, transactionId: `txn_${Math.random().toString(36).substr(2, 9)}` });
    }, 1500);
  });
};

// --- Metals Hub Screen ---
export const getMetalsHubData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          metals: islamicFinanceData.metalPrices,
          chartData: [
            { time: '9:00', gold: 128000, silver: 1820 },
            { time: '10:00', gold: 128200, silver: 1835 },
            { time: '11:00', gold: 128100, silver: 1840 },
            { time: '12:00', gold: 128400, silver: 1850 },
            { time: '13:00', gold: 128530, silver: 1845 },
          ],
        },
      });
    }, 1200);
  });
};

// --- Sukuk Screen ---
export const getSukukData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          sukukOptions: islamicFinanceData.sukukInvestments,
        },
      });
    }, 700);
  });
};

export const submitSukukInvestment = (details) => {
  console.log('Submitting Sukuk Investment with details:', details);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, investmentId: `sukuk_${Math.random().toString(36).substr(2, 9)}` });
    }, 1500);
  });
};

// --- Mudarabah Screen ---
export const getMudarabahData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          investmentOptions: islamicFinanceData.microMudarabahProjects,
        },
      });
    }, 600);
  });
};

export const setAutoInvestConfig = (config) => {
  console.log('Saving Auto-Invest config:', config);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, configId: `config_${Math.random().toString(36).substr(2, 9)}` });
    }, 1500);
  });
};
