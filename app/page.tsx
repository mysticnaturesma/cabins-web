import { cabins, gallery, mapLink, whatsappNumber, type CabinConfig } from "@/lib/site-data";

function CabinCard({ cabin }: { cabin: CabinConfig }) {
  return (
    <article className="cabin-card">
      <div className="cabin-visual">
        <div className="cabin-photos">
          {cabin.photos.map((photo, index) => (
            <img
              key={photo}
              src={photo}
              alt={`${cabin.name} foto ${index + 1}`}
              className={index === 0 ? "hero-photo" : "detail-photo"}
              loading="lazy"
            />
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

        <div className="card-links">
          {cabin.airbnbUrl ? (
            <a className="button button-primary" href={cabin.airbnbUrl} target="_blank" rel="noreferrer">
              Ver en Airbnb
            </a>
          ) : (
            <span className="button button-muted">Link de Airbnb pendiente</span>
          )}

          {cabin.syncUrl ? (
            <a className="button button-secondary" href={cabin.syncUrl} target="_blank" rel="noreferrer">
              {cabin.syncLabel}
            </a>
          ) : (
            <span className="button button-secondary">Sincronización de calendario</span>
          )}

          <a className="button button-secondary" href={cabin.icalUrl} target="_blank" rel="noreferrer">
            Link iCal
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Home() {
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

          <div className="hero-stats">
            <div className="stat">
              <strong>2</strong>
              <span>cabañas publicadas</span>
            </div>
            <div className="stat">
              <strong>100%</strong>
              <span>estilo natural</span>
            </div>
            <div className="stat">
              <strong>24/7</strong>
              <span>consulta por WhatsApp</span>
            </div>
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
              aria-label={`Abrir la publicación de ${cabin.name}`}
            >
              <div
                className="insta-backdrop"
                aria-hidden="true"
                style={{ backgroundImage: `url(${cabin.photos[0]})` }}
              />
              <img
                src={cabin.photos[0]}
                alt={`Foto de portada de ${cabin.name}`}
                className="insta-image"
              />
              <div className="insta-overlay">
                <div>
                  <h2>{cabin.name}</h2>
                  <p>{cabin.tagline}</p>
                </div>
              </div>
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
          <h2>Sincronización rápida para mantener todo al día.</h2>
          <p>
            Usá los enlaces iCal de cada cabaña para conectar Airbnb con tu gestor de
            disponibilidad o con otro canal de reservas.
          </p>
        </div>

        <div className="calendar-list">
          {cabins.map((cabin) => (
            <div key={`${cabin.name}-calendar`} className="calendar-item">
              <div>
                <h3>{cabin.name}</h3>
                <p>{cabin.syncUrl ? "Airbnb + iCal" : "iCal disponible"}</p>
              </div>
              <a href={cabin.icalUrl} target="_blank" rel="noreferrer" className="button button-primary">
                Abrir iCal
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section map-section">
        <div className="map-copy">
          <div className="eyebrow">Ubicación</div>
          <h2>Mapa listo para tu dirección exacta.</h2>
          <p>
            Acá dejé un bloque visual para el mapa. Cuando me pases la ubicación
            exacta, lo conectamos con Google Maps o con un iframe embebido.
          </p>
          <div className="location-note">
            <span>Dato pendiente:</span>
            <p>Dirección, coordenadas o enlace de Google Maps.</p>
          </div>
          <a className="button button-secondary" href={mapLink} target="_blank" rel="noreferrer">
            Abrir Google Maps
          </a>
        </div>

        <div className="map-frame" aria-label="Mapa de ubicación pendiente">
          <div className="map-overlay">
            <div className="pin" />
            <h3>Insertar mapa aquí</h3>
            <p>Podemos usar un iframe de Google Maps o una URL de ubicación exacta.</p>
          </div>
        </div>
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
            Reemplazá el número de ejemplo por el tuyo y el botón va a quedar listo
            para recibir mensajes directos.
          </p>
        </div>
        <a className="button button-primary" href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer">
          WhatsApp: {whatsappNumber}
        </a>
      </section>
    </main>
  );
}
