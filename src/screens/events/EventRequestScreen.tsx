import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BackgroundScreen, Card, ChoiceGroup, Input, PrimaryButton} from '../../components/ui';
import {images} from '../../assets';
import {colors} from '../../constants/theme';
import {events} from '../../data/events';
import {useAppState} from '../../store/AppContext';

export function EventRequestScreen({route, navigation}: any) {
  const event = events.find(item => item.id === route.params.eventId);
  const [guests, setGuests] = useState('2');
  const [time, setTime] = useState('8:00 PM');
  const [note, setNote] = useState('');
  const {submitRequest} = useAppState();
  if (!event) {
    return null;
  }

  return (
    <BackgroundScreen image={images.loaderBackground}>
      <Card>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventMeta}>{event.time} · {event.venue}</Text>
      </Card>
      <ChoiceGroup label="Number of Guests" value={guests} onChange={setGuests} options={['1', '2', '3', '4']} />
      <ChoiceGroup label="Preferred Time" value={time} onChange={setTime} options={['7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM']} />
      <Input label="Optional Note" value={note} onChangeText={setNote} placeholder="Any special requirements or notes..." multiline />
      <PrimaryButton
        label="Send Request"
        onPress={() => {
          submitRequest({kind: 'event', title: event.title, subtitle: event.time});
          navigation.replace('EventRequestSuccess');
        }}
      />
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  eventTitle: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 18,
  },
  eventMeta: {
    color: colors.muted,
    marginTop: 6,
  },
});
