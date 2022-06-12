import { APIKey } from '@treelof/models';
import { supabase } from '../lib/supabase';

// the table for this file
const table = 'api_keys';
/**
 * @param {string} uuid the uuid of the supabase user
 * @returns {APIKey} The API key for a user
 */
export const generateAPIKey = (uuid: string) =>
  supabase.from<APIKey>(table).insert({ uuid });

/**
 * @param {string} uuid the uuid of the supabase user
 * @returns {APIKey} The API key for a user
 */
export const getAPIKey = (uuid: string) =>
  supabase.from<APIKey>(table).select('*').eq('uuid', uuid).single();
