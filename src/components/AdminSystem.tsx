import BlurFade from "./magicui/blur-fade";
import {
  Shield,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  DollarSign,
  Clock,
} from "lucide-react";

interface AdminSystemProps {
  onLoginClick?: () => void;
}

const adminFeatures = [
  {
    icon: CheckCircle,
    title: "Review & Approval Akun",
    description: "Verifikasi dan persetujuan akun pengguna baru",
  },
  {
    icon: FileCheck,
    title: "Review & Approval Konten",
    description: "Moderasi konten sebelum dipublikasikan",
  },
  {
    icon: AlertTriangle,
    title: "Take-down Konten",
    description: "Penghapusan konten yang melanggar ketentuan",
  },
  {
    icon: DollarSign,
    title: "Pengelolaan Donasi",
    description: "Monitoring dan verifikasi transaksi donasi",
  },
  {
    icon: Clock,
    title: "Office Hour",
    description: "Layanan admin tersedia pada jam kerja",
  },
];

export function AdminSystem({ onLoginClick }: AdminSystemProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <BlurFade delay={0.2} inView>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
              <Shield className="w-4 h-4" />
              Akses Terbatas Admin
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Sistem Administrasi & Moderasi
            </h2>
          </BlurFade>

          <BlurFade delay={0.4} inView>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tim admin profesional kami memastikan platform berjalan dengan baik
              melalui sistem moderasi yang ketat dan transparan
            </p>
          </BlurFade>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.1} inView>
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all border border-gray-100 hover:border-emerald-200">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <feature.icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}

          {/* Login Admin Card - Featured */}
          <BlurFade delay={0.8} inView>
            <div
              id="login-admin"
              className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-6 shadow-xl border border-emerald-500 md:col-span-2 lg:col-span-3"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-white mb-2">
                    Portal Admin Jamaah.net
                  </h3>
                  <p className="text-emerald-100">
                    Akses khusus untuk administrator platform
                  </p>
                </div>
                <button
                  onClick={onLoginClick}
                  className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg flex items-center gap-2"
                >
                  <Shield className="w-5 h-5" />
                  Login Admin
                </button>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
