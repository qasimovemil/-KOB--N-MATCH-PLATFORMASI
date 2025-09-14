
import { motion } from "framer-motion";


const socialLinks = [
  {
    href: "https://www.linkedin.com/",
    label: "LinkedIn",
    icon: (
      <svg width="22" height="22" fill="currentColor" className="text-blue-400" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.04 0 3.602 2.002 3.602 4.604v5.592z"/></svg>
    )
  },
  {
    href: "https://github.com/",
    label: "GitHub",
    icon: (
      <svg width="22" height="22" fill="currentColor" className="text-gray-300" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    )
  }
];

const Footer = () => {
  return (
    <motion.footer
      className="bg-primary text-white py-10 mt-8 shadow-inner"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-4 text-center flex flex-col items-center gap-4">
        <motion.div
          className="flex gap-4 mb-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        >
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="hover:scale-110 transition-transform duration-300"
            >
              {s.icon}
            </a>
          ))}
        </motion.div>
        <p className="text-sm opacity-80">&copy; {new Date().getFullYear()} Investor–KOS Platforması. Bütün hüquqlar qorunur.</p>
        <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
          <a href="/privacy-policy" className="text-xs text-gray-200 hover:text-white underline underline-offset-2 transition-colors duration-200">Privacy Policy</a>
          <span className="text-xs text-gray-400">|</span>
          <a href="/terms-of-service" className="text-xs text-gray-200 hover:text-white underline underline-offset-2 transition-colors duration-200">Terms of Service</a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
