"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { companyProfile, mainNav } from "@/data/companyProfile";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <div className="brand-identity">
          <Link href="/" className="brand-logo-link" aria-label={companyProfile.name}>
            <Image
              src={companyProfile.logoSrc}
              alt={companyProfile.name}
              width={companyProfile.logoWidth}
              height={companyProfile.logoHeight}
              priority
              className="brand-logo"
            />
          </Link>
          <div className="brand-block">
            <Link href="/" className="brand-name">
              {companyProfile.name}
            </Link>
            <p className="brand-tagline">{companyProfile.tagline}</p>
          </div>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          aria-label="Abrir menu"
          onClick={() => setIsOpen((current) => !current)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {isOpen ? "close" : "menu"}
          </span>
        </button>

        <nav id="site-nav" aria-label="Navegacion principal" className={`site-nav ${isOpen ? "is-open" : ""}`}>
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="site-nav-link"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <button
        type="button"
        className={`site-nav-backdrop ${isOpen ? "is-open" : ""}`}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
      />
    </header>
  );
}
