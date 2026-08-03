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

export const getAllArtworks = async () => {
  const { data, error } = await supabaseAdmin
    .from("artworks")
    .select("*")
    .order("created_at", { ascending: false });

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