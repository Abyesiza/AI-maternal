import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import Constants from 'expo-constants';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(auth)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Initialize Convex client with proper URL validation
const convexUrl = process.env.EXPO_PUBLIC_CONVEX_URL;
if (!convexUrl || !convexUrl.startsWith('http')) {
  throw new Error('Invalid Convex URL. Please check your environment variables.');
}
const convex = new ConvexReactClient(convexUrl);

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments() as string[];
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inAppGroup = segments[0] === '(app)';
    const isOnWelcomeScreen = segments.length === 0;

    // Only redirect if user is signed in and trying to access auth or welcome screen
    if (isSignedIn && (inAuthGroup || isOnWelcomeScreen)) {
      router.replace('/(app)/home');
    }
    // If user is not signed in and trying to access app routes, redirect to sign in
   // else if (!isSignedIn && inAppGroup) {
   //   router.replace('/(auth)/sign-in');
   // }
  }, [isSignedIn, segments, isLoaded]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
  if (!clerkPublishableKey) {
    throw new Error('Missing Clerk publishable key. Please check your environment variables.');
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <ConvexProvider client={convex}>
        <RootLayoutNav />
      </ConvexProvider>
    </ClerkProvider>
  );
}
