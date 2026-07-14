"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#apropos", label: "À Propos" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <nav id="navbar" className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo">
        AppWeb<span className="dot">+</span>
      </div>
      <div
        className={`menu-toggle${open ? " open" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`nav-center${open ? " open" : ""}`}>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <a href="#contact" className="btn-nav">
          Démarrer un projet
        </a>
      </div>
    </nav>
  );
}
