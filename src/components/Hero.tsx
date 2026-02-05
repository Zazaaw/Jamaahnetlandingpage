import BlurFade from "./magicui/blur-fade";
import { Download, LogIn } from "lucide-react";

interface HeroProps {
  onLoginClick?: () => void;
}

export function Hero({ onLoginClick }: HeroProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="beranda"
      className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 30l15-15v15H30zM15 45l15-15v15H15zm30 0l15-15v15H45zM0 45l15-15v15H0zm0-30l15-15v15H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <BlurFade delay={0.2} inView>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Platform Digital Terintegrasi untuk{" "}
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                  Jamaah
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                Jamaah.net adalah aplikasi sesama muslim untuk mengelola donasi,
                jual beli barang, dan aktivitas jamaah secara digital.
              </p>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("download")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  <Download className="w-5 h-5" />
                  Download Aplikasi
                </button>
                <button
                  onClick={onLoginClick}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-lg hover:bg-emerald-50 transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  Login Admin
                </button>
              </div>
            </BlurFade>
          </div>

          {/* Right Illustration */}
          <BlurFade delay={0.5} inView>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl p-8 sm:p-12">
                {/* Abstract Islamic Geometric Pattern */}
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Center Star */}
                  <circle
                    cx="200"
                    cy="200"
                    r="80"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                  />
                  <circle
                    cx="200"
                    cy="200"
                    r="60"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  <circle cx="200" cy="200" r="40" fill="#059669" opacity="0.3" />

                  {/* Orbiting Elements (representing community) */}
                  <circle cx="280" cy="120" r="25" fill="#10b981" opacity="0.6" />
                  <circle cx="120" cy="120" r="25" fill="#10b981" opacity="0.6" />
                  <circle cx="120" cy="280" r="25" fill="#10b981" opacity="0.6" />
                  <circle cx="280" cy="280" r="25" fill="#10b981" opacity="0.6" />

                  {/* Connecting Lines */}
                  <line
                    x1="200"
                    y1="200"
                    x2="280"
                    y2="120"
                    stroke="#059669"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="120"
                    y2="120"
                    stroke="#059669"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="120"
                    y2="280"
                    stroke="#059669"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                  <line
                    x1="200"
                    y1="200"
                    x2="280"
                    y2="280"
                    stroke="#059669"
                    strokeWidth="2"
                    opacity="0.3"
                  />

                  {/* Decorative Islamic Pattern */}
                  <path
                    d="M 200 50 L 220 80 L 250 80 L 225 100 L 235 130 L 200 110 L 165 130 L 175 100 L 150 80 L 180 80 Z"
                    fill="#059669"
                    opacity="0.4"
                  />
                  <path
                    d="M 200 350 L 220 320 L 250 320 L 225 300 L 235 270 L 200 290 L 165 270 L 175 300 L 150 320 L 180 320 Z"
                    fill="#059669"
                    opacity="0.4"
                  />
                </svg>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
