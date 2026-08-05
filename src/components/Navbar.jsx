import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const navItems = ["Wealth Planning", "Our Funds", "Booking Centre", "Portfolio", "Insights", "About"];

export default function Navbar() {
  return (
    <header className="navbar" aria-label="Primary navigation">
      <a href="#" className="brand-logo" aria-label="Devenir Capital home">
        <img src={logo} alt="Devenir Capital" />
      </a>

      <nav className="nav-links" aria-label="Main menu">
        {navItems.map((item) => (
          <a href={`#${item.toLowerCase().replaceAll(" ", "-")}`} key={item}>
            {item}
          </a>
        ))}
      </nav>

      <motion.a
        href="#portal"
        className="portal-btn"
        whileHover={{ scale: 1.035 }}
        whileTap={{ scale: 0.98 }}
        aria-label="Client Portal Login"
      >
        Client Portal Login
      </motion.a>
    </header>
  );
}
