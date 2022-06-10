import { EdibilityValue } from "./edibility.ts";
import { SoilValue } from "./soil.ts";
import { ClimateValue } from "./climate.ts";
import { LayerValue } from "./layer.ts";
import { FunctionalityValue } from "./functionality.ts";
import { SunPreferenceValue } from "./sun_preferences.ts";
import { ZoneValue } from "./zone.ts";
/**
 * @schema plant
 * title: Plant
 * description: An individual plant species
 * type: object
 * properties:
 *   id:
 *     type: string
 *   description:
 *     type: string
 * example:
 *  id: '???'
 *  description: '???'
 */
export interface Plant {
  id: number;
  common_name: string;
  alternative_common_names?: Array<string>;
  description?: string;
  genus: string;
  botanical_name: string;
  image_url?: string;
  edibilities: Array<EdibilityValue>;
  functionalities: Array<FunctionalityValue>;
  layers: Array<LayerValue>;
  sun_preferences: SunPreferenceValue;
  soil_ph_low: number;
  soil_ph_high: number;
  soil_preferences: Array<SoilValue>;
  zone_min: ZoneValue;
  zone_max: ZoneValue;
  native_climate: ClimateValue;
}
