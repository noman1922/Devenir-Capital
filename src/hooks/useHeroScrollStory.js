import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

function createProgressTween(state, value, vars = {}) {
  return gsap.to(state, {
    progress: value,
    onUpdate: () => {
      document.documentElement.style.setProperty("--hero-progress", state.progress.toFixed(4));
    },
    ...vars,
  });
}

function createHeroIntroTimeline() {
  return gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .from(".navbar", { autoAlpha: 0, y: -14, duration: 0.8 })
    .from(".assembly-scene-layer", { autoAlpha: 0, scale: 0.985, duration: 1.2 }, "-=0.32");
}

function createHeroAssemblyTimeline(state) {
  return gsap
    .timeline({ defaults: { ease: "expo.out" } })
    .add(createProgressTween(state, 0.58, { duration: 3.6, ease: "power2.inOut" }), 0)
    .to(".connection-line", { scaleX: 1, autoAlpha: 1, stagger: 0.16, duration: 1.4 }, 1.15)
    .to(".light-pulse", { autoAlpha: 1, scale: 1, stagger: 0.3, duration: 0.52 }, 1.95)
    .to(".light-pulse", { autoAlpha: 0, scale: 1.75, stagger: 0.3, duration: 0.62 }, 2.28)
    .to(".assembly-ripple", { autoAlpha: 0.48, scale: 1, duration: 0.72 }, 2.28)
    .to(".assembly-ripple", { autoAlpha: 0, scale: 1.42, duration: 1.05 }, 2.88);
}

function createHeroRevealTimeline(state) {
  return gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .add(createProgressTween(state, 1, { duration: 1.7, ease: "power2.inOut" }), 0)
    .to(".connection-line", { autoAlpha: 0, duration: 0.6 }, 0.1);
}

function createHeroContentTimeline() {
  return gsap
    .timeline({ defaults: { ease: "power4.out" } })
    .to(".assembly-scene-layer", { autoAlpha: 0, scale: 0.86, duration: 0.95, ease: "power3.inOut" })
    .fromTo(".hero-tag", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.68 }, "+=0.05")
    .fromTo(
      ".hero-title-line",
      { autoAlpha: 0, y: 54, filter: "blur(10px)" },
      { autoAlpha: 1, y: 0, filter: "blur(0px)", stagger: 0.08, duration: 0.88 },
      "-=0.28",
    )
    .fromTo(".hero-copy", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.66 }, "-=0.34")
    .fromTo(".hero-buttons", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.66 }, "+=0.04");
}

function createHeroTransitionTimeline({ desktop, tablet, state }) {
  const hubScale = desktop ? 0.72 : tablet ? 0.76 : 0.82;
  const hubY = desktop ? -18 : tablet ? -12 : -8;

  return gsap
    .timeline({ defaults: { ease: "none" } })
    .add(createProgressTween(state, 1, { duration: 1, ease: "none" }), 0)
    .to(".assembly-scene-layer", { scale: hubScale, yPercent: hubY, duration: 1 }, 0)
    .to(".brand-reveal", { autoAlpha: 0, y: -18, duration: 0.45 }, 0)
    .to(".hero-content", { autoAlpha: desktop ? 0.36 : 0.18, y: desktop ? -32 : -16, duration: 0.8 }, 0.12)
    .to(".scroll-indicator", { autoAlpha: 0, y: 18, duration: 0.32 }, 0.04);
}

export function useHeroScrollStory(heroRef) {
  useLayoutEffect(() => {
    const root = heroRef.current;
    if (!root) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.documentElement.style.setProperty("--hero-progress", "0.9");
      return undefined;
    }

    CustomEase.create("devenirMachine", "M0,0 C0.14,0 0.16,1 1,1");

    const ctx = gsap.context(() => {
      const progressState = { progress: 0 };
      document.documentElement.style.setProperty("--hero-progress", "0");

      gsap.set(
        [
          ".hero-tag",
          ".hero-title-line",
          ".hero-copy",
          ".hero-buttons",
          ".brand-letter",
          ".brand-reveal",
          ".scroll-indicator",
        ],
        { autoAlpha: 0 },
      );
      gsap.set(".connection-line", { autoAlpha: 0, scaleX: 0, transformOrigin: "left center" });
      gsap.set(".light-pulse", { autoAlpha: 0, scale: 0.35 });
      gsap.set(".assembly-ripple", { autoAlpha: 0, scale: 0.72 });

      const HeroIntroTimeline = createHeroIntroTimeline();
      HeroIntroTimeline.play();

      gsap.matchMedia().add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const { desktop, tablet } = context.conditions;
          const HeroAssemblyTimeline = createHeroAssemblyTimeline(progressState);
          const HeroRevealTimeline = createHeroRevealTimeline(progressState);
          const HeroContentTimeline = createHeroContentTimeline();
          const HeroTransitionTimeline = createHeroTransitionTimeline({ desktop, tablet, state: progressState });

          const scrollStory = gsap.timeline({
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: desktop ? "+=360%" : "+=300%",
              pin: true,
              scrub: 1.1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          scrollStory
            .add(HeroAssemblyTimeline, 0)
            .addLabel("assembled")
            .to(".assembly-scene-layer", { scale: 1.035, duration: 0.8, ease: "sine.inOut" })
            .add(HeroRevealTimeline, "+=0.18")
            .to(".assembly-scene-layer", { scale: 1.035, duration: 1, ease: "none" })
            .add(HeroContentTimeline, "+=0.08")
            .add(HeroTransitionTimeline, "+=0.8");
        },
      );
    }, root);

    return () => ctx.revert();
  }, [heroRef]);
}
