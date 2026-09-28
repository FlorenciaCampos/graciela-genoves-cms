import * as artworkModel from "../models/artwork.model.js";

export const createArtwork = async (artworkData) => {
  return await artworkModel.createArtwork(artworkData);
};

export const getAllArtworks = async (category) => {
  return await artworkModel.getAllArtworks(category);
};

// ADMIN: obtiene todas las obras, incluidas las ocultas
export const getAllArtworksAdmin = async () => {
  return await artworkModel.getAllArtworksAdmin();
};

export const getArtworkById = async (id) => {
  return await artworkModel.getArtworkById(id);
};

export const updateArtwork = async (id, artworkData) => {
  return await artworkModel.updateArtwork(id, artworkData);
};