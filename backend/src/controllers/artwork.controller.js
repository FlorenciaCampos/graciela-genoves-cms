// src/controllers/artwork.controller.js

import { randomUUID } from "crypto";
import * as artworkService from "../services/artwork.service.js";

import {
  optimizeImage,
  uploadOriginalImage,
  uploadOptimizedImage,
  deleteImages,
  getStoragePathFromPublicUrl,
} from "../services/image.service.js";

export const createArtwork = async (req, res) => {
  let originalImage = null;
  let optimizedImage = null;

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

    if (
      !title ||
      !year ||
      !technique ||
      !dimensions ||
      !category_id ||
      order_index === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Título, año, técnica, medidas, categoría y orden son obligatorios.",
      });
    }

    const artworkId = randomUUID();

    const optimizedBuffer = await optimizeImage(
      req.file.buffer
    );

    originalImage = await uploadOriginalImage(
      req.file,
      artworkId
    );

    optimizedImage = await uploadOptimizedImage(
      optimizedBuffer,
      artworkId
    );

    const artworkData = {
      id: artworkId,
      title,
      year: Number(year),
      technique,
      dimensions,
      category_id,
      original_image_url: originalImage.url,
      optimized_image_url: optimizedImage.url,
      order_index: Number(order_index),
      is_visible:
        is_visible === undefined
          ? true
          : is_visible === "true" ||
            is_visible === true,
    };

    const artwork =
      await artworkService.createArtwork(
        artworkData
      );

    return res.status(201).json({
      success: true,
      message: "Obra creada correctamente.",
      data: artwork,
    });
  } catch (error) {
    try {
      await deleteImages([
        originalImage?.path,
        optimizedImage?.path,
      ]);
    } catch (cleanupError) {
      console.error(
        "No se pudieron limpiar las imágenes:",
        cleanupError.message
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllArtworks = async (
  req,
  res
) => {
  try {
    const artworks =
      await artworkService.getAllArtworks();

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

export const getArtworkById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const artwork =
      await artworkService.getArtworkById(id);

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

export const updateArtwork = async (
  req,
  res
) => {
  let newOriginalImage = null;
  let newOptimizedImage = null;

  try {
    const { id } = req.params;

    const currentArtwork =
      await artworkService.getArtworkById(id);

    if (!currentArtwork) {
      return res.status(404).json({
        success: false,
        message: "Obra no encontrada.",
      });
    }

    const allowedFields = [
      "title",
      "year",
      "technique",
      "dimensions",
      "category_id",
      "order_index",
      "is_visible",
    ];

    const artworkData = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        artworkData[field] = req.body[field];
      }
    }

    if (
      artworkData.title !== undefined &&
      !artworkData.title.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "El título no puede estar vacío.",
      });
    }

    if (
      artworkData.technique !== undefined &&
      !artworkData.technique.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "La técnica no puede estar vacía.",
      });
    }

    if (
      artworkData.dimensions !== undefined &&
      !artworkData.dimensions.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Las medidas no pueden estar vacías.",
      });
    }

    if (
      artworkData.category_id !== undefined &&
      !artworkData.category_id.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "La categoría no puede estar vacía.",
      });
    }

    if (artworkData.year !== undefined) {
      const parsedYear = Number(
        artworkData.year
      );

      if (!Number.isInteger(parsedYear)) {
        return res.status(400).json({
          success: false,
          message:
            "El año debe ser un número entero.",
        });
      }

      artworkData.year = parsedYear;
    }

    if (
      artworkData.order_index !== undefined
    ) {
      const parsedOrderIndex = Number(
        artworkData.order_index
      );

      if (
        !Number.isInteger(parsedOrderIndex)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "El orden debe ser un número entero.",
        });
      }

      artworkData.order_index =
        parsedOrderIndex;
    }

    if (
      artworkData.is_visible !== undefined
    ) {
      if (
        artworkData.is_visible !== true &&
        artworkData.is_visible !== false &&
        artworkData.is_visible !== "true" &&
        artworkData.is_visible !== "false"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "is_visible debe ser true o false.",
        });
      }

      artworkData.is_visible =
        artworkData.is_visible === true ||
        artworkData.is_visible === "true";
    }

    if (req.file) {
      const replacementImageId =
        `${id}-${randomUUID()}`;

      const optimizedBuffer =
        await optimizeImage(req.file.buffer);

      newOriginalImage =
        await uploadOriginalImage(
          req.file,
          replacementImageId
        );

      newOptimizedImage =
        await uploadOptimizedImage(
          optimizedBuffer,
          replacementImageId
        );

      artworkData.original_image_url =
        newOriginalImage.url;

      artworkData.optimized_image_url =
        newOptimizedImage.url;
    }

    if (
      Object.keys(artworkData).length === 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Tenés que enviar al menos un dato o una imagen para actualizar.",
      });
    }

    const updatedArtwork =
      await artworkService.updateArtwork(
        id,
        artworkData
      );

    if (req.file) {
      const oldImagePaths = [
        getStoragePathFromPublicUrl(
          currentArtwork.original_image_url
        ),
        getStoragePathFromPublicUrl(
          currentArtwork.optimized_image_url
        ),
      ];

      try {
        await deleteImages(oldImagePaths);
      } catch (cleanupError) {
        console.error(
          "La obra se actualizó, pero no se pudieron borrar las imágenes anteriores:",
          cleanupError.message
        );
      }
    }

    return res.status(200).json({
      success: true,
      message:
        "Obra actualizada correctamente.",
      data: updatedArtwork,
    });
  } catch (error) {
    try {
      await deleteImages([
        newOriginalImage?.path,
        newOptimizedImage?.path,
      ]);
    } catch (cleanupError) {
      console.error(
        "No se pudieron limpiar las imágenes nuevas:",
        cleanupError.message
      );
    }

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteArtwork = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const deleted =
      await artworkService.deleteArtwork(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Obra no encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      message:
        "Obra eliminada correctamente.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};