import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection("beranda")}
              className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent hover:from-emerald-600 hover:to-emerald-400 transition-all cursor-pointer"
              type="button"
            >
              Jamaah.net
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("beranda")}
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium cursor-pointer"
              type="button"
            >
              Beranda
            </button>
            <button
              onClick={() => scrollToSection("tentang")}
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium cursor-pointer"
              type="button"
            >
              Tentang Aplikasi
            </button>
            <button
              onClick={() => scrollToSection("download")}
              className="text-gray-700 hover:text-emerald-600 transition-colors font-medium cursor-pointer"
              type="button"
            >
              Download
            </button>
            <button
              onClick={handleLoginClick}
              className="hidden px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium shadow-md hover:shadow-lg cursor-pointer"
              type="button"
            >
              Login Admin
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-emerald-600 p-2 cursor-pointer"
              aria-label="Toggle menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => scrollToSection("beranda")}
                className="text-gray-700 hover:text-emerald-600 transition-colors text-left py-2 px-4 hover:bg-emerald-50 rounded-lg font-medium cursor-pointer"
                type="button"
              >
                Beranda
              </button>
              <button
                onClick={() => scrollToSection("tentang")}
                className="text-gray-700 hover:text-emerald-600 transition-colors text-left py-2 px-4 hover:bg-emerald-50 rounded-lg font-medium cursor-pointer"
                type="button"
              >
                Tentang Aplikasi
              </button>
              <button
                onClick={() => scrollToSection("download")}
                className="text-gray-700 hover:text-emerald-600 transition-colors text-left py-2 px-4 hover:bg-emerald-50 rounded-lg font-medium cursor-pointer"
                type="button"
              >
                Download
              </button>
              <button
                onClick={handleLoginClick}
                className="hidden px-5 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-left font-medium shadow-md cursor-pointer"
                type="button"
              >
                Login Admin
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
