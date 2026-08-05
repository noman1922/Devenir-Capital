import { useRef } from "react";
import Hero from "../components/Hero.jsx";
import CursorTrail from "../components/CursorTrail.jsx";
import MarketTicker from "../components/MarketTicker.jsx";
import Navbar from "../components/Navbar.jsx";
import { useHeroScrollStory } from "../hooks/useHeroScrollStory.js";
import { useLenisScroll } from "../hooks/useLenisScroll.js";
import { useMouseParallax } from "../hooks/useMouseParallax.js";

export default function HeroSection() {
  const heroRef = useRef(null);

  useLenisScroll();
  useMouseParallax(heroRef, 18);
  useHeroScrollStory(heroRef);

  return (
    <>
      <CursorTrail />
      <section className="hero" ref={heroRef}>
        <Navbar />
        <Hero />

        <div className="scroll-indicator" aria-hidden="true">
          <span>SCROLL</span>
          <div className="mouse">
            <div className="wheel" />
          </div>
        </div>
      </section>

      <MarketTicker />
    </>
  );
}
