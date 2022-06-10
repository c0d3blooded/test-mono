/**
 * @schema edibility
 * title: Edibility
 * description: Parts of this plant which are edible
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The id of the edibility
 *   label:
 *     type: string
 *     description: The formatted label
 *   description:
 *     type: string
 *     description: The description of the edibility
 * example:
 *  id: 'roots'
 *  label: 'Roots'
 *  description: 'The roots of this plant are edible'
 */
export interface Edibility {
  id: EdibilityValue;
  label: string; // the display label
  description: string; // the description of this label
}

export enum EdibilityValue {
  Beans = "beans",
  Bulbs = "bulbs",
  Flowers = "flowers",
  FruitBerries = "fruit_berries",
  Leaves = "leaves",
  NutsSeeds = "nuts_seeds",
  Roots = "roots",
  Shoots = "shoots",
  Tubers = "tubers",
}
