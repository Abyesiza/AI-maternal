import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { styles } from '../../styles/auth';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../styles/theme';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    if (!isLoaded || !signUp) return;
    setIsLoading(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async () => {
    if (!isLoaded || !signUp) return;
    setIsLoading(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      router.replace('/(app)/home');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
      setError('Invalid verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join us to start your pregnancy journey</Text>
      </View>

      <View style={styles.form}>
        {error && <Text style={styles.error}>{error}</Text>}

        {!pendingVerification ? (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={colors.text.light + '80'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor={colors.text.light + '80'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, isLoading && { opacity: 0.7 }]} 
              onPress={handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? (
                <FontAwesome name="spinner" size={20} color={colors.card} />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#4285F4', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
              onPress={async () => {
                if (!isLoaded || !signUp) return;
                setIsLoading(true);
                setError(null);
                try {
                  await signUp.authenticateWithRedirect({
                    strategy: 'oauth_google',
                    redirectUrl: 'myapp://oauth-callback',
                    redirectUrlComplete: 'myapp://(app)/home',
                  });
                } catch (err) {
                  setError('Google sign up failed.');
                } finally {
                  setIsLoading(false);
                }
              }}
              disabled={isLoading}
            >
              <FontAwesome name="google" size={20} color="#4285F4" style={{ marginRight: 8 }} />
              <Text style={[styles.buttonText, { color: '#4285F4' }]}>Continue with Google</Text>
            </TouchableOpacity>

            <View style={styles.linkContainer}>
              <Text style={styles.text}>Already have an account?</Text>
              <TouchableOpacity onPress={() => router.push('./sign-in')}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.subtitle}>We've sent a verification code to your email</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Verification Code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the code"
                placeholderTextColor={colors.text.light + '80'}
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
              />
            </View>

            <TouchableOpacity 
              style={[styles.button, isLoading && { opacity: 0.7 }]} 
              onPress={handleVerification}
              disabled={isLoading}
            >
              {isLoading ? (
                <FontAwesome name="spinner" size={20} color={colors.card} />
              ) : (
                <Text style={styles.buttonText}>Verify Email</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
} 