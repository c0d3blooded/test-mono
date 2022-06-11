import { supabase } from '../lib/supabase-client';
import { base64ToBlob } from '../utils/common';
import { updateAppInformation } from './app-information';

type SupabaseFile =
  | string
  | ArrayBuffer
  | ArrayBufferView
  | Blob
  | Buffer
  | File
  | FormData
  | NodeJS.ReadableStream
  | URLSearchParams;

const storageAppIcons = 'app-icons';
/**
 * Uploads an app icon for the user
 * @param id the id of the app_information model this is attached to
 * @param file the file which is being uploaded, expects base64 string
 * @returns the result from the upload
 */
export const uploadAppIcon = async (
  id: string,
  file: string,
  filename?: string
) => {
  let contentType = 'image/png';
  let extension = '.png';
  // base64 string
  if (file.includes('base64')) {
    // get the content type from the base64 string
    contentType = file.split(';')[0];
    contentType = contentType.replace('data:', '');
    // get the file extension from the base64 string
    extension = contentType.split('+')[0];
    extension = extension.replace('image/', '.');
  }
  const icon_url = `${id}/${filename ?? 'icon'}${extension}`;
  // upload the file to the database
  const res = await supabase.storage
    .from(storageAppIcons)
    .upload(icon_url, base64ToBlob(file), {
      contentType,
      upsert: true
    });
  // save the filename to the app_information
  await updateAppInformation({ id, icon_url });
  return res;
};

/**
 * Download the app icon frm the given url
 * @param url
 * @returns the downloaded app icon
 */
export const downloadAppIcon = async (url: string) =>
  supabase.storage.from(storageAppIcons).download(url);
