// Client-side data storage using localStorage
// This provides a simple data persistence layer without requiring server setup

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "active" | "rejected";
  created_at: string;
  updated_at: string;
}

export interface Content {
  id: string;
  title: string;
  member_id: string;
  member_name?: string;
  type: "post" | "image" | "video";
  status: "pending" | "approved" | "rejected";
  content_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface MasjidPost {
  id: string;
  title: string;
  content: string;
  type: "announcement" | "event";
  created_at: string;
  updated_at: string;
}

export interface Schedule {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
}

export interface Donation {
  id: string;
  title: string;
  description?: string;
  target_amount: number;
  collected_amount: number;
  status: "pending" | "active" | "inactive";
  created_at: string;
  updated_at: string;
}

// Storage helper functions
const STORAGE_PREFIX = "jamaah_";

function getFromStorage<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setToStorage<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving to storage:", error);
  }
}

// Initialize sample data
function initializeSampleData() {
  // Check if already initialized
  const initialized = localStorage.getItem(STORAGE_PREFIX + "initialized");
  if (initialized) return;

  // Sample Members
  const sampleMembers: Member[] = [
    {
      id: "m1",
      name: "Ahmad Fauzi",
      email: "ahmad.fauzi@email.com",
      phone: "081234567890",
      status: "pending",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
    {
      id: "m2",
      name: "Siti Nurhaliza",
      email: "siti.nur@email.com",
      phone: "081234567891",
      status: "active",
      created_at: new Date("2026-01-18").toISOString(),
      updated_at: new Date("2026-01-18").toISOString(),
    },
    {
      id: "m3",
      name: "Muhammad Rizki",
      email: "m.rizki@email.com",
      phone: "081234567892",
      status: "pending",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
    {
      id: "m4",
      name: "Fatimah Azzahra",
      email: "fatimah.az@email.com",
      phone: "081234567893",
      status: "active",
      created_at: new Date("2026-01-17").toISOString(),
      updated_at: new Date("2026-01-17").toISOString(),
    },
  ];
  setToStorage("members", sampleMembers);

  // Sample Contents
  const sampleContents: Content[] = [
    {
      id: "c1",
      title: "Kajian Islam: Akhlak Mulia",
      member_id: "m1",
      member_name: "Ahmad Fauzi",
      type: "post",
      status: "pending",
      description: "Kajian tentang akhlak dalam Islam",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
    {
      id: "c2",
      title: "Foto Kegiatan Masjid",
      member_id: "m2",
      member_name: "Siti Nurhaliza",
      type: "image",
      status: "approved",
      created_at: new Date("2026-01-18").toISOString(),
      updated_at: new Date("2026-01-18").toISOString(),
    },
    {
      id: "c3",
      title: "Video Ceramah Ustadz",
      member_id: "m3",
      member_name: "Muhammad Rizki",
      type: "video",
      status: "pending",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
    {
      id: "c4",
      title: "Artikel Fiqih Shalat",
      member_id: "m4",
      member_name: "Fatimah Azzahra",
      type: "post",
      status: "approved",
      created_at: new Date("2026-01-17").toISOString(),
      updated_at: new Date("2026-01-17").toISOString(),
    },
  ];
  setToStorage("contents", sampleContents);

  // Sample Masjid Posts
  const samplePosts: MasjidPost[] = [
    {
      id: "p1",
      title: "Pengumuman Shalat Jumat",
      content: "Shalat Jumat akan dilaksanakan pukul 12.00 WIB",
      type: "announcement",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
    {
      id: "p2",
      title: "Kegiatan Kajian Ramadhan",
      content: "Kajian Ramadhan setiap hari pukul 16.00 WIB",
      type: "event",
      created_at: new Date("2026-01-18").toISOString(),
      updated_at: new Date("2026-01-18").toISOString(),
    },
  ];
  setToStorage("masjid_posts", samplePosts);

  // Sample Schedules
  const sampleSchedules: Schedule[] = [
    {
      id: "s1",
      name: "Kajian Rutin Mingguan",
      date: "2026-01-24",
      time: "19:00",
      location: "Masjid Al-Ikhlas",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "s2",
      name: "Pelatihan Tahsin Quran",
      date: "2026-01-25",
      time: "16:00",
      location: "Ruang Serbaguna Masjid",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];
  setToStorage("schedules", sampleSchedules);

  // Sample Articles
  const sampleArticles: Article[] = [
    {
      id: "a1",
      title: "Pentingnya Menjaga Shalat Lima Waktu",
      category: "Ibadah",
      content:
        "Shalat merupakan tiang agama Islam. Artikel ini membahas pentingnya menjaga shalat lima waktu dalam kehidupan sehari-hari seorang muslim.",
      status: "published",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
    {
      id: "a2",
      title: "Adab Berbicara dalam Islam",
      category: "Akhlak",
      content:
        "Islam mengajarkan berbagai adab dalam berbicara. Pelajari bagaimana cara berbicara yang baik sesuai tuntunan Islam.",
      status: "published",
      created_at: new Date("2026-01-18").toISOString(),
      updated_at: new Date("2026-01-18").toISOString(),
    },
    {
      id: "a3",
      title: "Mengenal Rukun Islam",
      category: "Aqidah",
      content:
        "Lima rukun Islam yang harus diketahui oleh setiap muslim. Draft artikel untuk review.",
      status: "draft",
      created_at: new Date("2026-01-17").toISOString(),
      updated_at: new Date("2026-01-17").toISOString(),
    },
  ];
  setToStorage("articles", sampleArticles);

  // Sample Donations
  const sampleDonations: Donation[] = [
    {
      id: "d1",
      title: "Pembangunan Masjid Al-Ikhlas",
      description: "Program pembangunan masjid di desa terpencil",
      target_amount: 500000000,
      collected_amount: 125000000,
      status: "active",
      created_at: new Date("2026-01-15").toISOString(),
      updated_at: new Date("2026-01-15").toISOString(),
    },
    {
      id: "d2",
      title: "Bantuan untuk Korban Bencana",
      description: "Bantuan untuk korban bencana alam",
      target_amount: 100000000,
      collected_amount: 75000000,
      status: "active",
      created_at: new Date("2026-01-18").toISOString(),
      updated_at: new Date("2026-01-18").toISOString(),
    },
    {
      id: "d3",
      title: "Program Beasiswa Anak Yatim",
      description: "Beasiswa pendidikan untuk anak yatim",
      target_amount: 50000000,
      collected_amount: 10000000,
      status: "pending",
      created_at: new Date("2026-01-19").toISOString(),
      updated_at: new Date("2026-01-19").toISOString(),
    },
  ];
  setToStorage("donations", sampleDonations);

  localStorage.setItem(STORAGE_PREFIX + "initialized", "true");
}

// Initialize data on module load
if (typeof window !== "undefined") {
  initializeSampleData();
}

// Members API
export async function getMembers(): Promise<Member[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const members = getFromStorage<Member>("members");
      resolve(
        members.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }, 100);
  });
}

export async function getMemberById(id: string): Promise<Member | null> {
  const members = getFromStorage<Member>("members");
  return members.find((m) => m.id === id) || null;
}

export async function approveMember(id: string): Promise<Member> {
  const members = getFromStorage<Member>("members");
  const member = members.find((m) => m.id === id);
  if (!member) throw new Error("Member not found");
  member.status = "active";
  member.updated_at = new Date().toISOString();
  setToStorage("members", members);
  return member;
}

export async function rejectMember(id: string): Promise<Member> {
  const members = getFromStorage<Member>("members");
  const member = members.find((m) => m.id === id);
  if (!member) throw new Error("Member not found");
  member.status = "rejected";
  member.updated_at = new Date().toISOString();
  setToStorage("members", members);
  return member;
}

export async function getMemberStats() {
  const members = await getMembers();
  return {
    totalMembers: members.length,
    pendingMembers: members.filter((m) => m.status === "pending").length,
  };
}

// Contents API
export async function getContents(): Promise<Content[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const contents = getFromStorage<Content>("contents");
      resolve(
        contents.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }, 100);
  });
}

export async function approveContent(id: string): Promise<Content> {
  const contents = getFromStorage<Content>("contents");
  const content = contents.find((c) => c.id === id);
  if (!content) throw new Error("Content not found");
  content.status = "approved";
  content.updated_at = new Date().toISOString();
  setToStorage("contents", contents);
  return content;
}

export async function rejectContent(id: string): Promise<Content> {
  const contents = getFromStorage<Content>("contents");
  const content = contents.find((c) => c.id === id);
  if (!content) throw new Error("Content not found");
  content.status = "rejected";
  content.updated_at = new Date().toISOString();
  setToStorage("contents", contents);
  return content;
}

export async function deleteContent(id: string): Promise<void> {
  const contents = getFromStorage<Content>("contents");
  const filtered = contents.filter((c) => c.id !== id);
  setToStorage("contents", filtered);
}

export async function getContentStats() {
  const contents = await getContents();
  return {
    pendingContents: contents.filter((c) => c.status === "pending").length,
  };
}

// Masjid Posts API
export async function getMasjidPosts(): Promise<MasjidPost[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getFromStorage<MasjidPost>("masjid_posts");
      resolve(
        posts.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }, 100);
  });
}

