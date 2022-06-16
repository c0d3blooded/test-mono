import React from 'react';
import cn from 'classnames';
import styles from './button.module.scss';
import { Loader } from '../loader';

interface Props {
  startIcon?: JSX.Element; // an icon starting on the left
  loading?: boolean; // indicates if the button is in loading mode or not
  disabled?: boolean; // indicates if the button is disabled
  color?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  gradient?: boolean;
  alt?: boolean; // alternate colorings for the button
  fullWidth?: boolean; // indicates a full width button
  outlined?: boolean; // an outlined style button
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>; // optinal native button props
  children?: React.ReactNode;
}

/**
 * @returns Common app button
 */
export const Button: React.FC<Props> = (props) => {
  const { color, alt, gradient, loading, disabled, outlined } = props;
  // set conditional classnames
  const className = cn(
    styles.root,
    {
      // primary colors (default if no value given)
      [styles.primary]:
        (!color || color === 'primary') &&
        !disabled &&
        !outlined &&
        !alt &&
        !gradient,
      [styles.primaryAlt]:
        (!color || color === 'primary') &&
        !disabled &&
        !outlined &&
        alt &&
        !gradient,
      [styles.primaryGradient]:
        (!color || color === 'primary') &&
        !disabled &&
        !outlined &&
        !alt &&
        gradient,
      // secondary colors
      [styles.secondary]:
        color === 'secondary' && !disabled && !alt && !gradient,
      [styles.secondaryAlt]:
        color === 'secondary' && !disabled && alt && !gradient,
      [styles.secondaryGradient]:
        color === 'secondary' && !disabled && !alt && gradient,
      // tertiary colors
      [styles.tertiary]: color === 'tertiary' && !disabled && !alt && !gradient,
      [styles.tertiaryAlt]:
        color === 'tertiary' && !disabled && alt && !gradient,
      // danger colors
      [styles.danger]: color === 'danger' && !disabled && !alt && !gradient,
      [styles.dangerAlt]: color === 'danger' && !disabled && alt && !gradient,
      [styles.outlined]: outlined,
      // state changes
      [styles.disabled]: disabled || loading,
      [styles.fullWidth]: props.fullWidth
    },
    props.buttonProps?.className
  );
  return (
    <button
      type="button"
      {...props.buttonProps}
      className={className}
      onClick={(e) => {
        if (loading || disabled) return;
        else if (props.buttonProps?.onClick) props.buttonProps.onClick(e);
      }}
    >
      {loading && (
        <div className="mr-2">
          <Loader color="white" size={1} />
        </div>
      )}
      {/* the starting icon */}
      {props.startIcon && <div className="pr-3">{props.startIcon}</div>}
      {props.children}
    </button>
  );
};
