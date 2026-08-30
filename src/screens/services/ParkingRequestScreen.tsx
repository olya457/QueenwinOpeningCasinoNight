import React, {useMemo, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {BackgroundScreen, Card, ChoiceGroup, Input, PrimaryButton} from '../../components/ui';
import {colors} from '../../constants/theme';
import {parkingSpaces} from '../../data/services';
import {useAppState} from '../../store/AppContext';

export function ParkingRequestScreen({navigation}: any) {
  const {selectedParkingId, submitRequest} = useAppState();
  const [vehicle, setVehicle] = useState('Mercedes E-Class');
  const [arrival, setArrival] = useState('6:30 PM');
  const [note, setNote] = useState('');
  const selected = useMemo(() => parkingSpaces.find(item => item.id === selectedParkingId), [selectedParkingId]);

  return (
    <BackgroundScreen>
      <Card style={styles.notice}>
        <Text style={styles.noticeText}>Reservation is subject to venue confirmation. You will be notified once your space is confirmed.</Text>
      </Card>
      <Card style={styles.selectedCard}>
        <Text style={styles.label}>SELECTED SPACE</Text>
        <Text style={styles.title}>{selected?.id || 'A01'}</Text>
        <Text style={styles.value}>{selected?.zone || 'Zone A'}</Text>
      </Card>
      <Input label="Vehicle Make / Model" value={vehicle} onChangeText={setVehicle} />
      <ChoiceGroup label="Expected Arrival Time" value={arrival} onChange={setArrival} options={['6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM']} />
      <Input label="Optional Note" value={note} onChangeText={setNote} placeholder="Any special parking needs..." multiline />
      <PrimaryButton
        label="Send Parking Request"
        onPress={() => {
          submitRequest({kind: 'parking', title: selected?.id || 'A01'});
          navigation.replace('ParkingSuccess');
        }}
      />
    </BackgroundScreen>
  );
}

const styles = StyleSheet.create({
  notice: {
    backgroundColor: 'rgba(74,60,23,0.35)',
    borderColor: 'rgba(240,195,89,0.22)',
  },
  noticeText: {
    color: '#F0C359',
    lineHeight: 22,
  },
  selectedCard: {
    backgroundColor: 'rgba(13,61,48,0.46)',
    borderColor: 'rgba(44,245,155,0.2)',
  },
  label: {
    color: colors.muted,
    fontSize: 11,
  },
  title: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  value: {
    color: colors.text,
    fontWeight: '600',
    marginTop: 4,
  },
});
