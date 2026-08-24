import { Activity, Category } from '@/types/trip';

export interface PlaceMetadata {
  name: string;
  category: Category;
  location: string;
  lat: number;
  lng: number;
  indoor: boolean;
  estimatedCost: number;
  description: string;
  imageUrl: string;
  indoorKeywords: string[];
}

export const SEOUL_KNOWN_PLACES: PlaceMetadata[] = [
  {
    name: 'Namsan Seoul Tower & Park',
    category: 'nature',
    location: '105 Namsangongwon-gil, Yongsan-gu, Seoul',
    lat: 37.5512,
    lng: 126.9882,
    indoor: false,
    estimatedCost: 800,
    description: 'Iconic mountain park with panoramic views of the city skyline and walking paths.',
    imageUrl: 'https://images.unsplash.com/photo-1538669715315-155099bfa88c?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['park', 'outdoor', 'mountain', 'walk'],
  },
  {
    name: 'Han River Park & Picnic Grounds',
    category: 'nature',
    location: 'Yeouido Hangang Park, Yeongdeungpo-gu, Seoul',
    lat: 37.5284,
    lng: 126.9341,
    indoor: false,
    estimatedCost: 400,
    description: 'Riverside open park popular for picnics, cycling, and outdoor breezes.',
    imageUrl: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['river', 'outdoor', 'picnic', 'cycling'],
  },
  {
    name: 'National Museum of Korea',
    category: 'museum',
    location: '137 Seobinggo-ro, Yongsan-gu, Seoul',
    lat: 37.5239,
    lng: 126.9804,
    indoor: true,
    estimatedCost: 0,
    description: 'World-class indoor national museum housing precious Korean cultural artifacts, national treasures, and immersive digital exhibits.',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['museum', 'indoor', 'culture', 'history', 'artifacts'],
  },
  {
    name: 'COEX Mall & Starfield Library',
    category: 'shopping',
    location: '513 Yeongdong-daero, Gangnam-gu, Seoul',
    lat: 37.5113,
    lng: 127.0594,
    indoor: true,
    estimatedCost: 1200,
    description: 'Vibrant indoor cultural complex with the towering 13-meter high Starfield book walls, shopping, dining, and aquarium.',
    imageUrl: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['mall', 'indoor', 'library', 'shopping', 'cafes'],
  },
  {
    name: 'Gyeongbokgung Palace',
    category: 'history',
    location: '161 Sajik-ro, Jongno-gu, Seoul',
    lat: 37.5796,
    lng: 126.9770,
    indoor: false,
    estimatedCost: 300,
    description: 'The main royal palace of the Joseon dynasty with grand courtyards and changing of the guard ceremony.',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['palace', 'history', 'architecture'],
  },
  {
    name: 'Bukchon Hanok Village',
    category: 'culture',
    location: 'Gye-dong, Jongno-gu, Seoul',
    lat: 37.5826,
    lng: 126.9835,
    indoor: false,
    estimatedCost: 0,
    description: 'Traditional Korean residential village with preserved historic hanok architecture and scenic alleys.',
    imageUrl: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['village', 'culture', 'hanok', 'historic'],
  },
  {
    name: 'Hongdae Youth & Indie District',
    category: 'nightlife',
    location: 'Hongik University Area, Mapo-gu, Seoul',
    lat: 37.5563,
    lng: 126.9226,
    indoor: true,
    estimatedCost: 1500,
    description: 'Energetic urban arts and nightlife hub with street busking, trendy cafes, indie boutiques, and K-food.',
    imageUrl: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['nightlife', 'kpop', 'food', 'shopping', 'cafes'],
  },
  {
    name: 'Insadong Traditional Art Street & Tea Houses',
    category: 'culture',
    location: 'Insadong-gil, Jongno-gu, Seoul',
    lat: 37.5744,
    lng: 126.9859,
    indoor: true,
    estimatedCost: 800,
    description: 'Historic cultural quarter filled with artisan pottery shops, indoor art galleries, and wooden tea houses.',
    imageUrl: 'https://images.unsplash.com/photo-1535189043414-47a3c49a0bed?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['indoor', 'tea', 'galleries', 'crafts', 'culture'],
  },
  {
    name: 'Lotte World Tower & Seoul Sky',
    category: 'architecture',
    location: '300 Olympic-ro, Songpa-gu, Seoul',
    lat: 37.5126,
    lng: 127.1025,
    indoor: true,
    estimatedCost: 2200,
    description: 'The 6th tallest skyscraper in the world with fully enclosed observation decks, luxury mall, and indoor entertainment.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['tower', 'indoor', 'skyline', 'mall'],
  },
  {
    name: 'Dongdaemun Design Plaza (DDP)',
    category: 'architecture',
    location: '281 Eulji-ro, Jung-gu, Seoul',
    lat: 37.5668,
    lng: 127.0095,
    indoor: true,
    estimatedCost: 700,
    description: 'Futuristic neo-futuristic architectural masterpiece designed by Zaha Hadid with indoor design labs and fashion halls.',
    imageUrl: 'https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&auto=format&fit=crop&q=80',
    indoorKeywords: ['architecture', 'design', 'indoor', 'exhibitions'],
  }
];

export async function searchAlternativePlaces(
  query: string,
  category: Category,
  targetIndoor: boolean = true
): Promise<PlaceMetadata[]> {
  const filtered = SEOUL_KNOWN_PLACES.filter(p => {
    if (targetIndoor && !p.indoor) return false;
    return (
      p.category === category ||
      p.indoorKeywords.includes(category) ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  });

  return filtered.length > 0 ? filtered : SEOUL_KNOWN_PLACES.filter(p => p.indoor === targetIndoor);
}
