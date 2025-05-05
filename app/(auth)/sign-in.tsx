import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles/auth'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '../../styles/theme'

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return
    setError(null)
    setIsLoading(true)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(app)/home')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
        setError('Sign in process is not complete. Please try again.')
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
      setError('Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your pregnancy journey</Text>
      </View>

      <View style={styles.form}>
        {error && <Text style={styles.error}>{error}</Text>}
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter your email"
            placeholderTextColor={colors.text.light + '80'}
            onChangeText={setEmailAddress}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            placeholder="Enter your password"
            placeholderTextColor={colors.text.light + '80'}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, isLoading && { opacity: 0.7 }]} 
          onPress={onSignInPress}
          disabled={isLoading}
        >
          {isLoading ? (
            <FontAwesome name="spinner" size={20} color={colors.card} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#4285F4', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
          onPress={async () => {
            if (!isLoaded) return;
            setIsLoading(true);
            setError(null);
            try {
              await signIn.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: 'myapp://oauth-callback',
                redirectUrlComplete: 'myapp://(app)/home',
              });
            } catch (err) {
              setError('Google sign in failed.');
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
          <Text style={styles.text}>Don't have an account?</Text>
          <Link href="./sign-up" asChild>
            <TouchableOpacity>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  )
} 