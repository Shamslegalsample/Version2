import { Scale, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Shams Legal</h3>
                <p className="text-xs text-red-400">Services</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Licensed paralegal and certified notary public providing professional legal support
              in Peterborough, Ontario.
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-red-400">License:</span> P18004
            </p>
            <p className="text-sm text-gray-400">Law Society of Ontario</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400">Contact Info</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:6473339381"
                  className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-red-400" />
                  <span>(647) 333-9381</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:Canada@shamslegalservices.ca"
                  className="flex items-start gap-2 text-gray-400 hover:text-white transition-colors text-sm group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-red-400" />
                  <span className="break-all">Canada@shamslegalservices.ca</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                  <span>315 Dublin St<br />Peterborough, Ontario</span>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-red-400">Business Hours</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <div>
                  <p className="text-white font-semibold">Mon - Fri</p>
                  <p className="text-gray-400">9:00 AM - 6:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <div>
                  <p className="text-white font-semibold">Saturday</p>
                  <p className="text-gray-400">9:00 AM - 2:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-400" />
                <div>
                  <p className="text-white font-semibold">Sunday</p>
                  <p className="text-gray-400">Closed</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {currentYear} Shams Legal Services. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              Licensed by the Law Society of Ontario | License P18004
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
