import { useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import { Check, X, RefreshCw, Search } from "lucide-react";
import {
  getMembers,
  approveMember,
  rejectMember,
} from "../../utils/storage";
import type { Member } from "../../utils/storage";

export function ManagementMember() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<"approve" | "reject" | "reset" | null>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      setLoading(true);
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      console.error("Error loading members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (
    member: Member,
    action: "approve" | "reject" | "reset"
  ) => {
    setSelectedMember(member);
    setModalAction(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedMember || !modalAction) return;

    try {
      if (modalAction === "approve") {
        await approveMember(selectedMember.id);
      } else if (modalAction === "reject") {
        await rejectMember(selectedMember.id);
      } else if (modalAction === "reset") {
        // Reset password functionality
        alert("Reset password akan mengirim email ke member");
      }

      // Reload members
      await loadMembers();

      setShowModal(false);
      setSelectedMember(null);
      setModalAction(null);
    } catch (error) {
      console.error("Error performing action:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Memuat data member...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Manajemen Member
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari member berdasarkan nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </BlurFade>

      {/* Table */}
      <BlurFade delay={0.2} inView>
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    ID Member
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Nama
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Email / No. HP
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Tanggal Bergabung
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMembers.map((member, index) => (
                  <BlurFade key={member.id} delay={0.3 + index * 0.05} inView>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {member.id.slice(0, 8)}...
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div>{member.email}</div>
                        <div className="text-xs text-gray-500">
                          {member.phone}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            member.status === "active"
                              ? "bg-emerald-100 text-emerald-700"
                              : member.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {member.status === "active"
                            ? "Aktif"
                            : member.status === "pending"
                            ? "Pending"
                            : "Ditolak"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(member.created_at).toLocaleDateString("id-ID")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {member.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAction(member, "approve")}
                                className="p-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleAction(member, "reject")}
                                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                                title="Reject"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleAction(member, "reset")}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Reset Password"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </BlurFade>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BlurFade>

      {/* Confirmation Modal */}
      {showModal && selectedMember && (
        <BlurFade delay={0} inView>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Konfirmasi Aksi
              </h3>
              <p className="text-gray-600 mb-6">
                {modalAction === "approve" &&
                  `Approve registrasi member ${selectedMember.name}?`}
                {modalAction === "reject" &&
                  `Tolak registrasi member ${selectedMember.name}?`}
                {modalAction === "reset" &&
                  `Reset password untuk ${selectedMember.name}?`}
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