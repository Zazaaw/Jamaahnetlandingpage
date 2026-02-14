import { supabase } from "./client";
import type {
  Member,
  Content,
  MasjidPost,
  Schedule,
  Article,
  Donation,
} from "./client";

// ============================================
// MEMBERS QUERIES (Tabel: profiles)
// ============================================

export async function getMembers() {
  // Mengambil data dari tabel 'profiles'
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Member[];
}

export async function getMemberById(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Member;
}

export async function approveMember(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ status: "active" }) // Mengubah status jadi active
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Member;
}

export async function rejectMember(id: string) {
  const { data, error } = await supabase
    .from("profiles")
    .update({ status: "suspended" }) // Di app statusnya 'suspended', bukan rejected
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Member;
}

// NOTE: Reset password tidak bisa update table manual di Supabase Auth.
// Harus menggunakan supabase.auth.admin.updateUserById (butuh Service Role)
// Function ini saya matikan sementara agar tidak error logic.
export async function resetMemberPassword(id: string, newPasswordHash: string) {
  console.warn("Reset password harus melalui Supabase Auth Admin API");
  return null;
}

export async function getMemberStats() {
  const { count: totalMembers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true });

  const { count: pendingMembers } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return {
    totalMembers: totalMembers || 0,
    pendingMembers: pendingMembers || 0,
  };
}

// ============================================
// CONTENTS QUERIES (Tabel: timeline_posts)
// ============================================

export async function getContents() {
  // Join ke tabel profiles menggunakan user_id
  const { data, error } = await supabase
    .from("timeline_posts")
    .select(`
      *,
      profiles:user_id (
        name,
        member_id,
        avatar_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Mapping data biar enak dibaca frontend admin
  return (data || []).map((item: any) => ({
    ...item,
    member_name: item.profiles?.name || "Unknown",
    member_id_display: item.profiles?.member_id || "-",
  })) as Content[];
}

export async function approveContent(id: string) {
  // Asumsi kamu sudah menambah kolom 'status' di timeline_posts
  // Jika belum ada, query ini mungkin error. Pastikan tambah kolom status dulu.
  const { data, error } = await supabase
    .from("timeline_posts")
    .update({ visibility: "public" }) // Atau update status: 'approved'
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Content;
}

export async function rejectContent(id: string) {
  const { data, error } = await supabase
    .from("timeline_posts")
    .update({ visibility: "private" }) // Atau status: 'rejected'
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Content;
}

export async function deleteContent(id: string) {
  const { error } = await supabase.from("timeline_posts").delete().eq("id", id);
  if (error) throw error;
}

export async function getContentStats() {
  // Menghitung konten yang visibility-nya masih pending/private
  const { count: pendingContents } = await supabase
    .from("timeline_posts")
    .select("*", { count: "exact", head: true })
    .eq("visibility", "private"); // Sesuaikan logic pending

  return {
    pendingContents: pendingContents || 0,
  };
}

// ============================================
// MASJID POSTS (Masuk ke timeline_posts)
// Category: 'Info Masjid'
// ============================================

export async function getMasjidPosts() {
  const { data, error } = await supabase
    .from("timeline_posts")
    .select("*")
    .eq("category", "Info Masjid") // Filter kategori
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as MasjidPost[];
}

export async function createMasjidPost(
  post: Omit<MasjidPost, "id" | "created_at" | "updated_at">
) {
  // Memastikan masuk sebagai Info Masjid & Usernya Admin
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data, error } = await supabase
    .from("timeline_posts")
    .insert({
      ...post,
      user_id: user?.id, // ID Admin yang sedang login
      category: "Info Masjid",
      visibility: "public"
    })
    .select()
    .single();

  if (error) throw error;
  return data as MasjidPost;
}

export async function updateMasjidPost(id: string, post: any) {
  const { data, error } = await supabase
    .from("timeline_posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as MasjidPost;
}

export async function deleteMasjidPost(id: string) {
  const { error } = await supabase.from("timeline_posts").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// SCHEDULES (Masuk ke timeline_posts)
// Category: 'Agenda'
// ============================================

export async function getSchedules() {
  const { data, error } = await supabase
    .from("timeline_posts")
    .select("*")
    .eq("category", "Agenda")
    .not("event_date", "is", null) // Pastikan ada tanggalnya
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data as Schedule[];
}

export async function createSchedule(schedule: any) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("timeline_posts")
    .insert({
      ...schedule,
      user_id: user?.id,
      category: "Agenda",
      visibility: "public"
    })
    .select()
    .single();

  if (error) throw error;
  return data as Schedule;
}

export async function updateSchedule(id: string, schedule: any) {
  const { data, error } = await supabase
    .from("timeline_posts")
    .update(schedule)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Schedule;
}

export async function deleteSchedule(id: string) {
  const { error } = await supabase.from("timeline_posts").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// ARTICLES (Masuk ke timeline_posts)
// Category: 'Artikel'
// ============================================

export async function getArticles() {
  const { data, error } = await supabase
    .from("timeline_posts")
    .select("*")
    .eq("category", "Artikel")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Article[];
}

export async function createArticle(article: any) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("timeline_posts")
    .insert({
      ...article,
      user_id: user?.id,
      category: "Artikel",
      visibility: "public"
    })
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

export async function updateArticle(id: string, article: any) {
  const { data, error } = await supabase
    .from("timeline_posts")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from("timeline_posts").delete().eq("id", id);
  if (error) throw error;
}

// ============================================
// DONATIONS (Tabel: donation_campaigns)
// ============================================

export async function getDonations() {
  const { data, error } = await supabase
    .from("donation_campaigns")
    .select(`
      *,
      creator:creator_id (name)
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Donation[];
}

export async function createDonation(donation: any) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("donation_campaigns")
    .insert({
      ...donation,
      creator_id: user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function updateDonation(id: string, donation: any) {
  const { data, error } = await supabase
    .from("donation_campaigns")
    .update(donation)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function approveDonation(id: string) {
  const { data, error } = await supabase
    .from("donation_campaigns")
    .update({ status: "active" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function deactivateDonation(id: string) {
  const { data, error } = await supabase
    .from("donation_campaigns")
    .update({ status: "closed" }) // Sesuai check constraints di db setup
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function getDonationStats() {
  const { count: activeDonations } = await supabase
    .from("donation_campaigns")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  return {
    activeDonations: activeDonations || 0,
  };
}