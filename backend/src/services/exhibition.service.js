import { getAllExhibitions } from "../models/exhibition.model.js";

export const getAllExhibitionsService = async () => {
  return await getAllExhibitions();
};