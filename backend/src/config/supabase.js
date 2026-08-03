import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
const supabasePublishableKey =
  process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("Falta la variable de entorno SUPABASE_URL.");
}

if (!supabaseSecretKey) {
  throw new Error(
    "Falta la variable de entorno SUPABASE_SECRET_KEY."
  );
}

if (!supabasePublishableKey) {
  throw new Error(
    "Falta la variable de entorno SUPABASE_PUBLISHABLE_KEY."
  );
}

// Cliente para operaciones administrativas
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseSecretKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// Cliente para autenticación
export const supabaseAuth = createClient(
  supabaseUrl,
  supabasePublishableKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);