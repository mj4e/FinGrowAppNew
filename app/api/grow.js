// app/api/grow.js
import { savingsGoals } from '../constants/mockData';

export const getSavingsGoalsData = () => {
  // In a real app, this would be a GET request to /api/goals or similar
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: savingsGoals,
      });
    }, 800); // Simulate network delay
  });
};


// app/api/grow.js
import { savingsGoals, metalsData } from '../constants/mockData';

// ... (keep getSavingsGoalsData function)

export const getMetalsData = () => {
  // In a real app, this would be a GET request to /api/metals or similar
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: metalsData, // The API returns the whole object
      });
    }, 700);
  });
};