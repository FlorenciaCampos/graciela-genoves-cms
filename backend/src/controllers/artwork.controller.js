// src/controllers/artwork.controller.js

import { randomUUID } from "crypto";
import * as artworkService from "../services/artwork.service.js";

import {
  optimizeImage,
  uploadOriginalImage,
  uploadOptimizedImage,
} from "../services/image.service.js";

export const createArtwork = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Tenés que enviar una imagen.",
      });
    }

    const {
      title,
      year,
      technique,
      dimensions,
      category_id,
      order_index,
      is_visible,
    } = req.body;

    if (!title || !category_id) {
      return res.status(400).json({
        success: false,
        message: "El título y la categoría son obligatorios.",
      });
    }

    const artworkId = randomUUID();

    const optimizedBuffer = await optimizeImage(req.file.buffer);

    const originalImage = await uploadOriginalImage(
      req.file,
      artworkId
    );

    const optimizedImage = await uploadOptimizedImage(
      optimizedBuffer,
      artworkId
    );

    const artworkData = {
      id: artworkId,
      title,
      year: year ? Number(year) : null,
      technique: technique || null,
      dimensions: dimensions || null,
      category_id,
      original_image_url: originalImage.url,
      optimized_image_url: optimizedImage.url,
      order_index: order_index ? Number(order_index) : 0,
      is_visible:
        is_visible === undefined
          ? true
          : is_visible === "true" || is_visible === true,
    };

    const artwork = await artworkService.createArtwork(artworkData);

    return res.status(201).json({
      success: true,
      message: "Obra creada correctamente.",
      data: artwork,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getAllArtworks = async (req, res) => {
  try {
    const artworks = await artworkService.getAllArtworks();

    return res.status(200).json({
      success: true,
      data: artworks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getArtworkById = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await artworkService.getArtworkById(id);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Obra no encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateArtwork = async (req, res) => {
  try {
    const { id } = req.params;

    const artwork = await artworkService.updateArtwork(
      id,
      req.body,
      req.file
    );

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Obra no encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      data: artwork,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteArtwork = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await artworkService.deleteArtwork(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Obra no encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Obra eliminada correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};