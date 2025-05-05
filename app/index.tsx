import { Link, useRouter } from 'expo-router';
import { StyleSheet, View, Text, Image, SafeAreaView, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  withRepeat, 
  withSequence,
  withDelay,
  useSharedValue,
  withTiming,
  FadeInDown
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { colors } from '../styles/theme';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;
const isTablet = width > 768;

export default function WelcomeScreen() {
  const router = useRouter();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  useEffect(() => {
    // Logo animation
    scale.value = withRepeat(
      withSequence(
        withSpring(1.05),
        withSpring(1)
      ),
      -1,
      true
    );

    // Fade in and slide up animation for content
    opacity.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const handleSignIn = () => {
    router.push('/(auth)/sign-in');
  };

  const handleSignUp = () => {
    router.push('/(auth)/sign-up');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.header, contentStyle]}>
          <Animated.Image
            source={require('../assets/images/logo.png')}
            style={[styles.logo, logoStyle]}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Maternity Health</Text>
          <Text style={styles.subtitle}>Your trusted companion for pregnancy and parenting</Text>
        </Animated.View>

        <Animated.View style={[styles.features, contentStyle]}>
          <View style={styles.featureItem}>
            <FontAwesome name="microchip" size={styles.featureIcon.fontSize} color={colors.primary} />
            <Text style={styles.featureText}>AI Maternal Tracking</Text>
          </View>
          <TouchableOpacity style={styles.featureItem} activeOpacity={0.8} onPress={() => { /* TODO: handle SMS/USSD sign up */ }}>
            <FontAwesome name="mobile" size={styles.featureIcon.fontSize} color={colors.secondary} />
            <Text style={styles.featureText}>Sign up for SMS & USSD</Text>
          </TouchableOpacity>
          <View style={[styles.featureItem, { flexDirection: 'column', alignItems: 'flex-start' }]}> 
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="comments" size={styles.featureIcon.fontSize} color={colors.accent} />
              <Text style={styles.featureText}>Language:</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TouchableOpacity style={styles.languageButton}>
                <Text style={styles.languageButtonText}>Luganda</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageButton}>
                <Text style={styles.languageButtonText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.languageButton}>
                <Text style={styles.languageButtonText}>Swahili</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.buttonContainer, contentStyle]}>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={handleSignUp}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>Sign Up</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    flex: 1,
    padding: Platform.select({
      ios: width * 0.05,
      android: width * 0.04,
      default: width * 0.05,
    }),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: Platform.select({
      ios: height * 0.05,
      android: height * 0.03,
      default: height * 0.05,
    }),
  },
  logo: {
    width: Platform.select({
      ios: isSmallScreen ? width * 0.35 : isTablet ? width * 0.25 : width * 0.4,
      android: isSmallScreen ? width * 0.35 : isTablet ? width * 0.25 : width * 0.4,
      default: isSmallScreen ? width * 0.35 : isTablet ? width * 0.25 : width * 0.4,
    }),
    height: Platform.select({
      ios: isSmallScreen ? width * 0.35 : isTablet ? width * 0.25 : width * 0.4,
      android: isSmallScreen ? width * 0.35 : isTablet ? width * 0.25 : width * 0.4,
      default: isSmallScreen ? width * 0.35 : isTablet ? width * 0.25 : width * 0.4,
    }),
    marginBottom: height * 0.02,
  },
  title: {
    fontSize: Platform.select({
      ios: isSmallScreen ? 24 : isTablet ? 40 : 32,
      android: isSmallScreen ? 22 : isTablet ? 38 : 30,
      default: isSmallScreen ? 24 : isTablet ? 40 : 32,
    }),
    fontWeight: 'bold',
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: height * 0.01,
    letterSpacing: 0.5,
    paddingHorizontal: width * 0.05,
  },
  subtitle: {
    fontSize: Platform.select({
      ios: isSmallScreen ? 14 : isTablet ? 18 : 16,
      android: isSmallScreen ? 13 : isTablet ? 17 : 15,
      default: isSmallScreen ? 14 : isTablet ? 18 : 16,
    }),
    color: colors.text.light,
    textAlign: 'center',
    marginBottom: height * 0.03,
    lineHeight: Platform.select({
      ios: isSmallScreen ? 20 : isTablet ? 24 : 22,
      android: isSmallScreen ? 19 : isTablet ? 23 : 21,
      default: isSmallScreen ? 20 : isTablet ? 24 : 22,
    }),
    paddingHorizontal: width * 0.1,
  },
  features: {
    flex: 0.4,
    width: '100%',
    maxWidth: isTablet ? width * 0.7 : width * 0.9,
    marginVertical: height * 0.03,
    justifyContent: 'space-around',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Platform.select({
      ios: isSmallScreen ? 12 : isTablet ? 20 : 15,
      android: isSmallScreen ? 10 : isTablet ? 18 : 14,
      default: isSmallScreen ? 12 : isTablet ? 20 : 15,
    }),
    backgroundColor: colors.card,
    borderRadius: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: height * 0.02,
  },
  featureIcon: {
    fontSize: Platform.select({
      ios: isSmallScreen ? 18 : isTablet ? 26 : 22,
      android: isSmallScreen ? 17 : isTablet ? 25 : 21,
      default: isSmallScreen ? 18 : isTablet ? 26 : 22,
    }),
  },
  featureText: {
    marginLeft: 15,
    fontSize: Platform.select({
      ios: isSmallScreen ? 14 : isTablet ? 18 : 16,
      android: isSmallScreen ? 13 : isTablet ? 17 : 15,
      default: isSmallScreen ? 14 : isTablet ? 18 : 16,
    }),
    color: colors.text.light,
    fontWeight: '500',
  },
  buttonContainer: {
    flex: 0.2,
    width: '100%',
    maxWidth: isTablet ? width * 0.5 : width * 0.9,
    marginBottom: Platform.select({
      ios: height * 0.04,
      android: height * 0.03,
      default: height * 0.04,
    }),
    justifyContent: 'center',
  },
  button: {
    padding: Platform.select({
      ios: isSmallScreen ? 14 : isTablet ? 20 : 16,
      android: isSmallScreen ? 12 : isTablet ? 18 : 15,
      default: isSmallScreen ? 14 : isTablet ? 20 : 16,
    }),
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    transform: [{ scale: 1 }],
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.card,
    fontSize: Platform.select({
      ios: isSmallScreen ? 14 : isTablet ? 18 : 16,
      android: isSmallScreen ? 13 : isTablet ? 17 : 15,
      default: isSmallScreen ? 14 : isTablet ? 18 : 16,
    }),
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  secondaryButtonText: {
    color: colors.primary,
  },
  languageButton: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
    marginBottom: 4,
  },
  languageButtonText: {
    color: colors.accent,
    fontSize: 13,
    fontWeight: '500',
  },
}); 