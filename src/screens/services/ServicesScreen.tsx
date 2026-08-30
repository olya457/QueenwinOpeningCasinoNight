import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BackgroundScreen, Card, Pill, PrimaryButton, SectionTitle} from '../../components/ui';
import {colors} from '../../constants/theme';
import {parkingSpaces, services} from '../../data/services';
import {useAppState} from '../../store/AppContext';

export function ServicesScreen({navigation}: any) {
  const [tab, setTab] = useState<'services' | 'parking'>('services');
  const {selectedParkingId, setSelectedParkingId} = useAppState();
  const selectedParking = useMemo(() => parkingSpaces.find(item => item.id === selectedParkingId), [selectedParkingId]);
  const availableCount = parkingSpaces.filter(item => item.status === 'available').length;
  const occupiedCount = parkingSpaces.filter(item => item.status === 'occupied').length;

  return (
    <BackgroundScreen>
      <SectionTitle title={tab === 'services' ? 'Guest Services' : 'Parking'} />
      <View style={styles.switcher}>
        <Pill label="Services" active={tab === 'services'} onPress={() => setTab('services')} />
        <Pill label="Parking" active={tab === 'parking'} onPress={() => setTab('parking')} />
      </View>
      {tab === 'services' ? (
        services.map(item => (
          <Card key={item.id}>
            <Text style={styles.serviceIcon}>{item.icon}</Text>
            <Text style={styles.serviceTitle}>{item.title}</Text>
            <Text style={styles.serviceText}>{item.description}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaBadge}><Text style={styles.metaBadgeText}>{item.availability}</Text></View>
              <View style={styles.metaBadgePurple}><Text style={styles.metaBadgePurpleText}>{item.responseTime}</Text></View>
            </View>
            <PrimaryButton label="Request Service" onPress={() => navigation.navigate('ServiceRequest', {serviceId: item.id})} />
          </Card>
        ))
      ) : (
        <>
          <Card>
            <Text style={styles.sectionCaption}>Queenwin Parking Area</Text>
            <View style={styles.statRow}>
              <ParkingStat value="15" label="Total" />
              <ParkingStat value={`${availableCount}`} label="Available" />
              <ParkingStat value={`${occupiedCount}`} label="Occupied" />
            </View>
            <View style={styles.legend}>
              <Text style={styles.legendText}>🟢 Available</Text>
              <Text style={styles.legendText}>🟣 Occupied</Text>
              <Text style={styles.legendText}>✅ Selected</Text>
            </View>
            <View style={styles.parkingGrid}>
              {parkingSpaces.map(space => {
                const selected = space.id === selectedParkingId;
                return (
                  <Pressable
                    key={space.id}
                    onPress={() => space.status !== 'occupied' && setSelectedParkingId(space.id)}
                    style={[
                      styles.space,
                      space.status === 'occupied' && styles.spaceOccupied,
                      selected && styles.spaceSelected,
                    ]}>
                    <Text style={[styles.spaceText, selected && styles.spaceTextSelected]}>{space.id}</Text>
                  </Pressable>
                );
              })}
            </View>
          </Card>
          {selectedParking ? (
            <Card style={styles.selectedCard}>
              <Text style={styles.selectedLabel}>SELECTED SPACE</Text>
              <Text style={styles.selectedTitle}>{selectedParking.id}</Text>
              <View style={styles.selectedMeta}>
                <SelectedMeta label="Zone" value={selectedParking.zone} />
                <SelectedMeta label="Entrance" value={selectedParking.entrance} />
                <SelectedMeta label="Availability" value="Open Tonight" />
                <SelectedMeta label="Recommendation" value={selectedParking.recommendation} />
              </View>
              <PrimaryButton label="Reserve This Space" onPress={() => navigation.navigate('ParkingRequest')} />
            </Card>
          ) : null}
        </>
      )}
    </BackgroundScreen>
  );
}

function ParkingStat({value, label}: {value: string; label: string}) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function SelectedMeta({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.selectedMetaCard}>
      <Text style={styles.selectedMetaLabel}>{label}</Text>
      <Text style={styles.selectedMetaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  switcher: {
    flexDirection: 'row',
    gap: 10,
  },
  serviceIcon: {
    fontSize: 18,
    marginBottom: 8,
  },
  serviceTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  serviceText: {
    color: colors.muted,
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
    flexWrap: 'wrap',
  },
  metaBadge: {
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaBadgeText: {
    color: colors.accent,
    fontSize: 11,
  },
  metaBadgePurple: {
    backgroundColor: 'rgba(126,89,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  metaBadgePurpleText: {
    color: '#B8A7FF',
    fontSize: 11,
  },
  sectionCaption: {
    color: colors.text,
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
  },
  statRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBlock: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    color: colors.muted,
    marginTop: 2,
    fontSize: 12,
  },
  legend: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  legendText: {
    color: colors.muted,
    fontSize: 12,
  },
  parkingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 14,
  },
  space: {
    width: '18%',
    minWidth: 58,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(44,245,155,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(44,245,155,0.18)',
    alignItems: 'center',
  },
  spaceOccupied: {
    backgroundColor: 'rgba(225,72,141,0.12)',
    borderColor: 'rgba(225,72,141,0.2)',
  },
  spaceSelected: {
    backgroundColor: 'rgba(44,245,155,0.22)',
  },
  spaceText: {
    color: colors.accent,
    fontWeight: '700',
  },
  spaceTextSelected: {
    color: '#041218',
  },
  selectedCard: {
    backgroundColor: 'rgba(13,61,48,0.46)',
    borderColor: 'rgba(44,245,155,0.2)',
  },
  selectedLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  selectedTitle: {
    color: colors.accent,
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },
  selectedMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginVertical: 14,
  },
  selectedMetaCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 10,
    gap: 4,
  },
  selectedMetaLabel: {
    color: colors.muted,
    fontSize: 11,
  },
  selectedMetaValue: {
    color: colors.text,
    fontWeight: '700',
  },
});
