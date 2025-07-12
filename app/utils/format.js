// // app/utils/format.js
// /**
//  * Utility functions for formatting data throughout the app
//  */

// /**
//  * Format currency with Bangladesh Taka symbol
//  * @param {number} amount - The amount to format
//  * @param {string} currency - Currency symbol (default: '৳')
//  * @returns {string} Formatted currency string
//  */
// export const formatCurrency = (amount, currency = '৳') => {
//   if (amount === null || amount === undefined || isNaN(amount)) {
//     return `${currency}0.00`;
//   }
  
//   // Convert to number if it's a string
//   const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
//   return `${currency}${numAmount.toLocaleString('en-US', {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// };

// /**
//  * Format currency without decimal places for large amounts
//  * @param {number} amount - The amount to format
//  * @param {string} currency - Currency symbol (default: '৳')
//  * @returns {string} Formatted currency string
//  */
// export const formatCurrencyShort = (amount, currency = '৳') => {
//   if (amount === null || amount === undefined || isNaN(amount)) {
//     return `${currency}0`;
//   }
  
//   const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
//   if (numAmount >= 1000000) {
//     return `${currency}${(numAmount / 1000000).toFixed(1)}M`;
//   } else if (numAmount >= 1000) {
//     return `${currency}${(numAmount / 1000).toFixed(1)}K`;
//   }
  
//   return `${currency}${numAmount.toLocaleString('en-US')}`;
// };

// /**
//  * Format date to readable string
//  * @param {string|Date} date - The date to format
//  * @param {string} format - Format type ('short', 'long', 'time')
//  * @returns {string} Formatted date string
//  */
// export const formatDate = (date, format = 'short') => {
//   if (!date) return '';
  
//   const dateObj = typeof date === 'string' ? new Date(date) : date;
  
//   if (isNaN(dateObj.getTime())) {
//     return 'Invalid Date';
//   }
  
//   const options = {
//     short: { month: 'short', day: 'numeric' },
//     long: { year: 'numeric', month: 'long', day: 'numeric' },
//     time: { hour: '2-digit', minute: '2-digit' },
//     datetime: { 
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//       hour: '2-digit', 
//       minute: '2-digit' 
//     }
//   };
  
//   return dateObj.toLocaleDateString('en-US', options[format] || options.short);
// };

// /**
//  * Format percentage
//  * @param {number} value - The value to format as percentage
//  * @param {number} decimals - Number of decimal places (default: 1)
//  * @returns {string} Formatted percentage string
//  */
// export const formatPercentage = (value, decimals = 1) => {
//   if (value === null || value === undefined || isNaN(value)) {
//     return '0%';
//   }
  
//   const numValue = typeof value === 'string' ? parseFloat(value) : value;
//   return `${(numValue * 100).toFixed(decimals)}%`;
// };

// /**
//  * Format phone number
//  * @param {string} phoneNumber - The phone number to format
//  * @returns {string} Formatted phone number
//  */
// export const formatPhoneNumber = (phoneNumber) => {
//   if (!phoneNumber) return '';
  
//   // Remove all non-digits
//   const cleaned = phoneNumber.replace(/\D/g, '');
  
//   // Bangladesh phone number format
//   if (cleaned.length === 11 && cleaned.startsWith('01')) {
//     return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
//   }
  
//   // International format
//   if (cleaned.length > 11) {
//     return `+${cleaned.slice(0, -10)} ${cleaned.slice(-10, -7)}-${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`;
//   }
  
//   return phoneNumber;
// };

// /**
//  * Truncate text with ellipsis
//  * @param {string} text - The text to truncate
//  * @param {number} maxLength - Maximum length before truncation
//  * @returns {string} Truncated text
//  */
// export const truncateText = (text, maxLength = 50) => {
//   if (!text || text.length <= maxLength) return text;
//   return `${text.substring(0, maxLength)}...`;
// };

// /**
//  * Format file size
//  * @param {number} bytes - Size in bytes
//  * @returns {string} Formatted file size
//  */
// export const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes';
  
//   const k = 1024;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//   const i = Math.floor(Math.log(bytes) / Math.log(k));
  
//   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
// };

// /**
//  * Format Islamic date (Hijri calendar)
//  * @param {Date} date - Gregorian date
//  * @returns {string} Formatted Islamic date (simplified)
//  */
// export const formatIslamicDate = (date) => {
//   if (!date) return '';
  
