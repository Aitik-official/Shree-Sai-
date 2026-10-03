const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://infotechpranavi_db_user:SqVG7qE4H4ofvNw4@cluster0.ir7cy5f.mongodb.net/skygo?retryWrites=true&w=majority&appName=Cluster0';

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  ideaFor: { type: String, default: '' },
  about: { type: String, required: true },
  services: { type: String, default: 'Customized travel planning, Guided tours & local experiences, Group & family vacations, Luxury & adventure travel' },
  tourDetails: { type: String, required: true },
  abstract: { type: String, default: '' },
  tourOverview: { type: String, default: '' },
  keyHighlights: [{ type: String }],
  hotelOptions: [{ type: String }],
  bestTimeToVisit: {
    yearRound: { type: String, default: '' },
    winter: { type: String, default: '' },
    summer: { type: String, default: '' },
  },
  whyChooseThisTrip: [{ type: String }],
  price: { type: Number, required: true },
  duration: { type: String, default: 'Flexible' },
  location: { type: String, required: true },
  capacity: { type: String, default: '2-10 Persons' },
  packageType: { type: String, required: true, enum: ['domestic', 'international'] },
  place: { type: String, required: true },
  packageCategory: { type: String, required: true },
  packageMiniCategory: { type: String, default: '' },
  images: [{
    public_id: String,
    url: { type: String, required: true },
    alt: { type: String, default: '' }
  }],
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
  }],
  transportation: [{
    type: { type: String, required: true },
    vehicle: { type: String, required: true },
    description: { type: String, default: '' }
  }],
  accommodation: [{
    city: { type: String, required: true },
    hotel: { type: String, required: true },
    rooms: { type: String, required: true },
    roomType: { type: String, required: true },
    nights: { type: String, required: true }
  }],
  inclusions: [mongoose.Schema.Types.Mixed],
  exclusions: [mongoose.Schema.Types.Mixed],
  reviews: [{
    name: String,
    rating: Number,
    comment: String,
    date: { type: Date, default: Date.now }
  }],
  faqs: [{
    question: String,
    answer: String
  }],
  bookings: { type: Number, default: 0 },
  rating: { type: Number, default: 4.9 },
  isFeaturedDestination: { type: Boolean, default: true },
  isPopularPackage: { type: Boolean, default: true },
  isFeaturedTrip: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Package = mongoose.models.Package || mongoose.model('Package', PackageSchema);

