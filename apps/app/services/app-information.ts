import { supabase } from '../lib/supabase-client';
import { AppInformation } from '@treelof/models';

// the table for this file
export const table = 'app_information';
/**
 * @param {string} owner_id the uuid of the supabase user
 * @returns {AppInformation} App info/details for the given logged in user
 */
export const getAppInformation = (owner_id: string) =>
  supabase
    .from<AppInformation>(table)
    .select('*')
    .eq('owner_id', owner_id)
    .single();
/**
 * @param {AppInformation} info the info object being upserted
 */
export const upsertAppInformation = (info: AppInformation) =>
  supabase
    .from<AppInformation>(table)
    .upsert({ ...info })
    .eq('id', info.id)
    .single();

/**
 * @param {AppInformation} info the info object being updated
 */
export const updateAppInformation = (info: AppInformation) =>
  supabase
    .from<AppInformation>(table)
    .update({ ...info })
    .eq('id', info.id)
    .single();
