import { supabaseAdmin } from "../config/supabase.js";

export const getExhibitionBySlug = async (slug) => {
  const { data, error } = await supabaseAdmin
    .from("exhibitions")
    .select("*")
    .eq("slug", slug)
    .eq("is_visible", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
};