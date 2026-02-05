# Setup Database Jamaah.net di Supabase

## Langkah-langkah Setup Database

### 1. Buka Supabase Dashboard
Buka [Supabase Dashboard](https://supabase.com/dashboard) dan login ke project Anda.

### 2. Buka SQL Editor
- Di sidebar kiri, klik **SQL Editor**
- Klik tombol **New Query**

### 3. Copy dan Jalankan SQL Schema
Copy seluruh isi file `/utils/supabase/database.sql` dan paste ke SQL Editor, kemudian klik **Run** untuk membuat semua tabel.

### 4. Struktur Database yang Dibuat

#### Tabel: `members`
Menyimpan data member/pengguna aplikasi Jamaah.net
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `email` (TEXT, Unique)
- `phone` (TEXT)
- `password_hash` (TEXT)
- `status` (TEXT: 'pending', 'active', 'rejected')
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### Tabel: `contents`
Menyimpan konten/postingan dari member
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `member_id` (UUID, Foreign Key ke members)
- `type` (TEXT: 'post', 'image', 'video')
- `status` (TEXT: 'pending', 'approved', 'rejected')
- `content_url` (TEXT, Optional)
- `description` (TEXT, Optional)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### Tabel: `masjid_posts`
Menyimpan postingan resmi dari masjid
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `content` (TEXT)
- `type` (TEXT: 'announcement', 'event')
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### Tabel: `schedules`
Menyimpan jadwal kegiatan masjid/jamaah
- `id` (UUID, Primary Key)
- `name` (TEXT)
- `date` (DATE)
- `time` (TIME)
- `location` (TEXT)
- `description` (TEXT, Optional)
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### Tabel: `articles`
Menyimpan artikel edukasi Islam
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `category` (TEXT)
- `content` (TEXT)
- `status` (TEXT: 'published', 'draft')
- `created_at`, `updated_at` (TIMESTAMPTZ)

#### Tabel: `donations`
Menyimpan program donasi
- `id` (UUID, Primary Key)
- `title` (TEXT)
- `description` (TEXT, Optional)
- `target_amount` (BIGINT)
- `collected_amount` (BIGINT)
- `status` (TEXT: 'pending', 'active', 'inactive')
- `created_at`, `updated_at` (TIMESTAMPTZ)

### 5. Row Level Security (RLS)
Database sudah dikonfigurasi dengan RLS untuk keamanan. Policy saat ini memberikan full access untuk admin.

**PENTING**: Untuk production, Anda perlu mengkonfigurasi authentication dan menyesuaikan RLS policies agar hanya admin authenticated yang bisa mengakses data.

### 6. Sample Data (Optional)
Jika Anda ingin menambahkan sample data untuk testing, jalankan query berikut:

```sql
-- Sample Members
INSERT INTO members (name, email, phone, password_hash, status) VALUES
  ('Ahmad Fauzi', 'ahmad.fauzi@email.com', '081234567890', 'hash123', 'pending'),
  ('Siti Nurhaliza', 'siti.nur@email.com', '081234567891', 'hash123', 'active'),
  ('Muhammad Rizki', 'm.rizki@email.com', '081234567892', 'hash123', 'pending');

-- Sample Contents
INSERT INTO contents (title, member_id, type, status, description) VALUES
  ('Kajian Islam: Akhlak Mulia', (SELECT id FROM members WHERE email = 'ahmad.fauzi@email.com'), 'post', 'pending', 'Kajian tentang akhlak dalam Islam'),
  ('Foto Kegiatan Masjid', (SELECT id FROM members WHERE email = 'siti.nur@email.com'), 'image', 'approved', 'Dokumentasi kegiatan');

-- Sample Masjid Posts
INSERT INTO masjid_posts (title, content, type) VALUES
  ('Pengumuman Shalat Jumat', 'Shalat Jumat akan dilaksanakan pukul 12.00 WIB', 'announcement'),
  ('Kegiatan Kajian Ramadhan', 'Kajian Ramadhan setiap hari pukul 16.00 WIB', 'event');

-- Sample Schedules
INSERT INTO schedules (name, date, time, location) VALUES
  ('Kajian Rutin Mingguan', '2026-01-24', '19:00', 'Masjid Al-Ikhlas'),
  ('Pelatihan Tahsin Quran', '2026-01-25', '16:00', 'Ruang Serbaguna Masjid');

-- Sample Articles
INSERT INTO articles (title, category, content, status) VALUES
  ('Pentingnya Menjaga Shalat Lima Waktu', 'Ibadah', 'Artikel tentang pentingnya shalat...', 'published'),
  ('Adab Berbicara dalam Islam', 'Akhlak', 'Artikel tentang adab berbicara...', 'published');

-- Sample Donations
INSERT INTO donations (title, target_amount, collected_amount, status) VALUES
  ('Pembangunan Masjid Al-Ikhlas', 500000000, 125000000, 'active'),
  ('Bantuan untuk Korban Bencana', 100000000, 75000000, 'active'),
  ('Program Beasiswa Anak Yatim', 50000000, 10000000, 'pending');
```

### 7. Verifikasi Setup
Setelah menjalankan SQL schema dan sample data, verifikasi dengan:
1. Buka **Table Editor** di Supabase Dashboard
2. Pastikan semua tabel terlihat
3. Cek data sample sudah masuk dengan benar
4. Test dashboard admin untuk memastikan data tampil

### 8. Integrasi dengan Aplikasi Mobile
Database ini siap digunakan oleh aplikasi mobile Jamaah.net. Pastikan aplikasi mobile menggunakan:
- Supabase Client Library yang sama
- Project ID dan Anon Key yang sama
- Schema/struktur tabel yang sesuai

### 9. Keamanan untuk Production
Sebelum deploy ke production, pastikan:
1. Setup Supabase Authentication
2. Konfigurasi RLS policies yang lebih ketat
3. Batasi akses admin berdasarkan role/permission
4. Aktifkan rate limiting
5. Enable database backups

### Troubleshooting
- **Error: relation already exists**: Tabel sudah ada. Hapus dulu atau skip create table.
- **Error: permission denied**: Pastikan Anda login sebagai owner/admin project.
- **Data tidak muncul di dashboard**: Cek console browser untuk error, pastikan Supabase URL dan Key sudah benar.

## Kontak Support
Jika ada masalah dengan setup database, silakan hubungi tim development Jamaah.net.
