type CabinConfig = {
  name: string;
  tagline: string;
  description: string;
  airbnbUrl?: string;
  syncLabel: string;
  syncUrl?: string;
  icalUrl: string;
  photos: string[];
  amenities: string[];
};

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "54XXXXXXXXXX";
const mapLink = process.env.NEXT_PUBLIC_MAP_LINK ?? "https://www.google.com/maps";

const cabins: CabinConfig[] = [
  {
    name: "Tiny Home",
    tagline: "Minimalista, cálida y rodeada de naturaleza.",
    description:
      "Una cabaña compacta con diseño moderno y detalles rústicos, ideal para escapadas tranquilas, descanso y desconexión.",
    airbnbUrl:
      process.env.NEXT_PUBLIC_TINY_HOME_AIRBNB_URL ?? "https://airbnb.com.ar/h/mystic-nature-project",
    syncLabel: "Calendario Airbnb",
    syncUrl:
      process.env.NEXT_PUBLIC_TINY_HOME_SYNC_URL ?? "https://www.airbnb.com.ar/h/mystic-nature-cabin",
    icalUrl:
      process.env.NEXT_PUBLIC_TINY_HOME_ICAL_URL ??
      "https://www.airbnb.com.ar/calendar/ical/1200063343938579709.ics?t=e059f5e54bca4949abe8970f78789f35",
    photos: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["WiFi", "Cocina", "Aire acondicionado", "Parrilla", "Estacionamiento"],
  },
  {
    name: "Cabaña",
    tagline: "Más espacio, misma esencia natural.",
    description:
      "Un refugio pensado para grupos, parejas o familias que buscan comodidad, privacidad y una experiencia cálida entre árboles y aire puro.",
    airbnbUrl: process.env.NEXT_PUBLIC_CABANA_AIRBNB_URL,
    syncLabel: "Calendario iCal",
    syncUrl: process.env.NEXT_PUBLIC_CABANA_SYNC_URL,
    icalUrl:
      process.env.NEXT_PUBLIC_CABANA_ICAL_URL ??
      "https://www.airbnb.com.ar/calendar/ical/1582684558300082540.ics?t=d85b117dc81b41a09d5bbb512c790f2f",
    photos: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: ["WiFi", "Cocina equipada", "Ropa de cama", "Terraza", "Vista verde"],
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1516156008625-3a4d1f0b6f84?auto=format&fit=crop&w=1200&q=80",
];

export { cabins, gallery, mapLink, whatsappNumber };
export type { CabinConfig };
