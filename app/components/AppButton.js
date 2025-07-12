// // app/components/AppButton.js
// import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import { COLORS, FONTS, SIZES } from '../constants/theme';

// const AppButton = ({ 
//   title, 
//   onPress, 
//   disabled = false, 
//   loading = false, 
//   style = {}, 
//   textStyle = {},
//   variant = 'primary', // 'primary', 'secondary', 'outline'
//   size = 'large' // 'small', 'medium', 'large'
// }) => {
  
//   const getButtonStyle = () => {
//     let baseStyle = [styles.button];
    
//     // Size variants
//     switch (size) {
//       case 'small':
//         baseStyle.push(styles.buttonSmall);
//         break;
//       case 'medium':
//         baseStyle.push(styles.buttonMedium);
//         break;
//       default:
//         baseStyle.push(styles.buttonLarge);
//     }
    
//     // Color variants
//     switch (variant) {
//       case 'secondary':
//         baseStyle.push(styles.buttonSecondary);
//         break;
//       case 'outline':
//         baseStyle.push(styles.buttonOutline);
//         break;
//       default:
//         baseStyle.push(styles.buttonPrimary);
//     }
    
//     // Disabled state
//     if (disabled || loading) {
//       baseStyle.push(styles.buttonDisabled);
//     }
    
//     return [...baseStyle, style];
//   };
  
//   const getTextStyle = () => {
//     let baseStyle = [styles.buttonText];
    
//     // Size variants
//     switch (size) {
//       case 'small':
//         baseStyle.push(styles.textSmall);
//         break;
//       case 'medium':
//         baseStyle.push(styles.textMedium);
//         break;
//       default:
//         baseStyle.push(styles.textLarge);
//     }
    
//     // Color variants
//     switch (variant) {
//       case 'outline':
//         baseStyle.push(styles.textOutline);
//         break;
//       default:
//         baseStyle.push(styles.textDefault);
//     }
    
//     return [...baseStyle, textStyle];
//   };

//   return (
//     <TouchableOpacity
//       style={getButtonStyle()}
//       onPress={onPress}
//       disabled={disabled || loading}
//       activeOpacity={0.8}
//     >
//       {loading ? (
//         <ActivityIndicator size="small" color={variant === 'outline' ? COLORS.primary : COLORS.white} />
//       ) : (
//         <Text style={getTextStyle()}>{title}</Text>
//       )}
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: SIZES.radius,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: COLORS.black,
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 2,
//   },
  
//   // Size variants
//   buttonSmall: {
//     paddingVertical: SIZES.base,
//     paddingHorizontal: SIZES.padding,
//     minHeight: 36,
//   },
//   buttonMedium: {
//     paddingVertical: SIZES.base * 1.5,
//     paddingHorizontal: SIZES.padding * 1.5,
//     minHeight: 44,
//   },
//   buttonLarge: {
//     paddingVertical: SIZES.padding,
//     paddingHorizontal: SIZES.padding * 2,
//     minHeight: 52,
//   },
  
//   // Color variants
//   buttonPrimary: {
//     backgroundColor: COLORS.primary,
//   },
//   buttonSecondary: {
//     backgroundColor: COLORS.secondary,
//   },
//   buttonOutline: {
//     backgroundColor: 'transparent',
//     borderWidth: 2,
//     borderColor: COLORS.primary,
//   },
//   buttonDisabled: {
//     backgroundColor: COLORS.gray,
//     opacity: 0.6,
//   },
  
//   // Text styles
//   buttonText: {
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   textSmall: {
//     ...FONTS.body5,
//   },
//   textMedium: {
//     ...FONTS.body4,
//   },
//   textLarge: {
//     ...FONTS.h4,
//   },
//   textDefault: {
//     color: COLORS.white,
//   },
//   textOutline: {
//     color: COLORS.primary,
//   },
// });

// export default AppButton;





// app/components/AppButton.js - Enhanced Production Version
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SHADOWS, SIZES } from '../constants/theme';

