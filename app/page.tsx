import { cabins, gallery, mapLink, mapPreviewImage, whatsappDisplay, whatsappNumber, type CabinConfig } from "@/lib/site-data";
import { buildCalendarCells, parseBusyRanges, type CalendarCell } from "@/lib/calendar";

const weekdayLabels = ["L", "M", "M", "J", "V", "S", "D"];
const monthFormatter = new Intl.DateTimeFormat("es-AR", {
  month: "long",
  year: "numeric",
  timeZone: "America/Argentina/Salta",
});

type CalendarSnapshot = {
  cabin: CabinConfig;
  cells: CalendarCell[];
  month: Date;
  synced: boolean;
};

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
      month,
      cells: buildCalendarCells(month, []),
      synced: false,
    };
  }

  const ics = await response.text();
  const busyRanges = parseBusyRanges(ics);
  return {
    cabin,
    month,
    cells: buildCalendarCells(month, busyRanges),
    synced: true,
  };
}

function CalendarCard({
  cabin,
  cells,
  month,
  synced,
}: {
  cabin: CabinConfig;
  cells: CalendarCell[];
  month: Date;
  synced: boolean;
}) {
  return (
    <article className="calendar-card">
      <div className="calendar-card-head">
        <div>
          <div className="calendar-title">{cabin.name}</div>
          <p>Disponibilidad sincronizada desde el calendario de Airbnb.</p>
        </div>
        <span className="calendar-chip">{synced ? "Airbnb iCal" : "Sin datos"}</span>
      </div>

      <div className="calendar-month-label">{monthFormatter.format(month)}</div>

      <div className="calendar-weekdays" aria-hidden="true">
        {weekdayLabels.map((label) => (
          <span key={`${cabin.name}-${label}`}>{label}</span>
        ))}
      </div>

      <div className="calendar-grid">
        {cells.map((cell, index) => (
          <div
            key={`${cabin.name}-${index}`}
            className={`calendar-day${cell ? ` calendar-day--${cell.state}` : " is-empty"}`}
            aria-hidden="true"
          >
            {cell?.day ? <span>{cell.day}</span> : null}
          </div>
        ))}
      </div>

      <div className="calendar-legend" aria-hidden="true">
        <span className="legend-item">
          <i className="legend-swatch legend-swatch--available" />
          Disponible
        </span>
        <span className="legend-item">
          <i className="legend-swatch legend-swatch--reserved" />
          Reservado
        </span>
        <span className="legend-item">
          <i className="legend-swatch legend-swatch--turnover" />
          Cambio
        </span>
      </div>

      <a href={cabin.icalUrl} target="_blank" rel="noreferrer" className="calendar-link">
        Abrir iCal
      </a>
    </article>
  );
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
      <div className="cabin-visual">
        <div className="cabin-rooms">
          {roomCards.map(({ label, slug, photo }) => (
            <figure key={`${cabin.name}-${label}`} className={`room-card room-card--${slug}`}>
              {photo ? (
                <div className="room-media-wrap">
                  <img className={`room-media room-media--${slug}`} src={photo} alt={`${cabin.name} - ${label}`} />
                  <span className="room-badge">{label}</span>
                </div>
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

      <div className="cabin-content">
        <div className="eyebrow">Alojamiento</div>
        <h2>{cabin.name}</h2>
        <p className="tagline">{cabin.tagline}</p>
        <p className="description">{cabin.description}</p>

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
  const month = new Date();
  const calendarSnapshots = await Promise.all(cabins.map((cabin) => loadCalendarSnapshot(cabin, month)));

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">Cabins Web</div>
          <h1>Dos cabañas para descansar, desconectar y disfrutar la naturaleza.</h1>
          <p>
            Un sitio simple, moderno y rústico para mostrar disponibilidad, ubicación,
            fotos, comodidades y contacto directo por WhatsApp.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
              Contactar por WhatsApp
            </a>
            <a className="button button-secondary" href="#calendarios">
              Ver calendarios
            </a>
          </div>

        </div>

        <div className="hero-panel hero-instagram">
          {cabins.map((cabin) => (
            <a
              key={`hero-${cabin.name}`}
              className="insta-card"
              href={cabin.airbnbUrl ?? cabin.icalUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir foto de ${cabin.name}`}
            >
              <img
                src={cabin.photos[0]}
                alt={`Foto de portada de ${cabin.name}`}
                className="insta-image"
              />
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div className="eyebrow">Nuestras cabañas</div>
          <h2>Confort cálido, estética simple y una presencia visual muy limpia.</h2>
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
          <p>
            Tenés una vista clara de cada calendario y, si querés sincronizarlo, podés
            abrir el enlace iCal de cada cabaña.
          </p>
        </div>

        <div className="calendar-showcase">
          {calendarSnapshots.map(({ cabin, cells, month, synced }) => (
            <CalendarCard key={`${cabin.name}-calendar`} cabin={cabin} cells={cells} month={month} synced={synced} />
          ))}
        </div>
      </section>

      <section className="section map-section">
        <div className="map-copy">
          <div className="eyebrow">Ubicación</div>
          <h2>Ubicación de las cabañas.</h2>
          <p>
            Tocá la vista previa para abrir la ubicación en Google Maps.
          </p>
          <div className="location-note">
            <span>Enlace directo:</span>
            <p>Vista previa clickeable</p>
          </div>
          <a className="button button-secondary" href={mapLink} target="_blank" rel="noreferrer">
            Abrir ubicación
          </a>
        </div>

        <a className="map-frame" href={mapLink} target="_blank" rel="noreferrer" aria-label="Abrir ubicación en Google Maps">
          {mapPreviewImage ? (
            <img src={mapPreviewImage} alt="" className="map-preview-image" aria-hidden="true" />
          ) : (
            <iframe
              className="map-embed"
              src={mapLink}
              title="Vista previa de Google Maps"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
          <div className="map-overlay">
            <span className="map-chip">Google Maps</span>
            <div className="pin" />
            <h3>Vista previa de la ubicación</h3>
            <p>Vista previa interactiva para llegar sin vueltas.</p>
          </div>
        </a>
      </section>

      <section className="section">
        <div className="section-heading">
          <div className="eyebrow">Fotos</div>
          <h2>Una galería que transmite naturaleza, madera y calma.</h2>
        </div>
        <div className="gallery-grid">
          {gallery.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`Galería de cabañas ${index + 1}`}
              className="gallery-image"
              loading="lazy"
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
  );
}
