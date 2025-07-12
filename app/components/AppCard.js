// app/components/AppCard.js
import { useTheme } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { COLORS, SIZES } from '../constants/theme';

const AppCard = ({ 
  children, 
  style = {}, 
  shadowColor = COLORS.black,
  shadowOpacity = 0.1,
  elevation = 3,
  padding = SIZES.padding,
  margin = SIZES.padding / 2,
  ...otherProps 
}) => {
  const { colors } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      padding,
      margin,
      shadowColor,
      shadowOpacity,
      elevation,
    },
    style
  ];

  return (
    <View style={cardStyle} {...otherProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: SIZES.radius,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    // Android shadow
    elevation: 3,
  },
});

export default AppCard;