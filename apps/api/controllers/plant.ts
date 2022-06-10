import {
  Request,
  Response,
  Status,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { Plant } from "../models/plant.ts";
import errors from "../constants/errors.ts";

// the database table
const table = "plants";

// get all plants
export const getPlants = async ({ response }: { response: Response }) => {
  const { data, error } = await supabase.from<Plant>(table).select("*");
  if (error) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    console.error(error);
    return;
  }
  response.body = data;
};

// get a single plant
export const getPlant = async ({
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
  // find the plant
  const { data, error } = await supabase
    .from<Plant>(table)
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
