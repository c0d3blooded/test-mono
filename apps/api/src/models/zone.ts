/**
 * @schema zone
 * title: USDA Hardiness Zone
 * description: The USDA hardiness zones
 * type: object
 * properties:
 *   id:
 *     type: string
 *     description: The USDA zone
 *   min_f:
 *     type: number
 *     format: float
 *     description: The minimum-lowest temperature in this zone (Farenheit)
 *   max_f:
 *     type: number
 *     format: float
 *     description: The maximum-lowest temperature in this zone (Farenheit)
 *   min_c:
 *     type: number
 *     format: float
 *     description: The minimum-lowest temperature in this zone (Celsius)
 *   max_c:
 *     type: number
 *     format: float
 *     description: The maximum-lowest temperature in this zone (Celsius)
 * example:
 *  id: '10a'
 *  min_f: 30
 *  max_f: 35
 *  min_c: -1.1
 *  max_c: 1.7
 */
export interface Zone {
  id: ZoneValue;
  min_f: number; // minimum lowest temperature in Farenheit
  max_f: number; // minimum lowest temperature in Farenheit
  min_c: number; // minimum lowest temperature in Celcius
  max_c: number; // minimum lowest temperature in Celcius
}

export type ZoneValue =
  | "1a"
  | "1b"
  | "2a"
  | "2b"
  | "3a"
  | "3b"
  | "4a"
  | "4b"
  | "5a"
  | "5b"
  | "6a"
  | "6b"
  | "7a"
  | "7b"
  | "8a"
  | "8b"
  | "9a"
  | "9b"
  | "10b"
  | "10a"
  | "11a"
  | "11b"
  | "12a"
  | "12b"
  | "13a"
  | "13b";
