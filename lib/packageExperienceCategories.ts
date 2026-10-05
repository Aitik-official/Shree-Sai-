import { SITE_NAME } from './branding';

export interface PackageMiniCategory {
  slug: string;
  label: string;
  value: string;
  href: string;
  subcategorySlug: string;
  groupSlug: string;
}

export interface PackageExperienceCategory {
  value: string;
  label: string;
  slug: string;
  href: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  emptyMessage: string;
  accent: 'amber' | 'orange' | 'blue' | 'green' | 'teal' | 'cyan' | 'violet';
  group: string;
  isFuture?: boolean;
  legacyValues?: string[];
  miniItems?: PackageMiniCategory[];
}

export interface PackageNavGroup {
  label: string;
  slug: string;
  items: PackageExperienceCategory[];
}

/** Activity-specific images — local assets in /public where available */
const local = (path: string) => path;

export const CATEGORY_IMAGES = {
  'yachts-sailing-cruises': local('/yaht/1629138.jpg'),
  'kayaking-boat-rides': local('/safeimagekit-kayak2__1_.webp'),
  'whitewater-rafting': local('/four-adventurous-friends-whitewater-rafting-through-rapids-free-photo.webp'),
  'sailing-school': local('/cape town.webp'),
  parasailing: local('/coast , south afirca.webp'),
  'scuba-diving-snorkeling': local('/coast , south afirca.webp'),
  'bike-expeditions-by-destination': local('/domestic-tour-packages-services.jpg'),
  'domestic-north-bike-expeditions': local('/tea-garden-in-darjeeling-india.webp'),
  'domestic-south-bike-expeditions': local('/Cherrapunji-2.webp'),
  'international-bike-expeditions': local('/Nepal.webp'),
  'bungee-jumping': local('/bungee-jumping-nedir.webp'),
  treks: local('/bhutan-travel-guide.webp'),
  cycling: local('/theme-img-1951.webp'),
  'helicopter-rides': local('/photo-1573398643956-2b9e6ade3456.webp'),
  'small-aircraft': local('/360_F_573305992_F4MJgvIVzPZbMywNb3zcBNTw8jkjNbKo.webp'),
  paragliding: local('/1400__1502124997_Kathmandu6.webp'),
  'upcoming-tours': local('/yaht/photo-1569263979104-865ab7cd8d13.avif'),
} as const;

export const GROUP_HERO_IMAGES: Record<string, string> = {
  water: CATEGORY_IMAGES['yachts-sailing-cruises'],
  'land-motor': CATEGORY_IMAGES['bike-expeditions-by-destination'],
  'land-physical': CATEGORY_IMAGES['bungee-jumping'],
  sky: CATEGORY_IMAGES['helicopter-rides'],
  'upcoming-tours': CATEGORY_IMAGES['upcoming-tours'],
};

const img = (slug: keyof typeof CATEGORY_IMAGES) => CATEGORY_IMAGES[slug];