const varanasiAndNepalPackages = [
  {
    title: 'Varanasi Spiritual Heritage & Divine Ganga Aarti',
    subtitle: 'Private sunrise Ganges cruise, Kashi Vishwanath corridor & evening Aarti VIP boat',
    ideaFor: 'Families, Pilgrims, Couples & Cultural Explorers',
    about: 'Experience the mystical aura of Varanasi (Kashi), the spiritual capital of India. Witness the world-famous evening Ganga Aarti at Dashashwamedh Ghat from a private boat, take a sacred sunrise boat cruise along the ancient Ghats, visit the magnificent Shri Kashi Vishwanath Golden Temple Corridor, walk through historic Banaras alleys, and visit Sarnath where Lord Buddha gave his first sermon.',
    tourDetails: 'Complete 3-day guided heritage and pilgrimage tour of Varanasi with private transfers, boat rides, temple VIP assistance, and excursion to Sarnath.',
    tourOverview: 'Varanasi is one of the world\'s oldest continuously inhabited cities. This curated journey combines sacred rituals, historical exploration, serene river cruises, and vibrant local gastronomy. Every aspect is seamlessly organized with private air-conditioned vehicles and experienced local heritage guides.',
    keyHighlights: [
      'Private sunrise boat cruise from Assi Ghat to Manikarnika Ghat',
      'VIP guided Darshan at the historic Shri Kashi Vishwanath Temple Corridor',
      'Mesmerizing evening Ganga Aarti viewed from an exclusive private boat on the river',
      'Guided excursion to Sarnath: Dhamek Stupa, Ashoka Pillar & Archaeological Museum',
      'Walking heritage tour of Kashi alleys, Sankat Mochan temple & silk weaver studios',
      'Authentic Banarasi cuisine tastings including Banarasi Paan, Malaiyo & Lassi'
    ],
    hotelOptions: ['BrijRama Palace Heritage', 'Radisson Hotel Varanasi', 'Taj Ganges Varanasi', 'Hotel Surya Heritage'],
    bestTimeToVisit: {
      yearRound: 'October to March offers ideal pleasant weather for ghat walks and boating.',
      winter: 'November to February has misty mornings and cool, crisp evenings perfect for aarti.',
      summer: 'April to June is warmer with fewer crowds and deeply atmospheric evening ceremonies.'
    },
    whyChooseThisTrip: [
      'Exclusive private boat rides ensuring uninterrupted views and photography',
      'Verified local heritage experts and priest assistance for peaceful temple darshan',
      'All airport/station transfers in comfortable private air-conditioned vehicles',
      'Transparent pricing with all entrance, boat, and toll charges included'
    ],
    price: 14999,
    duration: '3 Days / 2 Nights',
    location: 'Varanasi, Uttar Pradesh, India',
    capacity: '2-10 Persons',
    packageType: 'domestic',
    place: 'varanasi',
    packageCategory: 'Domestic North — Spiti, Ladakh & North India',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Divine Ganga Aarti at Dashashwamedh Ghat Varanasi'
      },
      {
        url: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Sunrise boat ride on the sacred river Ganges Varanasi'
      },
      {
        url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Kashi Vishwanath Temple corridor and ancient Ghats'
      },
      {
        url: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Historical Dhamek Stupa in Sarnath near Varanasi'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Varanasi & Spectacular Evening Ganga Aarti',
        description: 'Arrive at Varanasi Airport/Railway Station where you are warmly greeted by our executive and transferred to your hotel. In the late afternoon, proceed to Dashashwamedh Ghat for a private wooden boat ride on the holy Ganges. As dusk falls, witness the world-renowned grand Ganga Aarti with multi-tiered brass lamps, resonant chants, and floating earthen diyas. Return to your hotel for an overnight stay.'
      },
      {
        day: 2,
        title: 'Sunrise Boat Cruise, Temple Circuit & Excursion to Sarnath',
        description: 'Early morning sunrise boat ride witnessing Subah-e-Banaras rituals, holy dips, and centuries-old palaces along the Ghats. Visit the newly built Kashi Vishwanath Golden Temple corridor, Annapurna Temple, and Kaal Bhairav (Kotwal of Kashi). In the afternoon, take an excursion to Sarnath where Lord Buddha delivered his first sermon; explore the giant Dhamek Stupa, Mulagandha Kuti Vihara, and the Archaeological Museum housing India\'s National Emblem.'
      },
      {
        day: 3,
        title: 'Assi Ghat Morning Walk, Banarasi Silk Trail & Departure',
        description: 'Enjoy a peaceful morning walk along Assi Ghat and sample famous Banarasi street delicacies (Kachori Jalebi and Banarasi Lassi). Visit a traditional Banarasi handloom silk weaving centre to discover the heritage craftsmanship of Banarasi sarees. Later, transfer to Varanasi Airport or Railway Station for your onward journey with divine memories.'
      }
    ],
    transportation: [
      {
        type: 'Private AC Sedan / SUV',
        vehicle: 'Toyota Innova / Maruti Dzire AC',
        description: 'All transfers, temple circuit and Sarnath excursion with dedicated chauffeur.'
      },
      {
        type: 'Private Wooden Boat',
        vehicle: 'Traditional Decorated Ganges Boat',
        description: 'Morning sunrise boat ride and evening Aarti boat cruise.'
      }
    ],
    accommodation: [
      {
        city: 'Varanasi',
        hotel: 'Radisson Hotel / BrijRama Palace Heritage',
        rooms: '1-4 Deluxe Rooms',
        roomType: 'Deluxe AC Room with Breakfast',
        nights: '2 Nights'
      }
    ],
    inclusions: [
      '2 Nights accommodation in selected deluxe hotel with breakfast',
      'All airport / railway station pick-up and drop-off in private AC vehicle',
      'Private sunrise boat cruise on River Ganges',
      'Reserved boat for evening Ganga Aarti at Dashashwamedh Ghat',
      'Assisted Darshan at Shri Kashi Vishwanath Corridor & Kaal Bhairav',
      'Guided excursion to Sarnath including monument entry fees',
      'Experienced English/Hindi speaking local heritage tour guide',
      'All fuel, driver allowances, toll taxes, and parking charges'
    ],
    exclusions: [
      'Airfare or train tickets to/from Varanasi',
      'Personal expenses (laundry, telephone calls, room service, tips)',
      'Meals not specified in the itinerary (Lunches & Dinners)',
      'Any special puja/ritual dakshina inside temples',
      'GST 5%'
    ],
    faqs: [
      {
        question: 'What is the best time to witness the Varanasi Ganga Aarti?',
        answer: 'The evening Ganga Aarti takes place every day around 6:30 PM in summer and 5:45 PM in winter. Our private boat ensures you get the best vantage point without being crowded.'
      },
      {
        question: 'Are elderly citizens supported during temple darshan and boat rides?',
        answer: 'Yes, our local guides and drivers provide personalized support, e-rickshaws where vehicle movement is restricted, and gentle assistance getting on and off boats.'
      }
    ],
    bookings: 28,
    rating: 4.95,
    isFeaturedDestination: true,
    isPopularPackage: true,
    isFeaturedTrip: true
  },
  {
    title: 'Kashi, Prayagraj & Ayodhya Sacred Heritage Triangle',
    subtitle: 'Kashi Vishwanath, Triveni Sangam Holy Dip & Ram Janmabhoomi Darshan',
    ideaFor: 'Families, Senior Citizens & Devotees',
    about: 'A comprehensive 5-day holy pilgrimage through Uttar Pradesh\'s holy trinity: Varanasi, Prayagraj, and Ayodhya. Take a sacred holy dip at the confluence of Ganga, Yamuna & Saraswati (Triveni Sangam), explore Kashi Vishwanath Corridor, and visit the grand Ram Mandir in Ayodhya with end-to-end private transport and hotel stays.',
    tourDetails: '5 Days / 4 Nights all-inclusive pilgrimage package covering Varanasi, Prayagraj Sangam, and Ayodhya Ram Janmabhoomi.',
    tourOverview: 'Embark on an unforgettable spiritual expedition through sacred northern India. Travel comfortably in private air-conditioned vehicles with hotel stays in Varanasi and Ayodhya, experienced temple coordinators, and pre-arranged boat rides.',
    keyHighlights: [
      'Holy Triveni Sangam boat ride and holy dip in Prayagraj',
      'VIP Darshan at the grand Shri Ram Janmabhoomi Mandir in Ayodhya',
      'Sunrise & Sunset boat cruises on River Ganges in Varanasi',
      'Shri Kashi Vishwanath Temple, Kaal Bhairav, and Sankat Mochan Temple',
      'Visit Hanuman Garhi and Kanak Bhawan in Ayodhya',
      'Anand Bhavan and Alopi Devi Temple in Prayagraj'
    ],
    hotelOptions: ['Hotel Surya Heritage Varanasi', 'The Grand JBR Ayodhya', 'Radisson Hotel Varanasi'],
    price: 24999,
    duration: '5 Days / 4 Nights',
    location: 'Varanasi, Prayagraj & Ayodhya, India',
    capacity: '2-12 Persons',
    packageType: 'domestic',
    place: 'varanasi',
    packageCategory: 'Domestic North — Spiti, Ladakh & North India',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Varanasi Ganges Heritage Ghats'
      },
      {
        url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Ganga Aarti ceremony Varanasi'
      },
      {
        url: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Kashi Vishwanath Corridor & River View'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Varanasi & Evening Ganga Aarti',
        description: 'Pick up from Varanasi Airport/Station. Check-in to hotel and freshen up. In the evening, witness the grand Ganga Aarti from private boat on Dashashwamedh Ghat. Overnight stay in Varanasi.'
      },
      {
        day: 2,
        title: 'Varanasi Sacred Darshan & Sarnath Tour',
        description: 'Morning sunrise boat ride. Visit Kashi Vishwanath Corridor, Annapurna Mandir, Kaal Bhairav, and Sankat Mochan. In the afternoon, visit Sarnath Stupa and museum. Overnight stay in Varanasi.'
      },
      {
        day: 3,
        title: 'Day Excursion to Prayagraj (Triveni Sangam)',
        description: 'Drive to Prayagraj (approx. 2.5 hours). Take a holy boat to the sacred Triveni Sangam for a holy dip and puja. Visit the historic Anand Bhavan and Bade Hanuman Ji temple. Return to Varanasi for night stay.'
      },
      {
        day: 4,
        title: 'Varanasi to Ayodhya - Shri Ram Janmabhoomi Darshan',
        description: 'Morning drive to holy city of Ayodhya (approx. 4 hours). Check in to hotel. Proceed for VIP Darshan at the grand Shri Ram Janmabhoomi Temple, Hanuman Garhi, and Kanak Bhawan. Evening Saryu River Aarti. Overnight stay in Ayodhya.'
      },
      {
        day: 5,
        title: 'Ayodhya Sightseeing & Departure',
        description: 'Morning visit to Dashrath Mahal and local sacred sites. Later, transfer to Ayodhya or Varanasi Airport/Railway station for your departure journey.'
      }
    ],
    transportation: [
      {
        type: 'Private AC Chauffeur Vehicle',
        vehicle: 'Toyota Innova Crysta / Tempo Traveller',
        description: 'Intercity and sightseeing transport throughout the 5-day tour.'
      }
    ],
    accommodation: [
      {
        city: 'Varanasi',
        hotel: 'Hotel Surya / Madin Hotel',
        rooms: 'Deluxe AC Rooms',
        roomType: 'Deluxe Double/Twin',
        nights: '3 Nights'
      },
      {
        city: 'Ayodhya',
        hotel: 'The Grand JBR / Royal Heritage Ayodhya',
        rooms: 'Deluxe AC Rooms',
        roomType: 'Deluxe Double/Twin',
        nights: '1 Night'
      }
    ],
    inclusions: [
      '4 Nights accommodation with daily breakfast',
      'All intercity transfers (Varanasi - Prayagraj - Ayodhya) in private AC vehicle',
      'Holy Triveni Sangam private boat in Prayagraj',
      'Private boat cruise for Varanasi Ganga Aarti & sunrise cruise',
      'Assisted Darshan at Kashi Vishwanath & Ayodhya Ram Mandir',
      'All tolls, driver charges, parking, and state permits'
    ],
    exclusions: [
      'Airfare/Train fare',
      'Lunches, Dinners and personal expenses',
      'GST 5%'
    ],
    bookings: 35,
    rating: 4.9,
    isFeaturedDestination: true,
    isPopularPackage: true,
    isFeaturedTrip: true
  },
  {
    title: 'Nepal Himalayan Explorer: Kathmandu & Pokhara',
    subtitle: 'Pashupatinath, Boudhanath, Phewa Lake Boating & Sarangkot Annapurna Sunrise',
    ideaFor: 'Couples, Families, Nature Lovers & Mountain Enthusiasts',
    about: 'Explore the land of the mighty Himalayas with this 6-day Nepal holiday package. Discover UNESCO World Heritage treasures in Kathmandu including Pashupatinath Temple, Boudhanath Stupa, and Swayambhunath Monkey Temple. Travel to picturesque Pokhara to cruise on tranquil Phewa Lake, explore natural caves, and witness a golden sunrise over the snow-capped Annapurna and Machapuchare (Fishtail) peaks.',
    tourDetails: '6 Days / 5 Nights guided Nepal tour covering Kathmandu Valley, Bhaktapur, and Pokhara with scenic mountain vistas and hotel stays.',
    tourOverview: 'Nepal is a paradise of towering Himalayan peaks, ancient pagoda architecture, and rich Buddhist-Hindu culture. This package provides a well-balanced itinerary with private transfers, high-standard 3-star and 4-star hotels, daily buffet breakfast, and licensed local Nepalese guides.',
    keyHighlights: [
      'Sacred pilgrimage to Lord Pashupatinath Temple on the Bagmati River',
      'Circumambulate the colossal Boudhanath Stupa with its spinning prayer wheels',
      'Panoramic 360-degree sunrise view over Annapurna mountain range from Sarangkot',
      'Relaxing private boat cruise on crystal-clear Phewa Lake with Tal Barahi island temple',
      'Explore mysterious Davis Falls and Gupteshwor Mahadev subterranean cave',
      'Visit the iconic World Peace Pagoda overlooking Pokhara Valley',
      'Medieval architecture walk at Bhaktapur Durbar Square'
    ],
    hotelOptions: ['Hotel Mulberry Kathmandu', 'Waterfront Resort Pokhara', 'Grand Hotel Kathmandu', 'Temple Tree Resort Pokhara'],
    bestTimeToVisit: {
      yearRound: 'September to May is the premier season with crystal clear Himalayan views.',
      winter: 'October to December offers pleasant days, cool crisp nights, and spectacular peak visibility.',
      summer: 'March to May features blooming rhododendrons and warm alpine weather.'
    },
    whyChooseThisTrip: [
      'Experienced English/Hindi-speaking Nepalese tour leaders',
      'Carefully paced itinerary balancing cultural sightseeing and leisure time',
      'Private air-conditioned tourist vehicle for transfers between Kathmandu and Pokhara',
      'Full assistance with border/airport formalities and travel documentation'
    ],
    price: 34999,
    duration: '6 Days / 5 Nights',
    location: 'Kathmandu & Pokhara, Nepal',
    capacity: '2-15 Persons',
    packageType: 'international',
    place: 'nepal',
    packageCategory: 'International — Nepal, Vietnam, Thailand, Indonesia',
    images: [
      {
        url: '/Nepal.webp',
        alt: 'Majestic Nepal Himalayas and Pagoda Temples'
      },
      {
        url: '/Kathmandu.jpg',
        alt: 'Kathmandu Valley and Historical Temples'
      },
      {
        url: '/1400__1502124997_Kathmandu6.webp',
        alt: 'Kathmandu Durbar Square UNESCO Heritage Site'
      },
      {
        url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Swayambhunath Monkey Temple Kathmandu'
      },
      {
        url: 'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Serene Phewa Lake and Annapurna Mountain in Pokhara Nepal'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu & Traditional Welcome',
        description: 'Arrive at Tribhuvan International Airport in Kathmandu. Our tour representative greets you with traditional khada garlands and transfers you to your hotel. Evening at leisure to stroll through the bustling streets of Thamel. Overnight stay in Kathmandu.'
      },
      {
        day: 2,
        title: 'Kathmandu Valley UNESCO Heritage Tour',
        description: 'Full-day guided sightseeing of Kathmandu. Visit the revered Pashupatinath Temple, the sacred Buddhist sanctuary of Boudhanath Stupa, and the hilltop Swayambhunath (Monkey Temple) with sweeping views across Kathmandu valley. Evening free for shopping pashmina, singing bowls, and handicrafts.'
      },
      {
        day: 3,
        title: 'Scenic Drive to Pokhara - The City of Lakes',
        description: 'After breakfast, drive to Pokhara (approx. 6 hours) enjoying scenic views of rolling green hills, terraced farms, and the Trishuli River (optional white water rafting on the way). Arrive in Pokhara, check in to your lakeside hotel, and enjoy an evening stroll by Phewa Lake.'
      },
      {
        day: 4,
        title: 'Sarangkot Sunrise & Pokhara Valley Sightseeing',
        description: 'Early morning drive to Sarangkot hill station (1,600m) to witness an awe-inspiring sunrise illuminating the Annapurna, Dhaulagiri, and Machapuchare peaks. Return to hotel for breakfast. Later, visit Davis Falls, Gupteshwor Mahadev Cave, Bindhyabasini Temple, and enjoy a private hour-long boat ride on Phewa Lake.'
      },
      {
        day: 5,
        title: 'Pokhara to Kathmandu & Bhaktapur Heritage Walk',
        description: 'Drive back to Kathmandu. On the way, visit the ancient medieval royal city of Bhaktapur Durbar Square, famous for the 55-Window Palace, Nyatapola Temple, and pottery square. Check in to your hotel in Kathmandu for a farewell dinner.'
      },
      {
        day: 6,
        title: 'Departure from Kathmandu',
        description: 'Enjoy a leisurely breakfast. Depending on your flight timing, transfer to Tribhuvan International Airport for your flight back home, carrying lifelong memories of the Nepalese Himalayas.'
      }
    ],
    transportation: [
      {
        type: 'Private Tourist AC Vehicle',
        vehicle: 'Toyota HiAce / Hyundai H1 / AC Car',
        description: 'Airport transfers, Kathmandu-Pokhara intercity drives and city sightseeing.'
      },
      {
        type: 'Private Boating',
        vehicle: 'Traditional Nepali Wooden Boat',
        description: 'Phewa Lake boating in Pokhara.'
      }
    ],
    accommodation: [
      {
        city: 'Kathmandu',
        hotel: 'Hotel Mulberry / Grand Hotel Kathmandu',
        rooms: 'Deluxe AC Rooms',
        roomType: 'Deluxe Room with Breakfast',
        nights: '3 Nights'
      },
      {
        city: 'Pokhara',
        hotel: 'Waterfront Resort / Temple Tree Resort & Spa',
        rooms: 'Deluxe Mountain View Rooms',
        roomType: 'Deluxe Room with Breakfast',
        nights: '2 Nights'
      }
    ],
    inclusions: [
      '5 Nights hotel accommodation in selected 3/4-star properties',
      'Daily international buffet breakfast at all hotels',
      'All airport pick-up and drop-off in private tourist vehicle',
      'Kathmandu to Pokhara return transfers in comfortable private vehicle',
      'Guided sightseeing tours in Kathmandu, Pokhara, and Bhaktapur',
      'Private 1-hour boat ride on Phewa Lake Pokhara',
      'Sarangkot sunrise excursion in Pokhara',
      'All toll taxes, parking, driver allowances, and fuel'
    ],
    exclusions: [
      'International flights to/from Kathmandu',
      'Nepal tourist visa (on arrival for applicable nationalities; free for Indian citizens with voter ID/passport)',
      'Monument entry fees in Kathmandu & Bhaktapur',
      'Lunches, Dinners and personal drinks',
      'Travel insurance and tipping'
    ],
    faqs: [
      {
        question: 'Do Indian citizens need a passport or visa for Nepal?',
        answer: 'Indian citizens do not require a visa. Valid Indian Passport or original Voter ID Card is sufficient identification for air entry into Nepal.'
      },
      {
        question: 'Can we upgrade the Kathmandu-Pokhara transfer to a domestic flight?',
        answer: 'Yes, 25-minute scenic flights between Kathmandu and Pokhara can be arranged upon request at an additional cost.'
      }
    ],
    bookings: 42,
    rating: 4.94,
    isFeaturedDestination: true,
    isPopularPackage: true,
    isFeaturedTrip: true
  },
  {
    title: 'Nepal Himalayan Motorbike Expedition: Kathmandu to Mustang',
    subtitle: 'Ride through Trishuli Valley, Pokhara, Tatopani & Lower Mustang',
    ideaFor: 'Motorbike Riders, Adventure Seekers & Thrill Enthusiasts',
    about: 'The ultimate Himalayan motorcycle expedition in Nepal. Saddle up on Royal Enfield motorcycles from Kathmandu, cruise through lush subtropical valleys to Pokhara, and ascend into the rugged gorges of the Annapurna and Mustang mountains. Experience world-class twisties, suspension bridge views, natural hot springs at Tatopani, and dramatic Himalayan panoramas with dedicated backup vehicle, mechanic, and ride captain.',
    tourDetails: '8 Days / 7 Nights guided motorcycle adventure across Nepal with Royal Enfield bike, fuel, backup truck, mechanic, and permits included.',
    tourOverview: 'A bucket-list motorcycle ride through the heart of the Himalayas. Tackle winding tarmac roads, mountain gravel trails, and suspension bridges while being fully supported by an experienced road captain, certified mechanic, and support luggage truck.',
    keyHighlights: [
      'Royal Enfield 350cc / 500cc / Himalayan motorbike for the entire expedition',
      'Dedicated luggage support backup vehicle and full-time mechanic',
      'Scenic ride through the deep Kali Gandaki river gorge',
      'Relax in natural hot sulfur springs at Tatopani after a day in the saddle',
      'Unmatched views of 8,000m giant peaks: Annapurna I, Dhaulagiri, and Manaslu',
      'Lakeside rest and celebration evening in Pokhara'
    ],
    hotelOptions: ['Deluxe Mountain Lodges & Hotels in Kathmandu, Pokhara, Tatopani & Jomsom'],
    price: 58999,
    duration: '8 Days / 7 Nights',
    location: 'Kathmandu, Pokhara & Mustang, Nepal',
    capacity: '6-16 Riders',
    packageType: 'international',
    place: 'nepal',
    packageCategory: 'International — Nepal, Vietnam, Thailand, Indonesia',
    images: [
      {
        url: '/Nepal.webp',
        alt: 'Nepal Mountain Roads and Himalayan Passes'
      },
      {
        url: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Motorcycle Adventure in the Himalayas Nepal'
      },
      {
        url: '/1400__1502124997_Kathmandu6.webp',
        alt: 'Nepal Cultural Starting Point'
      },
      {
        url: 'https://images.unsplash.com/photo-1585016495481-91613a3ab1bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        alt: 'Pokhara Lakeside Finish Point'
      }
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu & Bike Allotment & Briefing',
        description: 'Arrive in Kathmandu. Transfer to hotel. In the afternoon, meet the road captain, receive your Royal Enfield motorcycle, take a short test ride, and attend the route and safety briefing. Welcome dinner in Thamel.'
      },
      {
        day: 2,
        title: 'Ride Kathmandu to Pokhara (205 km / 6-7 hrs)',
        description: 'Hit the road along the Prithvi Highway, carving along the turquoise Trishuli River and scenic mountain curves toward the lake city of Pokhara. Evening relaxation by Phewa Lake.'
      },
      {
        day: 3,
        title: 'Ride Pokhara to Tatopani Hot Springs (105 km / 5 hrs)',
        description: 'Ride along the Kali Gandaki river corridor into the Annapurna foothills. Transition from tarmac to exciting mountain gravel paths. Soak in natural thermal hot springs at Tatopani.'
      },
      {
        day: 4,
        title: 'Ride Tatopani to Jomsom & Muktinath (100 km / 5-6 hrs)',
        description: 'Ride through the world\'s deepest gorge between Annapurna and Dhaulagiri. Ascend to the high-altitude arid valley of Jomsom and visit the sacred Muktinath temple (3,710m).'
      },
      {
        day: 5,
        title: 'Ride Muktinath / Jomsom to Kalopani (70 km / 4 hrs)',
        description: 'Ride down along the riverbed with spectacular views of snow-clad Nilgiri and Dhaulagiri peaks. Overnight stay in scenic pine-forested Kalopani.'
      },
      {
        day: 6,
        title: 'Ride Kalopani to Pokhara (125 km / 5 hrs)',
        description: 'Descend through alpine forests and river trails back to Pokhara. Evening lakeside celebration and boat cruise.'
      },
      {
        day: 7,
        title: 'Ride Pokhara to Kathmandu (205 km / 6 hrs)',
        description: 'Ride back to Kathmandu along the scenic highway. Hand over bikes in the evening and enjoy a farewell celebration dinner with the riding group.'
      },
      {
        day: 8,
        title: 'Departure from Kathmandu',
        description: 'Transfer to Kathmandu airport for your return flight with epic riding stories and photographs.'
      }
    ],
    transportation: [
      {
        type: 'Motorcycle',
        vehicle: 'Royal Enfield 350 / 500 / Himalayan with Fuel',
        description: 'Main expedition ride for rider + pillion option.'
      },
      {
        type: 'Support Vehicle',
        vehicle: '4x4 Backup Pickup / Truck',
        description: 'Carries luggage, spare parts, tools, first aid, and spare bike.'
      }
    ],
    accommodation: [
      {
        city: 'Kathmandu, Pokhara & Mountain Lodges',
        hotel: 'Deluxe Hotels & Mountain Resorts',
        rooms: 'Twin Sharing Deluxe Rooms',
        roomType: 'Deluxe Room with Breakfast & Dinner',
        nights: '7 Nights'
      }
    ],
    inclusions: [
      'Royal Enfield motorbike for all riding days with fuel included',
      '7 Nights accommodation in deluxe hotels and mountain resorts',
      'Breakfast and Dinner throughout the tour',
      'Backup support vehicle carrying luggage and spare parts',
      'Certified motorcycle mechanic and experienced road captain',
      'ACAP (Annapurna Conservation Area Permit) and TIMS card',
      'Riding gear support and first aid kit with oxygen cylinder',
      'Airport transfers in Kathmandu'
    ],
    exclusions: [
      'Flights to/from Kathmandu',
      'Personal riding gear (helmet, jacket, gloves, knee guards)',
      'Security refundable deposit for motorcycle (₹10,000)',
      'Lunches and alcoholic drinks',
      'Personal insurance and tipping'
    ],
    bookings: 19,
    rating: 4.97,
    isFeaturedDestination: true,
    isPopularPackage: true,
    isFeaturedTrip: true
  }
];

async function seedVaranasiAndNepal() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('Connected to MongoDB!');

    for (const pkg of varanasiAndNepalPackages) {
      const existing = await Package.findOne({ title: pkg.title });
      if (existing) {
        await Package.findByIdAndUpdate(existing._id, pkg, { new: true });
        console.log(`Updated existing package: ${pkg.title}`);
      } else {
        await Package.create(pkg);
        console.log(`Created new package: ${pkg.title}`);
      }
    }

    const count = await Package.countDocuments();
    console.log(`Total packages in database now: ${count}`);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding packages:', err);
    process.exit(1);
  }
}

seedVaranasiAndNepal();
