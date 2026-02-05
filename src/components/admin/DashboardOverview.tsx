import { useEffect, useState } from "react";
import BlurFade from "../magicui/blur-fade";
import { Users, UserPlus, FileCheck, DollarSign } from "lucide-react";
import {
  getMemberStats,
  getContentStats,
  getDonationStats,
} from "../../utils/storage";

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingMembers: 0,
    pendingContents: 0,
    activeDonations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [memberStats, contentStats, donationStats] = await Promise.all([
        getMemberStats(),
        getContentStats(),
        getDonationStats(),
      ]);

      setStats({
        totalMembers: memberStats.totalMembers,
        pendingMembers: memberStats.pendingMembers,
        pendingContents: contentStats.pendingContents,
        activeDonations: donationStats.activeDonations,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statsData = [
    {
      icon: Users,
      title: "Total Member",
      value: loading ? "..." : stats.totalMembers.toString(),
      change: "+12% dari bulan lalu",
      color: "emerald",
    },
    {
      icon: UserPlus,
      title: "Member Baru (Pending)",
      value: loading ? "..." : stats.pendingMembers.toString(),
      change: "Menunggu approval",
      color: "blue",
    },
    {
      icon: FileCheck,
      title: "Konten Pending Review",
      value: loading ? "..." : stats.pendingContents.toString(),
      change: "Perlu ditinjau",
      color: "amber",
    },
    {
      icon: DollarSign,
      title: "Donasi Aktif",
      value: loading ? "..." : stats.activeDonations.toString(),
      change: "Program berjalan",
      color: "emerald",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <BlurFade delay={0.1} inView>
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-xl">
          <h1 className="text-2xl font-bold mb-2">
            Selamat Datang, Administrator
          </h1>
          <p className="text-emerald-100">
            Dashboard admin Jamaah.net - Kelola seluruh aktivitas platform dengan
            mudah
          </p>
        </div>
      </BlurFade>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.1} inView>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg ${
                    stat.color === "emerald"
                      ? "bg-emerald-100"
                      : stat.color === "blue"
                      ? "bg-blue-100"
                      : "bg-amber-100"
                  }`}
                >
                  <stat.icon
                    className={`w-6 h-6 ${
                      stat.color === "emerald"
                        ? "text-emerald-600"
                        : stat.color === "blue"
                        ? "text-blue-600"
                        : "text-amber-600"
                    }`}
                  />
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Recent Activity */}
      <BlurFade delay={0.6} inView>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Aktivitas Terkini
          </h2>
          <div className="space-y-4">
            {[
              {
                type: "Member Baru",
                desc: "Member baru menunggu approval",
                time: "Baru saja",
              },
              {
                type: "Konten Baru",
                desc: "Konten baru memerlukan review",
                time: "15 menit lalu",
              },
              {
                type: "Donasi",
                desc: "Program donasi sedang berjalan",
                time: "1 jam lalu",
              },
              {
                type: "Artikel",
                desc: "Artikel tersedia untuk dipublikasikan",
                time: "2 jam lalu",
              },
            ].map((activity, index) => (
              <BlurFade key={index} delay={0.7 + index * 0.1} inView>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {activity.type}
                    </p>
                    <p className="text-sm text-gray-600">{activity.desc}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>
    </div>
  );
}