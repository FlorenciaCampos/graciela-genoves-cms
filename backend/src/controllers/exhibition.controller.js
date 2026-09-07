import { getAllExhibitionsService } from "../services/exhibition.service.js";

export const getAllExhibitionsController = async (req, res) => {
  try {
    const exhibitions = await getAllExhibitionsService();

    return res.status(200).json({
      success: true,
      data: exhibitions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};