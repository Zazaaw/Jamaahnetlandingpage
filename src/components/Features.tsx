import BlurFade from "./magicui/blur-fade";
import { Heart, ShoppingBag, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Donasi",
    description:
      "Sistem donasi digital yang transparan dan terverifikasi untuk membantu sesama jamaah",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    icon: ShoppingBag,
    title: "Pasar Jamaah (Jual Beli)",
    description:
      "Fitur jual beli barang antar jamaah yang aman dan terpercaya dalam satu platform",
    gradient: "from-emerald-600 to-emerald-700",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Intuitif",
    description:
      "Tampilan aplikasi yang mudah digunakan oleh semua kalangan dengan antarmuka yang modern",
    gradient: "from-emerald-700 to-emerald-800",
  },
];

export function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <BlurFade delay={0.2} inView>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan Aplikasi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Jamaah.net menghadirkan berbagai fitur yang memudahkan aktivitas
              digital sesama muslim
            </p>
          </div>
        </BlurFade>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <BlurFade key={index} delay={0.3 + index * 0.1} inView>
              <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg`}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
