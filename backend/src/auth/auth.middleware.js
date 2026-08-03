import { supabaseAuth } from "../config/supabase.js";

export const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        success: false,
        message: "No se envió el token de autenticación.",
      });
    }

    if (!authorization.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "El formato del token no es válido.",
      });
    }

    const token = authorization.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No se envió el token de autenticación.",
      });
    }

    const { data, error } = await supabaseAuth.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado.",
      });
    }

    req.user = data.user;

    next();
  } catch (error) {
    console.error("Error al validar el token:", error);

    return res.status(500).json({
      success: false,
      message: "Error al validar el token.",
    });
  }
};