export const LEGACY_PACKAGE_NAV_GROUPS: PackageNavGroup[] = [
  {
    label: 'Water',
    slug: 'water',
    items: [
      {
        value: 'Yachts & Sailing Cruises',
        label: 'Yachts & Sailing Cruises',
        slug: 'yachts-sailing-cruises',
        href: '/packages/yachts-sailing-cruises',
        heroTitle: 'Yachts & Sailing Cruises',
        heroSubtitle: 'Luxury yacht charters, coastal cruises, and open-water sailing journeys',
        heroImage: img('yachts-sailing-cruises'),
        emptyMessage: 'No yacht or sailing packages yet',
        accent: 'teal',
        group: 'water',
        legacyValues: ['Sailing Experiences'],
        miniItems: [
          {
            slug: 'yacht',
            label: 'Yacht',
            value: 'Yacht',
            href: '/packages/mini/yacht',
            subcategorySlug: 'yachts-sailing-cruises',
            groupSlug: 'water',
          },
        ],
      },
      {
        value: 'Kayaking Boat Rides',
        label: 'Kayaking Boat Rides',
        slug: 'kayaking-boat-rides',
        href: '/packages/kayaking-boat-rides',
        heroTitle: 'Kayaking Boat Rides',
        heroSubtitle: 'Paddle through scenic waterways, lagoons, and coastal kayak adventures',
        heroImage: img('kayaking-boat-rides'),
        emptyMessage: 'No kayaking packages yet',
        accent: 'cyan',
        group: 'water',
      },
      {
        value: 'White water & rapids rafting',
        label: 'White water & rapids rafting',
        slug: 'whitewater-rafting',
        href: '/packages/whitewater-rafting',
        heroTitle: 'White Water & Rapids Rafting',
        heroSubtitle: 'Adrenaline-packed river rafting on world-class rapids',
        heroImage: img('whitewater-rafting'),
        emptyMessage: 'No whitewater rafting packages yet',
        accent: 'blue',
        group: 'water',
        legacyValues: ['Adventure Activities', 'Adventure', 'adventure'],
      },
      {
        value: 'Sailing School',
        label: 'Sailing School',
        slug: 'sailing-school',
        href: '/packages/sailing-school',
        heroTitle: 'Sailing School',
        heroSubtitle: 'Learn to sail with certified instructors — courses for every skill level',
        heroImage: img('sailing-school'),
        emptyMessage: 'No sailing school packages yet',
        accent: 'teal',
        group: 'water',
      },
      {
        value: 'Parasailing',
        label: 'Parasailing',
        slug: 'parasailing',
        href: '/packages/parasailing',
        heroTitle: 'Parasailing Adventures',
        heroSubtitle: 'Soar above coastlines and lakes with panoramic views',
        heroImage: img('parasailing'),
        emptyMessage: 'No parasailing packages yet',
        accent: 'cyan',
        group: 'water',
        isFuture: true,
      },
      {
        value: 'Scuba Diving & Snorkeling',
        label: 'Scuba Diving & Snorkeling',
        slug: 'scuba-diving-snorkeling',
        href: '/packages/scuba-diving-snorkeling',
        heroTitle: 'Scuba Diving & Snorkeling',
        heroSubtitle: 'Explore vibrant reefs, marine life, and underwater worlds',
        heroImage: img('scuba-diving-snorkeling'),
        emptyMessage: 'No scuba diving packages yet',
        accent: 'blue',
        group: 'water',
        isFuture: true,
      },
    ],
  },
  {
    label: 'Land - Motor',
    slug: 'land-motor',
    items: [
      {
        value: 'Bike Expeditions by Destination',
        label: 'Bike Expeditions by Destination',
        slug: 'bike-expeditions-by-destination',
        href: '/packages/bike-expeditions-by-destination',
        heroTitle: 'Motorcycle & Road Expeditions',
        heroSubtitle: 'Curated self-ride and guided motor expeditions across iconic circuits',
        heroImage: img('bike-expeditions-by-destination'),
        emptyMessage: 'No bike expeditions yet',
        accent: 'orange',
        group: 'land-motor',
        legacyValues: ['Bike Trips', 'Biking'],
      },
      {
        value: 'Domestic North — Spiti, Ladakh & North India',
        label: 'Domestic North — Spiti, Ladakh & North India',
        slug: 'domestic-north-bike-expeditions',
        href: '/packages/domestic-north-bike-expeditions',
        heroTitle: 'North India & Himalayan Expeditions',
        heroSubtitle: 'Spiti Valley, Ladakh passes, and legendary Northern mountain highways',
        heroImage: img('domestic-north-bike-expeditions'),
        emptyMessage: 'No North India expeditions yet',
        accent: 'amber',
        group: 'land-motor',
        legacyValues: ['Spiti Valley', 'Ladakh Bike Trip'],
      },
      {
        value: 'Domestic South — Western Ghats & Coastal Circuits',
        label: 'Domestic South — Western Ghats & Coastal Circuits',
        slug: 'domestic-south-bike-expeditions',
        href: '/packages/domestic-south-bike-expeditions',
        heroTitle: 'South India & Coastal Rides',
        heroSubtitle: 'Misty ghats, coffee estates, and scenic coastal road trips',
        heroImage: img('domestic-south-bike-expeditions'),
        emptyMessage: 'No South India rides yet',
        accent: 'orange',
        group: 'land-motor',
        legacyValues: ['South India Rides'],
      },
      {
        value: 'International — Nepal, Vietnam, Thailand, Indonesia',
        label: 'International — Nepal, Vietnam, Thailand, Indonesia',
        slug: 'international-bike-expeditions',
        href: '/packages/international-bike-expeditions',
        heroTitle: 'Cross-Border Expeditions',
        heroSubtitle: 'Epic international riding routes across Asia with full support crews',
        heroImage: img('international-bike-expeditions'),
        emptyMessage: 'No international expeditions yet',
        accent: 'orange',
        group: 'land-motor',
        legacyValues: ['Nepal Tour', 'Vietnam Biking', 'International'],
      },
    ],
  },
  {
    label: 'Land - Physical',
    slug: 'land-physical',
    items: [
      {
        value: 'Bungee Jumping',
        label: 'Bungee Jumping',
        slug: 'bungee-jumping',
        href: '/packages/bungee-jumping',
        heroTitle: 'Bungee Jumping',
        heroSubtitle: 'Pure adrenaline free-fall jumps from certified international platforms',
        heroImage: img('bungee-jumping'),
        emptyMessage: 'No bungee jumping packages yet',
        accent: 'green',
        group: 'land-physical',
      },
      {
        value: 'Cycling Expeditions & Tours',
        label: 'Cycling Expeditions & Tours',
        slug: 'cycling',
        href: '/packages/cycling',
        heroTitle: 'Cycling Expeditions & Tours',
        heroSubtitle: 'Pedal through scenic countrysides, mountain passes, and cultural trails',
        heroImage: img('cycling'),
        emptyMessage: 'No cycling packages yet',
        accent: 'green',
        group: 'land-physical',
        legacyValues: ['Cycling', 'Bicycle Tours'],
      },
      {
        value: 'Treks & High-Altitude Trails',
        label: 'Treks & High-Altitude Trails',
        slug: 'treks',
        href: '/packages/treks',
        heroTitle: 'Treks & High-Altitude Trails',
        heroSubtitle: 'Guided summit treks, valley trails, and wilderness camping journeys',
        heroImage: img('treks'),
        emptyMessage: 'No trekking packages yet',
        accent: 'amber',
        group: 'land-physical',
        legacyValues: ['Trekking', 'Hiking'],
      },
    ],
  },
  {
    label: 'Sky',
    slug: 'sky',
    items: [
      {
        value: 'Helicopter Rides & Heli-Tours',
        label: 'Helicopter Rides & Heli-Tours',
        slug: 'helicopter-rides',
        href: '/packages/helicopter-rides',
        heroTitle: 'Helicopter Rides & Heli-Tours',
        heroSubtitle: 'Aerial city tours, Himalayan heli-sightseeing, and VIP transfers',
        heroImage: img('helicopter-rides'),
        emptyMessage: 'No helicopter packages yet',
        accent: 'violet',
        group: 'sky',
        isFuture: true,
      },
      {
        value: 'Small Aircraft & Scenic Flights',
        label: 'Small Aircraft & Scenic Flights',
        slug: 'small-aircraft',
        href: '/packages/small-aircraft',
        heroTitle: 'Scenic Aviation & Air Experiences',
        heroSubtitle: 'Private charter flyovers, mountain flights, and intro flight lessons',
        heroImage: img('small-aircraft'),
        emptyMessage: 'No scenic flight packages yet',
        accent: 'violet',
        group: 'sky',
        isFuture: true,
      },
      {
        value: 'Paragliding & Skydiving',
        label: 'Paragliding & Skydiving',
        slug: 'paragliding',
        href: '/packages/paragliding',
        heroTitle: 'Paragliding & Sky Adventures',
        heroSubtitle: 'Tandem paragliding thermals, coastal soaring, and tandem skydives',
        heroImage: img('paragliding'),
        emptyMessage: 'No paragliding packages yet',
        accent: 'violet',
        group: 'sky',
        isFuture: true,
      },
    ],
  },
  {
    label: 'Upcoming Tours',
    slug: 'upcoming-tours',
    items: [
      {
        value: 'Upcoming Tours & Departures',
        label: 'Upcoming Tours & Departures',
        slug: 'upcoming-tours',
        href: '/packages/upcoming-tours',
        heroTitle: 'Upcoming Expeditions & Fixed Departures',
        heroSubtitle: 'Reserve your spot on upcoming group tours, festival rides, and signature itineraries',
        heroImage: img('upcoming-tours'),
        emptyMessage: 'No upcoming departures announced yet',
        accent: 'amber',
        group: 'upcoming-tours',
        legacyValues: ['Fixed Departures', 'Upcoming Batches'],
      },
    ],
  },
];

