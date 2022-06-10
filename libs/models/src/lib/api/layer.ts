/**
 * @schema layer
 * title: Layer
 * description: The permaculture layer(s) of a plant
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The id of the permaculture layer
 *   label:
 *     type: string
 *     description: The formatted label
 *   description:
 *     type: string
 *     description: The description of the permaculture layer
 * example:
 *  id: 'shrub'
 *  label: 'Shrub'
 *  description: 'Acts as shrub layer'
 */
export interface Layer {
  id: LayerValue;
  label: string; // the display label
  description: string; // the description of this label
}

export enum LayerValue {
  Overstory = "overstory_tree",
  Understory = "understory_tree",
  Shrub = "shrub",
  Herbaceous = "herbaceous",
  GroundCover = "ground_cover",
  Underground = "underground",
  Vine = "vine",
}
