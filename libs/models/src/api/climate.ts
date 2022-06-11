/**
 * @schema climate
 * title: Climate
 * description: The Köppen climate classification groups
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The id of the climate
 *   label:
 *     type: string
 *     description: The formatted label
 *   description:
 *     type: string
 *     description: The description of the climate
 *   order:
 *     type: number
 *     description: The order in which these should be listed
 * example:
 *  id: 'temperate'
 *  label: 'Temparate'
 *  description: ''
 *  order: 3
 */
export interface Climate {
  id: ClimateValue;
  label: string; // the display label
  description: string; // the description of this label
  order: number;
}

export enum ClimateValue {
  Tropical = "tropical",
  Dry = "dry",
  Temperate = "temperate",
  Continental = "continental",
  Polar = "polar",
}
