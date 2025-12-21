import { StyleSheet, Platform } from 'react-native';

export const colors = {
  primary: '#4A3780', // Deep purple for a more premium feel
  background: '#F5F5FA', // Lighter, clean background
  white: '#FFFFFF',
  text: '#1B1B1D',
  textSecondary: '#8F90A6',
  borderColor: '#E0E0E0',
  danger: '#FF4D4D',
  success: '#00C851',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 28, // Larger, more prominent
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
