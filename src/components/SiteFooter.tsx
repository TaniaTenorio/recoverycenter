import Link from "next/link";
import { companyProfile } from "@/data/companyProfile";

export default function SiteFooter() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          {companyProfile.name} &copy; {new Date().getFullYear()}. Todos los derechos reservados.
        </p>
        <div className="footer-links">
          <a href={companyProfile.phoneHref}>{companyProfile.phoneDisplay}</a>
          <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
          <Link href="/contacto">Contacto</Link>
        </div>
      </div>
    </footer>
  );
}
