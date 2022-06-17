import { Characteristic } from '@treelof/models';

/**
 * Retrieve a charateristic by id
 * @param charateristics
 * @param id
 */
export const findCharacteristic = (
  charateristics: Array<Record<string, any>>,
  id: string
) => charateristics.find((item) => item['id'] === id);

/**
 * Retrieve all charateristics by ids
 * @param charateristics
 * @param ids
 */
export const filterCharacteristics = (
  charateristics: Array<Record<string, any>>,
  ids?: Array<string>
) =>
  (charateristics.filter((item) => ids?.includes(item['id'])) ??
    []) as Array<Characteristic>;
