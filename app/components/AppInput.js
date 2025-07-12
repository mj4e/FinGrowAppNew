// app/components/AppInput.js
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';

const AppInput = ({ 
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  icon,
  multiline = false,
  numberOfLines = 1,
  editable = true,
  style = {},
  containerStyle = {},
  ...otherProps
}) => {
  const { colors } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    if (onBlur) onBlur();
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const inputContainerStyle = [
    styles.inputContainer,
    {
      backgroundColor: colors.card,
      borderColor: error ? COLORS.danger : (isFocused ? COLORS.primary : colors.border),
    },
    containerStyle
  ];

  const inputStyle = [
    styles.input,
    {
      color: colors.text,
      ...(!multiline && { height: 50 }),
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
        
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
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
          {...otherProps}
        />
        
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
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.padding,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    flex: 1,
    ...FONTS.body4,
    paddingVertical: SIZES.base,
  },
  leftIcon: {
    marginRight: SIZES.base,
  },
  rightIcon: {
    marginLeft: SIZES.base,
    padding: SIZES.base / 2,
  },
  errorText: {
    ...FONTS.body5,
    color: COLORS.danger,
    marginTop: SIZES.base / 2,
    marginLeft: SIZES.base,
  },
});

export default AppInput;