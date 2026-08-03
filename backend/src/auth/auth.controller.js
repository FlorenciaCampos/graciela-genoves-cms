import { supabaseAuth } from "../config/supabase.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "El email y la contraseña son obligatorios.",
      });
    }

    const { data, error } = await supabaseAuth.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: "Email o contraseña incorrectos.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión correcto.",
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
        },
        access_token: data.session.access_token,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);

    return res.status(500).json({
      success: false,
      message: "Ocurrió un error al iniciar sesión.",
    });
  }
};