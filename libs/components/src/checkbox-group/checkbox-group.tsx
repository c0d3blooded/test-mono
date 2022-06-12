import React, { useState } from 'react';
import styles from './checkbox-group.module.scss';
import cn from 'classnames';

// an option provided by the checkbox input
interface Option {
  id: string | number; // id of the option
  label: string; // label for the checkbox item
  description?: string; // the description of the checkbox item
  checked?: boolean;
}

interface Props {
  label: string; // label for the checkbox group
  description?: string; // the description of the checkbox group
  defaultValue?: string | number | Array<string> | Array<number>; // the default id value of this item
  options: Array<Option>;
  onChange?: (value: Option) => void; // when an option value is changed
  onValuesChanged?: (selectedValues: Array<Option>) => void; // when the selected option values change
  multi?: boolean; // allow multiple selections
}

/**
 * @returns a single or multi select checkbox field
 */
export const CheckboxGroup: React.FC<Props> = (props) => {
  // internally track options
  const [options, setOptions] = useState(props.options);
  // render checkbox or radio box
  const className = cn({
    [styles.checkbox]: props.multi,
    [styles.radio]: !props.multi
  });
  /**
   * Renders a checkbox item for the groun
   * @param option the available option
   */
  const _renderCheckboxItem = (option: Option, index: number) => (
    <div key={option.id} className="flex items-start">
      <div className="h-5 flex items-center">
        <input
          id="comments"
          name="comments"
          type={!props.multi ? 'radio' : 'checkbox'}
          className={className}
          checked={option.checked}
          onChange={() => {
            options[index].checked = !options[index].checked;
            // option changed
            // for single select return updated option
            if (props.onChange) props.onChange(options[index]);
            // for multi select return all options
            if (props.onValuesChanged)
              props.onValuesChanged(options.filter((option) => option.checked));
            setOptions(options);
          }}
        />
      </div>
      <div className="ml-3 text-sm">
        {/* label */}
        <label htmlFor="comments" className="font-medium text-gray-700">
          {option.label}
        </label>
        {/* description */}
        {option.description && (
          <p className="text-gray-500">{option.description}</p>
        )}
      </div>
    </div>
  );
  return (
    <fieldset>
      {/* label */}
      <legend className="text-base font-medium text-gray-900">
        {props.label}
      </legend>
      {/* description */}
      {props.description && (
        <p className="text-sm text-gray-500">{props.description}</p>
      )}
      <div className="mt-4 space-y-4">
        {/* options */}
        {options.map((option, i) => _renderCheckboxItem(option, i))}
      </div>
    </fieldset>
  );
};
