import styles from './loader.module.scss';
import { MaterialUIColor } from '@treelof/models';
import cn from 'classnames';
import { CSSProperties } from 'react';

interface Props {
  color: MaterialUIColor;
  size: number;
}

/**
 * @returns a loading indicator
 */
export const Loader: React.FC<Props> = ({ color, size }) => {
  const className = cn(styles['lds-ring']);
  const divClassName = cn(
    'border-l-transparent border-r-transparent border-b-transparent',
    styles[color]
  );
  const divStyle: CSSProperties = {
    width: size * 8,
    height: size * 8,
    margin: size,
    borderWidth: size,
    borderStyle: 'solid'
  };
  return (
    <div
      className={className}
      style={{
        width: size * 10,
        height: size * 10
      }}
    >
      <div className={divClassName} style={divStyle}></div>
      <div className={divClassName} style={divStyle}></div>
      <div className={divClassName} style={divStyle}></div>
      <div className={divClassName} style={divStyle}></div>
    </div>
  );
};
