import { useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import { Check, Edit, EyeOff } from "lucide-react";
import {
  getDonations,
  approveDonation,
  updateDonation,
  deactivateDonation,
} from "../../utils/storage";
import type { Donation } from "../../utils/storage";

export function Donasi() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<
    "approve" | "edit" | "deactivate" | null
  >(null);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(
    null
  );

  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      setLoading(true);
      const data = await getDonations();
      setDonations(data);
    } catch (error) {
      console.error("Error loading donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (
    donation: Donation,
    action: "approve" | "edit" | "deactivate"
  ) => {
    setSelectedDonation(donation);
    setModalAction(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedDonation || !modalAction) return;

    try {
      if (modalAction === "approve") {
        await approveDonation(selectedDonation.id);
      } else if (modalAction === "edit") {
        // Edit functionality would go here
        alert("Fitur edit akan ditambahkan");
      } else if (modalAction === "deactivate") {
        await deactivateDonation(selectedDonation.id);
      }

      // Reload donations
      await loadDonations();

      setShowModal(false);
      setSelectedDonation(null);
      setModalAction(null);
    } catch (error) {
      console.error("Error performing action:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgress = (collected: number, target: number) => {
    return Math.min((collected / target) * 100, 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Memuat data donasi...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Manajemen Donasi
          </h2>
          <p className="text-sm text-gray-600">
            Kelola dan monitoring program donasi
          </p>
        </div>
      </BlurFade>

      {/* Donations List */}
      <div className="grid gap-4">
        {donations.map((donation, index) => (
          <BlurFade key={donation.id} delay={0.2 + index * 0.05} inView>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {donation.title}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        donation.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : donation.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {donation.status === "active"
                        ? "Aktif"
                        : donation.status === "pending"
                        ? "Pending Approval"
                        : "Nonaktif"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {donation.status === "pending" && (
                      <button
                        onClick={() => handleAction(donation, "approve")}
                        className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                        title="Approve"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleAction(donation, "edit")}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    {donation.status === "active" && (
                      <button
                        onClick={() => handleAction(donation, "deactivate")}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Nonaktifkan"
                      >
                        <EyeOff className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Terkumpul</span>
                    <span className="font-semibold text-gray-900">
                      {getProgress(
                        donation.collected_amount,
                        donation.target_amount
                      ).toFixed(1)}
                      %
                    </span>
                  </div>
                  <BlurFade delay={0.3 + index * 0.05} inView>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                        style={{
                          width: `${getProgress(
                            donation.collected_amount,
                            donation.target_amount
                          )}%`,
                        }}
                      />
                    </div>
                  </BlurFade>
                </div>

                {/* Amount Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-emerald-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">
                      Dana Terkumpul
                    </p>
                    <p className="text-lg font-bold text-emerald-600">
                      {formatCurrency(donation.collected_amount)}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Target Dana</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(donation.target_amount)}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Dibuat:{" "}
                    {new Date(donation.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedDonation && (
        <BlurFade delay={0} inView>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Konfirmasi Aksi
              </h3>
              <p className="text-gray-600 mb-6">
                {modalAction === "approve" &&
                  `Approve program donasi "${selectedDonation.title}"?`}
                {modalAction === "edit" &&
                  `Edit program donasi "${selectedDonation.title}"?`}
                {modalAction === "deactivate" &&
                  `Nonaktifkan program donasi "${selectedDonation.title}"?`}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={confirmAction}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Konfirmasi
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </BlurFade>
      )}
    </div>
  );
}