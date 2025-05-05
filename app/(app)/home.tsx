import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../../styles/theme';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withRepeat, 
  withTiming,
  withSpring,
  withDelay,
  Easing,
  interpolate,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 375;
const isLargeScreen = width > 414;
const isTablet = width > 768;

export default function HomeScreen() {
  const floatAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(1);
  const welcomeOpacity = useSharedValue(1);

  // Start animations
  React.useEffect(() => {
    floatAnim.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    scaleAnim.value = withRepeat(
      withSpring(1.05, { damping: 2, stiffness: 100 }),
      -1,
      true
    );

    // Hide welcome message after 3 seconds
    welcomeOpacity.value = withDelay(
      3000,
      withTiming(0, { duration: 500 })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(floatAnim.value, [0, 1], [0, -10]) },
      { scale: scaleAnim.value }
    ],
  }));

  const welcomeStyle = useAnimatedStyle(() => ({
    opacity: welcomeOpacity.value,
  }));

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Animated.View
            style={[styles.logoWrapper, animatedStyle, { alignSelf: 'center' }]}
            entering={FadeIn.duration(1000)}
          >
            <Image
              source={require('../../assets/images/logo.png')}
              style={{ width: 80, height: 80, resizeMode: 'contain' }}
            />
            <Text style={styles.appName} numberOfLines={1} ellipsizeMode='tail'>AIMATERNITY</Text>
          </Animated.View>
          <TouchableOpacity
            style={{ position: 'absolute', right: 0, top: -8 }}
            onPress={() => router.push('/settings')}
          >
            <View style={styles.profileIcon}>
              <FontAwesome name="user-circle" size={20} color={colors.secondary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>


      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.primary + '20' }]}>
            <FontAwesome name="calendar" size={24} color={colors.primary} />
          </View>
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Weeks</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.secondary + '20' }]}>
            <FontAwesome name="heart" size={24} color={colors.secondary} />
          </View>
          <Text style={styles.statValue}>98</Text>
          <Text style={styles.statLabel}>BPM</Text>
        </View>
        <View style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: colors.accent + '20' }]}>
            <FontAwesome name="balance-scale" size={24} color={colors.accent} />
          </View>
          <Text style={styles.statValue}>+2.5</Text>
          <Text style={styles.statLabel}>kg</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.taskList}>
          <TouchableOpacity style={styles.taskItem}>
            <View style={[styles.taskIcon, { backgroundColor: colors.primary + '20' }]}>
              <FontAwesome name="check-circle" size={20} color={colors.primary} />
            </View>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>Prenatal Vitamins</Text>
              <Text style={styles.taskTime}>8:00 AM</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.taskItem}>
            <View style={[styles.taskIcon, { backgroundColor: colors.secondary + '20' }]}>
              <FontAwesome name="check-circle" size={20} color={colors.secondary} />
            </View>
            <View style={styles.taskContent}>
              <Text style={styles.taskTitle}>Doctor's Appointment</Text>
              <Text style={styles.taskTime}>2:30 PM</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 12, marginBottom: 4 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.primary, marginRight: 8 }}>Recommended Foods:</Text>
          <View style={styles.foodChip}><FontAwesome name="leaf" size={14} color={colors.accent} /><Text style={styles.foodChipText}>Spinach</Text></View>
          <View style={styles.foodChip}><FontAwesome name="cutlery" size={14} color={colors.primary} /><Text style={styles.foodChipText}>Eggs</Text></View>
          <View style={styles.foodChip}><FontAwesome name="lemon-o" size={14} color={colors.secondary} /><Text style={styles.foodChipText}>Yogurt</Text></View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/(app)/chat')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.accent + '20' }]}> 
              <FontAwesome name="comments" size={24} color={colors.accent} />
            </View>
            <Text style={styles.actionText}>AI Agent</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/community')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.info + '20' }]}> 
              <FontAwesome name="users" size={24} color={colors.info} />
            </View>
            <Text style={styles.actionText}>Community</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/bpm')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.error + '20' }]}> 
              <FontAwesome name="heartbeat" size={24} color={colors.error} />
            </View>
            <Text style={styles.actionText}>BPM</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/health-check')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}> 
              <FontAwesome name="stethoscope" size={24} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Health Check</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/resources')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.secondary + '20' }]}>
              <FontAwesome name="book" size={24} color={colors.secondary} />
            </View>
            <Text style={styles.actionText}>Resources</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/schedule')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.primary + '20' }]}>
              <FontAwesome name="calendar" size={24} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    padding: isTablet ? 32 : isLargeScreen ? 24 : isSmallScreen ? 10 : 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
    paddingTop: 0,
  },
  logoWrapper: {
    width: isTablet ? 140 : isLargeScreen ? 120 : isSmallScreen ? 70 : 100,
    height: isTablet ? 140 : isLargeScreen ? 120 : isSmallScreen ? 70 : 100,
    borderRadius: isTablet ? 70 : isLargeScreen ? 60 : isSmallScreen ? 35 : 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  profileButton: {
    padding: 8,
  },
  profileIcon: {
    width: isTablet ? 40 : isLargeScreen ? 32 : isSmallScreen ? 20 : 28,
    height: isTablet ? 40 : isLargeScreen ? 32 : isSmallScreen ? 20 : 28,
    borderRadius: isTablet ? 20 : isLargeScreen ? 16 : isSmallScreen ? 10 : 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeContainer: {
    marginBottom: 0,
    padding: 0,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.light,
    opacity: 0.7,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: isTablet ? 48 : isLargeScreen ? 40 : isSmallScreen ? 16 : 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isTablet ? 28 : isLargeScreen ? 20 : isSmallScreen ? 8 : 12,
    marginHorizontal: isTablet ? 16 : isLargeScreen ? 12 : isSmallScreen ? 4 : 8,
    alignItems: 'center',
  },
  statIcon: {
    width: isTablet ? 64 : isLargeScreen ? 56 : isSmallScreen ? 32 : 40,
    height: isTablet ? 64 : isLargeScreen ? 56 : isSmallScreen ? 32 : 40,
    borderRadius: isTablet ? 32 : isLargeScreen ? 28 : isSmallScreen ? 16 : 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: isTablet ? 36 : isLargeScreen ? 28 : isSmallScreen ? 16 : 20,
    fontWeight: 'bold',
    color: colors.text.light,
    marginVertical: 8,
  },
  statLabel: {
    fontSize: isTablet ? 20 : isLargeScreen ? 16 : isSmallScreen ? 10 : 12,
    color: colors.text.light,
    opacity: 0.7,
  },
  section: {
    marginBottom: isTablet ? 48 : isLargeScreen ? 40 : isSmallScreen ? 16 : 24,
  },
  sectionTitle: {
    fontSize: isTablet ? 28 : isLargeScreen ? 22 : isSmallScreen ? 14 : 18,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 16,
  },
  taskList: {
    backgroundColor: colors.card,
    borderRadius: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: isTablet ? 24 : isLargeScreen ? 18 : isSmallScreen ? 8 : 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  taskIcon: {
    width: isTablet ? 56 : isLargeScreen ? 44 : isSmallScreen ? 20 : 28,
    height: isTablet ? 56 : isLargeScreen ? 44 : isSmallScreen ? 20 : 28,
    borderRadius: isTablet ? 28 : isLargeScreen ? 22 : isSmallScreen ? 10 : 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: isTablet ? 22 : isLargeScreen ? 18 : isSmallScreen ? 11 : 14,
    color: colors.text.light,
    marginBottom: 4,
  },
  taskTime: {
    fontSize: isTablet ? 18 : isLargeScreen ? 14 : isSmallScreen ? 9 : 12,
    color: colors.text.light,
    opacity: 0.7,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: isTablet ? '30%' : '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: isTablet ? 24 : isLargeScreen ? 18 : isSmallScreen ? 8 : 12,
    marginBottom: isTablet ? 24 : isLargeScreen ? 18 : isSmallScreen ? 8 : 12,
    alignItems: 'center',
  },
  actionIcon: {
    width: isTablet ? 72 : isLargeScreen ? 60 : isSmallScreen ? 28 : 36,
    height: isTablet ? 72 : isLargeScreen ? 60 : isSmallScreen ? 28 : 36,
    borderRadius: isTablet ? 36 : isLargeScreen ? 30 : isSmallScreen ? 14 : 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: isTablet ? 20 : isLargeScreen ? 16 : isSmallScreen ? 10 : 13,
    color: colors.text.light,
    fontWeight: '500',
  },
  appName: {
    marginTop: 4,
    marginBottom: 10,
    fontSize: isTablet ? 28 : isLargeScreen ? 20 : isSmallScreen ? 12 : 15,
    fontWeight: 'bold',
    color: '#ff9800', // a nice shade of orange
    textAlign: 'center',
    letterSpacing: 1.2,
    overflow: 'hidden',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: height * 0.8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 15,
    color: colors.text.light,
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
  },
  closeButtonText: {
    color: colors.card,
    fontWeight: 'bold',
    fontSize: 15,
  },
  foodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 6,
    marginBottom: 2,
  },
  foodChipText: {
    fontSize: 13,
    color: colors.text.light,
    marginLeft: 4,
    fontWeight: '500',
  },
}); 