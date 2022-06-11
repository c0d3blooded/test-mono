import React from 'react';
import { animated, config, useTransition } from 'react-spring';

interface Props {
  show: boolean; // component is visible
  className?: string; // the optional styles classname
  duration?: number; // optional duration prop
  withDelay?: boolean; // there shold be a delay before rendering and showing the component
  children?: React.ReactNode;
}
/**
 * @return A wrapper component for fade in/out based on component visibility
 */
const Fade: React.FC<Props> = (props) => {
  const transitions = useTransition(props.show, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: props.show,
    config: { ...config.molasses, duration: props.duration ?? 500 }
  });
  return transitions(
    (styles, item) =>
      item && (
        <animated.div style={styles} className={props.className}>
          {props.children}
        </animated.div>
      )
  );
};

export default Fade;
