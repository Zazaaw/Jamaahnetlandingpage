import { createClient } from "@supabase/supabase-js";

// Get Supabase credentials from info file
import { projectId, publicAnonKey } from "./info";

const supabaseUrl = `https://${projectId}.supabase.co`;
const supabaseAnonKey = publicAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
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
