import cn from 'classnames';
import styles from './icon-button.module.scss';

interface Props {
  icon: JSX.Element;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  alt?: boolean; // alternate colorings for the button
}

/* A button for only showing an icon */
export const IconButton: React.FC<Props> = ({ icon, color, alt, size }) => {
  const classname = cn(styles.root, {
    // colors
    [styles.primary]: !color || (color === 'primary' && !alt), // default
    [styles.primaryAlt]: color === 'primary' && alt,
    [styles.secondary]: color === 'secondary' && !alt,
    [styles.secondaryAlt]: color === 'secondary' && alt,
    [styles.tertiary]: color === 'tertiary' && !alt,
    [styles.tertiaryAlt]: color === 'tertiary' && alt,
    [styles.danger]: color === 'danger' && !alt,
    [styles.dangerAlt]: color === 'danger' && alt,
    // sizes
    [styles.sm]: size === 'sm',
    [styles.md]: size === 'md' || !size, // default
    [styles.lg]: size === 'lg'
  });
  return (
    <button type="button" className={classname}>
      {icon}
    </button>
  );
};
