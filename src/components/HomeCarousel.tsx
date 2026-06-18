"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/portal/slide-medica.jpg",
    eyebrow: "Informação confiável",
    title: "Entenda melhor a fibromialgia e seus caminhos de cuidado",
    description:
      "Conteúdos claros e revisados para apoiar decisões e conversas com profissionais de saúde.",
    href: "/biblioteca",
    action: "Acessar a biblioteca",
    alt: "Profissional de saúde sorrindo",
    position: "center 22%",
  },
  {
    image: "/images/portal/slide-bem-estar.jpg",
    eyebrow: "Cuidado no dia a dia",
    title: "Pequenos registros ajudam a compreender sua rotina",
    description:
      "Acompanhe dor, sono, fadiga e bem-estar para reconhecer padrões e preparar suas consultas.",
    href: "/diario",
    action: "Usar o diário de sintomas",
    alt: "Pessoa praticando uma atividade de bem-estar",
    position: "center 45%",
  },
  {
    image: "/images/portal/slide-comunidade.jpg",
    eyebrow: "Comunidade e acolhimento",
    title: "Trocar experiências também fortalece o cuidado",
    description:
      "Participe de espaços moderados para conversar, aprender e construir uma rede de apoio.",
    href: "/comunidade",
    action: "Conhecer a comunidade",
    alt: "Pessoas reunidas em torno de uma mesa",
    position: "center 42%",
  },
  {
    image: "/images/portal/slide-dialogo.jpg",
    eyebrow: "Orientação prática",
    title: "Prepare informações importantes antes da consulta",
    description:
      "Organize dúvidas, sintomas e mudanças na rotina para aproveitar melhor o atendimento.",
    href: "/biblioteca",
    action: "Ver orientações",
    alt: "Estetoscópio ao lado de um computador",
    position: "center 50%",
  },
  {
    image: "/images/portal/slide-atendimento.jpg",
    eyebrow: "Serviços e direitos",
    title: "Encontre caminhos de apoio disponíveis na sua região",
    description:
      "Consulte serviços públicos, associações e iniciativas voltadas a pessoas com dor crônica.",
    href: "/mapa",
    action: "Consultar o mapa",
    alt: "Ambiente preparado para atendimento em saúde",
    position: "center 50%",
  },
];

export function HomeCarousel() {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      aria-roledescription="carrossel"
      aria-label="Destaques do portal"
      className="relative overflow-hidden bg-[#241631]"
    >
      <div className="relative min-h-[440px] sm:min-h-[470px] lg:min-h-[500px]">
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: slide.position }}
          className="hero-image object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10283d]/95 via-[#18324a]/72 to-[#18324a]/10" />

        <div className="relative mx-auto flex min-h-[380px] max-w-7xl items-center px-5 py-12 sm:min-h-[410px] sm:px-8 lg:min-h-[440px] lg:px-10">
          <div key={slide.title} className="hero-copy max-w-2xl text-white">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-sky-200">
              {slide.eyebrow}
            </p>
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight !text-white sm:text-4xl">
              {slide.title}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
              {slide.description}
            </p>
            <Link
              href={slide.href}
              className="mt-8 inline-flex rounded-md bg-white px-6 py-3.5 font-bold text-primary shadow-lg transition hover:bg-surface-2"
            >
              {slide.action}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-[#1e102c]/40 px-2.5 py-1.5 backdrop-blur-sm">
        {slides.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Ir para destaque ${index + 1}`}
            aria-current={index === current ? "true" : undefined}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              index === current ? "bg-white" : "bg-white/20 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
