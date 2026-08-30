import {ImageSourcePropType} from 'react-native';

export type EventItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  date: string;
  time: string;
  venue: string;
  shortDescription: string;
  about: string;
  notes: string[];
  accent: string;
  image: ImageSourcePropType;
};

export type MenuItem = {
  id: string;
  title: string;
  category: string;
  tags: string[];
  price: number;
  description: string;
  ingredients: string;
  allergens: string;
  serving: string;
  image: ImageSourcePropType;
};

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  availability: string;
  responseTime: string;
  icon: string;
};

export type ParkingSpace = {
  id: string;
  zone: string;
  status: 'available' | 'occupied' | 'selected';
  entrance: string;
  recommendation: string;
};

export type OfferItem = {
  id: string;
  title: string;
  tag: string;
  validity: string;
  location: string;
  description: string;
  benefits: string[];
  conditions: string[];
  image: ImageSourcePropType;
};
