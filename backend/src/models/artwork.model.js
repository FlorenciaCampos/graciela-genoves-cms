// src/models/artwork.model.js

import { supabaseAdmin } from "../config/supabase.js";

export const createArtwork = async (artworkData) => {
  const { data, error } = await supabaseAdmin
    .from("artworks")
    .insert(artworkData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getAllArtworks = async (category) => {
  let query = supabaseAdmin
    .from("artworks")
    .select(`
      *,
      category:categories!inner(slug)
    `)
    .eq("is_visible", true)
    .order("order_index", {
      ascending: true,
      nullsFirst: false,
    })
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("categories.slug", category);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getArtworkById = async (id) => {
  const { data, error } = await supabaseAdmin
    .from("artworks")
    .select("*")
    .eq("id", id)
    .single();

  // Si no existe la obra, devolvemos null.
  // Cualquier otro error sí se propaga.
  if (error) {
    if (error.code === "PGRST116") {
      return null;
    }

    throw new Error(error.message);
  }

  return data;
};

export const updateArtwork = async (id, artworkData) => {
  const { data, error } = await supabaseAdmin
    .from("artworks")
    .update(artworkData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteArtwork = async (id) => {
  const { error } = await supabaseAdmin
    .from("artworks")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
};