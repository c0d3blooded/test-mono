import {
  Request,
  Response,
  Status,
  Context
} from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { getQuery } from 'https://deno.land/x/oak@v10.6.0/helpers.ts';
import pick from 'https://esm.sh/lodash.pick@4.4.0';
import isEmpty from 'https://esm.sh/lodash.isempty';
import { PostgrestSingleResponse } from 'https://esm.sh/@supabase/supabase-js@1.35.3';
import { supabase, supabaseApp } from '../lib/supabase.ts';
import { validateDomain } from '../utils/common.ts';
import { Plant } from '../models/plant.ts';
import {
  Revision,
  CreateRevision,
  RevisionStatus
} from '../models/revision.ts';
import errors from '../constants/errors.ts';

const table = 'revisions';
const plant_table = 'plants';

/**
 * Create a new revision
 * @param context
 */
export const createRevision = async (context: {
  request: Request;
  response: Response;
}) => {
  const { request, response } = context;
  // if coming from the main website
  if (!validateDomain(request)) {
    response.status = Status.Forbidden;
    response.body = errors.Forbidden;
    return;
  }

  const data: CreateRevision = await request.body({ type: 'json' }).value;

  // retrieve previous value
  if (!data.reference || !data.reference_id) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }
  // retrieve the reference
  let reference: Plant;
  try {
    let result: PostgrestSingleResponse<Plant>;
    switch (data.reference) {
      case plant_table:
        // find the plant
        result = await supabase
          .from<Plant>(plant_table)
          .select('*')
          .eq('id', parseInt(data.reference_id))
          .single();
        // internal error finding reference
        if (result.error) {
          response.status = Status.NotFound;
          response.body = errors.NotFound;
          return;
        }
        // set the reference
        reference = result.data;
    }
  } catch (e) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    return;
  }

  const revisions: Array<Partial<Revision>> = [];

  // add all the revisions to each field seperately
  for (const field of Object.keys(data.changes) as Array<keyof Plant>) {
    const revision = data.changes[field]; // the data for this field
    revisions.push({
      field,
      old_value: (reference[field] ?? []) as Array<string>,
      new_value: revision,
      owner_id: data.owner_id,
      status: RevisionStatus.Approved,
      reference: data.reference,
      reference_id: data.reference_id
    });
    // remove the field
    if (isEmpty(revision)) delete reference[field];
    else {
      // set the value on the reference
      switch (field) {
        // array fields
        case 'edibilities':
        case 'functionalities':
        case 'layers':
        case 'soil_preferences':
        case 'sun_preferences':
          reference[field] = revision as never;
          break;
        default:
          reference[field] = revision[0] as never;
          break;
      }
    }
  }
  // update the object
  try {
    switch (data.reference) {
      case plant_table:
        const { error } = await supabase
          .from<Plant>(plant_table)
          .update(reference)
          .eq('id', reference.id);
        if (error) {
          console.error(error);
          response.status = Status.InternalServerError;
          response.body = errors.InternalServerError;
          return;
        }
    }
  } catch (e) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    return;
  }

  // insert this revision into the table as a list
  try {
    const { data, error } = await supabase
      .from<Revision>(table)
      .insert(revisions);
    if (error) {
      console.error(error);
      response.status = Status.InternalServerError;
      response.body = errors.InternalServerError;
      return;
    }
    response.body = data;
  } catch (e) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
    return;
  }
};

// get a list of revisions
export const getRevisions = async (context: Context) => {
  const { request, response } = context;
  const { reference, reference_id } = getQuery(context, { mergeParams: true });

  if (!reference || !reference_id) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }
  // find the revisions
  const { data, error } = await supabase
    .from<Revision>(table)
    .select('*')
    .match({ reference, reference_id });

  if (error) {
    response.status = Status.NotFound;
    response.body = errors.NotFound;
    return;
  }
  const responseData = data;
  // only map public fields
  if (!validateDomain(request)) {
    response.body = data.map((item) =>
      pick(item, [
        'id',
        'field',
        'old_value',
        'new_value',
        'status',
        'reference',
        'reference_id',
        'created_at'
      ])
    );
  } else {
    // find the profiles for the revisions
    const { data, error } = await supabaseApp
      .from<Revision>(table)
      .select('*')
      .match({ reference, reference_id });
    // return full response to website
    response.body = responseData;
  }
};
