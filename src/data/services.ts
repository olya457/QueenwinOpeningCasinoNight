import {ParkingSpace, ServiceItem} from '../types';

export const services: ServiceItem[] = [
  {
    id: 'hotel-check-in-assistance',
    title: 'Hotel Check-In Assistance',
    description: 'Our concierge team will personally escort you through check-in and ensure your room is ready upon arrival.',
    availability: 'Available until 2:00 AM',
    responseTime: '~10 minutes',
    icon: '🛎️',
  },
  {
    id: 'restaurant-reservation',
    title: 'Restaurant Reservation',
    description: 'Reserve your table at our Signature Restaurant for the opening night dining experience.',
    availability: 'Available now',
    responseTime: '~5 minutes',
    icon: '🍽️',
  },
  {
    id: 'luggage-assistance',
    title: 'Luggage Assistance',
    description: 'Our bellhop team will collect, store, or deliver your luggage to your room.',
    availability: 'Available 24/7',
    responseTime: '~15 minutes',
    icon: '🧳',
  },
  {
    id: 'guest-support',
    title: 'Guest Support',
    description: 'Immediate assistance for any guest concern, question, or special requirement.',
    availability: 'Available 24/7',
    responseTime: 'Immediate',
    icon: '💬',
  },
];

export const parkingSpaces: ParkingSpace[] = [
  {id: 'A01', zone: 'Zone A - Premium', status: 'available', entrance: 'Main Entrance - 20m', recommendation: 'Arrive by 6:30 PM'},
  {id: 'A02', zone: 'Zone A - Premium', status: 'occupied', entrance: 'Main Entrance - 30m', recommendation: 'Unavailable'},
  {id: 'A03', zone: 'Zone A - Premium', status: 'available', entrance: 'Main Entrance - 18m', recommendation: 'Near valet desk'},
  {id: 'A04', zone: 'Zone A - Premium', status: 'occupied', entrance: 'Main Entrance - 28m', recommendation: 'Unavailable'},
  {id: 'A05', zone: 'Zone A - Premium', status: 'available', entrance: 'Main Entrance - 24m', recommendation: 'Easy exit'},
  {id: 'B01', zone: 'Zone B - Standard', status: 'available', entrance: 'North Entry - 35m', recommendation: 'Best for short stay'},
  {id: 'B02', zone: 'Zone B - Standard', status: 'available', entrance: 'North Entry - 33m', recommendation: 'Covered'},
  {id: 'B03', zone: 'Zone B - Standard', status: 'occupied', entrance: 'North Entry - 41m', recommendation: 'Unavailable'},
  {id: 'B04', zone: 'Zone B - Standard', status: 'occupied', entrance: 'North Entry - 44m', recommendation: 'Unavailable'},
  {id: 'B05', zone: 'Zone B - Standard', status: 'available', entrance: 'North Entry - 37m', recommendation: 'Close to elevator'},
  {id: 'C01', zone: 'Zone C - Extended', status: 'available', entrance: 'West Entry - 48m', recommendation: 'Long stay option'},
  {id: 'C02', zone: 'Zone C - Extended', status: 'available', entrance: 'West Entry - 50m', recommendation: 'Quiet area'},
  {id: 'C03', zone: 'Zone C - Extended', status: 'occupied', entrance: 'West Entry - 56m', recommendation: 'Unavailable'},
  {id: 'C04', zone: 'Zone C - Extended', status: 'available', entrance: 'West Entry - 46m', recommendation: 'Easy access'},
  {id: 'C05', zone: 'Zone C - Extended', status: 'occupied', entrance: 'West Entry - 59m', recommendation: 'Unavailable'},
];

export const helpQuestions = [
  'Where do I show my pass?',
  'What time does the opening start?',
  'How do I order from the menu?',
  'How can I request a service?',
  'How can I reserve parking?',
  'Where can I see offers?',
];

export const faqAnswers: Record<string, string> = {
  'Where do I show my pass?':
    'Show your Opening Event Pass at the venue entrance or whenever guest service staff asks for access confirmation.',
  'What time does the opening start?':
    'We recommend arriving before the first scheduled welcome moment so you have enough time for pass confirmation, orientation, and seating requests.',
  'How do I order from the menu?':
    'Open the Menu tab, add dishes to your order, review the request, and send it for venue confirmation.',
  'How can I request a service?':
    'Choose a service, fill in the booking form, and send the request. The venue team will review it and update the status.',
  'How can I reserve parking?':
    'Open the Services tab, switch to Parking, select an available space, add your vehicle details, and send the reservation request.',
  'Where can I see offers?':
    'Open the Offers tab to browse saved hotel, dining, and post-opening benefits linked to your visit.',
};
