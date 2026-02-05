import BlurFade from "./magicui/blur-fade";
import { Clock, Calendar } from "lucide-react";

export function OfficeHour() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <BlurFade delay={0.2} inView>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Office Hour Admin
            </h2>
            <p className="text-lg text-gray-600">
              Tim admin kami siap melayani Anda pada jam kerja berikut
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 sm:p-12 shadow-xl border border-emerald-200">
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Days */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-white rounded-xl shadow-md">
                  <Calendar className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    Hari Kerja
                  </h3>
                  <p className="text-2xl font-bold text-emerald-600">
                    Senin – Jumat
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-4 bg-white rounded-xl shadow-md">
                  <Clock className="w-8 h-8 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                    Jam Operasional
                  </h3>
                  <p className="text-2xl font-bold text-emerald-600">
                    09.00 – 17.00 WIB
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-emerald-200">
              <p className="text-center text-gray-700">
                <span className="font-semibold">Catatan:</span> Untuk keperluan
                mendesak di luar jam kerja, silakan hubungi kontak darurat yang
                tersedia di aplikasi.
              </p>
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
