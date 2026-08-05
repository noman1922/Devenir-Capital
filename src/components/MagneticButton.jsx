import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MagneticButton({ children, href = "#market-ticker", variant = "primary" }) {
  return (
    <motion.a
      href={href}
      className={`magnetic-btn ${variant === "primary" ? "primary-btn" : "secondary-btn"}`}
      aria-label={typeof children === "string" ? children : undefined}
      whileHover={{ scale: 1.04, x: 2, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
    >
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={17} strokeWidth={1.8} />
    </motion.a>
  );
}
