export default function Home() {
  const services = [
    "Recuperacion de discos duros",
    "Recuperacion de SSD y NVMe",
    "Recuperacion de servidores",
    "Recuperacion de arreglos RAID",
  ];

  const features = [
    {
      title: "Diagnostico inicial",
      description: "Evaluacion tecnica y plan de recuperacion sin compromiso.",
    },
    {
      title: "Laboratorio especializado",
      description:
        "Procedimientos controlados para danos logicos, fisicos y electronicos.",
    },
    {
      title: "Atencion nacional",
      description:
        "Recoleccion y entrega para clientes en CDMX y toda la Republica.",
    },
    {
      title: "Confidencialidad",
      description:
        "Manejo estricto de la informacion y protocolos de seguridad de datos.",
    },
  ];

  const process = [
    "Contacto y levantamiento del caso",
    "Diagnostico tecnico en laboratorio",
    "Cotizacion y aprobacion del servicio",
    "Recuperacion y validacion de archivos",
    "Entrega segura de la informacion",
  ];

  return (
    <main>
      <section className="hero section">
        <div className="overlay" />
        <div className="container hero-content">
          <p className="eyebrow">Laboratorio de recuperacion de datos</p>
          <h1>Recuperacion Profesional de Informacion Critica</h1>
          <p className="lead">
            Migracion inicial de sitio WordPress a Next.js, conservando identidad
            visual, estructura comercial y enfoque tecnico.
          </p>
          <div className="cta-row">
            <a href="#contacto" className="btn btn-primary">
              Solicitar diagnostico
            </a>
            <a href="#servicios" className="btn btn-secondary">
              Ver servicios
            </a>
          </div>
        </div>
      </section>

      <section id="servicios" className="section section-navy">
        <div className="container">
          <h2 className="section-title">Servicios Principales</h2>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service} className="service-card">
                <h3>{service}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <h2 className="section-title">Por Que Elegirnos</h2>
          <div className="feature-grid">
            {features.map((feature) => (
              <article key={feature.title} className="feature-card">
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
          <h2 className="section-title inverse">Proceso de Recuperacion</h2>
          <ol className="process-list">
            {process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </section>

      <section id="contacto" className="section section-contact">
        <div className="container contact-grid">
          <div>
            <h2 className="section-title">Contacto</h2>
            <p className="contact-text">
              Esta pagina es una base de migracion. Conecta aqui tu formulario
              real (antes Contact Form 7) y tus integraciones de analitica.
            </p>
            <ul className="contact-list">
              <li>Telefono: +52 55 0000 0000</li>
              <li>Email: contacto@recoverycenter.com.mx</li>
              <li>Cobertura: CDMX y Republica Mexicana</li>
            </ul>
          </div>
          <form className="contact-form" aria-label="Formulario de contacto">
            <label>
              Nombre
              <input type="text" name="name" placeholder="Tu nombre" />
            </label>
            <label>
              Correo
              <input type="email" name="email" placeholder="tu@email.com" />
            </label>
            <label>
              Mensaje
              <textarea
                name="message"
                rows={5}
                placeholder="Cuentanos tu caso"
              />
            </label>
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>Recovery Center - Sitio migrado de WordPress a Next.js</p>
        </div>
      </footer>
      </main>
  );
}