export const PACKAGE_NAV_GROUPS: PackageNavGroup[] = [
  {
    label: 'Varanasi',
    slug: 'varanasi',
    items: [],
  },
  {
    label: 'Nepal',
    slug: 'nepal',
    items: [],
  },
];
export const PACKAGE_EXPERIENCE_CATEGORIES: PackageExperienceCategory[] =
  LEGACY_PACKAGE_NAV_GROUPS.flatMap((group) => group.items);

export const PACKAGE_EXPERIENCE_CATEGORY_VALUES = PACKAGE_EXPERIENCE_CATEGORIES.map(
  (category) => category.value
);

export const BUILTIN_GROUP_PAGE_SLUGS = new Set([
  'water',
  'land-motor',
  'land-physical',
  'sky',
  'upcoming-tours',
]);

export function getGroupPageHref(groupSlug: string): string {
  return BUILTIN_GROUP_PAGE_SLUGS.has(groupSlug)
    ? `/packages/${groupSlug}`
    : `/packages/group/${groupSlug}`;
}

export function getNavGroupLabel(groupSlug: string) {
  return PACKAGE_NAV_GROUPS.find((group) => group.slug === groupSlug)?.label ?? 'Experiences';
}

export function getCategoryBySlug(slug: string) {
  return PACKAGE_EXPERIENCE_CATEGORIES.find((category) => category.slug === slug);
}