//   // This is a simplified version. For accurate Hijri dates, 
//   // you would need a proper Islamic calendar library
//   const islamicMonths = [
//     'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
//     'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
//     'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'
//   ];
  
//   // Approximate conversion (not accurate, just for display)
//   const gregorianYear = date.getFullYear();
//   const approximateHijriYear = Math.floor((gregorianYear - 622) * 1.03) + 1;
//   const monthIndex = date.getMonth();
  
//   return `${date.getDate()} ${islamicMonths[monthIndex]} ${approximateHijriYear} AH`;
// };





// app/utils/format.js - Enhanced Production Version
import { ISLAMIC_CONSTANTS } from '../constants/theme';

/**
 * Enhanced utility functions for formatting data throughout the app
 */

/**
 * Format currency with multiple currency support
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency symbol (default: '৳')
 * @param {boolean} compact - Use compact notation for large numbers
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = ISLAMIC_CONSTANTS.CURRENCIES.BDT, compact = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0.00`;
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (compact && numAmount >= 100000) {
    return formatCurrencyShort(numAmount, currency);
  }
  
  return `${currency}${numAmount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

/**
 * Format currency in compact notation for large amounts
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrencyShort = (amount, currency = ISLAMIC_CONSTANTS.CURRENCIES.BDT) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return `${currency}0`;
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (numAmount >= 10000000) { // 1 Crore
    return `${currency}${(numAmount / 10000000).toFixed(1)}Cr`;
  } else if (numAmount >= 100000) { // 1 Lakh
    return `${currency}${(numAmount / 100000).toFixed(1)}L`;
  } else if (numAmount >= 1000) { // 1 Thousand
    return `${currency}${(numAmount / 1000).toFixed(1)}K`;
  }
  
  return `${currency}${numAmount.toLocaleString('en-US')}`;
};

/**
 * Enhanced date formatting with Islamic calendar support
 * @param {string|Date} date - The date to format
 * @param {string} format - Format type ('short', 'long', 'time', 'islamic')
 * @param {string} locale - Locale for formatting
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short', locale = 'en-US') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const options = {
    short: { month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    },
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  };
  
  if (format === 'islamic') {
    return formatIslamicDate(dateObj);
  }
  
  return dateObj.toLocaleDateString(locale, options[format] || options.short);
};

/**
 * Format Islamic date (Hijri calendar) - Enhanced version
 * @param {Date} date - Gregorian date
 * @returns {string} Formatted Islamic date
 */
export const formatIslamicDate = (date) => {
  if (!date) return '';
  
  const islamicMonths = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhu al-Qidah', 'Dhu al-Hijjah'
  ];
  
  // Simplified conversion - In production, use a proper Hijri calendar library
  const gregorianYear = date.getFullYear();
  const approximateHijriYear = Math.floor((gregorianYear - 622) * 1.03) + 1;
  const monthIndex = date.getMonth();
  
  return `${date.getDate()} ${islamicMonths[monthIndex]} ${approximateHijriYear} AH`;
};

/**
 * Format percentage with enhanced options
 * @param {number} value - The value to format as percentage
 * @param {number} decimals - Number of decimal places
 * @param {boolean} showSign - Show + for positive values
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 1, showSign = false) => {
  if (value === null || value === undefined || isNaN(value)) {
    return '0%';
  }
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const formattedValue = (numValue * 100).toFixed(decimals);
  const sign = showSign && numValue > 0 ? '+' : '';
  
  return `${sign}${formattedValue}%`;
};

/**
 * Format phone number with international support
 * @param {string} phoneNumber - The phone number to format
 * @param {string} countryCode - Country code (default: 'BD')
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber, countryCode = 'BD') => {
  if (!phoneNumber) return '';
  
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  if (countryCode === 'BD') {
    // Bangladesh phone number format
    if (cleaned.length === 11 && cleaned.startsWith('01')) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    }
  }
  
  // International format
  if (cleaned.length > 11) {
    return `+${cleaned.slice(0, -10)} ${cleaned.slice(-10, -7)}-${cleaned.slice(-7, -4)}-${cleaned.slice(-4)}`;
  }
  
  return phoneNumber;
};

/**
 * Truncate text with ellipsis and word boundary respect
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length before truncation
 * @param {boolean} respectWords - Respect word boundaries
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50, respectWords = true) => {
  if (!text || text.length <= maxLength) return text;
  
  if (respectWords) {
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > maxLength * 0.8 ? 
      `${truncated.substring(0, lastSpace)}...` : 
      `${truncated}...`;
  }
  
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Format file size with enhanced units
 * @param {number} bytes - Size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Format time duration in human readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration
 */
