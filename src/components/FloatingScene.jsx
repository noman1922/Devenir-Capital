import { useEffect, useMemo, useRef } from "react";
import logoSource from "../assets/devenir-logo-piece-source.svg?raw";

const viewBox = "0 0 696 863.249973";
const logoPath =
  logoSource.match(/\sd="([\s\S]*?)"/)?.[1]?.replace(/\s+/g, " ").trim() || "";

const logoPieces = [
  {
    id: "top-left-loop",
    label: "Top-left loop",
    clipPath: "M 155 205 L 351 205 L 351 397 L 170 397 L 170 345 L 236 370 L 246 361 C 207 336 196 291 219 260 C 249 219 305 222 348 263 L 348 347 L 311 310 C 299 251 219 247 210 306 C 205 337 221 355 242 374 L 214 396 L 156 374 Z",
    startTransform: { x: -118, y: -98, z: -80, rx: 16, ry: -12, rz: -18, s: 0.82 },
    delay: 0.54,
  },
  {
    id: "top-right-loop",
    label: "Top-right loop",
    clipPath: "M 345 205 L 543 205 L 543 398 L 460 398 L 459 360 C 477 347 489 331 488 308 C 488 274 462 248 427 249 C 394 251 369 279 372 312 C 372 319 374 326 378 331 L 348 264 C 373 224 407 208 452 218 C 488 226 512 251 520 288 C 529 326 516 358 484 383 L 459 360 L 345 350 Z",
    startTransform: { x: 125, y: -102, z: -75, rx: -14, ry: 14, rz: 18, s: 0.82 },
    delay: 0.58,
  },
  {
    id: "bottom-left-loop",
    label: "Bottom-left loop",
    clipPath: "M 165 520 L 350 520 L 350 704 L 235 704 L 198 676 C 169 641 179 568 222 534 L 242 553 C 234 570 222 586 218 604 C 213 631 231 656 257 665 C 282 673 310 663 325 641 C 337 621 338 604 320 586 L 350 663 C 327 691 298 707 261 701 C 237 697 216 685 201 664 C 176 630 177 590 200 557 Z",
    startTransform: { x: -112, y: 116, z: -70, rx: -12, ry: -15, rz: 20, s: 0.82 },
    delay: 0.64,
  },
  {
    id: "bottom-right-loop",
    label: "Bottom-right loop",
    clipPath: "M 338 516 L 530 516 L 530 714 L 338 714 Z",
    startTransform: { x: 116, y: 118, z: -70, rx: 14, ry: 14, rz: -20, s: 0.82 },
    delay: 0.68,
  },
  {
    id: "left-frame",
    label: "Left frame triangle",
    clipPath: "M 58 292 L 229 458 L 58 625 Z",
    startTransform: { x: -190, y: 10, z: -60, rx: 8, ry: -18, rz: -12, s: 0.9 },
    delay: 0.34,
  },
  {
    id: "right-frame",
    label: "Right frame triangle",
    clipPath: "M 468 458 L 638 292 L 638 625 Z",
    startTransform: { x: 190, y: 8, z: -60, rx: -8, ry: 18, rz: 12, s: 0.9 },
    delay: 0.4,
  },
  {
    id: "upper-left-diagonal",
    label: "Upper-left diagonal bar",
    clipPath: "M 190 426 L 321 292 L 371 342 L 237 478 Z",
    startTransform: { x: -94, y: -32, z: -95, rx: 10, ry: -8, rz: -26, s: 0.88 },
    delay: 0.16,
  },
  {
    id: "lower-left-diagonal",
    label: "Lower-left diagonal bar",
    clipPath: "M 210 490 L 274 428 L 370 526 L 306 590 Z",
    startTransform: { x: -92, y: 74, z: -85, rx: -12, ry: -10, rz: 24, s: 0.88 },
    delay: 0.24,
  },
  {
    id: "upper-right-diagonal",
    label: "Upper-right diagonal bar",
    clipPath: "M 326 344 L 377 293 L 509 428 L 463 479 Z",
    startTransform: { x: 92, y: -34, z: -92, rx: 10, ry: 10, rz: 24, s: 0.88 },
    delay: 0.2,
  },
  {
    id: "lower-right-diagonal",
    label: "Lower-right diagonal bar",
    clipPath: "M 384 430 L 449 490 L 390 592 L 326 528 Z",
    startTransform: { x: 94, y: 76, z: -86, rx: -12, ry: 10, rz: -24, s: 0.88 },
    delay: 0.28,
  },
  {
    id: "center-diamond",
    label: "Center diamond",
    clipPath: "M 248 456 L 348 356 L 443 459 L 347 555 Z",
    startTransform: { x: 0, y: -8, z: -125, rx: 0, ry: 0, rz: 42, s: 0.68 },
    delay: 0.04,
  },
  {
    id: "center-lock",
    label: "Small center connector",
    clipPath: "M 313 552 L 383 552 L 383 682 L 313 682 Z",
    startTransform: { x: 0, y: 142, z: -105, rx: -16, ry: 0, rz: 0, s: 0.78 },
    delay: 0.76,
  },
];

