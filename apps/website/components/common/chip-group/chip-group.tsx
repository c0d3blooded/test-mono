import React from 'react';
import { Option } from '.';
import Chip from '../chip';
import cn from 'classnames';

interface Props {
  options?: Array<Option>;
  color?: string;
  onSelect?: (value: string | number) => void; // a chip item is selected
  center?: boolean;
}

// chip group for a list of chips
const ChipGroup: React.FC<Props> = (props) => {
  const classNames = cn(
    'flex flex-row flex-wrap space-x-2 space-y-2 items-center',
    {
      'justify-center': props.center
    }
  );
  return (
    <div className={classNames}>
      {props.options?.length ? (
        props.options?.map((option) => (
          <div key={`${option.id}`}>
            <Chip
              color={props.color}
              onClick={() => props.onSelect && props.onSelect(option.id)}
            >
              {option.label ?? option.id}
            </Chip>
          </div>
        ))
      ) : (
        <Chip color="grey">Not available</Chip>
      )}
    </div>
  );
};

export default ChipGroup;
