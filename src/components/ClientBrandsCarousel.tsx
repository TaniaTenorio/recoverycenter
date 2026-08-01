import Image from "next/image";
import type { ClientBrand } from "@/data/siteContent";

type ClientBrandsCarouselProps = {
  brands: ClientBrand[];
};

export default function ClientBrandsCarousel({ brands }: ClientBrandsCarouselProps) {
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="section section-clients" aria-labelledby="clientes-title">
      <div className="container">
        <h2 id="clientes-title" className="section-title">
          Marcas que han confiado en nosotros
        </h2>
        <p className="clients-intro">
          Trabajamos con empresas y organizaciones de diferentes industrias.
        </p>
        <div className="clients-carousel" aria-label="Carrusel de marcas de clientes">
          <div className="clients-track">
            {marqueeBrands.map((brand, index) => (
              <article key={`${brand.name}-${index}`} className="client-card">
                <Image
                  src={brand.logoSrc}
                  alt={brand.name}
                  width={200}
                  height={170}
                  className="client-card__logo"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
