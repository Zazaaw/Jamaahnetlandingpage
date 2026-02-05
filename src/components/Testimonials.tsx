import { useRef } from "react";
import BlurFade from "./magicui/blur-fade";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Ahmad Fauzi",
    role: "Member Jamaah Al-Ikhlas",
    rating: 5,
    text: "Alhamdulillah, aplikasi ini sangat membantu. Donasi jadi lebih mudah dan transparan. Fitur pasar jamaah juga memudahkan jual beli sesama muslim.",
    avatar: "AF",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    role: "Pengurus Masjid",
    rating: 5,
    text: "Platform yang sangat bermanfaat untuk mengelola kegiatan masjid. Jadwal kajian dan pengumuman bisa tersampaikan dengan baik kepada jamaah.",
    avatar: "SN",
  },
  {
    id: 3,
    name: "Muhammad Rizki",
    role: "Donatur Aktif",
    rating: 5,
    text: "Sistem donasi yang transparan membuat saya lebih yakin menyalurkan bantuan. Progress donasi bisa dipantau secara real-time.",
    avatar: "MR",
  },
  {
    id: 4,
    name: "Fatimah Azzahra",
    role: "Member Aktif",
    rating: 5,
    text: "Senang sekali bisa berinteraksi dengan sesama muslim melalui aplikasi ini. Kontennya edukatif dan bermanfaat untuk meningkatkan ilmu agama.",
    avatar: "FA",
  },
  {
    id: 5,
    name: "Abdullah Rahman",
    role: "Pengusaha Muslim",
    rating: 5,
    text: "Pasar Jamaah sangat membantu bisnis saya. Bisa jual beli dengan sesama muslim dalam satu platform yang terpercaya.",
    avatar: "AR",
  },
  {
    id: 6,
    name: "Khadijah Aminah",
    role: "Relawan Sosial",
    rating: 5,
    text: "Aplikasi yang sangat recommended! Fitur donasi memudahkan kami menyalurkan bantuan kepada yang membutuhkan dengan cepat dan aman.",
    avatar: "KA",
  },
];

export function Testimonials() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      {/* Islamic Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M30 30l15-15v15H30zM15 45l15-15v15H15zm30 0l15-15v15H45zM0 45l15-15v15H0zm0-30l15-15v15H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <BlurFade delay={0.1} inView>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Apa Kata Jamaah?
            </h2>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ulasan dari member yang telah merasakan manfaat Jamaah.net
            </p>
          </BlurFade>
        </div>

        {/* Testimonials Scroll Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden lg:block">
            <BlurFade delay={0.3} inView>
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all hover:scale-110"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-6 h-6 text-emerald-600" />
              </button>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-all hover:scale-110"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-6 h-6 text-emerald-600" />
              </button>
            </BlurFade>
          </div>

          {/* Scroll Container */}
          <BlurFade delay={0.4} inView>
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {testimonials.map((testimonial, index) => (
                <BlurFade key={testimonial.id} delay={0.4 + index * 0.1} inView>
                  <div className="flex-shrink-0 w-[340px] sm:w-[380px] snap-start">
                    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 h-full">
                      {/* Rating Stars */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-emerald-500 text-emerald-500"
                          />
                        ))}
                      </div>

                      {/* Review Text */}
                      <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
                        "{testimonial.text}"
                      </p>

                      {/* User Info */}
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                          {testimonial.avatar}
                        </div>

                        {/* Name & Role */}
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </BlurFade>

          {/* Scroll Indicator - Mobile */}
          <BlurFade delay={0.5} inView>
            <div className="mt-6 text-center lg:hidden">
              <p className="text-sm text-gray-500">
                ← Geser untuk melihat ulasan lainnya →
              </p>
            </div>
          </BlurFade>
        </div>

        {/* Stats */}
        <BlurFade delay={0.6} inView>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                4.9
              </div>
              <div className="text-sm text-gray-600">Rating Aplikasi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                1000+
              </div>
              <div className="text-sm text-gray-600">Ulasan Positif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                5000+
              </div>
              <div className="text-sm text-gray-600">Pengguna Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                10k+
              </div>
              <div className="text-sm text-gray-600">Download</div>
            </div>
          </div>
        </BlurFade>
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
