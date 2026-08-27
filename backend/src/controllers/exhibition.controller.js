import { getExhibitionBySlugService } from "../services/exhibition.service.js";

export const getExhibitionBySlugController = async (req, res) => {
  try {
    const { slug } = req.params;

    const exhibition = await getExhibitionBySlugService(slug);

    if (!exhibition) {
      return res.status(404).json({
        success: false,
        message: "Exhibición no encontrada.",
      });
    }

    return res.status(200).json({
      success: true,
      data: exhibition,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};