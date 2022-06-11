import React, { ReactElement } from 'react';
import RCTooltip from 'rc-tooltip';

import styles from './tooltip.module.scss';
import 'rc-tooltip/assets/bootstrap.css';

interface Props {
  tooltip: string;
  placement?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'rightTop'
    | 'rightBottom'
    | 'leftTop'
    | 'leftBottom';
}

const Tooltip: React.FC<Props> = (props) => {
  return (
    <RCTooltip
      overlayClassName={styles.root}
      placement={props.placement ?? 'left'}
      trigger={['hover']}
      overlay={<span>{props.tooltip}</span>}
    >
      {props.children as ReactElement}
    </RCTooltip>
  );
};

export default Tooltip;
