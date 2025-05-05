import { StyleSheet, Dimensions } from 'react-native';
import { colors, shadows } from './theme';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
    padding: width * 0.05, // 5% of screen width
  },
  header: {
    alignItems: 'center',
    marginBottom: height * 0.05, // 5% of screen height
  },
  logo: {
    width: isSmallScreen ? width * 0.3 : width * 0.35, // 30-35% of screen width
    height: isSmallScreen ? width * 0.3 : width * 0.35,
    marginBottom: height * 0.03, // 3% of screen height
  },
  title: {
    fontSize: isSmallScreen ? 24 : isLargeScreen ? 36 : 32,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: isSmallScreen ? 14 : 16,
    color: colors.text.light,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: width * 0.05,
  },
  form: {
    gap: height * 0.02, // 2% of screen height
  },
  inputContainer: {
    gap: 6,
  },
  label: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    color: colors.text.light,
  },
  input: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: isSmallScreen ? 12 : 16,
    fontSize: isSmallScreen ? 14 : 16,
    color: colors.text.light,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.small,
    minHeight: isSmallScreen ? 45 : 50,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: isSmallScreen ? 12 : 16,
    alignItems: 'center',
    marginTop: height * 0.03, // 3% of screen height
    minHeight: isSmallScreen ? 45 : 50,
    justifyContent: 'center',
    ...shadows.small,
  },
  buttonText: {
    color: colors.card,
    fontSize: isSmallScreen ? 14 : 16,
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.03, // 3% of screen height
    gap: 8,
    flexWrap: 'wrap',
  },
  text: {
    fontSize: isSmallScreen ? 12 : 14,
    color: colors.text.light,
  },
  link: {
    fontSize: isSmallScreen ? 12 : 14,
    color: colors.primary,
    fontWeight: '600',
  },
  error: {
    color: colors.error,
    fontSize: isSmallScreen ? 12 : 14,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: width * 0.05,
  },
  success: {
    color: colors.success,
    fontSize: isSmallScreen ? 12 : 14,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: width * 0.05,
  },
}); 