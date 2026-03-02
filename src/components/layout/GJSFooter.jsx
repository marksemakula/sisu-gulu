import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LuMail, LuPhone, LuMapPin } from 'react-icons/lu';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const brandColors = {
  primary: '#FFD700',
  secondary: '#800E13',
};

const campuses = [
  { name: 'Gombe Junior School (Boarding)', contact: '+256 700 000 004', path: '/institutions/gjs-boarding' },
  { name: 'Gombe Junior School Kikajjo (Day)', contact: '+256 700 000 006', path: '/institutions/gjs-kikajjo' },
];

const GJSFooter = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/images/GombeBadge.png" alt="Gombe Junior School" className="h-10 w-auto brightness-0 invert" />
              <div className="leading-tight">
                <div className="text-base font-bold">Gombe Junior School</div>
                <div className="text-xs font-semibold" style={{ color: brandColors.primary }}>
                  Ssosolye bwatafa
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              Nurturing learners through academic excellence, character formation, and a caring community across our campuses.
            </p>
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300"
              >
                <FaFacebook size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300"
              >
                <FaTwitter size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300"
              >
                <FaInstagram size={18} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300"
              >
                <FaLinkedin size={18} />
              </motion.a>
            </div>
          </div>

          {/* Campuses */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold" style={{ color: brandColors.primary }}>Our Campuses</h3>
            <ul className="space-y-2">
              {campuses.map((campus) => (
                <li key={campus.path}>
                  <Link
                    to={campus.path}
                    className="text-gray-300 hover:text-[#FFD700] transition-colors duration-300 text-sm block"
                  >
                    {campus.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold" style={{ color: brandColors.primary }}>Contact Us</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-start gap-2">
                <LuMapPin className="w-4 h-4 mt-0.5" style={{ color: brandColors.primary }} />
                <p>Wakiso District, Uganda<br />P.O. Box 71523, Kampala</p>
              </div>
              <div className="flex items-start gap-2">
                <LuPhone className="w-4 h-4 mt-0.5" style={{ color: brandColors.primary }} />
                <div>
                  <p>+256 700 000 004 (Kikajjo)</p>
                  <p>+256 700 000 005 (Gulu)</p>
                  <p>+256 700 000 006 (Boarding)</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <LuMail className="w-4 h-4 mt-0.5" style={{ color: brandColors.primary }} />
                <div>
                  <p>info@gjs.ges.ac.ug</p>
                  <p>admissions@gjs.ges.ac.ug</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-300">
          <span>© 2025 Gombe Junior School. All rights reserved.</span>
          <div className="flex items-center gap-6 mt-3 md:mt-0">
            <Link to="/privacy" className="hover:text-[#FFD700] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#FFD700] transition-colors">Terms</Link>
            <Link to="/cookies" className="hover:text-[#FFD700] transition-colors">Cookies</Link>
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">Powered by</span>
              <img 
                src="/images/Inzozi-grayscale.png" 
                alt="Inzozi Logo" 
                className="h-10 w-auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GJSFooter;
