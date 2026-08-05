import { useEffect, useRef } from "react";

export function useMouseParallax(targetRef, strength = 1) {
  const pointer = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return undefined;

    const onPointerMove = (event) => {
      const rect = target.getBoundingClientRect();
      pointer.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
      pointer.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
    };

    let frame;
    const tick = () => {
      current.current.x += (pointer.current.x - current.current.x) * 0.08;
      current.current.y += (pointer.current.y - current.current.y) * 0.08;
      target.style.setProperty("--parallax-x", current.current.x.toFixed(3));
      target.style.setProperty("--parallax-y", current.current.y.toFixed(3));
      frame = requestAnimationFrame(tick);
    };

    target.addEventListener("pointermove", onPointerMove);
    target.addEventListener("pointerleave", () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
    });
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      target.removeEventListener("pointermove", onPointerMove);
    };
  }, [strength, targetRef]);
}