function readHeroProgress() {
  if (typeof document === "undefined") return 0;
  const value = getComputedStyle(document.documentElement).getPropertyValue("--hero-progress");
  return Number.parseFloat(value) || 0;
}

function easeOutExpo(value) {
  return value === 1 ? 1 : 1 - 2 ** (-10 * value);
}

function pieceProgress(progress, delay) {
  return easeOutExpo(Math.min(Math.max((progress - delay) / 0.34, 0), 1));
}

function getPieceTransform(piece, progress, time) {
  const settled = pieceProgress(progress, piece.delay);
  const polish = Math.min(Math.max((progress - 0.62) / 0.26, 0), 1);
  const float = 1 - settled;
  const breath = Math.sin(time * 0.85 + piece.delay * 13) * 2.2 * (0.25 + polish * 0.75);
  const drift = Math.sin(time * 0.34 + piece.delay * 19) * 12 * float;
  const x = piece.startTransform.x * (1 - settled);
  const y = piece.startTransform.y * (1 - settled) + drift + breath;
  const z = piece.startTransform.z * (1 - settled);
  const rx = piece.startTransform.rx * (1 - settled);
  const ry = piece.startTransform.ry * (1 - settled);
  const rz = piece.startTransform.rz * (1 - settled);
  const scale = piece.startTransform.s + (1 - piece.startTransform.s) * settled;
  const logoZoom = 1 + polish * 0.12;

  return `
    translate3d(${x}px, ${y}px, ${z}px)
    rotateX(${rx}deg)
    rotateY(${ry}deg)
    rotateZ(${rz}deg)
    scale(${scale * logoZoom})
  `;
}

export default function FloatingScene() {
  const rootRef = useRef(null);
  const pieceRefs = useRef([]);

  const clipPieces = useMemo(() => logoPieces, []);

  useEffect(() => {
    let frameId;

    const tick = (time) => {
      const progress = readHeroProgress();
      const polished = progress > 0.68;

      pieceRefs.current.forEach((pieceNode, index) => {
        if (!pieceNode) return;
        const piece = clipPieces[index];
        const arrived = pieceProgress(progress, piece.delay) > 0.96;
        pieceNode.style.transform = getPieceTransform(piece, progress, time / 1000);
        pieceNode.dataset.arrived = arrived ? "true" : "false";
      });

      if (rootRef.current) {
        rootRef.current.dataset.polished = polished ? "true" : "false";
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [clipPieces]);

  return (
    <div className="floating-scene svg-logo-stage" ref={rootRef} aria-hidden="true">
      {clipPieces.map((piece, index) => (
        <svg
          className="svg-logo-piece"
          data-piece={piece.id}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
          ref={(node) => {
            pieceRefs.current[index] = node;
          }}
          key={piece.id}
        >
          <title>{piece.label}</title>
          <defs>
            <clipPath id={`clip-${piece.id}`} clipPathUnits="userSpaceOnUse">
              <path d={piece.clipPath} />
            </clipPath>
          </defs>
          <path
            className="svg-logo-face"
            d={logoPath}
            clipPath={`url(#clip-${piece.id})`}
            fillRule="nonzero"
          />
        </svg>
      ))}
    </div>
  );
}
