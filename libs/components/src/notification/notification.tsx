import React from 'react';
import styles from './notification.module.scss';
import { FaCheckCircle, FaInfo, FaTimesCircle } from 'react-icons/fa';

interface Props {
  type?: 'success' | 'error';
  children?: React.ReactNode;
}

/**
 * @returns A generic use alert dialog for form errors
 */
export const Notification: React.FC<Props> = (props) => {
  const { type } = props;
  const className = type ? styles[type] : '';
  /**
   * @returns {JSX.Element} the correct icon for the notification type
   */
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaTimesCircle />;
      default:
        return <FaInfo />;
    }
  };
  return (
    <div className={`${styles.root} rounded-md p-4 ${className}`}>
      <div className="flex">
        {/* notification icon */}
        <div className={`${styles.icon} ${className}`}>{getIcon()}</div>
        <div className="flex-1 ml-3">
          <h3 className={`${styles.text} ${className}`}>{props.children}</h3>
        </div>
      </div>
    </div>
  );
};
