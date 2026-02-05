import BlurFade from "../magicui/blur-fade";
import { Menu, Clock, User } from "lucide-react";
import { useEffect, useState } from "react";

interface DashboardHeaderProps {
  title: string;
  onToggleSidebar: () => void;
}

export function DashboardHeader({
  title,
  onToggleSidebar,
}: DashboardHeaderProps) {
  const [isOfficeHour, setIsOfficeHour] = useState(false);

  useEffect(() => {
    const checkOfficeHour = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      const hour = now.getHours();

      // Monday to Friday (1-5) and between 9-17
      const isWorkDay = day >= 1 && day <= 5;
      const isWorkHour = hour >= 9 && hour < 17;

      setIsOfficeHour(isWorkDay && isWorkHour);
    };

    checkOfficeHour();
    const interval = setInterval(checkOfficeHour, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <BlurFade delay={0} inView>
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left: Menu & Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* Right: Office Hour & Admin Info */}
          <div className="flex items-center gap-4">
            {/* Office Hour Indicator */}
            <BlurFade delay={0.1} inView>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  isOfficeHour
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold hidden sm:inline">
                  {isOfficeHour
                    ? "Dalam Jam Operasional"
                    : "Di Luar Jam Operasional"}
                </span>
              </div>
            </BlurFade>

            {/* Admin Profile */}
            <BlurFade delay={0.2} inView>
              <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="p-2 bg-emerald-100 rounded-full">
                  <User className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </header>
    </BlurFade>
  );
}
