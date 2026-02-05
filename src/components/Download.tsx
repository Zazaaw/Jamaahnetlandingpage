import BlurFade from "./magicui/blur-fade";
import { Smartphone } from "lucide-react";

export function Download() {
  return (
    <section
      id="download"
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-600 to-emerald-700 overflow-hidden"
    >
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 30l15-15v15H30zM15 45l15-15v15H15zm30 0l15-15v15H45zM0 45l15-15v15H0zm0-30l15-15v15H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <BlurFade delay={0.2} inView>
          <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Download Aplikasi Jamaah.net
          </h2>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="text-lg sm:text-xl text-emerald-100 mb-12 max-w-2xl mx-auto">
            Mulai pengalaman digital Anda bersama komunitas jamaah. Tersedia di
            Google Play Store dan App Store.
          </p>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Google Play Button */}
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl group">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-600">Download di</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </button>

            {/* App Store Button */}
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl group">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
              </svg>
              <div className="text-left">
                <div className="text-xs text-gray-600">Download di</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </button>
          </div>
        </BlurFade>

        <BlurFade delay={0.6} inView>
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <p className="text-emerald-50 text-sm">
              <span className="font-semibold">Catatan:</span> Seluruh aktivitas
              jamaah dilakukan melalui aplikasi mobile. Website ini hanya sebagai
              landing page informasi dan akses admin.
            </p>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