export const formatDuration = (seconds) => {
  if (!seconds || seconds < 0) return '0s';
  
  const units = [
    { label: 'y', value: 31536000 },
    { label: 'mo', value: 2592000 },
    { label: 'd', value: 86400 },
    { label: 'h', value: 3600 },
    { label: 'm', value: 60 },
    { label: 's', value: 1 }
  ];
  
  for (const unit of units) {
    const count = Math.floor(seconds / unit.value);
    if (count > 0) {
      return `${count}${unit.label}`;
    }
  }
  
  return '0s';
};

/**
 * Format investment return with color indication
 * @param {number} value - Return value
 * @param {boolean} isPercentage - Whether value is already a percentage
 * @returns {object} Formatted return with color
 */
export const formatReturn = (value, isPercentage = true) => {
  if (value === null || value === undefined || isNaN(value)) {
    return { text: '0%', color: '#8A8A8E', isPositive: false };
  }
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  const formattedValue = isPercentage ? 
    `${numValue > 0 ? '+' : ''}${numValue.toFixed(2)}%` :
    `${numValue > 0 ? '+' : ''}${formatPercentage(numValue, 2)}`;
  
  return {
    text: formattedValue,
    color: numValue > 0 ? '#4CD964' : numValue < 0 ? '#FF3B30' : '#8A8A8E',
    isPositive: numValue > 0,
    isNegative: numValue < 0
  };
};

/**
 * Calculate and format Zakat amount
 * @param {number} wealth - Total wealth amount
 * @param {number} nisab - Nisab threshold (optional)
 * @returns {object} Zakat calculation result
 */
export const calculateZakatAmount = (wealth, nisab = ISLAMIC_CONSTANTS.NISAB_THRESHOLD) => {
  if (!wealth || wealth < nisab) {
    return {
      zakatDue: 0,
      isEligible: false,
      formattedAmount: formatCurrency(0),
      message: 'Wealth below nisab threshold'
    };
  }
  
  const zakatAmount = wealth * ISLAMIC_CONSTANTS.ZAKAT_RATE;
  
  return {
    zakatDue: zakatAmount,
    isEligible: true,
    formattedAmount: formatCurrency(zakatAmount),
    rate: ISLAMIC_CONSTANTS.ZAKAT_RATE,
    message: `Zakat due: ${formatCurrency(zakatAmount)}`
  };
};

/**
 * Format prayer times
 * @param {object} prayerTimes - Prayer times object
 * @returns {object} Formatted prayer times
 */
export const formatPrayerTimes = (prayerTimes) => {
  if (!prayerTimes) return {};
  
  const prayers = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const formatted = {};
  
  prayers.forEach(prayer => {
    if (prayerTimes[prayer.toLowerCase()]) {
      formatted[prayer] = formatDate(new Date(`2000-01-01 ${prayerTimes[prayer.toLowerCase()]}`), 'time');
    }
  });
  
  return formatted;
};

/**
 * Validate and format Islamic investment compliance
 * @param {object} investment - Investment details
 * @returns {object} Compliance status
 */
export const validateIslamicCompliance = (investment) => {
  const checks = {
    noInterest: investment.interestFree !== false,
    noGambling: investment.gambling !== true,
    noAlcohol: investment.alcohol !== true,
    noPork: investment.pork !== true,
    halalCertified: investment.halalCertified === true
  };
  
  const passedChecks = Object.values(checks).filter(Boolean).length;
  const totalChecks = Object.keys(checks).length;
  const complianceScore = (passedChecks / totalChecks) * 100;
  
  return {
    isCompliant: complianceScore === 100,
    score: complianceScore,
    checks,
    rating: complianceScore === 100 ? 'AAA' : 
            complianceScore >= 80 ? 'AA' : 
            complianceScore >= 60 ? 'A' : 'B'
  };
};

// Export all