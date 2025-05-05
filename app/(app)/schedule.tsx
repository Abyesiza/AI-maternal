import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, shadows } from '../../styles/theme';

type AppointmentType = 'primary' | 'secondary';

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const appointments: { id: number; title: string; doctor: string; date: string; time: string; type: AppointmentType }[] = [
    {
      id: 1,
      title: 'Prenatal Checkup',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-04-30',
      time: '10:00 AM',
      type: 'primary',
    },
    {
      id: 2,
      title: 'Ultrasound Scan',
      doctor: 'Dr. Michael Chen',
      date: '2024-05-05',
      time: '2:30 PM',
      type: 'secondary',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity style={styles.addButton}>
          <FontAwesome name="plus" size={20} color={colors.card} />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarContainer}>
        <Text style={styles.monthText}>April 2024</Text>
        <View style={styles.daysContainer}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Text key={day} style={styles.dayText}>{day}</Text>
          ))}
        </View>
        <View style={styles.datesContainer}>
          {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dateButton,
                date === selectedDate.getDate() && styles.selectedDate,
              ]}
              onPress={() => setSelectedDate(new Date(2024, 3, date))}
            >
              <Text style={[
                styles.dateText,
                date === selectedDate.getDate() && styles.selectedDateText,
              ]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.appointmentsContainer}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        {appointments.map((appointment) => (
          <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
            <View style={[styles.appointmentIcon, { backgroundColor: colors[appointment.type] + '20' }]}>
              <FontAwesome name="calendar" size={24} color={colors[appointment.type]} />
            </View>
            <View style={styles.appointmentContent}>
              <Text style={styles.appointmentTitle}>{appointment.title}</Text>
              <Text style={styles.appointmentDoctor}>{appointment.doctor}</Text>
              <View style={styles.appointmentTime}>
                <FontAwesome name="clock-o" size={14} color={colors.text.light} />
                <Text style={styles.appointmentTimeText}>{appointment.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.light,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.small,
  },
  calendarContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    margin: 16,
    ...shadows.small,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  dayText: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
    width: 40,
    textAlign: 'center',
  },
  datesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dateButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  selectedDate: {
    backgroundColor: colors.primary,
  },
  dateText: {
    fontSize: 16,
    color: colors.text.light,
  },
  selectedDateText: {
    color: colors.card,
  },
  appointmentsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 16,
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    ...shadows.small,
  },
  appointmentIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  appointmentContent: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text.light,
    marginBottom: 4,
  },
  appointmentDoctor: {
    fontSize: 14,
    color: colors.text.light,
    opacity: 0.7,
    marginBottom: 8,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTimeText: {
    fontSize: 14,
    color: colors.text.light,
    marginLeft: 8,
  },
}); 