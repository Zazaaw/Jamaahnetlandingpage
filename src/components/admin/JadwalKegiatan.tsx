import { useState, useEffect } from "react";
import BlurFade from "../magicui/blur-fade";
import { Plus, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../utils/storage";
import type { Schedule } from "../../utils/storage";

export function JadwalKegiatan() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "delete">("add");
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });

  useEffect(() => {
    loadSchedules();
  }, []);

  const loadSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error("Error loading schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setModalMode("add");
    setFormData({ name: "", date: "", time: "", location: "" });
    setShowModal(true);
  };

  const handleEdit = (schedule: Schedule) => {
    setModalMode("edit");
    setSelectedSchedule(schedule);
    setFormData({
      name: schedule.name,
      date: schedule.date,
      time: schedule.time,
      location: schedule.location,
    });
    setShowModal(true);
  };

  const handleDelete = (schedule: Schedule) => {
    setModalMode("delete");
    setSelectedSchedule(schedule);
    setShowModal(true);
  };

  const handleSubmit = async () => {
    try {
      if (modalMode === "delete" && selectedSchedule) {
        await deleteSchedule(selectedSchedule.id);
      } else if (modalMode === "add") {
        await createSchedule(formData);
      } else if (modalMode === "edit" && selectedSchedule) {
        await updateSchedule(selectedSchedule.id, formData);
      }

      // Reload schedules
      await loadSchedules();

      setShowModal(false);
      setSelectedSchedule(null);
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-600">Memuat data jadwal...</div>
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
                Manajemen Jadwal Kegiatan
              </h2>
              <p className="text-sm text-gray-600">
                Kelola jadwal kegiatan masjid dan komunitas
              </p>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Tambah Jadwal
            </button>
          </div>
        </div>
      </BlurFade>

      {/* Schedule List */}
      <div className="grid gap-4">
        {schedules.map((schedule, index) => (
          <BlurFade key={schedule.id} delay={0.2 + index * 0.05} inView>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {schedule.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      {new Date(schedule.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      {schedule.time} WIB
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {schedule.location}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(schedule)}
                    className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(schedule)}
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
                  ? "Tambah Jadwal Baru"
                  : modalMode === "edit"
                  ? "Edit Jadwal"
                  : "Hapus Jadwal"}
              </h3>

              {modalMode === "delete" ? (
                <p className="text-gray-600 mb-6">
                  Yakin ingin menghapus jadwal "{selectedSchedule?.name}"?
                </p>
              ) : (
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nama Kegiatan
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Nama kegiatan"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Waktu
                      </label>
                      <input
                        type="time"
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lokasi
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Lokasi kegiatan"
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