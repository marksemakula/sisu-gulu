import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronDown, LuMenu, LuX } from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

const brandColors = {
  primary: '#FFD700',
  secondary: '#800E13',
};

const campuses = [
  { name: 'Kawaala Campus', path: '/institutions/sakghs-kawaala' },
  { name: 'Bujuuko Campus', path: '/institutions/sakghs-bujuuko' },
];

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Programs', href: '#programs' },
  { label: 'Contact', href: '#contact' },
];

const menuItems = [
  { label: 'About Us', type: 'dropdown', items: [{ label: 'School Management Committee', href: '#management' }] },
  { label: 'Blog', href: '#blog', type: 'link' },
  { label: 'Events', type: 'dropdown', items: [{ label: 'Events Calendar', href: '#events-calendar' }, { label: 'Clubs & Communities', href: '#clubs' }] },
  { label: 'Gallery', href: '#gallery', type: 'link' },
];

const SAKHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [campusOpen, setCampusOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  const closeMenus = () => {
    setMobileOpen(false);
    setCampusOpen(false);
    setAboutOpen(false);
    setEventsOpen(false);
  };

  return (
    <header className="sticky top-0 z-[140] shadow-lg backdrop-blur" style={{ backgroundColor: `${brandColors.secondary}F2` }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenus}>
            <div className="h-14 w-14 flex items-center justify-center overflow-hidden">
              <img src="/images/Gombe High logo.png" alt="St. Andrew Kaggwa Gombe HS" className="h-full w-full object-contain grayscale" />
            </div>
            <div className="leading-tight">
              <div className="text-base lg:text-lg font-bold text-white">St. Andrew Kaggwa Gombe HS</div>
              <div className="text-xs font-semibold" style={{ color: brandColors.primary }}>Excellence & Character</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
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

            {menuItems.map((item, idx) => (
              item.type === 'dropdown' ? (
                <div
                  key={idx}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.label === 'About Us') setAboutOpen(true);
                    if (item.label === 'Events') setEventsOpen(true);
                  }}
                  onMouseLeave={() => {
                    if (item.label === 'About Us') setAboutOpen(false);
                    if (item.label === 'Events') setEventsOpen(false);
                  }}
                >
                  <button className="flex items-center text-sm font-semibold text-white hover:text-[#FFD700] transition-colors">
                    {item.label} <LuChevronDown className="w-4 h-4 ml-1" />
                  </button>
                  <AnimatePresence>
                    {((item.label === 'About Us' && aboutOpen) || (item.label === 'Events' && eventsOpen)) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[150]"
                      >
                        {item.items.map((subitem, sidx) => (
                          <a
                            key={sidx}
                            href={subitem.href}
                            className="block px-5 py-3 text-sm hover:bg-[#FFF6CC] hover:text-[#800E13] transition-colors rounded-xl text-gray-800 font-medium"
                            onClick={() => {
                              setAboutOpen(false);
                              setEventsOpen(false);
                            }}
                          >
                            {subitem.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={idx}
                  href={item.href}
                  className="relative text-sm font-semibold text-white hover:text-[#FFD700] transition-colors group"
                >
                  {item.label}
                  <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-[#FFD700] transition-all duration-300 group-hover:w-full" />
                </a>
              )
            ))}

            <div
              className="relative"
              onMouseEnter={() => setCampusOpen(true)}
              onMouseLeave={() => setCampusOpen(false)}
            >
              <button className="flex items-center text-sm font-semibold text-white hover:text-[#FFD700] transition-colors">
                Campuses <LuChevronDown className="w-4 h-4 ml-1" />
              </button>
              <AnimatePresence>
                {campusOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[150]"
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
                          className="block px-5 py-3 text-sm hover:bg-[#FFF6CC] hover:text-[#800E13] transition-colors rounded-xl"
                          onClick={closeMenus}
                        >
                          <div className="font-semibold text-gray-900">{campus.name}</div>
                          <div className="text-xs text-gray-500">St. Andrew Kaggwa GHS</div>
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
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <LuX className="w-6 h-6" /> : <LuMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white text-gray-900 shadow-xl border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenus}
                  className="block text-sm font-semibold text-gray-800 hover:text-[#800E13]"
                >
                  {link.label}
                </a>
              ))}

              {menuItems.map((item, idx) => (
                item.type === 'dropdown' ? (
                  <div key={idx} className="border-t border-gray-200 pt-3">
                    <div className="text-xs font-semibold text-gray-500 mb-2">{item.label}</div>
                    <div className="space-y-2">
                      {item.items.map((subitem, sidx) => (
                        <a
                          key={sidx}
                          href={subitem.href}
                          onClick={closeMenus}
                          className="block rounded-lg px-3 py-2 bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-800 hover:bg-[#FFF6CC] hover:text-[#800E13]"
                        >
                          {subitem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={closeMenus}
                    className="block text-sm font-semibold text-gray-800 hover:text-[#800E13]"
                  >
                    {item.label}
                  </a>
                )
              ))}

              <div className="border-t border-gray-200 pt-3">
                <div className="text-xs font-semibold text-gray-500 mb-2">Campuses</div>
                <div className="space-y-2">
                  {campuses.map((campus) => (
                    <Link
                      key={campus.path}
                      to={campus.path}
                      onClick={closeMenus}
                      className="block rounded-lg px-3 py-2 bg-gray-50 border border-gray-100 text-sm font-semibold text-gray-800 hover:bg-[#FFF6CC] hover:text-[#800E13]"
                    >
                      {campus.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/admissions"
                onClick={closeMenus}
                className="block text-center px-4 py-3 rounded-full text-sm font-bold text-white"
                style={{ backgroundColor: brandColors.secondary }}
              >
                Apply Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default SAKHeader;
