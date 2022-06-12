import React from 'react';
import styles from './button-group.module.scss';
import cn from 'classnames';
import { useState } from 'react';

// an option provided by the button group
interface Option {
  id: string | number; // id of the option
  label: string; // label for the button item
  selected?: boolean;
}

interface Props {
  defaultValue: string | number; // the default id value of this item
  options: Array<Option>;
  onChange?: (value: Option) => void; // when an option value is changed
}

/**
 * @returns a multiple-choice, single select component
 */
export const ButtonGroup: React.FC<Props> = (props) => {
  const [value, setValue] = useState(props.defaultValue); // the currently seelcted value
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {props.options.map((option, i) => {
        const className = cn(styles.button, {
          [styles.first]: i === 0, // the first button
          [styles.additional]: i !== 0, // additional buttons
          [styles.last]: i === props.options.length - 1, // the last button
          [styles.default]: option.id !== value,
          [styles.selected]: option.id === value
        });
        return (
          <button
            key={option.id}
            type="button"
            className={className}
            onClick={() => {
              // when an option is selected
              setValue(option.id);
              if (props.onChange) props.onChange(option);
            }}
          >
            {option.label}
          </button>
        );
      })}
    </span>
  );
};
