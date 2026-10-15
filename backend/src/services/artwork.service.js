
// src/services/artwork.service.js

import * as artworkModel from "../models/artwork.model.js";

// Crear una obra
export const createArtwork = async (artworkData) => {
  return await artworkModel.createArtwork(artworkData);
};

// Obtener el siguiente número de orden según la categoría
export const getNextOrderIndex = async (categoryId) => {
  return await artworkModel.getNextOrderIndex(categoryId);
};

// Obtener obras visibles
export const getAllArtworks = async (category) => {
  return await artworkModel.getAllArtworks(category);
};

// ADMIN: obtener todas las obras, incluidas las ocultas
export const getAllArtworksAdmin = async () => {
  return await artworkModel.getAllArtworksAdmin();
};

// Obtener una obra por ID
export const getArtworkById = async (id) => {
  return await artworkModel.getArtworkById(id);
};

// Actualizar una obra
export const updateArtwork = async (id, artworkData) => {
  return await artworkModel.updateArtwork(id, artworkData);
};