export async function createMasjidPost(
  post: Omit<MasjidPost, "id" | "created_at" | "updated_at">
): Promise<MasjidPost> {
  const posts = getFromStorage<MasjidPost>("masjid_posts");
  const newPost: MasjidPost = {
    ...post,
    id: `p${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  posts.push(newPost);
  setToStorage("masjid_posts", posts);
  return newPost;
}

export async function updateMasjidPost(
  id: string,
  post: Partial<Omit<MasjidPost, "id" | "created_at" | "updated_at">>
): Promise<MasjidPost> {
  const posts = getFromStorage<MasjidPost>("masjid_posts");
  const existing = posts.find((p) => p.id === id);
  if (!existing) throw new Error("Post not found");
  Object.assign(existing, post);
  existing.updated_at = new Date().toISOString();
  setToStorage("masjid_posts", posts);
  return existing;
}

export async function deleteMasjidPost(id: string): Promise<void> {
  const posts = getFromStorage<MasjidPost>("masjid_posts");
  const filtered = posts.filter((p) => p.id !== id);
  setToStorage("masjid_posts", filtered);
}

// Schedules API
export async function getSchedules(): Promise<Schedule[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const schedules = getFromStorage<Schedule>("schedules");
      resolve(schedules.sort((a, b) => a.date.localeCompare(b.date)));
    }, 100);
  });
}

export async function createSchedule(
  schedule: Omit<Schedule, "id" | "created_at" | "updated_at">
): Promise<Schedule> {
  const schedules = getFromStorage<Schedule>("schedules");
  const newSchedule: Schedule = {
    ...schedule,
    id: `s${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  schedules.push(newSchedule);
  setToStorage("schedules", schedules);
  return newSchedule;
}

export async function updateSchedule(
  id: string,
  schedule: Partial<Omit<Schedule, "id" | "created_at" | "updated_at">>
): Promise<Schedule> {
  const schedules = getFromStorage<Schedule>("schedules");
  const existing = schedules.find((s) => s.id === id);
  if (!existing) throw new Error("Schedule not found");
  Object.assign(existing, schedule);
  existing.updated_at = new Date().toISOString();
  setToStorage("schedules", schedules);
  return existing;
}

export async function deleteSchedule(id: string): Promise<void> {
  const schedules = getFromStorage<Schedule>("schedules");
  const filtered = schedules.filter((s) => s.id !== id);
  setToStorage("schedules", filtered);
}

// Articles API
export async function getArticles(): Promise<Article[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const articles = getFromStorage<Article>("articles");
      resolve(
        articles.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }, 100);
  });
}

