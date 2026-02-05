// Using KV Store for data persistence
// This is a temporary solution until proper database tables are created

import * as kv from "../../supabase/functions/server/kv_store";

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

// Initialize with sample data if empty
async function initializeSampleData() {
  try {
    // Check if data already exists
    const existingMembers = await kv.getByPrefix("member:");
    if (existingMembers.length === 0) {
      // Initialize sample members
      const sampleMembers: Member[] = [
        {
          id: "m1",
          name: "Ahmad Fauzi",
          email: "ahmad.fauzi@email.com",
          phone: "081234567890",
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "m2",
          name: "Siti Nurhaliza",
          email: "siti.nur@email.com",
          phone: "081234567891",
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "m3",
          name: "Muhammad Rizki",
          email: "m.rizki@email.com",
          phone: "081234567892",
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      for (const member of sampleMembers) {
        await kv.set(`member:${member.id}`, member);
      }

      // Initialize sample contents
      const sampleContents: Content[] = [
        {
          id: "c1",
          title: "Kajian Islam: Akhlak Mulia",
          member_id: "m1",
          member_name: "Ahmad Fauzi",
          type: "post",
          status: "pending",
          description: "Kajian tentang akhlak dalam Islam",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "c2",
          title: "Foto Kegiatan Masjid",
          member_id: "m2",
          member_name: "Siti Nurhaliza",
          type: "image",
          status: "approved",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      for (const content of sampleContents) {
        await kv.set(`content:${content.id}`, content);
      }

      // Initialize sample masjid posts
      const samplePosts: MasjidPost[] = [
        {
          id: "p1",
          title: "Pengumuman Shalat Jumat",
          content: "Shalat Jumat akan dilaksanakan pukul 12.00 WIB",
          type: "announcement",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      for (const post of samplePosts) {
        await kv.set(`masjid_post:${post.id}`, post);
      }

      // Initialize sample schedules
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
      ];

      for (const schedule of sampleSchedules) {
        await kv.set(`schedule:${schedule.id}`, schedule);
      }

      // Initialize sample articles
      const sampleArticles: Article[] = [
        {
          id: "a1",
          title: "Pentingnya Menjaga Shalat Lima Waktu",
          category: "Ibadah",
          content: "Shalat merupakan tiang agama...",
          status: "published",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      for (const article of sampleArticles) {
        await kv.set(`article:${article.id}`, article);
      }

      // Initialize sample donations
      const sampleDonations: Donation[] = [
        {
          id: "d1",
          title: "Pembangunan Masjid Al-Ikhlas",
          target_amount: 500000000,
          collected_amount: 125000000,
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "d2",
          title: "Program Beasiswa Anak Yatim",
          target_amount: 50000000,
          collected_amount: 10000000,
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      for (const donation of sampleDonations) {
        await kv.set(`donation:${donation.id}`, donation);
      }
    }
  } catch (error) {
    console.error("Error initializing sample data:", error);
  }
}

// Members
export async function getMembers(): Promise<Member[]> {
  await initializeSampleData();
  const data = await kv.getByPrefix("member:");
  return data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getMemberById(id: string): Promise<Member | null> {
  return await kv.get(`member:${id}`);
}

export async function approveMember(id: string): Promise<Member> {
  const member = await kv.get(`member:${id}`);
  if (!member) throw new Error("Member not found");
  member.status = "active";
  member.updated_at = new Date().toISOString();
  await kv.set(`member:${id}`, member);
  return member;
}

export async function rejectMember(id: string): Promise<Member> {
  const member = await kv.get(`member:${id}`);
  if (!member) throw new Error("Member not found");
  member.status = "rejected";
  member.updated_at = new Date().toISOString();
  await kv.set(`member:${id}`, member);
  return member;
}

export async function getMemberStats() {
  const members = await getMembers();
  return {
    totalMembers: members.length,
    pendingMembers: members.filter((m) => m.status === "pending").length,
  };
}

// Contents
export async function getContents(): Promise<Content[]> {
  await initializeSampleData();
  const data = await kv.getByPrefix("content:");
  return data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function approveContent(id: string): Promise<Content> {
  const content = await kv.get(`content:${id}`);
  if (!content) throw new Error("Content not found");
  content.status = "approved";
  content.updated_at = new Date().toISOString();
  await kv.set(`content:${id}`, content);
  return content;
}

export async function rejectContent(id: string): Promise<Content> {
  const content = await kv.get(`content:${id}`);
  if (!content) throw new Error("Content not found");
  content.status = "rejected";
  content.updated_at = new Date().toISOString();
  await kv.set(`content:${id}`, content);
  return content;
}

export async function deleteContent(id: string): Promise<void> {
  await kv.del(`content:${id}`);
}

export async function getContentStats() {
  const contents = await getContents();
  return {
    pendingContents: contents.filter((c) => c.status === "pending").length,
  };
}

// Masjid Posts
export async function getMasjidPosts(): Promise<MasjidPost[]> {
  await initializeSampleData();
  const data = await kv.getByPrefix("masjid_post:");
  return data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createMasjidPost(
  post: Omit<MasjidPost, "id" | "created_at" | "updated_at">
): Promise<MasjidPost> {
  const id = `p${Date.now()}`;
  const newPost: MasjidPost = {
    ...post,
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await kv.set(`masjid_post:${id}`, newPost);
  return newPost;
}

export async function updateMasjidPost(
  id: string,
  post: Partial<Omit<MasjidPost, "id" | "created_at" | "updated_at">>
): Promise<MasjidPost> {
  const existing = await kv.get(`masjid_post:${id}`);
  if (!existing) throw new Error("Post not found");
  const updated = {
    ...existing,
    ...post,
    updated_at: new Date().toISOString(),
  };
  await kv.set(`masjid_post:${id}`, updated);
  return updated;
}

export async function deleteMasjidPost(id: string): Promise<void> {
  await kv.del(`masjid_post:${id}`);
}

// Schedules
export async function getSchedules(): Promise<Schedule[]> {
  await initializeSampleData();
  const data = await kv.getByPrefix("schedule:");
  return data.sort((a, b) => a.date.localeCompare(b.date));
}

export async function createSchedule(
  schedule: Omit<Schedule, "id" | "created_at" | "updated_at">
): Promise<Schedule> {
  const id = `s${Date.now()}`;
  const newSchedule: Schedule = {
    ...schedule,
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await kv.set(`schedule:${id}`, newSchedule);
  return newSchedule;
}

export async function updateSchedule(
  id: string,
  schedule: Partial<Omit<Schedule, "id" | "created_at" | "updated_at">>
): Promise<Schedule> {
  const existing = await kv.get(`schedule:${id}`);
  if (!existing) throw new Error("Schedule not found");
  const updated = {
    ...existing,
    ...schedule,
    updated_at: new Date().toISOString(),
  };
  await kv.set(`schedule:${id}`, updated);
  return updated;
}

export async function deleteSchedule(id: string): Promise<void> {
  await kv.del(`schedule:${id}`);
}

// Articles
export async function getArticles(): Promise<Article[]> {
  await initializeSampleData();
  const data = await kv.getByPrefix("article:");
  return data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createArticle(
  article: Omit<Article, "id" | "created_at" | "updated_at">
): Promise<Article> {
  const id = `a${Date.now()}`;
  const newArticle: Article = {
    ...article,
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await kv.set(`article:${id}`, newArticle);
  return newArticle;
}

export async function updateArticle(
  id: string,
  article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>
): Promise<Article> {
  const existing = await kv.get(`article:${id}`);
  if (!existing) throw new Error("Article not found");
  const updated = {
    ...existing,
    ...article,
    updated_at: new Date().toISOString(),
  };
  await kv.set(`article:${id}`, updated);
  return updated;
}

// Donations
export async function getDonations(): Promise<Donation[]> {
  await initializeSampleData();
  const data = await kv.getByPrefix("donation:");
  return data.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function createDonation(
  donation: Omit<Donation, "id" | "created_at" | "updated_at">
): Promise<Donation> {
  const id = `d${Date.now()}`;
  const newDonation: Donation = {
    ...donation,
    id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  await kv.set(`donation:${id}`, newDonation);
  return newDonation;
}

export async function updateDonation(
  id: string,
  donation: Partial<Omit<Donation, "id" | "created_at" | "updated_at">>
): Promise<Donation> {
  const existing = await kv.get(`donation:${id}`);
  if (!existing) throw new Error("Donation not found");
  const updated = {
    ...existing,
    ...donation,
    updated_at: new Date().toISOString(),
  };
  await kv.set(`donation:${id}`, updated);
  return updated;
}

export async function approveDonation(id: string): Promise<Donation> {
  const donation = await kv.get(`donation:${id}`);
  if (!donation) throw new Error("Donation not found");
  donation.status = "active";
  donation.updated_at = new Date().toISOString();
  await kv.set(`donation:${id}`, donation);
  return donation;
}

export async function deactivateDonation(id: string): Promise<Donation> {
  const donation = await kv.get(`donation:${id}`);
  if (!donation) throw new Error("Donation not found");
  donation.status = "inactive";
  donation.updated_at = new Date().toISOString();
  await kv.set(`donation:${id}`, donation);
  return donation;
}

export async function getDonationStats() {
  const donations = await getDonations();
  return {
    activeDonations: donations.filter((d) => d.status === "active").length,
  };
}
