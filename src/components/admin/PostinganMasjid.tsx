import { useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import { Plus, Edit, Trash2 } from "lucide-react";
import {
  getMasjidPosts,
  createMasjidPost,
  updateMasjidPost,
  deleteMasjidPost,
} from "../../utils/storage";
import type { MasjidPost } from "../../utils/storage";

export function PostinganMasjid() {
  const [posts, setPosts] = useState<MasjidPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedPost, setSelectedPost] = useState<MasjidPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "announcement" as "announcement" | "event",
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await getMasjidPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalMode("add");
    setFormData({ title: "", content: "", type: "announcement" });
    setShowModal(true);
  };

  const handleEdit = (post: MasjidPost) => {
    setModalMode("edit");
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: post.content,
      type: post.type,
    });
    setShowModal(true);
  };

  const handleDelete = (post: MasjidPost) => {
    setModalMode("delete");
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "delete" && selectedPost) {
        await deleteMasjidPost(selectedPost.id);
      } else if (modalMode === "add") {
        await createMasjidPost(formData);
      } else if (modalMode === "edit" && selectedPost) {
        await updateMasjidPost(selectedPost.id, formData);
      }

      // Reload posts
      await loadPosts();

      setShowModal(false);
      setSelectedPost(null);
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Memuat data postingan...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <BlurFade delay={0.1} inView>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Manajemen Konten Masjid
              </h2>
              <p className="text-sm text-gray-600">
                Kelola postingan pengumuman dan informasi kegiatan masjid
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Tambah Konten
            </button>
          </div>
        </div>
      </BlurFade>

      {/* Posts List */}
      <div className="grid gap-4">
        {posts.map((post, index) => (
          <BlurFade key={post.id} delay={0.2 + index * 0.05} inView>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {post.title}
                    </h3>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        post.type === "announcement"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {post.type === "announcement"
                        ? "Pengumuman"
                        : "Kegiatan"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{post.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(post)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Hapus"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <BlurFade delay={0} inView>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {modalMode === "add"
                  ? "Tambah Konten Baru"
                  : modalMode === "edit"
                  ? "Edit Konten"
                  : "Hapus Konten"}
              </h3>

              {modalMode === "delete" ? (
                <p className="text-gray-600 mb-6">
                  Yakin ingin menghapus konten "{selectedPost?.title}"?
                </p>
              ) : (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipe Konten
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          type: e.target.value as "announcement" | "event",
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    >
                      <option value="announcement">Pengumuman</option>
                      <option value="event">Kegiatan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Judul
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Judul konten"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Konten
                    </label>
                    <textarea
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Isi konten"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {modalMode === "delete" ? "Hapus" : "Simpan"}
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