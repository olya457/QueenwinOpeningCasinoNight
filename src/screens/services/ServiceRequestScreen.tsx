import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BackgroundScreen, Card, ChoiceGroup, Input, PrimaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {services} from '../../data/services';
import {useAppState} from '../../store/AppContext';

export function ServiceRequestScreen({route, navigation}: any) {
  const service = services.find(item => item.id === route.params.serviceId);
  const [date, setDate] = useState('Sept 28, 2026');
  const [time, setTime] = useState('7:00 PM');
  const [guests, setGuests] = useState('2');
  const [notes, setNotes] = useState('');
  const {submitRequest} = useAppState();
  if (!service) {
    return null;
  }

  return (
    <BackgroundScreen>
      <Card>
        <Text style={styles.title}>{service.title}</Text>
        <Text style={styles.description}>{service.description}</Text>
      </Card>
      <Card>
        <Text style={styles.sectionTitle}>Service Conditions</Text>
        <Text style={styles.condition}>• Valid reservation required</Text>
        <Text style={styles.condition}>• ID and booking confirmation needed</Text>
        <Text style={styles.condition}>• Express check-in available for VIP guests</Text>
      </Card>
      <ChoiceGroup label="Date" value={date} onChange={setDate} options={['Sept 28, 2026', 'Sept 29, 2026', 'Sept 30, 2026']} />
      <ChoiceGroup label="Preferred Time" value={time} onChange={setTime} options={['6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM']} />
      <ChoiceGroup label="Number of Guests" value={guests} onChange={setGuests} options={['1', '2', '3', '4']} />
      <Input label="Notes" value={notes} onChangeText={setNotes} placeholder="Any special requirements..." multiline />
      <PrimaryButton
        label="Send Service Request"
        onPress={() => {
          submitRequest({kind: 'service', title: service.title, subtitle: time});
          navigation.replace('ServiceSuccess');
        }}
      />
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
  description: {
    color: colors.muted,
    marginTop: 8,
    lineHeight: 22,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 10,
  },
  condition: {
    color: colors.muted,
    lineHeight: 22,
  },
});
