import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator,
  ScrollView,
  Animated
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { useAuth } from '../../../App';
import { registerUser } from '../../api/auth'; // Single, correct import

const RegisterScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const logoScale = new Animated.Value(0.8);
  
  React.useEffect(() => {
    Animated.spring(logoScale, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
  });
  
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { fullName, email, password } = data;
      const response = await registerUser({ fullName, email, password });

      if (response.success) {
        Toast.show({
          type: 'success',
          text1: 'Registration Successful',
          text2: 'Welcome to FinGrow!',
        });
        await login(response.token);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2: response.error || 'An unknown error occurred.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Error',
        text2: 'Could not connect to the server.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar 
        barStyle={colors.background === COLORS.black ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }] }]}>
          <View style={styles.logoBackground}>
            <MaterialCommunityIcons name="finance" size={50} color={COLORS.white} />
          </View>
          <Text style={[styles.logoText, { color: colors.text }]}>FinGrow</Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Create Account</Text>
          <Text style={[styles.subtitleText, { color: COLORS.gray }]}>Join FinGrow and take control of your finances</Text>

          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{ required: 'Full name is required' }}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  placeholder="Full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.fullName?.message}
                  icon="user"
                />
              )}
              name="fullName"
            />
            <Controller
              control={control}
              rules={{ required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email address' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  placeholder="Email address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  icon="mail"
                />
              )}
              name="email"
            />
            <Controller
              control={control}
              rules={{ required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  placeholder="Password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  secureTextEntry
                  icon="lock"
                />
              )}
              name="password"
            />
            <Controller
              control={control}
              rules={{ required: 'Please confirm your password', validate: value => value === password.current || "The passwords do not match" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <AppInput
                  placeholder="Confirm password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  secureTextEntry
                  icon="lock"
                />
              )}
              name="confirmPassword"
            />
          </View>

          <View style={styles.buttonContainer}>
            <AppButton title={loading ? "Creating Account..." : "Create Account"} onPress={handleSubmit(onSubmit)} disabled={loading} />
          </View>
          
          <Text style={[styles.termsText, { color: COLORS.gray }]}>
            By creating an account, you agree to our{' '}
            <Text style={styles.linkText}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.signInContainer}>
          <Text style={[styles.signInPrompt, { color: COLORS.gray }]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: SIZES.padding },
  logoContainer: { alignItems: 'center', marginTop: SIZES.padding * 2, marginBottom: SIZES.padding * 1.5, },
  logoBackground: { width: 80, height: 80, borderRadius: 40, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: SIZES.padding, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8, },
  logoText: { ...FONTS.h2, fontWeight: 'bold', },
  formContainer: { flex: 1, paddingTop: SIZES.padding, },
  welcomeText: { ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', marginBottom: SIZES.base / 2, },
  subtitleText: { ...FONTS.body4, textAlign: 'center', marginBottom: SIZES.padding * 2, },
  inputContainer: { marginBottom: SIZES.padding, },
  buttonContainer: { marginBottom: SIZES.padding, },
  termsText: { ...FONTS.body5, textAlign: 'center', lineHeight: 20, marginBottom: SIZES.padding, },
  linkText: { color: COLORS.primary, fontWeight: '600', },
  bottomContainer: { paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding },
  signInContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: SIZES.padding, borderTopWidth: 1, borderTopColor: 'rgba(138, 138, 142, 0.2)', },
  signInPrompt: { ...FONTS.body4, },
  signInText: { ...FONTS.body4, color: COLORS.primary, fontWeight: 'bold', marginLeft: 4, },
});

export default RegisterScreen;
