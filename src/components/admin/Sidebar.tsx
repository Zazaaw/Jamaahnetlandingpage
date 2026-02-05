import BlurFade from "../magicui/blur-fade";
import {
  LayoutDashboard,
  Users,
  FileCheck,
  Building2,
  Calendar,
  FileText,
  DollarSign,
  LogOut,
} from "lucide-react";
import { DashboardPage } from "./DashboardLayout";

interface SidebarProps {
  currentPage: DashboardPage;
  onPageChange: (page: DashboardPage) => void;
  onLogout: () => void;
  isOpen: boolean;
}

const menuItems = [
  { id: "dashboard" as DashboardPage, icon: LayoutDashboard, label: "Dashboard" },
  { id: "member" as DashboardPage, icon: Users, label: "Manajemen Member" },
  { id: "review" as DashboardPage, icon: FileCheck, label: "Review Konten" },
  { id: "masjid" as DashboardPage, icon: Building2, label: "Postingan Masjid" },
  { id: "jadwal" as DashboardPage, icon: Calendar, label: "Jadwal Kegiatan" },
  { id: "artikel" as DashboardPage, icon: FileText, label: "Artikel" },
  { id: "donasi" as DashboardPage, icon: DollarSign, label: "Donasi" },
];

export function Sidebar({
  currentPage,
  onPageChange,
  onLogout,
  isOpen,
}: SidebarProps) {
  if (!isOpen) return null;

  return (
    <BlurFade delay={0} inView>
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg overflow-y-auto">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <BlurFade delay={0.1} inView>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
              Jamaah.net
            </h1>
            <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
          </BlurFade>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <BlurFade key={item.id} delay={0.1 + index * 0.05} inView>
              <button
                onClick={() => onPageChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  currentPage === item.id
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </BlurFade>
          ))}

          {/* Logout Button */}
          <BlurFade delay={0.5} inView>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all mt-4 border-t border-gray-200 pt-6"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </BlurFade>
        </nav>
      </aside>
    </BlurFade>
  );
}
