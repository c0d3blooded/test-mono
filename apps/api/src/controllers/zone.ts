import { Response, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { Zone, ZoneValue } from "../models/zone.ts";
import errors from "../constants/errors.ts";

// the database table
const table = "zones";

export const getZones = async ({ response }: { response: Response }) => {
  const { data, error } = await supabase
    .from<Zone>(table)
    .select("*")
    .order("max_c");
  if (error) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    console.error(error);
    return;
  }
  response.body = data;
};

export const getZone = async ({
  params,
  response,
}: {
  params: { id: ZoneValue };
  response: Response;
}) => {
  if (!params.id) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }
  // find the zones
  const { data, error } = await supabase
    .from<Zone>(table)
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
