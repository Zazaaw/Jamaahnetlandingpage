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
// MEMBERS QUERIES
// ============================================

export async function getMembers() {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Member[];
}

export async function getMemberById(id: string) {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Member;
}

export async function approveMember(id: string) {
  const { data, error } = await supabase
    .from("members")
    .update({ status: "active" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Member;
}

export async function rejectMember(id: string) {
  const { data, error } = await supabase
    .from("members")
    .update({ status: "rejected" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Member;
}

export async function resetMemberPassword(id: string, newPasswordHash: string) {
  const { data, error } = await supabase
    .from("members")
    .update({ password_hash: newPasswordHash })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Member;
}

export async function getMemberStats() {
  const { count: totalMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true });

  const { count: pendingMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return {
    totalMembers: totalMembers || 0,
    pendingMembers: pendingMembers || 0,
  };
}

// ============================================
// CONTENTS QUERIES
// ============================================

export async function getContents() {
  const { data, error } = await supabase
    .from("contents")
    .select(`
      *,
      members:member_id (
        name
      )
    `)
    .order("created_at", { ascending: false });

  if (error) throw error;

  // Format data to include member_name
  return (data || []).map((item: any) => ({
    ...item,
    member_name: item.members?.name || "Unknown",
  })) as Content[];
}

export async function approveContent(id: string) {
  const { data, error } = await supabase
    .from("contents")
    .update({ status: "approved" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Content;
}

export async function rejectContent(id: string) {
  const { data, error } = await supabase
    .from("contents")
    .update({ status: "rejected" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Content;
}

export async function deleteContent(id: string) {
  const { error } = await supabase.from("contents").delete().eq("id", id);

  if (error) throw error;
}

export async function getContentStats() {
  const { count: pendingContents } = await supabase
    .from("contents")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return {
    pendingContents: pendingContents || 0,
  };
}

// ============================================
// MASJID POSTS QUERIES
// ============================================

export async function getMasjidPosts() {
  const { data, error } = await supabase
    .from("masjid_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as MasjidPost[];
}

export async function createMasjidPost(
  post: Omit<MasjidPost, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("masjid_posts")
    .insert(post)
    .select()
    .single();

  if (error) throw error;
  return data as MasjidPost;
}

export async function updateMasjidPost(
  id: string,
  post: Partial<Omit<MasjidPost, "id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("masjid_posts")
    .update(post)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as MasjidPost;
}

export async function deleteMasjidPost(id: string) {
  const { error } = await supabase.from("masjid_posts").delete().eq("id", id);

  if (error) throw error;
}

// ============================================
// SCHEDULES QUERIES
// ============================================

export async function getSchedules() {
  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .order("date", { ascending: true });

  if (error) throw error;
  return data as Schedule[];
}

export async function createSchedule(
  schedule: Omit<Schedule, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("schedules")
    .insert(schedule)
    .select()
    .single();

  if (error) throw error;
  return data as Schedule;
}

export async function updateSchedule(
  id: string,
  schedule: Partial<Omit<Schedule, "id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("schedules")
    .update(schedule)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Schedule;
}

export async function deleteSchedule(id: string) {
  const { error } = await supabase.from("schedules").delete().eq("id", id);

  if (error) throw error;
}

// ============================================
// ARTICLES QUERIES
// ============================================

export async function getArticles() {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Article[];
}

export async function createArticle(
  article: Omit<Article, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("articles")
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

export async function updateArticle(
  id: string,
  article: Partial<Omit<Article, "id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("articles")
    .update(article)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

export async function deleteArticle(id: string) {
  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) throw error;
}

// ============================================
// DONATIONS QUERIES
// ============================================

export async function getDonations() {
  const { data, error } = await supabase
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Donation[];
}

export async function createDonation(
  donation: Omit<Donation, "id" | "created_at" | "updated_at">
) {
  const { data, error } = await supabase
    .from("donations")
    .insert(donation)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function updateDonation(
  id: string,
  donation: Partial<Omit<Donation, "id" | "created_at" | "updated_at">>
) {
  const { data, error } = await supabase
    .from("donations")
    .update(donation)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function approveDonation(id: string) {
  const { data, error } = await supabase
    .from("donations")
    .update({ status: "active" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function deactivateDonation(id: string) {
  const { data, error } = await supabase
    .from("donations")
    .update({ status: "inactive" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data as Donation;
}

export async function getDonationStats() {
  const { count: activeDonations } = await supabase
    .from("donations")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  return {
    activeDonations: activeDonations || 0,
  };
}
