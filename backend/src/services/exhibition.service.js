import { getExhibitionBySlug } from "../models/exhibition.model.js";

export const getExhibitionBySlugService = async (slug) => {
  return await getExhibitionBySlug(slug);
};