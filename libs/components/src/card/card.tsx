import React from 'react';
import cn from 'classnames';

interface Props {
  noPadding?: boolean; //indicates that no padding is included
  hideOverflow?: boolean;
  children?: React.ReactNode;
}
/**
 * @returns basic card component
 */
export const Card: React.FC<Props> = (props) => {
  const className = cn({
    'p-4 sm:p-6': !props.noPadding,
    'overflow-hidden': props.hideOverflow
  });
  return (
    <div className={`bg-white shadow rounded-lg ${className}`}>
      {props.children}
    </div>
  );
};
