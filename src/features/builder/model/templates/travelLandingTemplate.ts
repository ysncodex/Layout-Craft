import {
  ButtonComponent,
  GalleryComponent,
  IconTextComponent,
  ImageComponent,
  InputFieldComponent,
  PillComponent,
  PriceTagComponent,
  RatingStarsComponent,
  SpacerComponent,
  TextComponent,
} from '../types';

export type TemplateComponent =
  | Omit<TextComponent, 'id'>
  | Omit<ButtonComponent, 'id'>
  | Omit<RatingStarsComponent, 'id'>
  | Omit<ImageComponent, 'id'>
  | Omit<GalleryComponent, 'id'>
  | Omit<SpacerComponent, 'id'>
  | Omit<PillComponent, 'id'>
  | Omit<InputFieldComponent, 'id'>
  | Omit<IconTextComponent, 'id'>
  | Omit<PriceTagComponent, 'id'>;

export type TemplateColumn = {
  span: number;
  components: TemplateComponent[];
};

export type TemplateRow = {
  label?: string;
  columns: TemplateColumn[];
};

export type TemplateSection = {
  name: string;
  label?: string;
  rows: TemplateRow[];
};

export type LayoutTemplate = {
  title: string;
  sections: TemplateSection[];
};

const hotelCard = (location: string): TemplateComponent[] => [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=900&auto=format&fit=crop&q=80',
    alt: `${location} hotel`,
  },
  { type: 'iconText', icon: '📍', text: location },
  { type: 'text', text: 'Monsal Trander Stucky' },
  { type: 'text', text: 'Excellent' },
  { type: 'ratingStars', rating: 4, count: 5 },
  { type: 'priceTag', amount: '$49.00', suffix: '/ night' },
  { type: 'button', label: 'View Details', url: '#', variant: 'success', size: 'sm' },
];

