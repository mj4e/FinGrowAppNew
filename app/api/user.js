// app/api/user.js
import { userProfile } from '../constants/mockData';

export const getUserProfile = () => {
  // In a real app, you would send the user's token in the header
  // to an endpoint like GET /api/user/profile
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: userProfile,
      });
    }, 500); // Simulate network delay
  });
};