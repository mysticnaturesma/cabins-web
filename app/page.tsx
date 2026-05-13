export const dynamic = "force-dynamic";
export const revalidate = 0;

import { CalendarCard } from "@/components/calendar-card";
import { LightboxImage, PhotoLightboxProvider } from "@/components/photo-lightbox";
import { cabins, gallery, mapLink, mapPreviewImage, whatsappDisplay, whatsappNumber, type CabinConfig } from "@/lib/site-data";
import { buildCalendarCells, parseBusyRanges, type CalendarCell } from "@/lib/calendar";

const heroPhotos = [
  {
    src: "/hero/hero-2.jpeg",
    alt: "Exterior de la segunda cabaña",
  },
  {
    src: "/hero/hero-1.jpeg",
    alt: "Exterior de la primera cabaña",
  },
];

const calendarTimeZone = "America/Argentina/Salta";

type CalendarSnapshot = {
  cabin: CabinConfig;
  months: CalendarMonthSnapshot[];
};

type CalendarMonthSnapshot = {
  key: string;
  label: string;
  cells: CalendarCell[];
};

const monthFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  year: "numeric",
  timeZone: calendarTimeZone,
});

function getCalendarMonthParts(reference: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: calendarTimeZone,
  }).formatToParts(reference);

  const year = parts.find((part) => part.type === "year")?.value ?? "";
  const month = parts.find((part) => part.type === "month")?.value ?? "";

  return { year, month };
}

function getCurrentCalendarMonthAnchor(reference: Date = new Date()) {
  const { year, month } = getCalendarMonthParts(reference);
  return new Date(Number(year), Number(month) - 1, 1);
}

function getCurrentCalendarMonthKey(reference: Date = new Date()) {
  const { year, month } = getCalendarMonthParts(reference);
  return `${year}-${month}`;
}

function buildCalendarMonths(baseMonth: Date, busyRanges: ReturnType<typeof parseBusyRanges>): CalendarMonthSnapshot[] {
  return Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(baseMonth.getFullYear(), baseMonth.getMonth() + index, 1);
    return {
      key: `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`,
      label: monthFormatter.format(monthDate),
      cells: buildCalendarCells(monthDate, busyRanges),
    };
  });
}

async function loadCalendarSnapshot(cabin: CabinConfig, month: Date): Promise<CalendarSnapshot> {
  const response = await fetch(cabin.icalUrl, {
    cache: "no-store",
    headers: {
      accept: "text/calendar, text/plain;q=0.9, */*;q=0.8",
    },
  });

  if (!response.ok) {
    return {
      cabin,
      months: buildCalendarMonths(month, []),
    };
  }

  const ics = await response.text();
  const busyRanges = parseBusyRanges(ics);
  return {
    cabin,
    months: buildCalendarMonths(month, busyRanges),
  };
}