export const travelLandingTemplate: LayoutTemplate = {
  title: 'Travel Landing Page',
  sections: [
    {
      name: 'Hero',
      label: 'Travel Hero',
      rows: [
        {
          label: 'Hero top bar',
          columns: [
            { span: 3, components: [{ type: 'text', text: 'EASYSOFT' }] },
            { span: 2, components: [{ type: 'text', text: 'Contact Us —' }] },
            { span: 2, components: [{ type: 'text', text: 'Customer service' }] },
            { span: 2, components: [{ type: 'iconText', icon: '🌐', text: 'English' }] },
            { span: 1, components: [{ type: 'pill', label: 'USD ▾', tone: 'default' }] },
            {
              span: 2,
              components: [
                { type: 'button', label: '👤 Login', url: '#', variant: 'success', size: 'sm' },
              ],
            },
          ],
        },
        {
          label: 'Hero banner',
          columns: [
            {
              span: 12,
              components: [
                {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&auto=format&fit=crop&q=80',
                  alt: 'Travel hero banner',
                },
              ],
            },
          ],
        },
        {
          label: 'Hero title',
          columns: [{ span: 12, components: [{ type: 'text', text: 'Save more, Travel more' }] }],
        },
        {
          label: 'Hero subtitle',
          columns: [
            { span: 6, components: [{ type: 'text', text: 'Flight ticket booking guarantee' }] },
            {
              span: 6,
              components: [{ type: 'text', text: 'Get lower budget than booking rates' }],
            },
          ],
        },
        {
          label: 'Hero category icons',
          columns: [
            { span: 2, components: [{ type: 'iconText', icon: '✈️', text: 'Flights' }] },
            { span: 2, components: [{ type: 'iconText', icon: '🛏️', text: 'Hotel' }] },
            { span: 2, components: [{ type: 'iconText', icon: '🧳', text: 'Travel' }] },
            { span: 2, components: [{ type: 'iconText', icon: '🚢', text: 'Cruise' }] },
            { span: 2, components: [{ type: 'iconText', icon: '🚌', text: 'Transport' }] },
            { span: 2, components: [{ type: 'iconText', icon: '🛂', text: 'Visa' }] },
          ],
        },
        {
          label: 'Hero search row',
          columns: [
            {
              span: 2,
              components: [
                { type: 'inputField', label: 'Location', placeholder: 'Where are you going?' },
              ],
            },
            {
              span: 2,
              components: [{ type: 'inputField', label: 'Start Date', placeholder: 'Add date' }],
            },
            {
              span: 2,
              components: [{ type: 'inputField', label: 'End Date', placeholder: 'Add date' }],
            },
            {
              span: 2,
              components: [{ type: 'inputField', label: 'Guests', placeholder: '2 guests' }],
            },
            {
              span: 4,
              components: [
                { type: 'button', label: 'Search', url: '#', variant: 'success', size: 'md' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Offers',
      label: 'Special offers',
      rows: [
        {
          label: 'Offers heading',
          columns: [
            { span: 12, components: [{ type: 'text', text: "Today Only, Don't Miss Out!" }] },
          ],
        },
        {
          label: 'Offers subtitle',
          columns: [
            {
              span: 12,
              components: [{ type: 'text', text: 'Limited Time Deal, Unlimited Happiness' }],
            },
          ],
        },
        {
          label: 'Offers card row',
          columns: [
            {
              span: 3,
              components: [
                { type: 'text', text: '10% off' },
                { type: 'text', text: 'Hotels & Homes' },
                { type: 'iconText', icon: '🧳', text: '' },
                { type: 'button', label: 'Get Now', url: '#', variant: 'success', size: 'sm' },
              ],
            },
            {
              span: 3,
              components: [
                { type: 'text', text: '5% off' },
                { type: 'text', text: 'Exit Sans' },
                { type: 'iconText', icon: '🛫', text: '' },
                { type: 'button', label: 'Get Now', url: '#', variant: 'success', size: 'sm' },
              ],
            },
            {
              span: 3,
              components: [
                { type: 'text', text: '5% off' },
                { type: 'text', text: 'Attractions & Tours' },
                { type: 'iconText', icon: '🎡', text: '' },
                { type: 'button', label: 'Get Now', url: '#', variant: 'success', size: 'sm' },
              ],
            },
            {
              span: 3,
              components: [
                { type: 'text', text: '10% off' },
                { type: 'text', text: 'Airport Transfers' },
                { type: 'iconText', icon: '🚕', text: '' },
                { type: 'button', label: 'Get Now', url: '#', variant: 'success', size: 'sm' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Recommended',
      rows: [
        {
          columns: [{ span: 12, components: [{ type: 'text', text: 'Recommended for You' }] }],
        },
        {
          label: 'Recommended category row',
          columns: [
            { span: 2, components: [{ type: 'pill', label: 'Hotel', tone: 'active' }] },
            { span: 2, components: [{ type: 'pill', label: 'Tour', tone: 'default' }] },
            { span: 2, components: [{ type: 'pill', label: 'Activity', tone: 'default' }] },
            { span: 2, components: [{ type: 'pill', label: 'Rental', tone: 'default' }] },
            { span: 2, components: [{ type: 'pill', label: 'Car', tone: 'default' }] },
            { span: 2, components: [{ type: 'pill', label: 'Restaurants', tone: 'default' }] },
          ],
        },
        {
          label: 'Recommended card row one',
          columns: [
            { span: 3, components: hotelCard('Los Angeles') },
            { span: 3, components: hotelCard('Los Angeles') },
            { span: 3, components: hotelCard('Los Angeles') },
            { span: 3, components: hotelCard('Los Angeles') },
          ],
        },
        {
          label: 'Recommended card row two',
          columns: [
            { span: 3, components: hotelCard('Los Angeles') },
            { span: 3, components: hotelCard('Los Angeles') },
            { span: 3, components: hotelCard('Los Angeles') },
            { span: 3, components: hotelCard('Los Angeles') },
          ],
        },
      ],
    },
    {
      name: 'Destinations',
      rows: [
        {
          columns: [
            {
              span: 12,
              components: [
                { type: 'text', text: 'Popular destinations outside Bangladesh' },
                {
                  type: 'text',
                  text: 'Explore popular destinations outside Bangladesh, from the vibrant cities of Asia to the timeless beauty of Europe and the Middle East.',
                },
              ],
            },
          ],
        },
        {
          columns: [
            {
              span: 3,
              components: [
                {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=900&auto=format&fit=crop&q=80',
                  alt: 'Kuala Lumpur',
                },
                { type: 'text', text: 'Kuala Lumpur' },
                { type: 'iconText', icon: '🏨', text: '19,902 accommodations' },
              ],
            },
            {
              span: 3,
              components: [
                {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=900&auto=format&fit=crop&q=80',
                  alt: 'Manila',
                },
                { type: 'text', text: 'Manila' },
                { type: 'iconText', icon: '🏨', text: '19,902 accommodations' },
              ],
            },
            {
              span: 3,
              components: [
                {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=80',
                  alt: 'Jakarta',
                },
                { type: 'text', text: 'Jakarta' },
                { type: 'iconText', icon: '🏨', text: '19,902 accommodations' },
              ],
            },
            {
              span: 3,
              components: [
                {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&auto=format&fit=crop&q=80',
                  alt: 'Bangkok',
                },
                { type: 'text', text: 'Bangkok' },
                { type: 'iconText', icon: '🏨', text: '19,902 accommodations' },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Footer',
      rows: [
        {
          label: 'Footer headings',
          columns: [
            { span: 3, components: [{ type: 'text', text: 'Contact Us' }] },
            { span: 3, components: [{ type: 'text', text: 'About' }] },
            { span: 3, components: [{ type: 'text', text: 'Other Services' }] },
            { span: 3, components: [{ type: 'text', text: 'Payment Methods' }] },
          ],
        },
        {
          label: 'Footer details',
          columns: [
            {
              span: 3,
              components: [
                { type: 'text', text: 'Customer Support' },
                { type: 'text', text: 'Service Guarantee' },
                { type: 'text', text: 'More Service Info' },
              ],
            },
            {
              span: 3,
              components: [
                { type: 'text', text: 'About Us' },
                { type: 'text', text: 'News' },
                { type: 'text', text: 'Careers' },
                { type: 'text', text: 'Terms & Conditions' },
                { type: 'text', text: 'Privacy Statement' },
                { type: 'text', text: 'Accessibility Statement' },
              ],
            },
            {
              span: 3,
              components: [
                { type: 'text', text: 'Tours & Travel' },
                { type: 'text', text: 'Hotel Booking' },
                { type: 'text', text: 'Day Trips' },
                { type: 'text', text: 'Air Ticketing' },
                { type: 'text', text: 'Bus & Train Ticketing' },
                { type: 'text', text: 'Holiday Tours' },
              ],
            },
            {
              span: 3,
              components: [
                { type: 'image', src: '/travel/payment-visa.svg', alt: 'Visa logo' },
                { type: 'image', src: '/travel/payment-mastercard.svg', alt: 'Mastercard logo' },
                { type: 'image', src: '/travel/payment-amex.svg', alt: 'AMEX logo' },
                { type: 'image', src: '/travel/payment-bkash.svg', alt: 'bKash logo' },
                { type: 'image', src: '/travel/payment-nagad.svg', alt: 'Nagad logo' },
                { type: 'image', src: '/travel/payment-paypal.svg', alt: 'PayPal logo' },
              ],
            },
          ],
        },
        {
          label: 'Footer bottom row',
          columns: [
            {
              span: 6,
              components: [
                { type: 'text', text: 'Our Partners' },
                { type: 'image', src: '/travel/partner-google.svg', alt: 'Google partner logo' },
                {
                  type: 'image',
                  src: '/travel/partner-facebook.svg',
                  alt: 'Facebook partner logo',
                },
                {
                  type: 'image',
                  src: '/travel/partner-tripadvisor.svg',
                  alt: 'Tripadvisor partner logo',
                },
              ],
            },
            {
              span: 6,
              components: [
                { type: 'text', text: 'Copyright © 2022 easytrip.com, All rights reserved' },
                {
                  type: 'text',
                  text: 'Site Operator: Landingpage.com Travel Network Pte. Ltd.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
