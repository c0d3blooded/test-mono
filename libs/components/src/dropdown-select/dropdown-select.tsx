import React, { useMemo } from 'react';
import styles from './dropdown-select.module.scss';
import cn from 'classnames';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { useController, useFormContext } from 'react-hook-form';
import { Menu } from '@headlessui/react';

export interface DropddownOption {
  label: string; // label of the option
  value: string | number; // value of the option
}

interface Props {
  label?: string; // the label of the dropdown
  options: Array<DropddownOption>; // avaliable options
  // react-hook-from props
  name: string;
  defaultValue?: string | number;
  className?: string;
  required?: boolean;
}

const dropdownSelectClass = 'dropdown-select '; // class for tracking when a dropdown item has been clicked
const dropdownItemClass = 'dropdown-item '; // class for tracking when a dropdown item has been clicked
export const DropdownSelect: React.FC<Props> = (props) => {
  const { control } = useFormContext(); // retrieve all hook from parent
  const { options } = props;
  const {
    field: { onChange, value, ref }
  } = useController({
    name: props.name,
    control,
    rules: { required: props.required },
    defaultValue: props.defaultValue
  });

  // the currently selected option
  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [value, options]
  );
  const renderOption = (option: DropddownOption) => {
    // if this option is currently selected
    const isSelected = value === option.value;
    // item
    const itemClassName = cn(styles.selectItem, dropdownItemClass);
    // label
    const labelClassName = cn('block truncate', dropdownItemClass, {
      'font-normal': !isSelected,
      'font-semibold': isSelected
    });
    // select icon
    const selectIconClassName = cn(dropdownItemClass, styles.selectIconRoot, {
      [styles.selectIconUnselected]: !isSelected,
      [styles.selectIconSelected]: isSelected
    });
    return (
      <li
        className={itemClassName}
        key={option.label}
        aria-roledescription="option"
        onClick={() => onChange(option.value)}
      >
        <span className={labelClassName}>{option.label}</span>
        <span className={selectIconClassName}>
          <HiCheck className={`${dropdownItemClass} h-5 w-5`} />
        </span>
      </li>
    );
  };
  // button
  const buttonClassName = cn('clickable', styles.button);
  return (
    <Menu>
      <div ref={ref} className={props.className}>
        {/* the label */}
        {props.label && (
          <label
            id="listbox-label"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {props.label}
          </label>
        )}
        <div className="relative">
          {/* dropdown select */}
          <Menu.Button
            type="button"
            className={buttonClassName}
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
          >
            {/* visible text */}
            {selectedOption ? (
              <span className={`block truncate ${dropdownSelectClass}`}>
                {selectedOption?.label}
              </span>
            ) : (
              <span
                className={`block truncate text-gray-500 ${dropdownSelectClass}`}
              >
                Select an option...
              </span>
            )}
            {/* selector icon */}
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector className="h-5 w-5 text-gray-400" />
            </span>
          </Menu.Button>
          {/* options menu */}
          <Menu.Items>
            <ul
              className="absolute z-20 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
              tabIndex={-1}
              role="listbox"
              aria-labelledby="listbox-label"
              aria-activedescendant="listbox-option-3"
            >
              {/* render each option */}
              {options.map((option) => (
                <Menu.Item key={option.label}>{renderOption(option)}</Menu.Item>
              ))}
            </ul>
          </Menu.Items>
        </div>
      </div>
    </Menu>
  );
};
