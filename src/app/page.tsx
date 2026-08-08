import type { Metadata } from "next";
import Link from "next/link";
import { clientBrands, features, processSteps, receptionInstructions } from "@/data/siteContent";
import ContactForm from "@/components/ContactForm";
import ContactLocationMap from "@/components/ContactLocationMap";
import ClientBrandsCarousel from "@/components/ClientBrandsCarousel";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import HomeServicesSlider from "@/components/HomeServicesSlider";
import { companyProfile } from "@/data/companyProfile";
import { servicePages } from "@/data/services";

const featureIcons = ["diagnosis", "science", "local_shipping", "verified_user"];
const heroTrustHighlights = [
  {
    value: "+16",
    label: "años de experiencia",
  },
  {
    value: "96%",
    label: "de efectividad",
  },
  {
    value: "+10,000",
    label: "clientes satisfechos",
  },
  {
    value: "+400",
    label: "RAIDs recuperados",
  },
];

export const metadata: Metadata = {
  title: "Recovery Center | Recuperacion de Datos",
  description:
    "Servicio profesional de recuperación de datos para discos duros, SSD, RAID y servidores.",
  openGraph: {
    title: "Recovery Center | Recuperación de Datos",
    description:
      "Diagnóstico y recuperación de información crítica con laboratorio especializado.",
    type: "website",
    locale: "es_MX",
  },
};

export default function Home() {
  return (
    <main>
      <section className="hero section">
        <div className="overlay" />
        <div className="container hero-content">
          <div className="hero-copy">
            <h1>Recuperación Profesional de Información Crítica</h1>
            <p className="lead">
              Somos un equipo de ingenieros especialistas con certificación otorgada por el Information Assurance Certification Review Board (IACRB)
            </p>
            <p className="lead">
              Expertos en recuperación de información, discos duros, SSD, RAID y servidores, dando soporte a equipos de todas las marcas y modelos, con procesos claros, trazables y enfocados en continuidad operativa
            </p>
            <p className="lead">Te ofrecemos un diagnóstico gratuito, profesional y confiable</p>
            <p className="lead">Sólo paga por el éxito de la recuperación</p>
            <p className="lead">Sin datos no hay cobro</p>
            <div className="cta-row">
              <a href="#contacto" className="btn btn-primary">
                Solicitar diagnóstico
              </a>
              <Link href="/servicios" className="btn btn-secondary">
                Ver servicios
              </Link>
            </div>
          </div>
          <div className="hero-trust-strip" aria-label="Puntos clave de confianza">
            {heroTrustHighlights.map((item) => (
              <article key={item.label} className="hero-trust-card">
                <p className="hero-trust-value">{item.value}</p>
                <p className="hero-trust-label">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="section section-navy">
        <div className="container">
          <h2 className="section-title">Servicios Principales</h2>
          <HomeServicesSlider services={servicePages} />
          <div className="section-actions">
            <Link href="/servicios" className="btn btn-secondary">
              Explorar todos los servicios
            </Link>
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Por qué elegirnos</h2>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <article key={feature.title} className="feature-card">
                <span className="feature-icon" aria-hidden="true">
                  <span className="material-symbols-outlined">
                    {featureIcons[index % featureIcons.length]}
                  </span>
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-band">
        <div className="overlay" />
        <div className="container">
          <h2 className="section-title inverse">Proceso de Recuperación</h2>
          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <article className="process-reception" aria-label="Indicaciones para envío del dispositivo">
            <h3>{receptionInstructions.title}</h3>
            <p>{receptionInstructions.subtitle}</p>
            <p>{receptionInstructions.intro}</p>
            <ul>
              {receptionInstructions.bullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="process-reception__warning">{receptionInstructions.warning}</p>
            <p>{receptionInstructions.footer}</p>
            
          </article>
        </div>
      </section>

      <ClientBrandsCarousel brands={clientBrands} />

      <section id="contacto" className="section section-contact">
        <div className="container contact-grid">
          <div>
            <h2 className="section-title">Contacto</h2>
            <p className="contact-text">
              Escríbenos y te responderemos con un diagnóstico inicial de tu
              caso.
            </p>
            <ul className="contact-list">
              <li>
                Telefono:{" "}
                <a href={companyProfile.phoneHref}>{companyProfile.phoneDisplay}</a>
              </li>
              <li>
                Email:{" "}
                <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
              </li>
              <li>
                Horario de atención: Lunes a Viernes, 9:00 a 18:00 hrs.
              </li>
            </ul>
            <ContactLocationMap />
          </div>
          <ContactForm />
        </div>
      </section>

      

      <GoogleReviewsSection />
    </main>
  );
}
