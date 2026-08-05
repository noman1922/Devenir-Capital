import { Suspense, lazy } from "react";
import MagneticButton from "./MagneticButton.jsx";

const FloatingScene = lazy(() => import("./FloatingScene.jsx"));

export default function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <span className="hero-tag">DEFINING TOMORROW. TOGETHER.</span>

        <h1>
          <span className="hero-title-line">Building Wealth</span>
          <span className="hero-title-line hero-title-accent">Through Intelligence</span>
        </h1>

        <p className="hero-copy">
          Intelligent investment solutions powered by experience, technology and disciplined wealth
          management.
        </p>

        <div className="hero-buttons">
          <MagneticButton>Schedule Strategy Call</MagneticButton>
          <MagneticButton variant="secondary">View Markets</MagneticButton>
        </div>
      </div>

      <div className="hero-visual" aria-label="Devenir Capital animated logo node">
        <div className="assembly-scene-layer">
          <Suspense fallback={null}>
            <FloatingScene />
          </Suspense>
        </div>

        <div className="logo-wrapper logo-cluster" aria-hidden="true">
          <div className="connection-map" aria-hidden="true">
            <span className="connection-line line-1" />
            <span className="connection-line line-2" />
            <span className="connection-line line-3" />
            <span className="connection-line line-4" />
            <span className="light-pulse pulse-1" />
            <span className="light-pulse pulse-2" />
            <span className="assembly-ripple" />
          </div>

          <div className="brand-reveal" aria-hidden="true">
            <span className="brand-line devenir-word">
              {"DEVENIR".split("").map((letter, index) => (
                <span className="brand-letter" key={`${letter}-${index}`}>{letter}</span>
              ))}
            </span>
            <span className="brand-line capital-word">
              {"CAPITAL".split("").map((letter, index) => (
                <span className="brand-letter" key={`${letter}-${index}`}>{letter}</span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
