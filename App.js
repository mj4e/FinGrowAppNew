// App.js - Final Production Version
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, StatusBar, useColorScheme, View } from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

// --- Screen Imports (Using YOUR better versions) ---
// Auth Screens
import LoginScreen from './app/screens/Auth/LoginScreen';
import RegisterScreen from './app/screens/Auth/RegisterScreen';

// Home Screens
import DashboardScreen from './app/screens/Home/DashboardScreen';
import RewardsScreen from './app/screens/RewardsScreen';

// Wallet Screens
import CardsScreen from './app/screens/Wallet/CardsScreen';
import WalletScreen from './app/screens/Wallet/WalletScreen';

// Grow Screens
import GrowScreen from './app/screens/Grow/GrowScreen';
import MetalsScreen from './app/screens/Grow/MetalsScreen';

// More Screens
import ProfileScreen from './app/screens/More/ProfileScreen';

// Islamic Finance (Your complete implementation)
import IslamicStackNavigator from './app/navigation/IslamicStackNavigator';

// Constants
import { COLORS } from './app/constants/theme';

// --- Enhanced Context with User Management ---
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// --- Navigators ---
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// --- Enhanced Loading Component ---
const LoadingScreen = () => (
  <View style={{ 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: COLORS.islamicBackground 
  }}>
    <ActivityIndicator size="large" color={COLORS.islamicPrimary} />
    <View style={{ marginTop: 16, alignItems: 'center' }}>
      <MaterialCommunityIcons name="star-crescent" size={40} color={COLORS.islamicPrimary} />
    </View>
  </View>
);

// --- Enhanced Navigation Stacks ---
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DashboardMain" component={DashboardScreen} />
    <Stack.Screen name="Rewards" component={RewardsScreen} />
  </Stack.Navigator>
);

const WalletStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="WalletMain" component={WalletScreen} />
    <Stack.Screen name="Cards" component={CardsScreen} />
  </Stack.Navigator>
);

const GrowStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GrowMain" component={GrowScreen} />
    <Stack.Screen name="Metals" component={MetalsScreen} />
  </Stack.Navigator>
);

const MoreStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    {/* Add more screens here as needed */}
  </Stack.Navigator>
);

// --- Enhanced Main App Tabs with Better Icons ---
const MainAppTabs = ({ theme }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.islamicPrimary,
      tabBarInactiveTintColor: COLORS.gray,
      tabBarStyle: {
        backgroundColor: theme.colors.card,
        borderTopColor: theme.colors.border,
        height: 65,
        paddingBottom: 8,
        paddingTop: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
      },
      tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
      },
      tabBarIcon: ({ color, size, focused }) => {
        const iconSize = focused ? size + 2 : size;
        const iconColor = focused ? COLORS.islamicPrimary : color;
        
        switch (route.name) {
          case 'HomeTab':
            return <MaterialCommunityIcons name="view-dashboard-variant" size={iconSize} color={iconColor} />;
          case 'WalletTab':
            return <MaterialCommunityIcons name="wallet" size={iconSize} color={iconColor} />;
          case 'GrowTab':
            return <MaterialCommunityIcons name="trending-up" size={iconSize} color={iconColor} />;
          case 'IslamicTab':
            return <MaterialCommunityIcons name="star-crescent" size={iconSize} color={iconColor} />;
          case 'MoreTab':
            return <MaterialCommunityIcons name="menu" size={iconSize} color={iconColor} />;
          default:
            return null;
        }
      },
    })}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStack} 
      options={{ tabBarLabel: "Home" }} 
    />
    <Tab.Screen 
      name="WalletTab" 
      component={WalletStack} 
      options={{ tabBarLabel: "Wallet" }} 
    />
    <Tab.Screen 
      name="GrowTab" 
      component={GrowStack} 
      options={{ tabBarLabel: "Grow" }} 
    />
    <Tab.Screen 
      name="IslamicTab" 
      component={IslamicStackNavigator} 
      options={{ tabBarLabel: "Islamic" }} 
    />
    <Tab.Screen 
      name="MoreTab" 
      component={MoreStack} 
      options={{ tabBarLabel: "More" }} 
    />
  </Tab.Navigator>
);

// --- Enhanced Auth Stack ---
const AuthNavigator = () => (
  <Stack.Navigator 
    screenOptions={{ 
      headerShown: false,
      cardStyleInterpolator: ({ current, layouts }) => ({
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      }),
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

// --- Enhanced Main App Component ---
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const colorScheme = useColorScheme();

  // Enhanced theme with Islamic colors
  const MyTheme = useMemo(() => {
    const isDark = colorScheme === 'dark';
    return {
      ...(isDark ? DarkTheme : DefaultTheme),
      colors: {
        ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
        primary: COLORS.islamicPrimary,
        background: isDark ? COLORS.black : COLORS.islamicBackground,
        card: isDark ? COLORS.darkGray : COLORS.white,
        text: isDark ? COLORS.white : COLORS.black,
        border: isDark ? COLORS.darkGray : 'rgba(46, 139, 87, 0.1)',
        notification: COLORS.islamicSecondary,
      },
    };
  }, [colorScheme]);

  // Enhanced authentication persistence
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        const userData = await AsyncStorage.getItem('userData');
        
        if (userToken && userData) {
          setUser(JSON.parse(userData));
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error("Failed to restore authentication state", e);
        // Clear corrupted data
        await AsyncStorage.multiRemove(['userToken', 'userData']);
      } finally {
        setIsLoading(false);
      }
    };
    
    bootstrapAsync();
  }, []);

  // Enhanced auth context with user management
  const authContextValue = useMemo(
    () => ({
      user,
      isLoggedIn,
      login: async (token, userData = null) => {
        try {
          await AsyncStorage.setItem('userToken', token);
          if (userData) {
            await AsyncStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);
          }
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Login storage error:', error);
          throw error;
        }
      },
      logout: async () => {
        try {
          await AsyncStorage.multiRemove(['userToken', 'userData']);
          setUser(null);
          setIsLoggedIn(false);
        } catch (error) {
          console.error('Logout error:', error);
        }
      },
      updateUser: async (newUserData) => {
        try {
          const updatedUser = { ...user, ...newUserData };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
          setUser(updatedUser);
        } catch (error) {
          console.error('Update user error:', error);
        }
      },
    }),
    [user, isLoggedIn]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <NavigationContainer theme={MyTheme}>
        <StatusBar 
          barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          backgroundColor={MyTheme.colors.background}
        />
        {isLoggedIn ? (
          <MainAppTabs theme={MyTheme} />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
      <Toast />
    </AuthContext.Provider>
  );
}

export default App;