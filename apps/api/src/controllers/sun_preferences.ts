import { Response, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { SunPreference } from "../models/sun_preferences.ts";
import errors from "../constants/errors.ts";

// the database table
const table = "sun_preferences";

export const getSunPreferences = async ({
  response,
}: {
  response: Response;
}) => {
  const { data, error } = await supabase
    .from<SunPreference>(table)
    .select("*")
    .order("order");
  if (error) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    console.error(error);
    return;
  }
  response.body = data;
};

export const getSunPreference = async ({
  params,
  response,
}: {
  params: { id: string };
  response: Response;
}) => {
  if (!params.id) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }
  // find the soil
  const { data, error } = await supabase
    .from<SunPreference>(table)
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    response.status = Status.NotFound;
    response.body = errors.NotFound;
    return;
  }
  response.body = data;
};
