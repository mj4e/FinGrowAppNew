// app/api/rewards.js
import { rewardsData } from '../constants/mockData';

export const getRewardsData = () => {
  // In a real app, this would be a GET request to /api/user/rewards
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: rewardsData,
      });
    }, 600); // Simulate network delay
  });
};