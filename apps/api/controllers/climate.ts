import { Response, Status } from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { supabase } from '../lib/supabase.ts';
import { Climate } from '../models/climate.ts';
import errors from '../constants/errors.ts';

// the database table
const table = 'climates';

export const getClimates = async ({ response }: { response: Response }) => {
  const { data, error } = await supabase
    .from<Climate>(table)
    .select('*')
    .order('order');
  if (error) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    console.error(error);
    return;
  }
  response.body = data;
};

export const getClimate = async ({
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
  // find the climate
  const { data, error } = await supabase
    .from<Climate>(table)
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    response.status = Status.NotFound;
    response.body = errors.NotFound;
    return;
  }
  response.body = data;
};
