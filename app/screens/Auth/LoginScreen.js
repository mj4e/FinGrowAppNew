import React, { useState } from 'react';
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
import { loginUser } from '../../api/auth'; // Single, correct import

const LoginScreen = () => {
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

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data.email, data.password);

      if (response.success) {
        await login(response.token);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: response.error || 'An unknown error occurred.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
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
            <MaterialCommunityIcons name="finance" size={60} color={COLORS.white} />
          </View>
          <Text style={[styles.logoText, { color: colors.text }]}>FinGrow</Text>
          <Text style={[styles.tagline, { color: COLORS.gray }]}>Take control of your finances</Text>
        </Animated.View>

        <View style={styles.formContainer}>
          <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome back</Text>
          <Text style={[styles.subtitleText, { color: COLORS.gray }]}>Sign in to your account</Text>

          <View style={styles.inputContainer}>
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
              rules={{ required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } }}
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
            <TouchableOpacity onPress={() => Toast.show({ type: 'info', text1: 'Feature Coming Soon!' })} style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <AppButton title={loading ? "Signing in..." : "Sign In"} onPress={handleSubmit(onSubmit)} disabled={loading} />
          </View>

          {__DEV__ && (
            <View style={styles.demoContainer}>
              <Text style={[styles.demoTitle, { color: COLORS.gray }]}>Demo Credentials:</Text>
              <Text style={[styles.demoText, { color: COLORS.gray }]}>Email: admin@fingrow.com</Text>
              <Text style={[styles.demoText, { color: COLORS.gray }]}>Password: password123</Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.signUpContainer}>
          <Text style={[styles.signUpPrompt, { color: COLORS.gray }]}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: SIZES.padding },
  logoContainer: { alignItems: 'center', marginTop: SIZES.padding * 2, marginBottom: SIZES.padding },
  logoBackground: { width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginBottom: SIZES.padding, shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  logoText: { ...FONTS.h1, fontWeight: 'bold', marginBottom: SIZES.base / 2 },
  tagline: { ...FONTS.body4, textAlign: 'center' },
  formContainer: { flex: 1, paddingTop: SIZES.padding },
  welcomeText: { ...FONTS.h2, fontWeight: 'bold', textAlign: 'center', marginBottom: SIZES.base / 2 },
  subtitleText: { ...FONTS.body4, textAlign: 'center', marginBottom: SIZES.padding * 2 },
  inputContainer: { marginBottom: SIZES.padding },
  forgotPasswordContainer: { alignSelf: 'flex-end', marginTop: -SIZES.padding / 2, marginBottom: SIZES.padding },
  forgotPasswordText: { ...FONTS.body4, color: COLORS.primary, fontWeight: '600' },
  buttonContainer: { marginBottom: SIZES.padding },
  demoContainer: { backgroundColor: 'rgba(74, 144, 226, 0.05)', borderRadius: SIZES.radius, padding: SIZES.padding, marginBottom: SIZES.padding, borderLeftWidth: 4, borderLeftColor: COLORS.primary },
  demoTitle: { ...FONTS.body4, fontWeight: 'bold', marginBottom: SIZES.base / 2 },
  demoText: { ...FONTS.body5, marginBottom: 2 },
  bottomContainer: { paddingHorizontal: SIZES.padding, paddingBottom: SIZES.padding },
  signUpContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: SIZES.padding, borderTopWidth: 1, borderTopColor: 'rgba(138, 138, 142, 0.2)' },
  signUpPrompt: { ...FONTS.body4 },
  signUpText: { ...FONTS.body4, color: COLORS.primary, fontWeight: 'bold', marginLeft: 4 },
});

export default LoginScreen;
