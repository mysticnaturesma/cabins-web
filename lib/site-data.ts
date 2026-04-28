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
      "/cabins/tiny-home/main.png",
      "/cabins/tiny-home/kitchen-1.png",
      "/cabins/tiny-home/kitchen-2.png",
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
      "/cabins/cabana/main.png",
      "/cabins/cabana/living-1.png",
      "/cabins/cabana/living-2.png",
    ],
    amenities: ["WiFi", "Cocina equipada", "Ropa de cama", "Terraza", "Vista verde"],
  },
];

const gallery = [
  "/cabins/tiny-home/main.png",
  "/cabins/tiny-home/kitchen-1.png",
  "/cabins/tiny-home/kitchen-2.png",
  "/cabins/cabana/main.png",
  "/cabins/cabana/living-1.png",
  "/cabins/cabana/living-2.png",
];

export { cabins, gallery, mapLink, whatsappNumber };
export type { CabinConfig };
