import BlurFade from "./magicui/blur-fade";
import { CheckCircle2 } from "lucide-react";

const highlights = [
  "Platform terintegrasi untuk seluruh kebutuhan jamaah",
  "Sistem transparan dan terverifikasi",
  "Komunitas muslim yang saling mendukung",
  "Interface modern dan mudah digunakan",
];

export function About() {
  return (
    <section
      id="tentang"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
    >
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M40 0L60 20L40 40L20 20z M0 40L20 60L0 80L-20 60z M40 40L60 60L40 80L20 60z M80 40L100 60L80 80L60 60z M40 40L40 60L20 60z M40 40L60 40L60 60z M40 20L60 40L40 60L20 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <BlurFade delay={0.2} inView>
              <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold">
                Tentang Jamaah.net
              </div>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Platform Digital yang Menghubungkan{" "}
                <span className="bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                  Sesama Muslim
                </span>
              </h2>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="text-lg text-gray-600 leading-relaxed">
                Jamaah.net hadir sebagai solusi digital terintegrasi yang
                memudahkan aktivitas jamaah. Dari sistem donasi yang transparan
                hingga marketplace sesama muslim, semua tersedia dalam satu
                platform yang aman dan terpercaya.
              </p>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <p className="text-lg text-gray-600 leading-relaxed">
                Dengan sistem moderasi yang ketat dan administrasi yang
                profesional, kami memastikan setiap transaksi dan interaksi
                berjalan dengan baik sesuai dengan nilai-nilai Islam.
              </p>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <div className="space-y-3 pt-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>

          {/* Right Visual */}
          <BlurFade delay={0.7} inView>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-3xl blur-2xl opacity-20" />
              <div className="relative bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-12 shadow-2xl">
                {/* Decorative Elements */}
                <div className="space-y-6">
                  {/* Stats Card 1 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-4xl font-bold text-white mb-2">
                      100%
                    </div>
                    <div className="text-emerald-100">
                      Sistem Transparan & Terverifikasi
                    </div>
                  </div>

                  {/* Stats Card 2 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-4xl font-bold text-white mb-2">
                      24/7
                    </div>
                    <div className="text-emerald-100">
                      Akses Aplikasi Kapan Saja
                    </div>
                  </div>

                  {/* Stats Card 3 */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-4xl font-bold text-white mb-2">
                      Aman
                    </div>
                    <div className="text-emerald-100">
                      Sistem Moderasi Profesional
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
