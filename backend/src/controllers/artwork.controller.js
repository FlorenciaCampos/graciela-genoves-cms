// src/controllers/artwork.controller.js

import * as artworkService from "../services/artwork.service.js";

export const createArtwork = async (req, res) => {
  try {
    console.log("DATOS RECIBIDOS:");
    console.log(req.body);

    console.log("ARCHIVO RECIBIDO:");
    console.log(req.file);

    return res.status(200).json({
      success: true,
      message: "Multer recibió correctamente la petición.",
      body: req.body,
      file: req.file
        ? {
            originalname: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : null,
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