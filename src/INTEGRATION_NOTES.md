# Integrasi Dashboard Jamaah.net

## ✅ Status Integrasi Saat Ini

Dashboard admin Jamaah.net saat ini menggunakan **KV Store** sebagai penyimpanan data sementara. Ini memungkinkan dashboard berfungsi penuh tanpa perlu setup database terlebih dahulu.

## 📦 Struktur Penyimpanan KV Store

Data disimpan dengan prefix berikut:
- `member:*` - Data member/pengguna
- `content:*` - Konten/postingan dari member
- `masjid_post:*` - Postingan resmi masjid
- `schedule:*` - Jadwal kegiatan
- `article:*` - Artikel edukasi Islam
- `donation:*` - Program donasi

## 🔄 Migrasi ke Database Supabase (Opsional)

Jika Anda ingin menggunakan database Supabase yang proper dengan tabel-tabel terpisah:

### Langkah 1: Setup Database
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Buka **SQL Editor** → **New Query**
3. Copy isi file `/utils/supabase/database.sql`
4. Paste dan klik **Run**

### Langkah 2: Ganti Import di Komponen
Ganti import dari `kv-queries` ke `queries` di semua komponen:

```typescript
// Dari:
import { getMembers } from "../../utils/supabase/kv-queries";

// Menjadi:
import { getMembers } from "../../utils/supabase/queries";
```

File yang perlu diubah:
- `/components/admin/DashboardOverview.tsx`
- `/components/admin/ManagementMember.tsx`
- `/components/admin/ReviewContent.tsx`
- `/components/admin/PostinganMasjid.tsx`
- `/components/admin/JadwalKegiatan.tsx`
- `/components/admin/Artikel.tsx`
- `/components/admin/Donasi.tsx`

### Langkah 3: Migrasi Data (Opsional)
Jika sudah ada data di KV Store dan ingin migrasi ke database:

1. Export data dari KV Store
2. Transform ke format SQL
3. Import ke database Supabase

## 🎯 Keuntungan Menggunakan KV Store

**Keuntungan:**
- ✅ Langsung bisa digunakan tanpa setup
- ✅ Tidak perlu configurasi database
- ✅ Simple dan cepat untuk prototyping
- ✅ Data persisten

**Kekurangan:**
- ❌ Query capability terbatas
- ❌ Tidak ada relational queries
- ❌ Performance lebih lambat untuk data besar

## 🎯 Keuntungan Menggunakan Database Supabase

**Keuntungan:**
- ✅ Relational queries (JOIN, etc.)
- ✅ Full-text search
- ✅ Real-time subscriptions
- ✅ Better performance untuk data besar
- ✅ Row Level Security (RLS)
- ✅ Automatic backups

**Kekurangan:**
- ❌ Perlu setup awal
- ❌ Lebih kompleks

## 🔐 Keamanan

### KV Store (Saat Ini)
- Data accessible melalui Supabase service
- Tidak ada Row Level Security
- Suitable untuk prototype/development

### Database Supabase (Recommended untuk Production)
- Row Level Security enabled
- Fine-grained access control
- Audit logging
- Better untuk production

## 📱 Sinkronisasi dengan Aplikasi Mobile

### Scenario 1: Mobile App juga menggunakan KV Store
Dashboard dan mobile app sudah tersinkronisasi karena menggunakan storage yang sama.

### Scenario 2: Mobile App menggunakan Database Supabase
Anda perlu:
1. Setup database seperti di atas
2. Ubah dashboard untuk menggunakan `queries` instead of `kv-queries`
3. Pastikan schema tabel match dengan yang digunakan mobile app

## 🚀 Rekomendasi

**Untuk Development/Prototype:**
✅ Gunakan KV Store (current implementation)

**Untuk Production:**
✅ Migrate ke Database Supabase dengan proper schema dan RLS

## 📞 Support

Jika ada pertanyaan tentang integrasi, silakan hubungi tim development.

## 🔄 Current Implementation

Dashboard saat ini menggunakan `/utils/supabase/kv-queries.ts` yang:
- Automatically initialize sample data on first load
- Provides full CRUD operations
- Compatible dengan aplikasi mobile jika mobile juga menggunakan KV Store

Semua data disimpan di Supabase KV Store dan persisten across sessions.
