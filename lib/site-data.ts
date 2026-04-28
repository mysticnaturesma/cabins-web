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

const whatsappNumberRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "+5491164045514";
const whatsappNumber = whatsappNumberRaw.replace(/\D/g, "");
const whatsappDisplay = whatsappNumberRaw;
const mapLink =
  process.env.NEXT_PUBLIC_MAP_LINK ?? "https://maps.app.goo.gl/DoJsPf2AHrmBy7Ly9";
const mapPreviewImage = process.env.NEXT_PUBLIC_MAP_PREVIEW_IMAGE;

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
      "/cabins/tiny-home/living.jpg",
      "/cabins/tiny-home/kitchen.jpg",
      "/cabins/tiny-home/bedroom.jpg",
      "/cabins/tiny-home/bathroom.jpg",
    ],
    amenities: [
      "🛏️ Habitación con cama doble.",
      "🍽️ Cocina/Comedor: Anafe doble, Pava, cafetera y tostadora eléctrica, heladera bajomesada y vajilla completa.",
      "🚽 Baño con ducha, bidetmatic, secador, jabon, shampoo y crema de enjuague.",
      "🧺 Servicio de sabanas/toallas.",
      "🧉 Galería con living exterior.",
      "🔥 Fogón con parrilla exterior.",
      "☘️ Amplio jardín silvestre.",
      "🚗 Estacionamiento privado.",
      "🌡️ Calefacción a gas.",
      "📡 Wifi Starlink.",
    ],
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
      "/cabins/cabana/living.jpg",
      "/cabins/cabana/kitchen.jpg",
      "/cabins/cabana/bedroom.jpg",
      "/cabins/cabana/bathroom.jpg",
    ],
    amenities: [
      "🛏️ Habitación con cama doble.",
      "🧑‍🍳Cocina: Anafe doble, Pava, tostadora y horno eléctrico, heladera bajomesada y vajilla completa.",
      "🍽️Living/comedor: Mesa para 4 y sillon cama.",
      "🚽 Baño con ducha, bidetmatic, secador, jabon, shampoo y crema de enjuague.",
      "🧺 Servicio de sabanas/toallas.",
      "🧉 Galería con living exterior.",
      "🔥 Parrilla exterior.",
      "☘️ Amplio jardín silvestre.",
      "🚗 Estacionamiento privado.",
      "🌡️ Calefacción a gas.",
      "📡 Wifi Starlink.",
    ],
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

export { cabins, gallery, mapLink, mapPreviewImage, whatsappDisplay, whatsappNumber };
export type { CabinConfig };
