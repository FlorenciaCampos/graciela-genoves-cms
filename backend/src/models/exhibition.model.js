import { supabaseAdmin } from "../config/supabase.js";

export const getExhibitionBySlug = async (slug) => {
  const { data, error } = await supabaseAdmin
    .from("exhibitions")
    .select(`
      *,
      exhibition_images (
        id,
        image_url,
        caption,
        created_at
      ),
      exhibition_artworks (
        artwork_id,
        artworks (
          id,
          title,
          year,
          technique,
          dimensions,
          optimized_image_url,
          thumbnail_image_url
        )
      )
    `)
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