const AppButton = ({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false, 
  style = {}, 
  textStyle = {},
  variant = 'primary', // 'primary', 'secondary', 'outline', 'islamic', 'danger'
  size = 'large', // 'small', 'medium', 'large'
  icon = null,
  iconPosition = 'left', // 'left', 'right'
  fullWidth = true,
  ...otherProps
}) => {
  
  const getButtonStyle = () => {
    let baseStyle = [styles.button];
    
    // Size variants
    switch (size) {
      case 'small':
        baseStyle.push(styles.buttonSmall);
        break;
      case 'medium':
        baseStyle.push(styles.buttonMedium);
        break;
      default:
        baseStyle.push(styles.buttonLarge);
    }
    
    // Color variants
    switch (variant) {
      case 'secondary':
        baseStyle.push(styles.buttonSecondary);
        break;
      case 'outline':
        baseStyle.push(styles.buttonOutline);
        break;
      case 'islamic':
        baseStyle.push(styles.buttonIslamic);
        break;
      case 'danger':
        baseStyle.push(styles.buttonDanger);
        break;
      default:
        baseStyle.push(styles.buttonPrimary);
    }
    
    // Full width
    if (fullWidth) {
      baseStyle.push(styles.fullWidth);
    }
    
    // Disabled state
    if (disabled || loading) {
      baseStyle.push(styles.buttonDisabled);
    }
    
    return [...baseStyle, style];
  };
  
  const getTextStyle = () => {
    let baseStyle = [styles.buttonText];
    
    // Size variants
    switch (size) {
      case 'small':
        baseStyle.push(styles.textSmall);
        break;
      case 'medium':
        baseStyle.push(styles.textMedium);
        break;
      default:
        baseStyle.push(styles.textLarge);
    }
    
    // Color variants
    switch (variant) {
      case 'outline':
        baseStyle.push(styles.textOutline);
        break;
      case 'islamic':
        baseStyle.push(styles.textIslamic);
        break;
      default:
        baseStyle.push(styles.textDefault);
    }
    
    return [...baseStyle, textStyle];
  };

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="small" 
            color={variant === 'outline' ? COLORS.primary : COLORS.white} 
          />
          <Text style={[getTextStyle(), { marginLeft: 8 }]}>Loading...</Text>
        </View>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons 
            name={icon} 
            size={size === 'small' ? 16 : 20} 
            color={variant === 'outline' ? COLORS.primary : COLORS.white}
            style={{ marginRight: 8 }}
          />
          <Text style={getTextStyle()}>{title}</Text>
        </View>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <View style={styles.iconContainer}>
          <Text style={getTextStyle()}>{title}</Text>
          <MaterialCommunityIcons 
            name={icon} 
            size={size === 'small' ? 16 : 20} 
            color={variant === 'outline' ? COLORS.primary : COLORS.white}
            style={{ marginLeft: 8 }}
          />
        </View>
      );
    }

    return <Text style={getTextStyle()}>{title}</Text>;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...otherProps}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  
  fullWidth: {
    width: '100%',
  },
  
  // Size variants
  buttonSmall: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    minHeight: 36,
  },
  buttonMedium: {
    paddingVertical: SIZES.base * 1.5,
    paddingHorizontal: SIZES.padding * 1.5,
    minHeight: 44,
  },
  buttonLarge: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    minHeight: 52,
  },
  
  // Color variants
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonSecondary: {
    backgroundColor: COLORS.secondary,
  },
  buttonIslamic: {
    backgroundColor: COLORS.islamicPrimary,
  },
  buttonDanger: {
    backgroundColor: COLORS.danger,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
    opacity: 0.6,
  },
  
  // Content containers
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  // Text styles
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textSmall: {
    ...FONTS.body3,
  },
  textMedium: {
    ...FONTS.body2,
  },
  textLarge: {
    ...FONTS.h4,
  },
  textDefault: {
    color: COLORS.white,
  },
  textIslamic: {
    color: COLORS.white,
  },
  textOutline: {
    color: COLORS.primary,
  },
});

export default AppButton;

// ====================================
// app/components/AppInput.js - Enhanced Production Version
// ====================================

import { useTheme } from '@react-navigation/native';
import { forwardRef, useState } from 'react';
import { Animated, TextInput } from 'react-native';

