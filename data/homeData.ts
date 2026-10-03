import { SITE_NAME } from '@/lib/branding';

export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  type?: 'package' | 'tour' | 'ticket';
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  link: string;
  type?: 'package' | 'tour' | 'ticket';
}

export interface Package {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  price: string;
  image: string;
  link: string;
  type?: 'package' | 'tour' | 'ticket';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export const destinations: Destination[] = [
  {
    id: '1',
    title: 'Varanasi (Kashi)',
    subtitle: 'Sacred Ganges Ghats, Kashi Vishwanath & Evening Aarti',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages?search=Varanasi',
    type: 'package'
  },
  {
    id: '2',
    title: 'Nepal Himalayas',
    subtitle: 'Kathmandu Heritage, Pokhara & Annapurna Views',
    image: '/Nepal.webp',
    link: '/packages?search=Nepal',
    type: 'package'
  },
  {
    id: '3',
    title: 'Ladakh & Spiti',
    subtitle: 'High-altitude mountain expeditions',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages',
    type: 'package'
  },
  {
    id: '4',
    title: 'Rishikesh & Uttarakhand',
    subtitle: 'River rafting, camping & divine serenity',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages',
    type: 'package'
  }
];

export const upcomingTrips: Trip[] = [
  {
    id: '1',
    title: 'Varanasi Sunrise Boat & Aarti',
    location: 'Varanasi, India',
    price: 'from ₹14,999',
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages?search=Varanasi',
    type: 'package'
  },
  {
    id: '2',
    title: 'Kathmandu & Pokhara Discovery',
    location: 'Nepal',
    price: 'from ₹34,999',
    image: '/Kathmandu.jpg',
    link: '/packages?search=Nepal',
    type: 'package'
  },
  {
    id: '3',
    title: 'Nepal Motorbike Expedition',
    location: 'Mustang, Nepal',
    price: 'from ₹58,999',
    image: '/Nepal.webp',
    link: '/packages?search=Nepal',
    type: 'package'
  }
];

export const popularPackages: Package[] = [
  {
    id: '1',
    title: 'Varanasi Spiritual Heritage & Divine Ganga Aarti',
    subtitle: '3 Days / 2 Nights Sacred Kashi & Sarnath Tour',
    duration: '3 Days',
    price: '₹14,999',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages?search=Varanasi',
    type: 'package'
  },
  {
    id: '2',
    title: 'Kashi, Prayagraj & Ayodhya Triangle',
    subtitle: '5 Days / 4 Nights Holy Pilgrimage Tour',
    duration: '5 Days',
    price: '₹24,999',
    image: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages?search=Varanasi',
    type: 'package'
  },
  {
    id: '3',
    title: 'Nepal Himalayan Explorer: Kathmandu & Pokhara',
    subtitle: '6 Days / 5 Nights Heritage & Lakes',
    duration: '6 Days',
    price: '₹34,999',
    image: '/Nepal.webp',
    link: '/packages?search=Nepal',
    type: 'package'
  },
  {
    id: '4',
    title: 'Nepal Himalayan Motorbike Expedition',
    subtitle: '8 Days / 7 Nights Mustang Riding Adventure',
    duration: '8 Days',
    price: '₹58,999',
    image: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '/packages?search=Nepal',
    type: 'package'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Olivia Mitchell',
    role: 'Student',
    quote: `Our family trip to Kruger was absolutely magical. ${SITE_NAME} handled everything from the private transfers to the lodge bookings perfectly. Truly a world-class experience!`,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'James Wilson',
    role: 'Photographer',
    quote: 'The Garden Route drive was the highlight of my photography career. The attention to detail and the pacing of the tour allowed me to capture some incredible shots. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Sophia Chen',
    role: 'Architect',
    quote: `As an architect, I was blown away by the Zeitz MOCAA and the Waterfront redevelopment. The tour was enlightening and very well coordinated. ${SITE_NAME} knows their stuff!`,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'Marcus Thorne',
    role: 'Journalist',
    quote: 'Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Elena Rodriguez',
    role: 'Marketing Lead',
    quote: 'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'David Park',
    role: 'Software Engineer',
    quote: 'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
  }
];

export const exploreInclusions = [
  '24x7 Concierge Support',
  'Visa Assistance',
  'Packing & Equipment Rental',
  'Comprehensive Travel Insurance Assistance',
  'Airport Pick Up',
  'Centralized Hotel Locations',
  'Vetted Local Partners'
];
