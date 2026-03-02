import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu';

const brandColors = {
  primary: '#FFD700',
  secondary: '#800E13',
};

const campuses = [
  { name: 'Gombe Junior School', subtitle: 'Boarding', path: '/institutions/gjs-boarding' },
  { name: 'Gombe Junior School Kikajjo', subtitle: 'Day', path: '/institutions/gjs-kikajjo' },
];

const GJSHeader = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Programs', href: '#programs' },
    { label: 'Admissions', href: '#contact' },
  ];

  const brandLinkProps = {
    onClick: () => setIsMobileOpen(false),
  };

  return (
    <header className="sticky top-0 z-[130] shadow-lg" style={{ backgroundColor: brandColors.secondary }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative overflow-visible">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3" {...brandLinkProps}>
            <img src="/images/GombeBadge.png" alt="Gombe Junior School" className="h-12 w-auto" />
            <div className="leading-tight">
              <div className="text-lg font-bold text-white">
                Gombe Junior School
              </div>
              <div className="text-xs font-semibold" style={{ color: brandColors.primary }}>
                Ssosolye bwatafa
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-white hover:text-[#FFD700] transition-colors group"
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button className="flex items-center text-sm font-semibold text-white hover:text-[#FFD700] transition-colors">
                About <LuChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[140]"
                  >
                    <Link
                      to="/institutions/gjs-about"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors rounded-xl mx-2"
                      onClick={() => setAboutDropdownOpen(false)}
                    >
                      Our Story
                    </Link>
                    <Link
                      to="/institutions/gjs-about#management"
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors rounded-xl mx-2"
                      onClick={() => setAboutDropdownOpen(false)}
                    >
                      School Management
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center text-sm font-semibold text-white hover:text-[#FFD700] transition-colors">
                Campuses <LuChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[140]"
                  >
                    {campuses.map((campus, index) => (
                      <motion.div
                        key={campus.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          to={campus.path}
                          className="block px-5 py-3 text-sm hover:bg-[#FFF6CC] hover:text-[#800E13] transition-colors"
                        >
                          <div className="font-semibold text-gray-800">{campus.name}</div>
                          <div className="text-xs text-gray-500">{campus.subtitle}</div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/admissions"
              className="px-4 py-2 rounded-full text-sm font-bold text-[#800E13] bg-[#FFD700] hover:bg-[#f0c200] transition-colors shadow-md"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden p-2 rounded-md text-white hover:text-[#FFD700] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden border-t border-[#F3C93A]"  
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-3 py-3 rounded-xl text-sm font-semibold text-white hover:bg-[rgba(255,255,255,0.1)]"
                  >
                    {link.label}
                  </a>
                ))}

                <div className="border-t border-[#F3C93A] pt-2 mt-2">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-semibold text-white hover:bg-[rgba(255,255,255,0.1)]"
                  >
                    Campuses <LuChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-3 space-y-1"
                      >
                        {campuses.map((campus) => (
                          <Link
                            key={campus.path}
                            to={campus.path}
                            onClick={() => setIsMobileOpen(false)}
                            className="block px-3 py-2 rounded-lg text-sm text-white hover:bg-[rgba(255,255,255,0.1)]"
                          >
                            {campus.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/admissions"
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-center px-3 py-3 rounded-xl text-sm font-bold text-[#800E13] bg-[#FFD700] hover:bg-[#f0c200]"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default GJSHeader;
