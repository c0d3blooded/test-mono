/**
 * @schema functionality
 * title: Functionality
 * description: The potential ecological function of a plant. Based on permaculture methodologies
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The id of the functionality
 *   label:
 *     type: string
 *     description: The formatted label
 *   description:
 *     type: string
 *     description: The description of the functionality
 * example:
 *  id: 'nectary'
 *  label: 'Nectary'
 *  description: 'Provides nectar as food for insects'
 */
export interface Functionality {
  id: FunctionalityValue;
  label: string; // the display label
  description: string; // the description of this label
}

export enum FunctionalityValue {
  Canopy = "canopy",
  Mulch = "mulch",
  Nectary = "nectary",
  NitrogenFixer = "nitrogen_fixer",
}
