import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardOverview } from "./DashboardOverview";
import { ManagementMember } from "./ManagementMember";
import { ReviewContent } from "./ReviewContent";
import { PostinganMasjid } from "./PostinganMasjid";
import { JadwalKegiatan } from "./JadwalKegiatan";
import { Artikel } from "./Artikel";
import { Donasi } from "./Donasi";

export type DashboardPage =
  | "dashboard"
  | "member"
  | "review"
  | "masjid"
  | "jadwal"
  | "artikel"
  | "donasi";

interface DashboardLayoutProps {
  onLogout: () => void;
}

export function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [currentPage, setCurrentPage] = useState<DashboardPage>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const getPageTitle = () => {
    const titles: Record<DashboardPage, string> = {
      dashboard: "Dashboard Overview",
      member: "Manajemen Member",
      review: "Review Konten",
      masjid: "Postingan Masjid",
      jadwal: "Jadwal Kegiatan",
      artikel: "Artikel",
      donasi: "Donasi",
    };
    return titles[currentPage];
  };

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <DashboardOverview />;
      case "member":
        return <ManagementMember />;
      case "review":
        return <ReviewContent />;
      case "masjid":
        return <PostinganMasjid />;
      case "jadwal":
        return <JadwalKegiatan />;
      case "artikel":
        return <Artikel />;
      case "donasi":
        return <Donasi />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div
        className="fixed inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23059669' fill-opacity='1'%3E%3Cpath d='M40 0L60 20L40 40L20 20z M0 40L20 60L0 80L-20 60z M40 40L60 60L40 80L20 60z M80 40L100 60L80 80L60 60z M40 40L40 60L20 60z M40 40L60 40L60 60z M40 20L60 40L40 60L20 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onLogout={onLogout}
          isOpen={isSidebarOpen}
        />

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <DashboardHeader
            title={getPageTitle()}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />

          <main className="p-6">{renderPage()}</main>
        </div>
      </div>
    </div>
  );
}
