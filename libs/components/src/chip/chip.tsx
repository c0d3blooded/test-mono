import cn from 'classnames';
import styles from './chip.module.scss';

interface Props {
  color?: string; // the tailwind ui color to render
  leading?: JSX.Element; // component for leading indicator
  onClick?: () => void;
  children?: React.ReactNode;
}

// a chip component
export const Chip: React.FC<Props> = (props) => {
  const classNames = cn([styles[`${props.color ?? 'green'}`]], {
    'cursor-pointer': Boolean(props.onClick)
  });
  return (
    <div
      className={`flex flex-row items-center px-3 py-1 rounded-2xl ${classNames}`}
    >
      {/* leading icon */}
      {props.leading && <div className="mr-2">{props.leading}</div>}
      {props.children}
    </div>
  );
};