const AppInput = forwardRef(({ 
  placeholder,
  value,
  onChangeText,
  onBlur,
  onFocus,
  error,
  helperText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon,
  rightIcon,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  style = {},
  containerStyle = {},
  maxLength,
  returnKeyType = 'done',
  onSubmitEditing,
  ...otherProps
}, ref) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [animatedIsFocused] = useState(new Animated.Value(value ? 1 : 0));

  const handleFocus = (e) => {
    setIsFocused(true);
    Animated.timing(animatedIsFocused, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (!value) {
      Animated.timing(animatedIsFocused, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const labelStyle = {
    position: 'absolute',
    left: icon ? 48 : 16,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 8],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [COLORS.gray, isFocused ? COLORS.primary : COLORS.gray],
    }),
  };

  const inputContainerStyle = [
    styles.inputContainer,
    {
      backgroundColor: colors.card,
      borderColor: error ? COLORS.danger : (isFocused ? COLORS.primary : colors.border),
      borderWidth: isFocused ? 2 : 1,
    },
    containerStyle
  ];

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      paddingTop: value || isFocused ? 20 : 16,
      ...(!multiline && { height: 56 }),
      ...(multiline && { minHeight: 100, textAlignVertical: 'top' }),
    },
    style
  ];

  return (
    <View style={styles.container}>
      <View style={inputContainerStyle}>
        {icon && (
          <MaterialCommunityIcons 
            name={icon} 
            size={20} 
            color={isFocused ? COLORS.primary : COLORS.gray}
            style={styles.leftIcon}
          />
        )}
        
        <View style={styles.inputWrapper}>
          <Animated.Text style={labelStyle}>
            {placeholder}
          </Animated.Text>
          
          <TextInput
            ref={ref}
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={numberOfLines}
            editable={editable}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            placeholderTextColor="transparent"
            {...otherProps}
          />
        </View>
        
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={togglePasswordVisibility}
            style={styles.rightIcon}
          >
            <MaterialCommunityIcons 
              name={isPasswordVisible ? 'eye-off' : 'eye'} 
              size={20} 
              color={COLORS.gray}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <MaterialCommunityIcons 
            name={rightIcon} 
            size={20} 
            color={COLORS.gray}
            style={styles.rightIcon}
          />
        )}
      </View>
      
      {error && (
        <View style={styles.errorContainer}>
          <MaterialCommunityIcons name="alert-circle" size={16} color={COLORS.danger} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      {helperText && !error && (
        <Text style={styles.helperText}>{helperText}</Text>
      )}
      
      {maxLength && (
        <Text style={styles.characterCount}>
          {value?.length || 0}/{maxLength}
        </Text>
      )}
    </View>
  );
});

const inputStyles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: SIZES.radius,
    paddingHorizontal: 16,
    ...SHADOWS.light,
    position: 'relative',
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  input: {
    ...FONTS.body2,
    paddingVertical: 16,
    paddingBottom: 8,
  },
  leftIcon: {
    marginRight: 12,
    marginTop: 18,
  },
  rightIcon: {
    marginLeft: 12,
    marginTop: 18,
    padding: 4,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginLeft: 4,
  },
  errorText: {
    ...FONTS.body3,
    color: COLORS.danger,
    marginLeft: 6,
    flex: 1,
  },
  helperText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: 8,
    marginLeft: 4,
  },
  characterCount: {
    ...FONTS.caption,
    color: COLORS.gray,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});

// Merge styles
Object.assign(styles, inputStyles);

export { AppButton, AppInput };
export default AppInput;

// ====================================
// app/components/AppCard.js - Enhanced Production Version
// ====================================

import { SPACING } from '../constants/theme';

const AppCard = ({ 
  children, 
  style = {}, 
  onPress,
  disabled = false,
  variant = 'default', // 'default', 'islamic', 'elevated', 'outlined'
  padding = SPACING.cardPadding,
  margin = SPACING.sm,
  ...otherProps 
}) => {
  const { colors } = useTheme();

  const getCardStyle = () => {
    let baseStyle = [
      styles.card,
      {
        backgroundColor: colors.card,
        padding,
        margin,
      }
    ];

    // Variant styles
    switch (variant) {
      case 'islamic':
        baseStyle.push({
          backgroundColor: COLORS.islamicBackground,
          borderLeftWidth: 4,
          borderLeftColor: COLORS.islamicPrimary,
          ...SHADOWS.islamic,
        });
        break;
      case 'elevated':
        baseStyle.push({
          ...SHADOWS.heavy,
        });
        break;
      case 'outlined':
        baseStyle.push({
          borderWidth: 1,
          borderColor: colors.border,
          ...SHADOWS.light,
        });
        break;
      default:
        baseStyle.push({
          ...SHADOWS.medium,
        });
    }

    return [...baseStyle, style];
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={getCardStyle()}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.95}
        {...otherProps}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View style={getCardStyle()} {...otherProps}>
      {children}
    </View>
  );
};

const cardStyles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius * 1.2,
    backgroundColor: COLORS.white,
  },
});

// Merge styles
Object.assign(styles, cardStyles);

export { AppCard };
export default AppCard;