export function getCategoryByValue(value: string | undefined) {
  if (!value) return undefined;
  return PACKAGE_EXPERIENCE_CATEGORIES.find(
    (category) =>
      category.value.toLowerCase() === value.toLowerCase() ||
      category.legacyValues?.some((legacy) => legacy.toLowerCase() === value.toLowerCase())
  );
}

export function getCategoryHeroImage(categoryValue: string | undefined) {
  return getCategoryByValue(categoryValue)?.heroImage ?? CATEGORY_IMAGES['yachts-sailing-cruises'];
}

export function getCategoryImageForSlug(slug: string) {
  return CATEGORY_IMAGES[slug as keyof typeof CATEGORY_IMAGES] ?? CATEGORY_IMAGES['yachts-sailing-cruises'];
}

export function buildPackageImageForCategory(categoryValue: string, title?: string) {
  const category = getCategoryByValue(categoryValue);
  const url = category?.heroImage ?? CATEGORY_IMAGES['yachts-sailing-cruises'];
  return {
    public_id: `pkg-${category?.slug ?? 'experience'}`,
    url,
    alt: title || category?.label || `${SITE_NAME} package`,
  };
}

export function packageMatchesExperienceCategory(
  packageCategory: string | undefined,
  category: PackageExperienceCategory
) {
  if (!packageCategory) return false;
  const values = getCategoryMatchValues(category);
  return values.some((value) => value.toLowerCase() === packageCategory.toLowerCase());
}

export function getCategoryMatchValues(category: PackageExperienceCategory): string[] {
  return [category.value, ...(category.legacyValues || [])];
}

