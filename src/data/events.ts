import {images} from '../assets';
import {EventItem} from '../types';

export const events: EventItem[] = [
  {
    id: 'grand-opening-ceremony',
    title: 'Grand Opening Ceremony',
    category: 'Grand Opening',
    status: 'VIP Only',
    date: 'September 28, 2026',
    time: '7:00 PM - 8:00 PM',
    venue: 'Grand Ballroom',
    shortDescription:
      'The official opening ceremony featuring the venue reveal, ribbon cutting, welcome address, and the first presentation of the Queenwin complex.',
    about:
      'The central moment of opening night brings invited guests together for the formal launch of the new venue. The program includes a short welcome from the management team, a ceremonial ribbon cutting, an architectural lighting sequence, and a presentation introducing the hotel, restaurant, entertainment areas, and guest services.',
    notes: [
      'Valid Opening Event Pass required for entry.',
      'Doors open 15 minutes before the listed start time.',
      'Smart elegant dress code recommended.',
      'Reserved seating is available for invited VIP guests.',
    ],
    accent: '#F0C359',
    image: images.events.grandOpeningCeremony,
  },
  {
    id: 'welcome-cocktail-reception',
    title: 'Welcome Cocktail Reception',
    category: 'Welcome Ceremony',
    status: 'Open',
    date: 'September 28, 2026',
    time: '6:00 PM - 7:30 PM',
    venue: 'Lobby Lounge',
    shortDescription:
      'Begin the evening with signature cocktails, alcohol-free creations, canapes, and a relaxed introduction to the new venue.',
    about:
      'The opening reception welcomes guests before the main ceremony. The Lobby Lounge will serve a limited selection of house cocktails, sparkling wine, non-alcoholic drinks, and small bites prepared by the restaurant team.',
    notes: [
      'Open to guests with a valid event pass.',
      'No separate reservation is required.',
      'Guests attending the main ceremony should proceed to the Grand Ballroom by 6:45 PM.',
    ],
    accent: '#7E59FF',
    image: images.events.welcomeCocktailReception,
  },
  {
    id: 'live-jazz-ensemble',
    title: 'Live Jazz Ensemble',
    category: 'Live Performance',
    status: 'Limited',
    date: 'September 28, 2026',
    time: '8:30 PM - 10:00 PM',
    venue: 'The Stage',
    shortDescription:
      'A four-piece jazz ensemble performs an opening-night set blending modern arrangements, soul influences, and classic standards.',
    about:
      'Following the official ceremony, the evening moves to The Stage for a live performance created specifically for the venue’s first night.',
    notes: [
      'Seating is limited and available on a first-arrival basis.',
      'Saved events do not guarantee a seat.',
      'Doors open at 8:15 PM.',
    ],
    accent: '#2CF59B',
    image: images.events.liveJazzEnsemble,
  },
  {
    id: 'first-night-terrace-session',
    title: 'First Night Terrace Session',
    category: 'Lounge',
    status: 'Open',
    date: 'September 28, 2026',
    time: '9:00 PM - 11:30 PM',
    venue: 'Skyline Terrace',
    shortDescription:
      'An informal late-evening terrace session with ambient music, lounge seating, cocktails, and views across the illuminated property.',
    about:
      'The Skyline Terrace offers a quieter alternative to the main entertainment areas with signature drinks, small plates, and outdoor seating.',
    notes: [
      'Access is subject to terrace capacity.',
      'Outdoor operation may change depending on weather.',
      'Seating cannot be guaranteed.',
    ],
    accent: '#E1488D',
    image: images.events.firstNightTerraceSession,
  },
];
