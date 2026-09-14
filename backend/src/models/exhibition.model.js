import { supabaseAdmin } from "../config/supabase.js";

export const getAllExhibitions = async () => {
  const { data, error } = await supabaseAdmin
    .from("exhibitions")
    .select(`
      id,
      title,
      year,
      venue,
      curator,
      short_description,
      curatorial_pdf_url,
      catalog_pdf_url,
      order_index,
      exhibition_images (
        id,
        image_url,
        caption,
        created_at
      )
    `)
    .eq("is_visible", true)
    .order("order_index", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};