/** MongoDB filter for packages in a category slug */
export function buildCategoryFilter(categorySlug: string) {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;

  const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const values = getCategoryMatchValues(category);

  return {
    $or: values.map((value) => ({
      packageCategory: { $regex: new RegExp(`^${escapeRegex(value)}$`, 'i') },
    })),
  };
}

/** MongoDB filter for all packages in a nav group (water, land-motor, etc.) */
export function buildGroupFilter(groupSlug: string) {
  const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const group = PACKAGE_NAV_GROUPS.find((g) => g.slug === groupSlug);
  const clauses: any[] = [];

  if (group) {
    for (const category of group.items) {
      for (const value of getCategoryMatchValues(category)) {
        clauses.push({ packageCategory: { $regex: new RegExp(`^${escapeRegex(value)}$`, 'i') } });
      }
    }
  }

  // Also include direct slug & label match
  clauses.push({ packageCategory: { $regex: new RegExp(`^${escapeRegex(groupSlug)}$`, 'i') } });
  clauses.push({ place: { $regex: new RegExp(`^${escapeRegex(groupSlug)}$`, 'i') } });
  clauses.push({ location: { $regex: new RegExp(`^${escapeRegex(groupSlug)}$`, 'i') } });

  return { $or: clauses };
}

export function getNavGroupForCategory(categoryValue: string | undefined) {
  const category = getCategoryByValue(categoryValue);
  if (category) {
    return PACKAGE_NAV_GROUPS.find((group) => group.slug === category.group) ?? PACKAGE_NAV_GROUPS[0];
  }
  return (
    PACKAGE_NAV_GROUPS.find((group) =>
      group.items.some((item) => item.value.toLowerCase() === categoryValue?.toLowerCase())
    ) ?? PACKAGE_NAV_GROUPS[0]
  );
}

export function packageMatchesNavGroup(
  packageCategory: string | undefined,
  groupSlug: string,
  pkg?: { place?: string; location?: string }
) {
  if (!groupSlug) return true;
  const cleanGroup = groupSlug.toLowerCase().trim();
  const cleanCat = (packageCategory || '').toLowerCase().trim();
  const cleanPlace = (pkg?.place || '').toLowerCase().trim();
  const cleanLocation = (pkg?.location || '').toLowerCase().trim();

  if (cleanCat === cleanGroup || cleanPlace === cleanGroup || cleanLocation === cleanGroup) return true;
  if (cleanGroup === 'nepal' && (cleanCat.includes('nepal') || cleanPlace.includes('nepal') || cleanLocation.includes('nepal'))) return true;
  if (cleanGroup === 'varanasi' && (cleanCat.includes('varanasi') || cleanPlace.includes('varanasi') || cleanLocation.includes('varanasi') || cleanCat.includes('kashi'))) return true;

  const group = PACKAGE_NAV_GROUPS.find((g) => g.slug === groupSlug);
  if (!group || !packageCategory) return false;
  return group.items.some((cat) => packageMatchesExperienceCategory(packageCategory, cat));
}

