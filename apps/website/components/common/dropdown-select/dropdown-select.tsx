import React, { useEffect, useMemo, useState } from 'react';
import styles from './dropdown-select.module.scss';
import cn from 'classnames';
import { HiCheck, HiSelector } from 'react-icons/hi';
import { useController, useFormContext } from 'react-hook-form';

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

const dropdownItemClass = 'dropdown-item '; // class for tracking when a dropdown item has been clicked
const DropdownSelect: React.FC<Props> = (props) => {
  const { control } = useFormContext(); // retrieve all hook from parent
  const { options } = props;
  const [showOptions, setShowOptions] = useState(false); // show/hide options
  const {
    field: { onChange, onBlur, value, ref }
  } = useController({
    name: props.name,
    control,
    rules: { required: props.required },
    defaultValue: props.defaultValue
  });
  useEffect(() => {
    // captures on blur events for non-dropdown item types
    const captureClick = (e: Event) => {
      // @ts-ignore
      const className: string = e?.target?.getAttribute('class');
      if (className && !className.includes(dropdownItemClass) && showOptions) {
        setShowOptions(false);
        onBlur();
      }
    };
    document.addEventListener('click', captureClick);
    return () => document.removeEventListener('click', captureClick);
  }, [showOptions, onBlur]);

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
        onClick={() => {
          // option selected
          onChange(option.value);
          onBlur();
          setShowOptions(false);
        }}
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
        <button
          type="button"
          className={buttonClassName}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          onClick={() => setShowOptions(!showOptions)}
        >
          {/* visible text */}
          {selectedOption ? (
            <span className="block truncate">{selectedOption?.label}</span>
          ) : (
            <span className="block truncate text-gray-500">
              Select an option...
            </span>
          )}
          {/* selector icon */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiSelector className="h-5 w-5 text-gray-400" />
          </span>
        </button>
        {/* options menu */}
        {showOptions && (
          <ul
            className="absolute z-20 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-option-3"
          >
            {/* render each option */}
            {options.map((option) => renderOption(option))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownSelect;
