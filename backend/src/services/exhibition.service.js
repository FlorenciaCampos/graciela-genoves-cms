import * as exhibitionModel from "../models/exhibition.model.js";

export const getExhibitionBySlug = async (slug) => {
  return await exhibitionModel.getExhibitionBySlug(slug);
};