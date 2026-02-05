import { useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import { Plus, Edit, Eye, EyeOff } from "lucide-react";
import {
  getArticles,
  createArticle,
  updateArticle,
} from "../../utils/storage";
import type { Article } from "../../utils/storage";

export function Artikel() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    status: "draft" as "published" | "draft",
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
    } catch (error) {
      console.error("Error loading articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalMode("add");
    setFormData({ title: "", category: "", content: "", status: "draft" });
    setShowModal(true);
  };

  const handleEdit = (article: Article) => {
    setModalMode("edit");
    setSelectedArticle(article);
    setFormData({
      title: article.title,
      category: article.category,
      content: article.content,
      status: article.status,
    });
    setShowModal(true);
  };

  const handleToggleStatus = async (article: Article) => {
    try {
      const newStatus = article.status === "published" ? "draft" : "published";
      await updateArticle(article.id, { status: newStatus });
      await loadArticles();
    } catch (error) {
      console.error("Error toggling status:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "add") {
        await createArticle(formData);
      } else if (modalMode === "edit" && selectedArticle) {
        await updateArticle(selectedArticle.id, formData);
      }

      // Reload articles
      await loadArticles();

      setShowModal(false);
      setSelectedArticle(null);
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Memuat data artikel...</div>
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
                Manajemen Artikel
              </h2>
              <p className="text-sm text-gray-600">
                Kelola artikel edukasi dan informasi Islam
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Buat Artikel
            </button>
          </div>
        </div>
      </BlurFade>

      {/* Articles List */}
      <div className="grid gap-4">
        {articles.map((article, index) => (
          <BlurFade key={article.id} delay={0.2 + index * 0.05} inView>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {article.title}
                    </h3>
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
                      {article.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        article.status === "published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {article.status === "published"
                        ? "Published"
                        : "Draft"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(article.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleStatus(article)}
                    className={`p-2 rounded-lg transition-colors ${
                      article.status === "published"
                        ? "bg-amber-100 text-amber-600 hover:bg-amber-200"
                        : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                    }`}
                    title={
                      article.status === "published"
                        ? "Unpublish"
                        : "Publish"
                    }
                  >
                    {article.status === "published" ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-2xl my-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {modalMode === "add" ? "Buat Artikel Baru" : "Edit Artikel"}
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Judul artikel"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Kategori
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="">Pilih kategori</option>
                    <option value="Ibadah">Ibadah</option>
                    <option value="Akhlak">Akhlak</option>
                    <option value="Aqidah">Aqidah</option>
                    <option value="Muamalah">Muamalah</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Konten Artikel
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={8}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Tulis konten artikel di sini..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status Publikasi
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as "published" | "draft",
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Simpan
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