/**
 * @schema sun_preference
 * title: Sun Preference
 * description: The light preferences of a plant
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The id of the sun preference
 *   label:
 *     type: string
 *     description: The formatted label
 *   description:
 *     type: string
 *     description: The description of the sun preference
 *   order:
 *     type: number
 *     description: The order in which these should be listed
 * example:
 *  id: 'full_sun'
 *  label: 'Full Sun'
 *  description: 'Receives sunlight all day'
 *  order: 1
 */
export interface SunPreference {
  id: SunPreferenceValue;
  label: string; // the display label
  description: string; // the description of this label
  order: number;
}

export enum SunPreferenceValue {
  FullShade = "full_shade",
  PartShade = "part_shade",
  FullSun = "full_sun",
}