function CabinCard({ cabin }: { cabin: CabinConfig }) {
  const roomCards = [
    { label: "Living", slug: "living", photo: cabin.photos[0] },
    { label: "Cocina", slug: "cocina", photo: cabin.photos[1] },
    { label: "Habitación", slug: "habitacion", photo: cabin.photos[2] },
    { label: "Baño", slug: "banio", photo: cabin.photos[3] },
  ];

  return (
    <article className="cabin-card">
      <div className="cabin-content">
        <div className="eyebrow">Alojamiento</div>
        <h2>{cabin.name}</h2>
        <p className="tagline">{cabin.tagline}</p>
        <p className="description">{cabin.description}</p>
      </div>

      <div className="cabin-visual">
        <div className="cabin-rooms">
          {roomCards.map(({ label, slug, photo }) => (
            <figure key={`${cabin.name}-${label}`} className={`room-card room-card--${slug}`}>
              {photo ? (
                <LightboxImage
                  src={photo}
                  alt={`${cabin.name} - ${label}`}
                  className={`room-media-wrap room-media-wrap--clickable room-media-wrap--${slug}`}
                  imgClassName={`room-media room-media--${slug}`}
                  title={`Abrir ${label} de ${cabin.name}`}
                />
              ) : (
                <div className="room-placeholder">
                  <span>{label}</span>
                  <strong>Foto pendiente</strong>
                  <p>Subí una imagen interior para completar esta vista.</p>
                </div>
              )}
              <figcaption>{label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="cabin-amenities">
        <div className="amenities">
          {cabin.amenities.map((amenity) => (
            <span key={amenity} className="pill">
              {amenity}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default async function Home() {
  const month = getCurrentCalendarMonthAnchor();
  const currentMonthKey = getCurrentCalendarMonthKey(month);
  const calendarSnapshots = await Promise.all(cabins.map((cabin) => loadCalendarSnapshot(cabin, month)));

  return (
    <PhotoLightboxProvider>
      <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Cabins Web</div>
          <h1 className="hero-title">
            <span className="hero-title-main">MYSTIC NATURE</span>
            <span className="hero-title-sub">
              Cálidas cabañas de montaña rodeadas de naturaleza, ubicadas en las afueras de
              San Martín de los Andes, a solo 12min del centro, a 10min del Lago Lolog y 1
              hora caminando a la Laguna Rosales.
            </span>
          </h1>

          <div className="hero-actions">
            <a className="button button-primary" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
              Contactar por WhatsApp
            </a>
            <a
              className="button button-secondary"
              href="https://www.instagram.com/mystic.nature.project"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a className="button button-secondary" href="#calendarios">
              Ver calendarios
            </a>
          </div>

        </div>

        <div className="hero-panel hero-instagram">
          {heroPhotos.map((photo, index) => (
            <LightboxImage
              key={`hero-${index}`}
              src={photo.src}
              alt={photo.alt}
              className="insta-card"
              imgClassName="insta-image"
              title={`Abrir foto del hero ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div className="eyebrow">Nuestras cabañas</div>
        </div>
        <div className="cabins-grid">
          {cabins.map((cabin) => (
            <CabinCard key={cabin.name} cabin={cabin} />
          ))}
        </div>
      </section>

      <section id="calendarios" className="section split-section">
        <div className="section-heading">
          <div className="eyebrow">Calendarios</div>
          <h2>Dos almanaques para ver la disponibilidad de cada cabaña.</h2>
        </div>

        <div className="calendar-showcase">
          {calendarSnapshots.map(({ cabin, months }) => (
            <CalendarCard
              key={`${cabin.name}-calendar`}
              cabin={cabin}
              months={months}
              defaultMonthKey={currentMonthKey}
            />
          ))}
        </div>
      </section>

      <section className="section map-section">
        <div className="map-copy">
          <div className="eyebrow">Ubicación</div>
          <h2>Ubicación de las cabañas.</h2>
          <a className="button button-secondary" href={mapLink} target="_blank" rel="noreferrer">
            Abrir ubicación
          </a>
        </div>

        <LightboxImage
          src={mapPreviewImage ?? ""}
          alt="Vista previa de la ubicación de las cabañas"
          className="map-frame"
          imgClassName="map-preview-image"
          title="Abrir vista previa del mapa"
        />
      </section>

      <section className="section">
        <div className="section-heading">
          <div className="eyebrow">Fotos</div>
          <h2>Galería de fotos que transmite naturaleza, madera y calma.</h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <LightboxImage
              key={`${image}-${index}`}
              src={image}
              alt={`Galería de cabañas ${index + 1}`}
              className="gallery-image-wrap"
              imgClassName="gallery-image"
              title={`Abrir foto de la galería ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="contact-banner">
        <div>
          <div className="eyebrow">Contacto</div>
          <h2>Reservas y consultas por WhatsApp.</h2>
          <p>
            Escribime y coordinamos tu reserva directo por WhatsApp.
          </p>
        </div>
        <a className="button button-primary" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          WhatsApp: {whatsappDisplay}
        </a>
      </section>
      </main>
    </PhotoLightboxProvider>
  );
}
