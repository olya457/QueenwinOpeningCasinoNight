import {images} from '../assets';
import {OfferItem} from '../types';

export const offers: OfferItem[] = [
  {
    id: 'queenwin-suite-stay-package',
    title: 'Queenwin Suite Stay Package',
    tag: 'Hotel',
    validity: 'Valid for 90 days after opening',
    location: 'Queenwin Hotel Tower',
    description:
      'Experience Queenwin from above with an exclusive suite stay following the opening night. Includes breakfast, late checkout, and a private welcome amenity.',
    benefits: [
      'One night in a Deluxe Suite',
      'Full breakfast for two',
      '3:00 PM late checkout',
      'Personal concierge during the stay',
      'Welcome champagne and in-room amenity',
    ],
    conditions: [
      'Subject to suite availability',
      'Blackout dates may apply',
      'Advance reservation required',
      'Non-refundable promotional rate',
    ],
    image: images.offers.queenwinSuiteStayPackage,
  },
  {
    id: 'opening-weekend-breakfast-escape',
    title: 'Opening Weekend Breakfast Escape',
    tag: 'Hotel',
    validity: 'Selected weekends for 8 weeks after opening',
    location: 'Queenwin Hotel Tower & Signature Restaurant',
    description:
      'Turn a weekend visit into a relaxed overnight escape with accommodation and breakfast the following morning.',
    benefits: [
      'One-night Deluxe Room stay',
      'Breakfast for two',
      'Complimentary 1:00 PM late checkout',
      'Welcome coffee or tea on arrival',
    ],
    conditions: [
      'Valid on selected Friday and Saturday stays only',
      'Room upgrades depend on availability',
    ],
    image: images.offers.openingWeekendBreakfastEscape,
  },
  {
    id: 'private-dining-preview',
    title: 'Private Dining Preview',
    tag: 'Dining',
    validity: 'Available on selected dates for 90 days after opening',
    location: 'Private Dining Room',
    description:
      'Gather a small group for a private dining experience featuring a tailored set menu and dedicated service.',
    benefits: [
      'Private dining room for up to eight guests',
      'Four-course set menu',
      'Dedicated service team',
      'Complimentary celebration message on request',
    ],
    conditions: [
      'Minimum of four guests required',
      'Reservation required at least five days in advance',
      'Subject to private dining room availability',
    ],
    image: images.offers.privateDiningPreview,
  },
];
