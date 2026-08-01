
const mapQuery = encodeURIComponent("Recovery Center Polanco CDMX");
const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;

export default function ContactLocationMap() {
  return (
    <div className="contact-map-card" aria-label="Ubicacion en Google Maps">
      <p className="contact-map-title">
        <span className="material-symbols-outlined" aria-hidden="true">
          location_on
        </span>
        Presidente Masaryk 61, Interior 901, Polanco V Sección, CDMX
      </p>
      <div className="contact-map-frame-wrap">
        <iframe
          title="Mapa de ubicacion de Recovery Center"
          src={mapEmbedSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map-frame"
        />
      </div>
    </div>
  );
}
