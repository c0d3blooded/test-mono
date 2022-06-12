import cn from 'classnames';
import { useContext } from 'react';
import intersectionBy from 'lodash.intersectionby';
import { Characteristic } from '@treelof/models';
import { CharacteristicContext } from '../../../context/characteristic';
import { BsCircleFill, BsCircleHalf, BsCircle } from 'react-icons/bs';
import CharacteristicEdit from '../characteristic-edit';
import { Chip, ChipGroup, DropdownSelect } from '@treelof/components';

interface Props {
  plant: Record<string, any>;
  edit?: boolean; // indicates edit mode
}

const WikiCharacteristicsTable: React.FC<Props> = ({ plant, edit }) => {
  const characteristics = useContext(CharacteristicContext);
  const {
    edibilities,
    functionalities,
    layers,
    climates,
    soilPreferences,
    sunPreferences,
    zones
  } = characteristics;

  /**
   * Creates a table header
   * @param label
   * @param position where the header is in the table
   */
  const _renderHeader = (
    label: string | JSX.Element,
    position?: 'start' | 'end'
  ) => {
    const className = cn(
      'py-3.5 text-left text-sm font-semibold text-gray-900',
      {
        'pl-4 pr-3 sm:pl-6': position === 'start',
        'px-3': !position,
        'pl-3 pr-4 sm:pr-6': position === 'end'
      }
    );
    return (
      <th scope="col" className={className}>
        {label}
      </th>
    );
  };

  const cellClassName = 'whitespace-nowrap py-3 text-sm';

  /**
   * Creates a table header
   * @param type the label of the field
   * @param color the color of the items
   * @param items all the items to render
   * @param name the field name
   * @returns
   */
  const _renderCharacteristics = (
    type: string,
    color: string,
    name: string,
    options?: Array<Characteristic>,
    items?: Array<string>
  ) => {
    return (
      <tr>
        {/* label */}
        <td
          className={`pl-4 pr-3 font-medium text-gray-900 sm:pl-6 ${cellClassName}`}
        >
          {type}
        </td>
        {/* values */}
        <td className={`px-3 text-gray-500 ${cellClassName}`}>
          {!edit ? (
            <ChipGroup
              options={intersectionBy(
                options,
                items?.map((id: string) => ({
                  id
                })),
                'id'
              )}
              color={color}
            />
          ) : (
            // edit mode
            <CharacteristicEdit
              name={name}
              color={color}
              items={options ?? []}
            />
          )}
        </td>
      </tr>
    );
  };

  /* Show sun preferences */
  const _renderSunPreferences = () =>
    !edit ? (
      <div className="flex space-x-2">
        {/* full sun */}
        {plant.sun_preferences?.includes('full_sun') && (
          <Chip color="amber" leading={<BsCircle />}>
            Full Sun
          </Chip>
        )}
        {/* part shade */}
        {plant.sun_preferences?.includes('partial_shade') && (
          <Chip color="amber" leading={<BsCircleHalf />}>
            Partial Shade
          </Chip>
        )}
        {/* full shade */}
        {plant.sun_preferences?.includes('full_shade') && (
          <Chip color="amber" leading={<BsCircleFill />}>
            Full Shade
          </Chip>
        )}
      </div>
    ) : (
      // edit mode
      <CharacteristicEdit
        name="sun_preferences"
        color="amber"
        items={sunPreferences ?? []}
      />
    );

  /* Show hardiness zones */
  const _renderHardinessZones = () => {
    return !edit ? (
      <div className="flex items-center">
        {/* minimum zone */}
        {plant.zone_min ? (
          <Chip color="indigo">{plant.zone_min}</Chip>
        ) : (
          <Chip color="grey">Not available</Chip>
        )}
        <span className="px-2">to</span>
        {/* maximum zone */}
        {plant.zone_max ? (
          <Chip color="indigo">{plant.zone_max}</Chip>
        ) : (
          <Chip color="grey">Not available</Chip>
        )}
      </div>
    ) : (
      // edit mode
      <div className="flex flex-col md:flex-row md:items-center">
        {/* minimum zone */}
        <DropdownSelect
          name="zone_min"
          options={
            zones?.map((zone) => ({
              label: zone.id,
              value: zone.id
            })) ?? []
          }
        />
        <span className="p-2">to</span>
        {/* maximum zone */}
        <DropdownSelect
          name="zone_max"
          options={
            zones?.map((zone) => ({
              label: zone.id,
              value: zone.id
            })) ?? []
          }
        />
      </div>
    );
  };

  return (
    <div className="inline-block min-w-full pt-4 pb-2 align-middle ">
      <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          {/* headers */}
          <thead className="bg-gray-50">
            <tr>
              {_renderHeader('Type', 'start')}
              {_renderHeader('')}
            </tr>
          </thead>
          {/* values */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {/* edibility */}
            {_renderCharacteristics(
              'Edibility',
              'red',
              'edibilities',
              edibilities,
              plant.edibilities
            )}
            {/* layer */}
            {_renderCharacteristics(
              plant.layers?.length !== 1 ? 'Layers' : 'Layer',
              'deepPurple',
              'layers',
              layers,
              plant.layers
            )}
            {/* functionality */}
            {_renderCharacteristics(
              plant.functionalities?.length !== 1 ? 'Functions' : 'Function',
              'purple',
              'functionalities',
              functionalities,
              plant.functionalities
            )}
            {/* soil preferences */}
            {_renderCharacteristics(
              plant.soil_preferences?.length !== 1
                ? 'Soil Preferences'
                : 'Soil Preference',
              'brown',
              'soil_preferences',
              soilPreferences,
              plant.soil_preferences
            )}
            {/* sun preferences */}
            <tr>
              {/* label */}
              <td
                className={`pl-4 pr-3 font-medium text-gray-900 sm:pl-6 ${cellClassName}`}
              >
                {plant.sun_preferences?.length !== 1
                  ? 'Sun Preferences'
                  : 'Sun Preference'}
              </td>
              {/* values */}
              <td className={`px-3 text-gray-500 ${cellClassName}`}>
                {_renderSunPreferences()}
              </td>
            </tr>
            {/* climate */}
            <tr>
              {/* label */}
              <td
                className={`pl-4 pr-3 font-medium text-gray-900 sm:pl-6 ${cellClassName}`}
              >
                Climate
              </td>
              {/* values */}
              <td className={`px-3 text-gray-500 ${cellClassName}`}>
                {!edit ? (
                  <div className="flex">
                    {plant.native_climate ? (
                      <Chip color="blue">
                        {
                          climates?.find((i) => i.id === plant.native_climate)
                            ?.label
                        }
                      </Chip>
                    ) : (
                      <Chip color="grey">Not available</Chip>
                    )}
                  </div>
                ) : (
                  // edit mode
                  <DropdownSelect
                    name="native_climate"
                    options={
                      climates?.map((climate) => ({
                        label: climate.label,
                        value: climate.id
                      })) ?? []
                    }
                  />
                )}
              </td>
            </tr>
            {/* zones */}
            <tr>
              {/* label */}
              <td
                className={`pl-4 pr-3 font-medium text-gray-900 sm:pl-6 ${cellClassName}`}
              >
                Hardiness Zones
              </td>
              {/* values */}
              <td className={`px-3 text-gray-500 ${cellClassName}`}>
                {_renderHardinessZones()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WikiCharacteristicsTable;

// ##### Sun Preference(s)

// <ChipGroup
//   color="amber"
//   options={props.plant.sun_preferences?.map((i) => ({ id: i, label: i }))}
// />
// <br />

// ##### Climate

// <div style={{ display: 'flex' }}>
//   <Chip color="blue">{props.plant.native_climate}</Chip>
// </div>
// <br />

// ##### Zone

// <div style={{ display: 'flex', flexDirection: 'row' }}>
//   <Chip color="orange">{props.plant.zone_min}</Chip>&nbsp;to&nbsp;
//   <Chip color="orange">{props.plant.zone_max ?? 'N/A'}</Chip>
// </div>
