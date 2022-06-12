import { AppInformation } from '@treelof/models';
import { supabase } from '../lib/supabase';

// the table for this file
const table = 'app_information';
/**
 * @param {string} owner_id the uuid of the supabase user
 * @returns {AppInformation} App info/details for the given logged in user
 */
export const getAppInformationByOwner = (owner_id: string) =>
  supabase
    .from<AppInformation>(table)
    .select('*')
    .eq('owner_id', owner_id)
    .single();

/**
 * @param {string} app_information_id the id of the app information
 * @returns {AppInformation} App info/details for the given the id
 */
export const getAppInformationById = (app_information_id?: string) =>
  supabase
    .from<AppInformation>(table)
    .select('*')
    .eq('id', app_information_id)
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
