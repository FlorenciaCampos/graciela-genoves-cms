// src/services/image.service.js

import sharp from "sharp";
import { supabaseAdmin } from "../config/supabase.js";

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
  return await sharp(buffer)
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
    })
    .toBuffer();
};

const createThumbnail = async (buffer) => {
  return await sharp(buffer)
    .resize({
      width: 800,
      withoutEnlargement: true,
    })
    .webp({
      quality: 72,
    })
    .toBuffer();
};

const uploadOriginalImage = async (file, imageId) => {
  if (!file) {
    throw new Error("No se recibió ninguna imagen.");
  }

  if (!imageId) {
    throw new Error("Falta el identificador de la imagen.");
  }

  const extension = getExtensionFromMimeType(file.mimetype);

  if (!extension) {
    throw new Error(
      "Formato de imagen no permitido. Usá JPG, PNG o WEBP."
    );
  }

  const originalPath = `originals/${imageId}.${extension}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(originalPath, file.buffer, {
      contentType: file.mimetype,
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    console.error(
      "Error completo al subir imagen original:",
      error
    );

    throw new Error(
      `No se pudo subir la imagen original: ${error.message}`
    );
  }

  const { data } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(originalPath);

  return {
    path: originalPath,
    url: data.publicUrl,
  };
};

const uploadOptimizedImage = async (
  optimizedBuffer,
  imageId
) => {
  if (!optimizedBuffer) {
    throw new Error("No se recibió la imagen optimizada.");
  }

  if (!imageId) {
    throw new Error("Falta el identificador de la imagen.");
  }

  const optimizedPath = `optimized/${imageId}.webp`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(optimizedPath, optimizedBuffer, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    console.error(
      "Error completo al subir imagen optimizada:",
      error
    );

    throw new Error(
      `No se pudo subir la imagen optimizada: ${error.message}`
    );
  }

  const { data } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(optimizedPath);

  return {
    path: optimizedPath,
    url: data.publicUrl,
  };
};

const uploadThumbnailImage = async (
  thumbnailBuffer,
  imageId
) => {
  if (!thumbnailBuffer) {
    throw new Error("No se recibió la miniatura.");
  }

  if (!imageId) {
    throw new Error("Falta el identificador de la imagen.");
  }

  const thumbnailPath = `thumbnails/${imageId}.webp`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .upload(thumbnailPath, thumbnailBuffer, {
      contentType: "image/webp",
      cacheControl: "31536000",
      upsert: false,
    });

  if (error) {
    console.error(
      "Error completo al subir miniatura:",
      error
    );

    throw new Error(
      `No se pudo subir la miniatura: ${error.message}`
    );
  }

  const { data } = supabaseAdmin.storage
    .from(BUCKET_NAME)
    .getPublicUrl(thumbnailPath);

  return {
    path: thumbnailPath,
    url: data.publicUrl,
  };
};

const getStoragePathFromPublicUrl = (publicUrl) => {
  if (!publicUrl) {
    return null;
  }

  const marker = `/storage/v1/object/public/${BUCKET_NAME}/`;
  const markerIndex = publicUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const encodedPath = publicUrl.slice(
    markerIndex + marker.length
  );

  try {
    return decodeURIComponent(encodedPath);
  } catch {
    return encodedPath;
  }
};

const deleteImages = async (paths) => {
  const validPaths = [...new Set(paths.filter(Boolean))];

  if (validPaths.length === 0) {
    return;
  }

  const { error } = await supabaseAdmin.storage
    .from(BUCKET_NAME)
    .remove(validPaths);

  if (error) {
    console.error(
      "Error completo al eliminar imágenes:",
      error
    );

    throw new Error(
      `No se pudieron eliminar las imágenes: ${error.message}`
    );
  }
};

export {
  optimizeImage,
  createThumbnail,
  uploadOriginalImage,
  uploadOptimizedImage,
  uploadThumbnailImage,
  getStoragePathFromPublicUrl,
  deleteImages,
};