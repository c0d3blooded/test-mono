import React, { ReactElement, useContext } from 'react';
import orderBy from 'lodash.orderby';
import first from 'lodash.first';
import isEmpty from 'lodash.isempty';
import { DateTime } from 'luxon';
import {
  CharacterisitcColors,
  MaterialUIAccentColor,
  MaterialUIColor,
  Revision,
  RevisionStatus,
  SunPreferenceValue
} from '@treelof/models';
import { HiArrowCircleRight, HiUserCircle } from 'react-icons/hi';
import { Chip, ChipGroup } from '@treelof/components';
import { CharacteristicContext } from '../../../context/characteristic';
import {
  findCharacteristic,
  filterCharacteristics,
  getRevisionDate
} from '@treelof/utils';
import { BsCircle, BsCircleFill, BsCircleHalf } from 'react-icons/bs';

interface Props {
  revisions: Record<string, Array<Revision>>;
}

const WikiRevisions: React.FC<Props> = ({ revisions }) => {
  // dates put in ascending order
  const orderedDates = Object.keys(revisions ?? {})
    .sort()
    .reverse();

  /**
   * Render date section containing all the revisions
   * @param dateKey
   */
  const _renderSection = (dateKey: string) => {
    const revisionItems: Array<Revision> = orderBy(revisions[dateKey], [
      'approved_on',
      'rejected_on',
      'created_at'
    ]);
    return (
      <div key={dateKey} className="mb-10">
        <h4 className="text-2xl font-bold mb-5">
          {DateTime.fromFormat(dateKey, 'yyyy-MM-dd').toFormat('MMMM d, yyyy')}
        </h4>
        {/* show revision items */}
        <div className="flex flex-col space-y-4">
          {revisionItems.map((revision, i) => (
            <div key={revision.id} className="space-y-4">
              <WikiRevision revision={revision} />
              {i !== revisionItems.length - 1 && (
                <div className="w-full border-t border-gray-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // show all revisions
  return (
    <div>
      {!isEmpty(orderedDates) ? (
        orderedDates.map((item) => _renderSection(item))
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

interface RevisionProps {
  revision: Revision;
}

const WikiRevision: React.FC<RevisionProps> = ({ revision }) => {
  const {
    edibilities,
    functionalities,
    layers,
    climates,
    soilPreferences,
    sunPreferences,
    zones
  } = useContext(CharacteristicContext);

  const blankValue = <Chip color="grey">Not available</Chip>;
  /**
   * The color for a status
   * @param value
   * @returns
   */
  const getStatusColor = (): MaterialUIColor | MaterialUIAccentColor => {
    switch (revision.status) {
      case RevisionStatus.Pending:
        return 'amber';
      case RevisionStatus.Approved:
        return 'green';
      case RevisionStatus.Rejected:
        return 'red';
    }
  };
  /**
   * Render the sun preference chip
   * @param value
   * @returns
   */
  const _renderSunPreference = (value: SunPreferenceValue) => {
    let icon: ReactElement;
    let label: string;
    switch (value) {
      case SunPreferenceValue.FullSun:
        icon = <BsCircle />;
        label = 'Full Sun';
        break;
      case SunPreferenceValue.PartShade:
        icon = <BsCircleHalf />;
        label = 'Part Shade';
        break;
      case SunPreferenceValue.FullShade:
        icon = <BsCircleFill />;
        label = 'Full Shade';
        break;
    }
    return value ? (
      <Chip color={CharacterisitcColors.sun_preferences} leading={icon}>
        {label}
      </Chip>
    ) : (
      blankValue
    );
  };
  /* Renders the changes for the field */
  const _renderChanges = () => {
    const changeArrow = <HiArrowCircleRight className="w-5 h-5 mx-2" />;
    // components for changes
    let oldChangesComponent = null;
    let newChangesComponent = null;
    switch (revision.field) {
      // for characteristics
      case 'edibilities':
        oldChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(edibilities, revision.old_value)}
          />
        );
        newChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(edibilities, revision.new_value)}
          />
        );
        break;
      case 'functionalities':
        oldChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(functionalities, revision.old_value)}
          />
        );
        newChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(functionalities, revision.new_value)}
          />
        );
        break;
      case 'layers':
        oldChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(layers, revision.old_value)}
          />
        );
        newChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(layers, revision.new_value)}
          />
        );
        break;
      case 'soil_preferences':
        oldChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(soilPreferences, revision.old_value)}
          />
        );
        newChangesComponent = (
          <ChipGroup
            color={CharacterisitcColors[revision.field]}
            options={filterCharacteristics(soilPreferences, revision.new_value)}
          />
        );
        break;
      // for climate changes
      case 'native_climate':
        const oldClimate = first(revision.old_value);
        const newClimate = first(revision.new_value);
        oldChangesComponent = oldClimate ? (
          <Chip color={CharacterisitcColors[revision.field]}>
            {findCharacteristic(climates, oldClimate)?.label}
          </Chip>
        ) : (
          blankValue
        );
        newChangesComponent = newClimate ? (
          <Chip color={CharacterisitcColors[revision.field]}>
            {findCharacteristic(climates, newClimate)?.label}
          </Chip>
        ) : (
          blankValue
        );
        break;
      // for sun changes
      case 'sun_preferences':
        oldChangesComponent = _renderSunPreference(first(revision.old_value));
        newChangesComponent = _renderSunPreference(first(revision.new_value));
        break;
      // for zone changes
      case 'zone_min':
      case 'zone_max':
        const oldZone = first(revision.old_value);
        const newZone = first(revision.new_value);
        oldChangesComponent = oldZone ? (
          <Chip color={CharacterisitcColors.zone}>{oldZone}</Chip>
        ) : (
          blankValue
        );
        newChangesComponent = newZone ? (
          <Chip color={CharacterisitcColors.zone}>{newZone}</Chip>
        ) : (
          blankValue
        );
        break;
      default:
        oldChangesComponent = <span>{revision.old_value}</span>;
        newChangesComponent = <span>{revision.new_value}</span>;
        break;
    }
    // show default changes
    return (
      <div className="flex flex-row items-center">
        {/* old */}
        {oldChangesComponent}
        {changeArrow}
        {/* new */}
        {newChangesComponent}
      </div>
    );
  };
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row">
        {/* owner */}
        <div className="flex flex-row items-center self-start border-gray-300 border rounded-2xl px-2">
          <HiUserCircle className="text-primary-700 mr-1" /> {`Anonymous`}
        </div>
        {/* time */}
        <span className="ml-2">
          {getRevisionDate(revision).toLocaleString(DateTime.TIME_SIMPLE)}
        </span>
      </div>
      {/* changes */}
      {_renderChanges()}
    </div>
  );
};

export default WikiRevisions;
