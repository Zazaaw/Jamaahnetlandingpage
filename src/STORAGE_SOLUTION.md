# Dashboard Jamaah.net - Storage Solution

## ✅ Current Implementation

Dashboard admin Jamaah.net menggunakan **localStorage** untuk penyimpanan data client-side. Solusi ini memberikan:

- ✅ **No server setup required** - Langsung berfungsi tanpa konfigurasi
- ✅ **Data persistence** - Data tetap tersimpan setelah refresh browser
- ✅ **Fast performance** - Akses data langsung dari client
- ✅ **Sample data included** - Auto-load sample data untuk testing
- ✅ **Full CRUD operations** - Semua operasi Create, Read, Update, Delete tersedia

## 📦 Storage Structure

File: `/utils/storage.ts`

Data disimpan dengan prefix `jamaah_`:
- `jamaah_members` - Data member/pengguna
- `jamaah_contents` - Konten/postingan dari member
- `jamaah_masjid_posts` - Postingan resmi masjid
- `jamaah_schedules` - Jadwal kegiatan
- `jamaah_articles` - Artikel edukasi Islam
- `jamaah_donations` - Program donasi

## 🎯 Sample Data

Dashboard otomatis membuat sample data saat pertama kali diakses:

### Members (4 data)
- 2 member dengan status "pending"
- 2 member dengan status "active"

### Contents (4 data)
- 2 konten dengan status "pending"
- 2 konten dengan status "approved"
- Berbagai tipe: post, image, video

### Masjid Posts (2 data)
- Pengumuman dan Event

### Schedules (2 data)
- Kajian dan Pelatihan

### Articles (3 data)
- 2 published articles
- 1 draft article

### Donations (3 data)
- 2 active donations
- 1 pending donation

## 🔄 How It Works

1. **Initialization**: Saat pertama kali load, sistem check localStorage
2. **Sample Data**: Jika belum ada data, otomatis create sample data
3. **CRUD Operations**: Semua perubahan langsung disimpan ke localStorage
4. **Persistence**: Data tetap ada setelah refresh atau close browser

## 💾 Data Persistence

Data disimpan di browser localStorage:
- **Scope**: Per browser, per domain
- **Size limit**: ~5-10MB (cukup untuk prototype)
- **Lifetime**: Sampai user manually clear browser data
- **Sync**: Tidak sync antar device/browser

## 🔐 Security Considerations

### Current Implementation (Development)
- Data stored in plain text in localStorage
- No encryption
- Accessible via browser DevTools
- **Suitable for**: Development, prototype, demo

### For Production
Jika akan deploy ke production:

1. **Option 1: Supabase Database** (Recommended)
   - Setup proper database tables
   - Enable Row Level Security (RLS)
   - Add authentication layer
   - See `/utils/supabase/database.sql` for schema

2. **Option 2: Secure API Backend**
   - Create REST API server
   - Add authentication middleware
   - Implement proper authorization
   - Encrypt sensitive data

3. **Option 3: Firebase/Other Backend**
   - Setup Firebase Authentication
   - Use Firestore for data storage
   - Configure security rules

## 🔄 Migration to Supabase (Optional)

Jika ingin migrate ke Supabase database:

### Step 1: Setup Database
```bash
# Copy SQL schema
# File: /utils/supabase/database.sql

# Execute in Supabase SQL Editor
```

### Step 2: Export Data from localStorage
```javascript
// Run in browser console
const data = {
  members: JSON.parse(localStorage.getItem('jamaah_members')),
  contents: JSON.parse(localStorage.getItem('jamaah_contents')),
  // ... export all data
};
console.log(JSON.stringify(data, null, 2));
```

### Step 3: Update Imports
Change from:
```typescript
import { getMembers } from "../../utils/storage";
```

To:
```typescript
import { getMembers } from "../../utils/supabase/queries";
```

## 🎨 Features

### Dashboard Overview
- Real-time statistics
- Total members, pending members
- Pending contents count
- Active donations count

### Member Management
- View all members
- Approve/reject registrations
- Reset password (placeholder)
- Search by name or email

### Content Review
- Review member posts
- Approve/reject content
- Take-down published content
- Filter by status

### Masjid Posts
- Create announcements
- Create event posts
- Edit existing posts
- Delete posts

### Schedule Management
- Add new schedules
- Edit schedule details
- Delete schedules
- Calendar view

### Article Management
- Create articles
- Edit content
- Publish/unpublish
- Category management

### Donation Management
- Approve donation programs
- Monitor progress
- Deactivate campaigns
- Real-time progress bars

## 🛠️ Development Tips

### Clear All Data
```javascript
// Run in browser console
Object.keys(localStorage)
  .filter(key => key.startsWith('jamaah_'))
  .forEach(key => localStorage.removeItem(key));
localStorage.removeItem('jamaah_initialized');
// Reload page to reinitialize
```

### Add Custom Data
```javascript
// Example: Add new member
const members = JSON.parse(localStorage.getItem('jamaah_members'));
members.push({
  id: 'm5',
  name: 'New Member',
  email: 'new@email.com',
  phone: '081234567894',
  status: 'pending',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});
localStorage.setItem('jamaah_members', JSON.stringify(members));
```

### Debug Storage
```javascript
// View all stored data
Object.keys(localStorage)
  .filter(key => key.startsWith('jamaah_'))
  .forEach(key => {
    console.log(key, JSON.parse(localStorage.getItem(key)));
  });
```

## 📱 Mobile App Integration

Untuk integrasi dengan aplikasi mobile:

1. **Shared Supabase**: Setup Supabase database dan gunakan untuk both web & mobile
2. **REST API**: Create API endpoint yang bisa diakses both platforms
3. **Sync Strategy**: Implement sync mechanism untuk offline-first apps

## 🚀 Current Status

✅ **Fully Functional** - Dashboard berfungsi 100%
✅ **Sample Data** - Data test tersedia
✅ **All CRUD** - Semua operasi bekerja
✅ **Persistent** - Data tidak hilang setelah refresh
✅ **Production Ready** - Untuk prototype/demo
⚠️ **Not Production** - Perlu proper database untuk production

## 📞 Support

Dashboard admin Jamaah.net siap digunakan untuk development dan testing!

Untuk production deployment, pertimbangkan untuk migrate ke Supabase database atau backend solution lainnya.
