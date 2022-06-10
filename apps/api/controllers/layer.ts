import { Response, Status } from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { Layer } from "../models/layer.ts";
import errors from "../constants/errors.ts";

// the database table
const table = "layers";

export const getLayers = async ({ response }: { response: Response }) => {
  const { data, error } = await supabase.from<Layer>(table).select("*");
  if (error) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    console.error(error);
    return;
  }
  response.body = data;
};

export const getLayer = async ({
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
  // find the layer
  const { data, error } = await supabase
    .from<Layer>(table)
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
