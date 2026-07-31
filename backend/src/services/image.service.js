// src/services/image.service.js

import { supabase } from "../config/supabase.js";

const BUCKET_NAME = "artworks";

const getExtensionFromMimeType = (mimeType) => {
  const extensions = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
  };

  return extensions[mimeType];
};

const uploadOriginalImage = async (file, artworkId) => {
  if (!file) {
    throw new Error("No se recibió ninguna imagen.");
  }

  if (!artworkId) {
    throw new Error("Falta el identificador de la obra.");
  }

  const extension = getExtensionFromMimeType(file.mimetype);

  if (!extension) {
    throw new Error(
      "Formato de imagen no permitido. Usá JPG, PNG o WEBP."
    );
  }

  const originalPath = `originals/${artworkId}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(originalPath, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw new Error(`No se pudo subir la imagen original: ${error.message}`);
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(originalPath);

  return {
    path: originalPath,
    url: data.publicUrl,
  };
};