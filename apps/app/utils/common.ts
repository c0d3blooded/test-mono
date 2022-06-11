import {
  MaterialUIAccentColor,
  MaterialUIColor
} from '../components/common/color-picker/color-picker';
import isempty from 'lodash.isempty';
import { DeviceTheme } from '../models/utility';

/**
 * Copies a JSON object into a new value. Can be used to trigger state changes
 * @param value any JSON object
 * @returns a new object
 */
export const copyObject = (value: any) => JSON.parse(JSON.stringify(value));

/**
 * Determines if the given object is empty or has no values
 * @param value
 * @returns if the object is empty
 */
export const isObjectEmpty = (value: Record<string, any>) => {
  // default is empty
  if (isempty(value)) return true;
  let isObjectEmpty = true;
  // loop through all fields to check for emptiness
  for (let val of Object.values(value)) {
    if (val) {
      isObjectEmpty = false;
      break;
    }
  }
  return isObjectEmpty;
};

/**
 * Passes an object to session storage for the next screen
 * @param value
 */
export const passThroughSessionStorage = (value: any) => {
  sessionStorage.setItem('params', JSON.stringify(value));
};

/**
 * @returns an object passed through session storage
 */
export const getFromSessionStorage = () => {
  const item = sessionStorage.getItem('params');
  sessionStorage.removeItem('params');
  return JSON.parse(item ?? '{}');
};

/**
 * Removes extra spaces from a string
 * @param value the value being converted
 * @returns the minfied string
 */
export const minifyString = (value: string) => value.replace(/\n|\t/g, '');

/**
 *
 * @param text the raw text of the file
 * @param contentType the type of content
 * @returns the base 64 encoded string
 */
export const dataToBase64 = (text: string, contentType: string) =>
  `data:${contentType};base64,${Buffer.from(text).toString('base64')}`;

/**
 * Converts am HTTP response with raw data to a base64 string
 * @param response
 * @returns the base 64 encoded string
 */
export const responseToBase64 = async (response: Response) => {
  const contentType = response.headers.get('Content-Type') ?? '';
  const text = await response.text();
  return dataToBase64(text, contentType);
};

/**
 * Converts a base64 string to a blod
 * @param base64 the base64 string
 * @param contentType the type of content this is
 * @returns the blob object
 */
export const base64ToBlob = (base64: string) => {
  const arr = base64.split(';');
  // get the base64 values
  const contentType = arr[0].replace('data:', '');
  const value = arr[1].replace('base64,', '');
  const sliceSize = 512;
  const byteCharacters = Buffer.from(value, 'base64').toString('utf8');
  const byteArrays: Array<Uint8Array> = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

/**
 * Indicates if the color brightness should be light/dark
 * @param color the color being measured
 * @returns {DeviceTheme} the light/dark brightness value
 */
export const getColorLuminance = (
  color: MaterialUIColor | MaterialUIAccentColor
) => {
  switch (color) {
    // dark brightness colors
    case 'cyanAccent':
    case 'tealAccent':
    case 'greenAccent':
    case 'lightGreenAccent':
    case 'lime':
    case 'limeAccent':
    case 'yellow':
    case 'yellowAccent':
    case 'amber':
    case 'amberAccent':
    case 'orangeAccent':
      return DeviceTheme.Dark;
    // default to light brightness
    default:
      return DeviceTheme.Light;
  }
};

/**
 * Replaces a value in an email tempalte with the given field values
 * @param template
 * @param field
 * @param value
 */
export const replaceEmailTemplateValue = (
  template: string,
  field: string,
  value?: string
) => {
  return template.replace(new RegExp(`{{${field}}}`, 'g'), value ?? '');
};
