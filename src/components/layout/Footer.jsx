import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LuMail, LuPhone, LuMapPin, LuArrowUp } from 'react-icons/lu';
import { FaDiscord, FaInstagram, FaLinkedin, FaSlack, FaYoutube, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const institutions = [
    { name: 'St. Andrew Kaggwa Gombe High School - Kawaala', path: '/institutions/sakghs-kawaala' },
    { name: 'St. Andrew Kaggwa Gombe High School - Bujuuko', path: '/institutions/sakghs-bujuuko' },
    { name: 'Gombe Junior School - Kikajjo', path: '/institutions/gjs-kikajjo' },
    { name: 'Gombe Junior School - Boarding', path: '/institutions/gjs-boarding' },
    { name: 'Scooby Doo International School - Katale', path: '/institutions/scooby-katale' },
    { name: 'Scooby Doo International School - Gulu', path: '/institutions/scooby-gulu' },
    { name: 'Jimmy Sekasi Business Institute', path: '/institutions/jsbi' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'GES Calendar', path: '/calendar' },
    { name: 'Student Portal', path: '/portal' },
    { name: 'Alumni', path: '/alumni' },
  ];

  return (
    <footer className="bg-white text-gray-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-ges-gold rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-ges-teal rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-ges-burgundy rounded-full"></div>
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <img src="/logo.png" alt="GES Logo" className="h-16 w-auto" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Gombe Education Service</h3>
                  <p className="text-ges-gold text-sm font-semibold">EXCELLENCE SINCE 1995</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Committed to providing world-class education and nurturing future leaders through innovative learning approaches and holistic development.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: FaDiscord, href: 'https://discord.com/ges' },
                  { icon: FaInstagram, href: 'https://instagram.com/ges' },
                  { icon: FaLinkedin, href: 'https://linkedin.com/company/ges' },
                  { icon: FaSlack, href: 'https://slack.com/ges' },
                  { icon: FaYoutube, href: 'https://youtube.com/ges' },
                  { icon: FaXTwitter, href: 'https://twitter.com/ges' },
                  { icon: FaWhatsapp, href: 'https://whatsapp.com/ges' },
                  { icon: FaTelegram, href: 'https://telegram.com/ges' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="flex items-center justify-center transition-all duration-300 text-black hover:text-ges-gold"
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-ges-gold">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link 
                      to={link.path}
                      className="text-gray-700 hover:text-ges-gold transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-ges-teal rounded-full mr-3 group-hover:bg-ges-gold transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Our Institutions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <h4 className="text-lg font-semibold mb-6 text-ges-gold">Our Institutions</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {institutions.map((inst) => (
                  <li key={inst.path}>
                    <Link 
                      to={inst.path}
                      className="text-gray-700 hover:text-ges-gold transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-ges-teal rounded-full mr-3 group-hover:bg-ges-gold transition-colors"></span>
                      {inst.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 text-ges-gold">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <LuMapPin className="w-5 h-5 text-ges-teal mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">
                      Wakiso District, Uganda<br />
                      P.O. Box 123, Gombe
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <LuPhone className="w-5 h-5 text-ges-teal flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">+256 700 123 456</p>
                    <p className="text-gray-700">+256 800 987 654</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <LuMail className="w-5 h-5 text-ges-teal flex-shrink-0" />
                  <div>
                    <p className="text-gray-700">info@ges.ac.ug</p>
                    <p className="text-gray-700">admissions@ges.ac.ug</p>
                  </div>
                </div>
              </div>


            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-600 text-sm">
                <p>&copy; 2026 Gombe Education Service. All rights reserved.</p>
                <div className="flex space-x-4">
                  <Link to="/privacy" className="hover:text-ges-gold transition-colors">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="hover:text-ges-gold transition-colors">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="hover:text-ges-gold transition-colors">
                    Cookie Policy
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 text-sm">Powered by</span>
                  <img 
                    src="/images/Inzozi-grayscale1.png" 
                    alt="Inzozi Logo" 
                    className="h-16 w-auto" 
                  />
                </div>

                {/* Back to Top */}
                <motion.button
                  onClick={scrollToTop}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-ges-gold text-ges-navy rounded-lg flex items-center justify-center hover:bg-ges-teal hover:text-white transition-all duration-300"
                >
                  <LuArrowUp className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;