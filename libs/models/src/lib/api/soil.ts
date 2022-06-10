
/**
 * @schema soil
 * title: Soil
 * description: Different structures of soils
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The id of the soil
 *   label:
 *     type: string
 *     description: The formatted label
 *   description:
 *     type: string
 *     description: The description of the soil
 * example:
 *  id: 'loam'
 *  label: 'Loam'
 *  description: ''
 */
export interface Soil {
  id: SoilValue;
  label: string; // the display label
  description: string; // the description of this label
}

export enum SoilValue {
  Loam = "loam",
  Clay = "clay",
  Peat = "peat",
  Sand = "sand",
  Silt = "silt",
}
