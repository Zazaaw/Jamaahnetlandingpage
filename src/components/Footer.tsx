import BlurFade from "./magicui/blur-fade";
import { Mail, MessageCircle } from "lucide-react";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <BlurFade delay={0.2} inView>
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-4">
                Jamaah.net
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Platform digital terintegrasi untuk jamaah muslim. Menghubungkan
                sesama dalam sistem donasi, jual beli, dan aktivitas jamaah
                lainnya.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Menu Cepat</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("beranda")}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Beranda
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tentang")}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Tentang Aplikasi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("download")}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Download
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("login-admin")}
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Login Admin
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold text-white mb-4">Kontak</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <a
                    href="mailto:admin@jamaah.net"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    admin@jamaah.net
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <a
                    href="https://wa.me/6281234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    WhatsApp Admin
                  </a>
                </li>
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-500">Office Hour:</p>
                <p className="text-sm font-semibold text-emerald-400">
                  Senin – Jumat
                </p>
                <p className="text-sm font-semibold text-emerald-400">
                  09.00 – 17.00 WIB
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Jamaah.net. Platform Digital
              untuk Jamaah Muslim.
            </p>
          </div>
        </div>
      </footer>
    </BlurFade>
  );
}
