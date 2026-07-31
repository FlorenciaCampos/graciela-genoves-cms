// src/services/image.service.js

import sharp from "sharp";
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

const optimizeImage = async (buffer) => {
  const optimizedBuffer = await sharp(buffer)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toBuffer();

  return optimizedBuffer;
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

const uploadOptimizedImage = async (optimizedBuffer, artworkId) => {
  if (!optimizedBuffer) {
    throw new Error("No se recibió la imagen optimizada.");
  }

  if (!artworkId) {
    throw new Error("Falta el identificador de la obra.");
  }

  const optimizedPath = `optimized/${artworkId}.webp`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(optimizedPath, optimizedBuffer, {
      contentType: "image/webp",
      upsert: false,
    });

  if (error) {
    throw new Error(
      `No se pudo subir la imagen optimizada: ${error.message}`
    );
  }

  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(optimizedPath);

  return {
    path: optimizedPath,
    url: data.publicUrl,
  };
};

export {
  optimizeImage,
  uploadOriginalImage,
  uploadOptimizedImage,
};