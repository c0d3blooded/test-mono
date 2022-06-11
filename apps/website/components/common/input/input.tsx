import styles from './input.module.scss';
import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import cn from 'classnames';
import { SlideVertical } from '@treelof/animations';

interface Props {
  label?: string; // optional label for the input
  hint?: string; // hint for the input field
  error?: string;
  prefix?: string;
  multiline?: boolean; // this input is multiline
  containerClassName?: string;
  // native input props
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  // native text area props
  textAreaProps?: React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
}
/**
 * Tailwind UI Input
 */
const Input: React.FC<Props> = (props) => {
  const { hint, prefix } = props;
  // set conditional classnames
  const className = cn(
    'clickable',
    styles.root,
    {
      'rounded-md': !prefix,
      // colorings
      [styles.error]: props.error
    },
    props.inputProps?.className,
    props.textAreaProps?.className
  );

  /**
   * @returns the input for the component
   */
  const _renderInput = () => {
    // for items with a prefix
    if (prefix)
      return (
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
            {prefix}
          </span>
          <input className={className} {...props.inputProps} />
        </div>
      );
    // default return
    return <input className={className} {...props.inputProps} />;
  };

  return (
    <div className={`transition-all ${props.containerClassName}`}>
      {/* only render label if available */}
      {props.label && (
        <label
          htmlFor={props.inputProps?.name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {props.label}
        </label>
      )}
      {/* render the input */}
      <div className="relative">
        {props.multiline ? (
          <textarea rows={3} className={className} {...props.textAreaProps} />
        ) : (
          _renderInput()
        )}
        {/* show error icon */}
        {props.error && (
          <div className="absolute top-3 right-0 pr-3 flex items-center pointer-events-none">
            <FaExclamationCircle className="text-red-500" />
          </div>
        )}
        {/* show error  */}
        <SlideVertical show={Boolean(props.error)}>
          <p className="mt-2 text-sm text-red-600">{props.error}</p>
        </SlideVertical>
        {hint && <div className="mt-2 text-sm text-gray-500">{hint}</div>}
      </div>
    </div>
  );
};

export default Input;