export async function createArticle(
  article: Omit<Article, "id" | "created_at" | "updated_at">
): Promise<Article> {
  const articles = getFromStorage<Article>("articles");
  const newArticle: Article = {
    ...article,
    id: `a${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  articles.push(newArticle);
  setToStorage("articles", articles);
  return newArticle;
}

export async function updateArticle(
  id: string,
  article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>
): Promise<Article> {
  const articles = getFromStorage<Article>("articles");
  const existing = articles.find((a) => a.id === id);
  if (!existing) throw new Error("Article not found");
  Object.assign(existing, article);
  existing.updated_at = new Date().toISOString();
  setToStorage("articles", articles);
  return existing;
}

// Donations API
export async function getDonations(): Promise<Donation[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const donations = getFromStorage<Donation>("donations");
      resolve(
        donations.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      );
    }, 100);
  });
}

export async function createDonation(
  donation: Omit<Donation, "id" | "created_at" | "updated_at">
): Promise<Donation> {
  const donations = getFromStorage<Donation>("donations");
  const newDonation: Donation = {
    ...donation,
    id: `d${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  donations.push(newDonation);
  setToStorage("donations", donations);
  return newDonation;
}

export async function updateDonation(
  id: string,
  donation: Partial<Omit<Donation, "id" | "created_at" | "updated_at">>
): Promise<Donation> {
  const donations = getFromStorage<Donation>("donations");
  const existing = donations.find((d) => d.id === id);
  if (!existing) throw new Error("Donation not found");
  Object.assign(existing, donation);
  existing.updated_at = new Date().toISOString();
  setToStorage("donations", donations);
  return existing;
}

export async function approveDonation(id: string): Promise<Donation> {
  const donations = getFromStorage<Donation>("donations");
  const donation = donations.find((d) => d.id === id);
  if (!donation) throw new Error("Donation not found");
  donation.status = "active";
  donation.updated_at = new Date().toISOString();
  setToStorage("donations", donations);
  return donation;
}

export async function deactivateDonation(id: string): Promise<Donation> {
  const donations = getFromStorage<Donation>("donations");
  const donation = donations.find((d) => d.id === id);
  if (!donation) throw new Error("Donation not found");
  donation.status = "inactive";
  donation.updated_at = new Date().toISOString();
  setToStorage("donations", donations);
  return donation;
}

export async function getDonationStats() {
  const donations = await getDonations();
  return {
    activeDonations: donations.filter((d) => d.status === "active").length,
  };
}