export const accentStyles = {
  amber: {
    gradient: 'from-amber-900/70 via-amber-800/60 to-amber-900/70',
    badge: 'from-amber-500 to-amber-600',
    button: 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700',
    outline: 'border-amber-500 text-amber-600 hover:bg-amber-50',
    ring: 'hover:border-amber-500/20',
    icon: 'text-amber-400',
    iconBg: 'bg-amber-500/20',
    cta: 'from-amber-600 via-amber-500 to-amber-600',
    ctaHover: 'hover:text-amber-600',
    muted: 'text-amber-600',
    spinner: 'border-amber-600',
    emptyBg: 'bg-amber-50',
    emptyIcon: 'text-amber-400',
    focusRing: 'focus:ring-amber-500/30',
  },
  orange: {
    gradient: 'from-orange-900/70 via-orange-800/60 to-orange-900/70',
    badge: 'from-orange-500 to-orange-600',
    button: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    outline: 'border-orange-500 text-orange-600 hover:bg-orange-50',
    ring: 'hover:border-orange-500/20',
    icon: 'text-orange-400',
    iconBg: 'bg-orange-500/20',
    cta: 'from-orange-600 via-orange-500 to-orange-600',
    ctaHover: 'hover:text-orange-600',
    muted: 'text-orange-600',
    spinner: 'border-orange-600',
    emptyBg: 'bg-orange-50',
    emptyIcon: 'text-orange-400',
    focusRing: 'focus:ring-orange-500/30',
  },
  blue: {
    gradient: 'from-blue-900/70 via-blue-800/60 to-blue-900/70',
    badge: 'from-blue-500 to-blue-600',
    button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    outline: 'border-blue-500 text-blue-600 hover:bg-blue-50',
    ring: 'hover:border-blue-500/20',
    icon: 'text-blue-400',
    iconBg: 'bg-blue-500/20',
    cta: 'from-blue-600 via-blue-500 to-blue-600',
    ctaHover: 'hover:text-blue-600',
    muted: 'text-blue-600',
    spinner: 'border-blue-600',
    emptyBg: 'bg-blue-50',
    emptyIcon: 'text-blue-400',
    focusRing: 'focus:ring-blue-500/30',
  },
  green: {
    gradient: 'from-green-900/70 via-green-800/60 to-green-900/70',
    badge: 'from-green-500 to-green-600',
    button: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    outline: 'border-green-500 text-green-600 hover:bg-green-50',
    ring: 'hover:border-green-500/20',
    icon: 'text-green-400',
    iconBg: 'bg-green-500/20',
    cta: 'from-green-600 via-green-500 to-green-600',
    ctaHover: 'hover:text-green-600',
    muted: 'text-green-600',
    spinner: 'border-green-600',
    emptyBg: 'bg-green-50',
    emptyIcon: 'text-green-400',
    focusRing: 'focus:ring-green-500/30',
  },
  teal: {
    gradient: 'from-teal-900/55 via-cyan-900/40 to-teal-900/55',
    badge: 'from-teal-500 to-cyan-600',
    button: 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700',
    outline: 'border-teal-500 text-teal-600 hover:bg-teal-50',
    ring: 'hover:border-teal-500/25',
    icon: 'text-teal-300',
    iconBg: 'bg-teal-500/20',
    cta: 'from-teal-600 via-cyan-500 to-teal-600',
    ctaHover: 'hover:text-teal-600',
    muted: 'text-teal-600',
    spinner: 'border-teal-600',
    emptyBg: 'bg-teal-50',
    emptyIcon: 'text-teal-400',
    focusRing: 'focus:ring-teal-500/30',
  },
  cyan: {
    gradient: 'from-cyan-900/75 via-sky-900/60 to-cyan-900/75',
    badge: 'from-cyan-500 to-sky-600',
    button: 'bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700',
    outline: 'border-cyan-500 text-cyan-600 hover:bg-cyan-50',
    ring: 'hover:border-cyan-500/25',
    icon: 'text-cyan-300',
    iconBg: 'bg-cyan-500/20',
    cta: 'from-cyan-600 via-sky-500 to-cyan-600',
    ctaHover: 'hover:text-cyan-600',
    muted: 'text-cyan-600',
    spinner: 'border-cyan-600',
    emptyBg: 'bg-cyan-50',
    emptyIcon: 'text-cyan-400',
    focusRing: 'focus:ring-cyan-500/30',
  },
  violet: {
    gradient: 'from-violet-900/75 via-indigo-900/60 to-violet-900/75',
    badge: 'from-violet-500 to-indigo-600',
    button: 'bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700',
    outline: 'border-violet-500 text-violet-600 hover:bg-violet-50',
    ring: 'hover:border-violet-500/25',
    icon: 'text-violet-300',
    iconBg: 'bg-violet-500/20',
    cta: 'from-violet-600 via-indigo-500 to-violet-600',
    ctaHover: 'hover:text-violet-600',
    muted: 'text-violet-600',
    spinner: 'border-violet-600',
    emptyBg: 'bg-violet-50',
    emptyIcon: 'text-violet-400',
    focusRing: 'focus:ring-violet-500/30',
  },
} as const;
