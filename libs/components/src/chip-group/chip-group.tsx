import React from 'react';
import { Option } from '.';
import cn from 'classnames';
import { Chip } from '../chip';

interface Props {
  options?: Array<Option>;
  color?: string;
  onSelect?: (value: string | number) => void; // a chip item is selected
  center?: boolean;
}

// chip group for a list of chips
export const ChipGroup: React.FC<Props> = (props) => {
  const classNames = cn(
    'flex flex-row flex-wrap space-x-2 items-center -mb-2',
    {
      'justify-center': props.center
    }
  );
  return (
    <div className={classNames}>
      {props.options?.length ? (
        props.options?.map((option) => (
          <div key={`${option.id}`} className="mb-2">
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
