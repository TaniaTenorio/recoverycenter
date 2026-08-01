import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicePages } from "@/data/services";

type Params = {
  slug: string;
};

export async function generateStaticParams(): Promise<Params[]> {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Servicio no encontrado | Recovery Center",
    };
  }

  return {
    title: `${service.title} | Recovery Center`,
    description: service.summary,
    openGraph: {
      title: `${service.title} | Recovery Center`,
      description: service.summary,
      type: "article",
      locale: "es_MX",
    },
  };
}

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="section section-light">
      <div className="container service-detail">
        <p className="eyebrow">Servicio especializado</p>
        <span className={`feature-icon tone-${service.tone}`} aria-hidden="true">
          <span className="material-symbols-outlined">{service.icon}</span>
        </span>
        <h1 className="section-title">{service.title}</h1>
        <p className="lead service-detail-lead">{service.intro}</p>

        <section className="detail-block">
          <h2>Alcance del servicio</h2>
          <ul>
            {service.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="detail-block">
          <h2>Preguntas frecuentes</h2>
          <div className="faq-grid">
            {service.faqs.map((faq) => (
              <article key={faq.question} className="faq-card">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="detail-cta-row">
          <Link href="/contacto" className="btn btn-primary">
            Solicitar diagnóstico
          </Link>
          <Link href="/servicios" className="btn btn-secondary">
            Ver todos los servicios
          </Link>
        </div>
      </div>
    </main>
  );
}
