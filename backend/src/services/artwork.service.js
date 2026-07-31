// src/services/artwork.service.js

import * as artworkModel from "../models/artwork.model.js";

export const getAllArtworks = async () => {
  return await artworkModel.getAllArtworks();
};

export const getArtworkById = async (id) => {
  return await artworkModel.getArtworkById(id);
};