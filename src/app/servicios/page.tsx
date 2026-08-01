import type { Metadata } from "next";
import Link from "next/link";
import { servicePages } from "@/data/services";

export const metadata: Metadata = {
  title: "Servicios | Recovery Center",
  description:
    "Conoce nuestros servicios de recuperacion de datos para discos duros, SSD, servidores y RAID.",
};

export default function ServiciosPage() {
  return (
    <main className="section section-light">
      <div className="container">
        <h1 className="section-title">Servicios de Recuperacion</h1>
        <p className="service-intro">
          Selecciona un servicio para ver alcance, proceso y preguntas frecuentes.
        </p>

        <div className="service-page-grid">
          {servicePages.map((service) => (
            <article key={service.slug} className={`service-page-card tone-${service.tone}`}>
              <span className={`feature-icon tone-${service.tone}`} aria-hidden="true">
                <span className="material-symbols-outlined">{service.icon}</span>
              </span>
              <h2>{service.title}</h2>
              <p>{service.summary}</p>
              <Link href={`/servicios/${service.slug}`} className="btn btn-primary">
                Ver detalles
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
