// app/navigation/IslamicStackNavigator.js - Final Production Version
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';

// Import YOUR enhanced Islamic Finance screens
import InvestmentPoolScreen from '../screens/InvestmentPool';
import BusinessSukukScreen from '../screens/Islamic/BusinessSukukScreen';
import GoldSilverHubScreen from '../screens/Islamic/GoldSilverHubScreen';
import InvestMyZakatScreen from '../screens/Islamic/InvestMyZakatScreen';
import MicroMudarabahScreen from '../screens/Islamic/MicroMudarabahScreen';
import IslamicFinanceHomeScreen from '../screens/IslamicFinanceHomeScreen';

// Import enhanced components for potential overlays

const Stack = createNativeStackNavigator();

const IslamicStackNavigator = () => {
  const screenOptions = {
    headerShown: false,
    presentation: 'card',
    gestureEnabled: true,
    animation: 'slide_from_right',
    
    // Enhanced card style interpolator for smooth transitions
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
            {
              scale: next
                ? next.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.9],
                  })
                : 1,
            },
          ],
        },
        overlayStyle: {
          opacity: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
          }),
        },
      };
    },
    
    // iOS specific enhancements
    ...(Platform.OS === 'ios' && {
      gestureResponseDistance: {
        horizontal: 25,
      },
    }),
  };

  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName="IslamicFinanceHome"
    >
      {/* Main Islamic Finance Hub - YOUR enhanced version */}
      <Stack.Screen 
        name="IslamicFinanceHome" 
        component={IslamicFinanceHomeScreen}
        options={{
          title: 'Islamic Finance',
        }}
      />
      
      {/* Investment Pool - Mudarabah-based investing */}
      <Stack.Screen 
        name="InvestmentPool" 
        component={InvestmentPoolScreen}
        options={{
          title: 'Investment Pool',
          gestureEnabled: true,
        }}
      />
      
      {/* Gold & Silver Hub - Physical metals investment */}
      <Stack.Screen 
        name="GoldSilverHub" 
        component={GoldSilverHubScreen}
        options={{
          title: 'Gold & Silver Hub',
          gestureEnabled: true,
        }}
      />
      
      {/* Micro-Mudarabah - Automated small investments */}
      <Stack.Screen 
        name="MicroMudarabah" 
        component={MicroMudarabahScreen}
        options={{
          title: 'Micro-Mudarabah',
          gestureEnabled: true,
        }}
      />
      
      {/* Business Sukuk - Shariah-compliant bonds */}
      <Stack.Screen 
        name="BusinessSukuk" 
        component={BusinessSukukScreen}
        options={{
          title: 'Business Sukuk',
          gestureEnabled: true,
        }}
      />
      
      {/* Zakat Investment - Social impact investing */}
      <Stack.Screen 
        name="InvestMyZakat" 
        component={InvestMyZakatScreen}
        options={{
          title: 'Invest My Zakat',
          gestureEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default IslamicStackNavigator;