import {
  Request,
  Response,
  Status,
} from "https://deno.land/x/oak@v10.6.0/mod.ts";
import { supabase } from "../lib/supabase.ts";
import { validateDomain } from "../utils/common.ts";
import { Plant } from "../models/plant.ts";
import errors from "../constants/errors.ts";

const plants_table = "plants";

/**
 * Create a page on the wiki site from Wikipedia meta data
 * @param context
 */
export const createPage = async (context: {
  request: Request;
  response: Response;
}) => {
  let { request, response } = context;
  // if coming from the main website
  if (!validateDomain(request)) {
    response.status = Status.Forbidden;
    response.body = errors.Forbidden;
    return;
  }
  // no name in the request body
  const { name } = await request.body({ type: "json" }).value;
  if (!name) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }

  // check for existing data with the given name
  try {
    const { data, error } = await supabase
      .from<Plant>(plants_table)
      .select("botanical_name")
      .eq("botanical_name", name)
      .single();
    // return an error if it exists
    if (data) {
      response.status = Status.Conflict;
      response.body = "This plant already exists in the wiki";
      return;
    }
  } catch (e) {}
};

/**
 * Update an existing page on the website
 * @param context
 */
export const updatePage = async ({
  params,
  request,
  response,
}: {
  params: { revision_id: string };
  request: Request;
  response: Response;
}) => {
  // if coming from the main website
  if (!validateDomain(request)) {
    response.status = Status.Forbidden;
    response.body = errors.Forbidden;
    return;
  }
  // no name in the request body
  const { name } = await request.body({ type: "json" }).value;
  if (!name) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }

  // check for existing data with the given name
  try {
    const { data, error } = await supabase
      .from<Plant>(plants_table)
      .select("botanical_name")
      .eq("botanical_name", name)
      .single();
    // return an error if it exists
    if (data) {
      response.status = Status.Conflict;
      response.body = "This plant already exists in the wiki";
      return;
    }
  } catch (e) {}
};
