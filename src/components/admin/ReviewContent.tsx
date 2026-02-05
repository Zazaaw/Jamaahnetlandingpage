import { useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import { Check, X, Trash2, Search } from "lucide-react";
import {
  getContents,
  approveContent,
  rejectContent,
  deleteContent,
} from "../../utils/storage";
import type { Content } from "../../utils/storage";

export function ReviewContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<
    "approve" | "reject" | "takedown" | null
  >(null);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    loadContents();
  }, []);

  const loadContents = async () => {
    try {
      setLoading(true);
      const data = await getContents();
      setContents(data);
    } catch (error) {
      console.error("Error loading contents:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (
    content: Content,
    action: "approve" | "reject" | "takedown"
  ) => {
    setSelectedContent(content);
    setModalAction(action);
    setShowModal(true);
  };

  const confirmAction = async () => {
    if (!selectedContent || !modalAction) return;

    try {
      if (modalAction === "approve") {
        await approveContent(selectedContent.id);
      } else if (modalAction === "reject") {
        await rejectContent(selectedContent.id);
      } else if (modalAction === "takedown") {
        await deleteContent(selectedContent.id);
      }

      // Reload contents
      await loadContents();

      setShowModal(false);
      setSelectedContent(null);
      setModalAction(null);
    } catch (error) {
      console.error("Error performing action:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const filteredContents = contents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (content.member_name &&
        content.member_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Memuat data konten...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Review Konten & Postingan Member
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari konten berdasarkan judul atau nama member..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>
      </BlurFade>

      {/* Content List */}
      <div className="grid gap-4">
        {filteredContents.map((content, index) => (
          <BlurFade key={content.id} delay={0.2 + index * 0.05} inView>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {content.title}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        content.type === "post"
                          ? "bg-blue-100 text-blue-700"
                          : content.type === "image"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {content.type === "post"
                        ? "Post"
                        : content.type === "image"
                        ? "Image"
                        : "Video"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Oleh: {content.member_name || "Unknown"}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>
                      {new Date(content.created_at).toLocaleDateString("id-ID")}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full font-semibold ${
                        content.status === "approved"
                          ? "bg-emerald-100 text-emerald-700"
                          : content.status === "pending"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {content.status === "approved"
                        ? "Approved"
                        : content.status === "pending"
                        ? "Pending"
                        : "Rejected"}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {content.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleAction(content, "approve")}
                        className="px-4 py-2 bg-emerald-100 text-emerald-600 rounded-lg hover:bg-emerald-200 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(content, "reject")}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                  {content.status === "approved" && (
                    <button
                      onClick={() => handleAction(content, "takedown")}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Take Down
                    </button>
                  )}
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && selectedContent && (
        <BlurFade delay={0} inView>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Konfirmasi Aksi
              </h3>
              <p className="text-gray-600 mb-6">
                {modalAction === "approve" &&
                  `Approve konten "${selectedContent.title}"?`}
                {modalAction === "reject" &&
                  `Reject konten "${selectedContent.title}"?`}
                {modalAction === "takedown" &&
                  `Take down konten "${selectedContent.title}"? Konten akan dihapus dari aplikasi.`}
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